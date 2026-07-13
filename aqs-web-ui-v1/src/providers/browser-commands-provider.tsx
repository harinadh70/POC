/* eslint-disable react-refresh/only-export-components */

import { useMemo, useCallback, useEffect, useState, useRef, type PropsWithChildren } from 'react';
import { useRouteLoaderData, useLocation } from 'react-router';

// components
import { ModalDialog } from '@components/modal-dialog';

// hooks
import { useSmartNavigation } from '@hooks/use-smart-navigation';

// utils
import createStore from '@utils/create-store';
import { CommandHandlerBuilder } from '@utils/command-handlers';
import { pubSub } from '@utils/pub-sub';
import { createFeatureLogger } from '@utils/logger-builder';
import { getItem } from '@utils/local-storage';
import { getActionConfig } from '@/config/action-config';

// services
import type { SessionInfo } from '@features/auth/services/auth';
import { fetchPageBuild } from '@services/page-build';

// providers
import { useFormMethods } from '@providers/form-provider';
import { useDialogStore } from '@providers/dialog-provider';
import { useGlobalVariableStore } from '@providers/global-variable-provider';

// types
import type { BrowserCommand, CommandResult, ActionType } from '@/types';
import type { NavigationContextValue } from '@/context';

// Create logger for browser commands
const logger = createFeatureLogger('commands', 'BrowserCommandsProvider');

// ----------------------------------------
// Store Interface
// ----------------------------------------

export interface BrowserCommandsStore {
  /**
   * All commands received (for debugging/logging)
   */
  commands: BrowserCommand[];

  /**
   * Commands that have been executed with their results
   */
  executedCommands: CommandResult[];

  /**
   * Commands waiting to be executed
   */
  pendingCommands: BrowserCommand[];

  /**
   * Whether commands are currently being executed
   */
  isExecuting: boolean;

  /**
   * Maximum number of commands to keep in history
   */
  maxHistorySize: number;
}

// ----------------------------------------
// Store Creation
// ----------------------------------------

const { Provider, useStore } = createStore<BrowserCommandsStore>({
  commands: [],
  executedCommands: [],
  pendingCommands: [],
  isExecuting: false,
  maxHistorySize: 100,
});

// ----------------------------------------
// Provider Component
// ----------------------------------------

/**
 * Internal component that uses the store (must be inside Provider)
 */
const BrowserCommandsProviderInternal = ({ children }: PropsWithChildren) => {
  const formMethods = useFormMethods();
  const { smartNavigate } = useSmartNavigation();
  const dialogStore = useDialogStore();
  const globalVariableStore = useGlobalVariableStore();
  const location = useLocation();

  // Get navigationContext from root loader (for windowCommand handling)
  const rootData = useRouteLoaderData('root') as
    { navigationContext?: NavigationContextValue | null }
    | undefined;
  const navContext = rootData?.navigationContext;

  const [store, setStore] = useStore((store) => store);

  const normalizeBranchToken = useCallback((value: string | undefined): string | null => {
    if (!value) return null;
    const normalized = value.trim().toLowerCase();
    if (!normalized) return null;
    if (normalized === 'y') return 'yes';
    if (normalized === 'n') return 'no';
    if (normalized === '1') return 'yes';
    if (normalized === '0') return 'no';
    if (normalized === 'true' || normalized === 't') return 'yes';
    if (normalized === 'false' || normalized === 'f') return 'no';
    return normalized;
  }, []);

  const matchesBranch = useCallback(
    (commandResfil: string | undefined, activeBranch: string | null): boolean => {
      if (!commandResfil || commandResfil.trim() === '') {
        return true;
      }

      if (!activeBranch) {
        return false;
      }

      const tokens = commandResfil
        .toLowerCase()
        .split(/[|,\s]+/)
        .map((token) => normalizeBranchToken(token.trim()))
        .filter((token): token is string => Boolean(token));
      return tokens.includes(activeBranch);
    },
    [normalizeBranchToken],
  );

  const promptQuestionBranch = useCallback(
    (questionTitle: string, questionMessage: string): Promise<string> => {
      return new Promise((resolve) => {
        let resolved = false;
        const resolveOnce = (value: 'yes' | 'no') => {
          if (resolved) return;
          resolved = true;
          resolve(value);
        };

        dialogStore.onOpenDialog({
          title: questionTitle || 'Confirm',
          message: questionMessage,
          messageType: 'question',
          dialogType: 'yesno',
          onYes: () => resolveOnce('yes'),
          onNo: () => resolveOnce('no'),
          onCancel: () => resolveOnce('no'),
          onClose: () => resolveOnce('no'),
        });
      });
    },
    [dialogStore],
  );

  /**
   * Modal state for dialog-based modals
   * (Similar to NEWWINDOW but opens MUI Dialog instead of browser window)
   */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    url: string;
    width?: string;
    height?: string;
    xmlDetail?: unknown;
    xmlFileName?: string;
    browserCommands?: BrowserCommand[];
  } | null>(null);

  /**
   * Handle modal close with deferred navigation support
   *
   * Deferred Navigation Pattern (Modal Chains):
   * - Modal A closes and returns { action: 'OPEN_MODAL_B', nodeKey: '123' }
   * - smartNavigate triggers navigation API call
   * - Response has frame="MODAL" → Modal B opens
   * - Process repeats for Modal B → Modal C → etc.
   *
   * This mirrors VBScript SetNextAction/ExecuteAction pattern (line 3111-3116)
   */
  const handleModalClose = useCallback(
    (deferredNavigation?: { action: string; nodeKey?: string }) => {
      logger.info('[MODAL] Modal closing', { deferredNavigation });

      // Close dialog
      setModalOpen(false);
      setModalConfig(null);

      // Handle deferred navigation (modal chains)
      if (deferredNavigation) {
        logger.info('[MODAL] Executing deferred navigation', {
          action: deferredNavigation.action,
          nodeKey: deferredNavigation.nodeKey,
        });

        // Navigate to current route with new action/nodeKey (may open another modal)
        smartNavigate(location.pathname, {
          action: deferredNavigation.action as ActionType,
          nodeKey: deferredNavigation.nodeKey || null,
        });
      } else {
        logger.info('[MODAL] Normal close - no deferred navigation');
      }

      // TODO: Clear modalCommand from context (currently relies on next navigation)
    },
    [smartNavigate, location.pathname],
  );

  // Build command handlers with all necessary dependencies
  const handlers = useMemo(() => {
    logger.debug('Building command handlers with dependencies');
    return new CommandHandlerBuilder()
      .withFormMethods(formMethods)
      .withSmartNavigate(smartNavigate)
      .withDialogStore(dialogStore)
      .withGlobalVariableStore(globalVariableStore)
      .withPubSub(pubSub)
      .withModalCloseCallback(handleModalClose)
      .build();
  }, [formMethods, smartNavigate, dialogStore, globalVariableStore, handleModalClose]);

  const executeCommandBatch = useCallback(
    async (commands: BrowserCommand[]): Promise<CommandResult[]> => {
      const results: CommandResult[] = [];
      let activeBranch: string | null = null;

      for (const command of commands) {
        const normalizedVerb = command.verb.trim().replace(/[\s-]+/g, '_').toUpperCase();

        if (!matchesBranch(command.resfil, activeBranch)) {
          logger.debug('[CommandFlow] Skipping command due to resfil mismatch', {
            verb: command.verb,
            noun: command.noun,
            resfil: command.resfil,
            activeBranch,
          });
          continue;
        }

        if (normalizedVerb === 'DISPLAY_QUESTION') {
          activeBranch = await promptQuestionBranch(command.noun, command.addinf);
          logger.info('[CommandFlow] DISPLAY_QUESTION branch selected', {
            selectedBranch: activeBranch,
            noun: command.noun,
          });
          results.push({ success: true, verb: command.verb, noun: command.noun });
          continue;
        }

        if (normalizedVerb === 'CALL_SERVER') {
          const requestedCallType =
            normalizeBranchToken(command.addinf) || activeBranch || 'post';

          logger.info('[CommandFlow] CALL_SERVER follow-up requested', {
            requestedCallType,
            noun: command.noun,
            resfil: command.resfil,
          });

          pubSub.emit('command:call-server-requested', {
            callType: requestedCallType,
            sourceCommand: command,
          });
          results.push({ success: true, verb: command.verb, noun: command.noun });
          continue;
        }

        const result = await handlers.execute(command);
        results.push(result);
      }

      return results;
    },
    [handlers, matchesBranch, normalizeBranchToken, promptQuestionBranch],
  );

  // Memoized command processing function to prevent recreation on every render
  const processPendingCommandsCallback = useCallback(async () => {
    logger.info('Processing pending commands', { count: store.pendingCommands.length });
    setStore({ isExecuting: true });

    try {
      const commands = [...store.pendingCommands];
      setStore({ pendingCommands: [] });

      const results = await executeCommandBatch(commands);
      const executedCommands = [...store.executedCommands, ...results];
      const trimmedHistory =
        executedCommands.length > store.maxHistorySize
          ? executedCommands.slice(-store.maxHistorySize)
          : executedCommands;

      setStore({ executedCommands: trimmedHistory });

      logger.info('Finished processing pending commands');
    } finally {
      setStore({ isExecuting: false });
    }
  }, [
    executeCommandBatch,
    store.pendingCommands,
    store.executedCommands,
    store.maxHistorySize,
    setStore,
  ]);

  // Subscribe to command execution events for logging
  useEffect(() => {
    const unsubscribeExecuted = pubSub.subscribe('command:executed', (data) => {
      logger.debug('Command executed via pubSub', data);
    });

    const unsubscribeError = pubSub.subscribe('command:error', (data) => {
      logger.error('Command error via pubSub', data.error, { command: data.command });
    });

    return () => {
      unsubscribeExecuted();
      unsubscribeError();
    };
  }, []);

  // Process pending commands queue (optimized with memoized callback)
  useEffect(() => {
    if (store.pendingCommands.length > 0 && !store.isExecuting) {
      processPendingCommandsCallback();
    }
  }, [store.pendingCommands.length, store.isExecuting, processPendingCommandsCallback]);

  /**
   * Ref to track the last URL opened via NEWWINDOW.
   * Prevents the same URL from being opened multiple times due to re-renders.
   */
  const lastOpenedUrlRef = useRef<string | null>(null);

  /**
   * Handle NEWWINDOW commands
   * Opens new browser window when windowCommand detected in context
   * Matches legacy VBScript window.open() pattern (line 1684)
   *
   * Guards against infinite popup loops:
   * 1. Popup-context guard: If window.opener exists AND target URL matches current window, skip
   * 2. Dedup guard: If same URL was already opened (lastOpenedUrlRef), skip
   */
  useEffect(() => {
    const windowCmd = navContext?.windowCommand;

    if (!windowCmd) return;

    logger.info('[NEWWINDOW] Window command detected', {
      url: windowCmd.url,
      frame: windowCmd.frame,
      width: windowCmd.width,
      height: windowCmd.height,
    });

    const rawTargetUrl = windowCmd.url;

    // Resolve session information (supports object + legacy array formats)
    const sessionInfo = getItem<SessionInfo | Record<string, unknown> | string[]>(
      'sessionInformation',
    );

    console.log('[DEBUG] 📘 NEW WINDOW OPENING');
    console.log('[DEBUG] Reading from localStorage.sessionInformation:', sessionInfo);

    let sessionAction = '';
    let sessionNodeKey = '';
    let sessionPolicyId = '0';
    let sessionXmlDetail = '';

    if (Array.isArray(sessionInfo)) {
      sessionPolicyId = String(sessionInfo[2] ?? '0');
      sessionNodeKey = String(sessionInfo[3] ?? '');
      sessionAction = String(sessionInfo[4] ?? '');
      sessionXmlDetail = String(sessionInfo[6] ?? '');
    } else if (sessionInfo && typeof sessionInfo === 'object') {
      const sessionRecord = sessionInfo as Record<string, unknown>;
      sessionPolicyId = String(
        sessionRecord.policyId ?? sessionRecord.policyID ?? sessionRecord.PolicyId ?? '0',
      );
      sessionNodeKey = String(sessionRecord.nodeKey ?? sessionRecord.NodeKey ?? '');
      sessionAction = String(sessionRecord.action ?? sessionRecord.Action ?? '');
      sessionXmlDetail = String(
        sessionRecord.sessionXml ??
          sessionRecord.xmlDetail ??
          sessionRecord.SessionXml ??
          '',
      );
    }

    console.log('[DEBUG] Extracted from sessionInfo:');
    console.log('[DEBUG]   - action:', sessionAction);
    console.log('[DEBUG]   - policyId:', sessionPolicyId);
    console.log('[DEBUG]   - nodeKey:', sessionNodeKey);
    console.log('[DEBUG] ⟪?⟫');

    // Determine followup action:
    // 1. If windowCmd has followupAction (from execute-action), use it
    // 2. Otherwise, look up postWindowAction from action-config based on current sessionAction
    // 3. Fall back to current sessionAction (legacy behavior)
    let followupAction = windowCmd.followupAction?.action?.trim() || '';

    if (!followupAction && sessionAction) {
      const actionConfig = getActionConfig(sessionAction);
      if (actionConfig?.postWindowAction?.action) {
        followupAction = actionConfig.postWindowAction.action;
        logger.info('[NEWWINDOW] Using postWindowAction from action-config', {
          currentAction: sessionAction,
          followupAction,
        });
      } else {
        followupAction = sessionAction.trim();
        logger.warn('[NEWWINDOW] No postWindowAction configured, using current action', {
          currentAction: sessionAction,
        });
      }
    }

    const nodeKey = windowCmd.followupAction?.nodeKey?.trim() || sessionNodeKey.trim() || '';
    const policyIdFromFollowup = windowCmd.followupAction?.policyId?.trim() || '';
    const policyId =
      sessionPolicyId.trim() ||
      (policyIdFromFollowup && policyIdFromFollowup !== '{{DYNAMIC}}'
        ? policyIdFromFollowup
        : '0');
    const xmlDetail =
      sessionXmlDetail.trim() || windowCmd.followupAction?.xmlDetail?.trim() || '';

    // Build popup URL using catch-all route pattern: /form/:aspFileName/:policyId?
    let aspFileName = '';
    try {
      const parsed = new URL(rawTargetUrl, window.location.origin);
      const segments = parsed.pathname.split('/').filter(Boolean);
      aspFileName =
        segments[0] === 'form' && segments[1]
          ? segments[1]
          : segments[segments.length - 1] || '';
    } catch {
      const segments = rawTargetUrl.split('?')[0].split('/').filter(Boolean);
      aspFileName = segments[segments.length - 1] || '';
    }

    const popupQueryParams = new URLSearchParams();
    popupQueryParams.set('action', followupAction);
    popupQueryParams.set('nodeKey', nodeKey);
    popupQueryParams.set('policyId', policyId);

    if (xmlDetail) {
      popupQueryParams.set('xmlDetail', xmlDetail);
    }

    const targetUrl = aspFileName
      ? `/form/${aspFileName}/${policyId}?${popupQueryParams.toString()}`
      : rawTargetUrl;

    console.log('[DEBUG] ==========================================');
    console.log('[DEBUG] 🔗 NEW WINDOW URL BUILT');
    console.log('[DEBUG] ==========================================');
    console.log('[DEBUG] ASP Filename:', aspFileName);
    console.log('[DEBUG] Policy ID:', policyId);
    console.log('[DEBUG] Action (followup):', followupAction);
    console.log('[DEBUG] Node Key:', nodeKey);
    console.log('[DEBUG] Final URL:', targetUrl);
    console.log('[DEBUG] ==========================================');

    // --- Guard 1: Popup-context guard ---
    // If this window was opened by another window (window.opener exists),
    // AND the target URL matches our current location, we're inside a popup
    // that is trying to re-open itself. Skip to prevent infinite loop.
    const currentPathAndSearch = window.location.pathname + window.location.search;
    if (window.opener && targetUrl === currentPathAndSearch) {
      logger.warn(
        '[NEWWINDOW] Popup-context guard: skipping — target matches current popup URL',
        {
          targetUrl,
          currentPathAndSearch,
        },
      );
      return;
    }

    // --- Guard 2: Dedup guard ---
    // If we already opened this exact URL, don't open it again.
    // Prevents re-render cycles from spawning duplicate windows.
    if (lastOpenedUrlRef.current === targetUrl) {
      logger.warn('[NEWWINDOW] Dedup guard: skipping — already opened this URL', {
        targetUrl,
      });
      return;
    }

    // Build features string (like legacy VBScript)
    const features = [
      `width=${windowCmd.width || 800}`,
      `height=${windowCmd.height || 600}`,
      'scrollbars=yes',
      'resizable=yes',
      'toolbar=no',
      'menubar=no',
      'location=no',
      'status=yes',
    ].join(',');

    // Generate unique window name (append policy/session ID to prevent conflicts)
    const timestamp = Date.now();
    const windowName = `AQS_Window_${policyId}_${timestamp}`;

    logger.info('[NEWWINDOW] Opening window', {
      url: targetUrl,
      windowName,
      features,
    });

    // Record URL before opening to prevent dedup race
    lastOpenedUrlRef.current = targetUrl;

    // Open window
    const newWindow = window.open(targetUrl, windowName, features);

    // Check if popup was blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      logger.error('[NEWWINDOW] Popup blocked by browser');

      // Show user-friendly message
      alert(
        'Pop-up blocked!\n\n' +
          'Please allow pop-ups for this site to open reports and external links.\n' +
          'Check your browser settings or address bar for the pop-up icon.',
      );
    } else {
      logger.info('[NEWWINDOW] Window opened successfully', { windowName });

      // Focus the new window
      try {
        newWindow.focus();
      } catch (e) {
        logger.warn('[NEWWINDOW] Could not focus window', e);
      }
    }
  }, [navContext?.windowCommand]);

  /**
   * Handle MODAL commands
   * Opens MUI Dialog when modalCommand detected in context
   * Matches legacy VBScript showModalDialog() pattern (line 1636)
   *
   * Key Difference from NEWWINDOW:
   * - NEWWINDOW: window.open() creates new browser window
   * - MODAL: MUI Dialog opens as overlay (parent URL unchanged)
   */
  useEffect(() => {
    const modalCmd = navContext?.modalCommand;
    let isActive = true;
    if (!modalCmd) return;

    // TODO ⟪missing lines 561-563 — not confidently resolved in photos (likely blank)⟫

    const openModalWithPageBuild = async () => {
      logger.info('[MODAL] Modal command detected', {
        url: modalCmd.url,
        frame: modalCmd.frame,
        width: modalCmd.width,
        height: modalCmd.height,
        hasXmlDetail: !!modalCmd.xmlDetail,
        commandCount: modalCmd.browserCommands?.length || 0,
      });

      const sessionInfo = getItem<SessionInfo>('sessionInformation');
      if (!sessionInfo) {
        logger.error('[MODAL] Session information not found for PageBuild');
        dialogStore.onOpenDialog({
          messageType: 'error',
          dialogType: 'ok',
          message: 'Session information not found. Please log in again.',
        });
        return;
      }

      // Extract and validate xmlDetail for PageBuild
      const xmlDetailForPageBuild =
        modalCmd.xmlDetail &&
        typeof modalCmd.xmlDetail === 'object' &&
        'items' in (modalCmd.xmlDetail as Record<string, unknown>)
          ? (modalCmd.xmlDetail as Parameters<typeof fetchPageBuild>[1])
          : undefined;

      const pageBuildSource = modalCmd.xmlFilePath || modalCmd.xmlFileName;

      const pageBuildResult = await fetchPageBuild(
        sessionInfo,
        xmlDetailForPageBuild,
        pageBuildSource,
      );

      if (!isActive) {
        return;
      }

      if (!pageBuildResult.status || !pageBuildResult.data) {
        logger.error('[MODAL] Failed to fetch PageBuild for modal', undefined, {
          xmlFileName: modalCmd.xmlFileName,
          xmlFilePath: modalCmd.xmlFilePath,
        });

        dialogStore.onOpenDialog({
          messageType: 'error',
          dialogType: 'ok',
          message: 'Failed to load modal configuration from server.',
        });
        return;
      }

      // Open modal dialog with PageBuild data from server
      setModalConfig({
        url: modalCmd.url,
        width: modalCmd.width || '600',
        height: modalCmd.height || '500',
        xmlDetail: pageBuildResult.data,
        xmlFileName: modalCmd.xmlFileName,
        browserCommands: modalCmd.browserCommands || [],
      });
      setModalOpen(true);

      logger.info('[MODAL] Modal dialog opened with PageBuild data');
    };
    void openModalWithPageBuild();

    return () => {
      isActive = false;
    };
  }, [navContext?.modalCommand, dialogStore]);

  /**
   * Handle browser commands from ModalDialog's XMLServerCall response
   */
  const handleBrowserCommands = useCallback(
    async (commands: BrowserCommand[]) => {
      logger.info('[MODAL] Processing browser commands from XMLServerCall', {
        commandCount: commands.length,
        verbs: commands.map((c) => c.verb),
      });

      // Add commands to pending queue for processing
      setStore({
        pendingCommands: [...store.pendingCommands, ...commands],
      });
    },
    [setStore, store.pendingCommands],
  );

  return (
    <>
      {children}

      {/* Modal Dialog - Opens WITHOUT changing parent URL */}
      {modalOpen && modalConfig && (
        <ModalDialog
          open={modalOpen}
          url={modalConfig.url}
          /**
           * TODO: The width/height comes from legacy modalCommand which is based on old VBScript
           * Size is now controlled via MUI dialong breakpoints for better responsiveness, Website
           * hints in modalConfig for legacy support if needed
           */
          // width={modalConfig.width}
          // height={modalConfig.height}
          xmlDetail={modalConfig.xmlDetail}
          xmlFileName={modalConfig.xmlFileName}
          browserCommands={modalConfig.browserCommands}
          onClose={handleModalClose}
          onBrowserCommands={handleBrowserCommands}
        />
      )}
    </>
  );
};

/**
 * Browser Commands Provider wrapper (provides store context)
 */
const BrowserCommandsProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider>
      <BrowserCommandsProviderInternal>{children}</BrowserCommandsProviderInternal>
    </Provider>
  );
};

// ----------------------------------------
// Custom Hook for Command Operations
// ----------------------------------------

export interface UseBrowserCommandsStoreReturnType {
  /**
   * Execute a single browser command immediately
   * @param command - The command to execute
   * @returns Promise resolving to the command result
   */
  executeCommand: (command: BrowserCommand) => Promise<CommandResult>;

  /**
   * Execute multiple browser commands sequentially
   * @param commands - Array of commands to execute in order
   * @returns Promise resolving when all commands complete
   */
  executeCommands: (commands: BrowserCommand[]) => Promise<void>;

  /**
   * Add a command to the queue for asynchronous execution
   * @param command - The command to queue
   */
  queueCommand: (command: BrowserCommand) => void;

  /**
   * Add multiple commands to the queue
   * @param commands - Array of commands to queue
   */
  queueCommands: (commands: BrowserCommand[]) => void;

  /**
   * Clear the execution history
   */
  clearHistory: () => void;

  /**
   * Get the current store state
   */
  state: BrowserCommandsStore;

  /**
   * Check if commands are currently being executed
   */
  isExecuting: boolean;

  /**
   * Get the number of pending commands
   */
  pendingCount: number;
}

/**
 * Hook to access browser commands store and operations.
 * Provides methods to execute commands, manage queue, and access state.
 *
 * @example
 * ```tsx
 * const {
 *   executeCommand,
 *   executeCommands,
 *   queueCommand,
 *   isExecuting,
 *   pendingCount
 * } = useBrowserCommandsStore();
 *
 * // Execute single command immediately
 * await executeCommand({ verb: 'SET_TEXT', noun: 'FIELD1', addinf: 'value' });
 *
 * // Execute multiple commands sequentially
 * await executeCommands([
 *   { verb: 'SET_TEXT', noun: 'FIELD1', addinf: 'value1' },
 *   { verb: 'LOAD_COMBO', noun: 'FIELD2', addinf: '<xml>...</xml>' },
 * ]);
 *
 * // Queue command for async execution
 * queueCommand({ verb: 'NAVIGATE', noun: 'dashboard', addinf: '' });
 * ```
 */
export function useBrowserCommandsStore(): UseBrowserCommandsStoreReturnType {
  const { store, setStore } = useStore((store) => store);
  const formMethods = useFormMethods();
  const { smartNavigate } = useSmartNavigation();
  const dialogStore = useDialogStore();
  const globalVariableStore = useGlobalVariableStore();

  // Build handlers within the hook to ensure fresh context
  const handlers = useMemo(
    () =>
      new CommandHandlerBuilder()
        .withFormMethods(formMethods)
        .withSmartNavigate(smartNavigate)
        .withDialogStore(dialogStore)
        .withGlobalVariableStore(globalVariableStore)
        .withPubSub(pubSub)
        .build(),
    [formMethods, smartNavigate, dialogStore, globalVariableStore],
  );

  const normalizeBranchToken = useCallback((value: string | undefined): string | null => {
    if (!value) return null;
    const normalized = value.trim().toLowerCase();
    if (!normalized) return null;
    if (normalized === 'y') return 'yes';
    if (normalized === 'n') return 'no';
    if (normalized === '1') return 'yes';
    if (normalized === '0') return 'no';
    if (normalized === 'true' || normalized === 't') return 'yes';
    if (normalized === 'false' || normalized === 'f') return 'no';
    return normalized;
  }, []);

  const matchesBranch = useCallback(
    (commandResfil: string | undefined, activeBranch: string | null): boolean => {
      if (!commandResfil || commandResfil.trim() === '') {
        return true;
      }

      if (!activeBranch) {
        return false;
      }

      const tokens = commandResfil
        .toLowerCase()
        .split(/[|,\s]+/)
        .map((token) => normalizeBranchToken(token.trim()))
        .filter((token): token is string => Boolean(token));

      return tokens.includes(activeBranch);
    },
    [normalizeBranchToken],
  );

  const promptQuestionBranch = useCallback(
    (questionTitle: string, questionMessage: string): Promise<string> => {
      return new Promise((resolve) => {
        let resolved = false;
        const resolveOnce = (value: 'yes' | 'no') => {
          if (resolved) return;
          resolved = true;
          resolve(value);
        };

        dialogStore.onOpenDialog({
          title: questionTitle || 'Confirm',
          message: questionMessage,
          messageType: 'question',
          dialogType: 'yesno',
          onYes: () => resolveOnce('yes'),
          onNo: () => resolveOnce('no'),
          onCancel: () => resolveOnce('no'),
          onClose: () => resolveOnce('no'),
        });
      });
    },
    [dialogStore],
  );

  const executeCommandBatch = useCallback(
    async (commands: BrowserCommand[]): Promise<CommandResult[]> => {
      const results: CommandResult[] = [];
      let activeBranch: string | null = null;

      for (const command of commands) {
        const normalizedVerb = command.verb.trim().replace(/[\s-]+/g, '_').toUpperCase();

        if (!matchesBranch(command.resfil, activeBranch)) {
          logger.debug('[CommandFlow] Skipping command due to resfil mismatch', {
            verb: command.verb,
            noun: command.noun,
            resfil: command.resfil,
            activeBranch,
          });
          continue;
        }

        if (normalizedVerb === 'DISPLAY_QUESTION') {
          activeBranch = await promptQuestionBranch(command.noun, command.addinf);
          results.push({ success: true, verb: command.verb, noun: command.noun });
          continue;
        }

        if (normalizedVerb === 'CALL_SERVER') {
          const requestedCallType =
            normalizeBranchToken(command.addinf) || activeBranch || 'post';

          pubSub.emit('command:call-server-requested', {
            callType: requestedCallType,
            sourceCommand: command,
          });
          continue;
        }
        // TODO ⟪?⟫ — IMG_3089 (low confidence) shows this region as follows; condition on
        // this line was illegible/possibly a ghosting artifact, transcribed verbatim below:
        results.push({ success: true, verb: command.verb, noun: command.noun });
        continue;
        const result = await handlers.execute(command);
        results.push(result);
      }

      return results;
    },
    [handlers, matchesBranch, normalizeBranchToken, promptQuestionBranch],
  );

  /**
   * Execute a single command immediately
   */
  const executeCommand = useCallback(
    async (command: BrowserCommand): Promise<CommandResult> => {
      logger.debug('Executing command immediately', {
        verb: command.verb,
        noun: command.noun,
      });

      // Add to commands history
      const newCommands = [...store.commands, command].slice(-store.maxHistorySize);
      setStore({ commands: newCommands });

      setStore({ isExecuting: true });

      try {
        const result = await handlers.execute(command);

        // Add to executed history
        const executedCommands = [...store.executedCommands, result];
        const trimmedHistory =
          executedCommands.length > store.maxHistorySize
            ? executedCommands.slice(-store.maxHistorySize)
            : executedCommands;

        setStore({
          executedCommands: trimmedHistory,
          isExecuting: false,
        });

        logger.info('Command executed immediately', {
          success: result.success,
          verb: result.verb,
        });
        return result;
      } catch (error) {
        logger.error('Error executing command immediately', error as Error, { command });

        setStore({ isExecuting: false });

        const errorResult: CommandResult = {
          success: false,
          error: error as Error,
          verb: command.verb,
          noun: command.noun,
        };

        // Still add to history even if failed
        const executedCommands = [...store.executedCommands, errorResult].slice(
          -store.maxHistorySize,
        );
        setStore({ executedCommands });

        return errorResult;
      }
    },
    [handlers, setStore, store.commands, store.executedCommands, store.maxHistorySize],
  );

  /**
   * Execute multiple commands sequentially
   */
  const executeCommands = useCallback(
    async (commands: BrowserCommand[]): Promise<void> => {
      if (commands.length === 0) {
        logger.warn('executeCommands called with empty array');
        return;
      }

      logger.info('[BrowserCommandsProvider] Executing multiple commands sequentially', {
        count: commands.length,
        commands: commands.map((c) => `${c.verb}:${c.noun}`),
      });

      const newCommands = [...store.commands, ...commands].slice(-store.maxHistorySize);
      setStore({
        commands: newCommands,
        isExecuting: true,
      });

      try {
        const results = await executeCommandBatch(commands);
        const executedCommands = [...store.executedCommands, ...results];
        const trimmedHistory =
          executedCommands.length > store.maxHistorySize
            ? executedCommands.slice(-store.maxHistorySize)
            : executedCommands;

        setStore({ executedCommands: trimmedHistory });
      } finally {
        setStore({ isExecuting: false });
      }
    },
    [executeCommandBatch, setStore, store.commands, store.executedCommands, store.maxHistorySize],
  );

  /**
   * Queue a single command for asynchronous execution
   */
  const queueCommand = useCallback(
    (command: BrowserCommand): void => {
      logger.debug('Queueing command for async execution', {
        verb: command.verb,
        noun: command.noun,
      });
      const newCommands = [...store.commands, command].slice(-store.maxHistorySize);
      const newPendingCommands = [...store.pendingCommands, command];
      setStore({
        commands: newCommands,
        pendingCommands: newPendingCommands,
      });
    },
    [setStore, store.commands, store.pendingCommands, store.maxHistorySize],
  );

  /**
   * Queue multiple commands for asynchronous execution
   */
  const queueCommands = useCallback(
    (commands: BrowserCommand[]): void => {
      if (commands.length === 0) return;

      logger.info('Queueing multiple commands for async execution', {
        count: commands.length,
      });
      const newCommands = [...store.commands, ...commands].slice(-store.maxHistorySize);
      const newPendingCommands = [...store.pendingCommands, ...commands];
      setStore({
        commands: newCommands,
        pendingCommands: newPendingCommands,
      });
    },
    [setStore, store.commands, store.pendingCommands, store.maxHistorySize],
  );

  /**
   * Clear the execution history (keep pending commands)
   */
  const clearHistory = useCallback((): void => {
    setStore({
      commands: [],
      executedCommands: [],
    });
  }, [setStore]);

  return {
    executeCommand,
    executeCommands,
    queueCommand,
    queueCommands,
    clearHistory,
    state: store,
    isExecuting: store.isExecuting,
    pendingCount: store.pendingCommands.length,
  };
}

// ----------------------------------------
// Exports
// ----------------------------------------

export { BrowserCommandsProvider };
