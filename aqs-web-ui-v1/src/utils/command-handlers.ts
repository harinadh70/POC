import type { UseFormReturn } from 'react-hook-form';
import type { BrowserCommand, ComboItem, CommandResult } from '@/types';
import type { GlobalVariableStore } from '@/types';
import type { MessageType } from '@components/dialog';
import type { SmartNavigateFunction } from '@hooks/use-smart-navigation';
import type { FormStoreMethods } from '@providers/form-provider';

import { pubSub } from '@utils/pub-sub';
import { createFeatureLogger } from '@utils/logger-builder';
import { buildCyclingUrl } from '@utils/build-cycling-url';
import { getItem, setItem } from '@utils/local-storage';
import { setPendingXmlDetail } from '@utils/xml-detail-persistence';
import { parseComboItems } from '@utils/parse-combo-items';
import { createElement } from 'react';
import { InfoXmlContent } from '@components/info-xml-content';
import { canRenderInfoXmlTable } from '@utils/parse-info-xml';

// Create logger for command handlers
const logger = createFeatureLogger('commands', 'CommandHandlerBuilder');

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

/**
 * Dialog store interface for showing messages and dialogs.
 * Aligns with dialog-provider.tsx DialogStore interface.
 */
export interface DialogStore {
    onOpenDialog: (options: {
        message: React.ReactNode;
        messageType?: MessageType;
        dialogType?: 'ok' | 'yesno' | 'yesnocancel';
        title?: string;
        onOk?: () => void;
        onYes?: () => void;
        onNo?: () => void;
        onCancel?: () => void;
    }) => void;
    onCloseDialog: () => void;
}

/**
 * Configuration for command handler dependencies.
 */
interface CommandHandlerConfig {
    formMethods?: UseFormReturn<any> & FormStoreMethods;
    smartNavigate?: SmartNavigateFunction;
    dialogStore?: DialogStore;
    globalVariableStore?: GlobalVariableStore;
    pubSub?: typeof pubSub;
    modalCloseCallback?: (deferredNavigation?: {
        action: string;
        nodeKey?: string;
        policyId?: string;
    }) => void;
}

/**
 * Command handlers object containing individual handler functions.
 */
interface CommandHandlers {
  execute: (command: BrowserCommand) => Promise<CommandResult>;
}

// ------------------------------------------
// Helper Functions
// ------------------------------------------

/**
 * Parses XML string to extract combo items for dropdown population.
 * Expected XML format:
 * ```xml
 * <items>
 *   <item value="1" label="Option 1" selected="true" />
 *   <item value="2" label="Option 2" />
 * </items>
 * ```
 */
function parseComboXml(xml: string): ComboItem[] {
  if (!xml || xml.trim() === '') {
    logger.debug('Empty XML provided to parseComboXml');
    return [];
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');

    const items = doc.querySelectorAll('item');
    const parsedItems = Array.from(items).map((item) => ({
      value: item.getAttribute('value') || '',
      label: item.getAttribute('label') || item.getAttribute('text') || '',
      selected: item.getAttribute('selected') === 'true',
      disabled: item.getAttribute('disabled') === 'true',
    }));
    logger.debug('Parsed combo XML', { itemCount: parsedItems.length });
    return parsedItems;
  } catch (error) {
    logger.error('Error parsing combo XML', error as Error, { xml: xml.substring(0, 200) });
    return [];
  }
}

/**
 * Parses addinf string to extract message and type for dialog display.
 * Expected format: "type|message" or just "message"
 * Types: information, warning, error, question
 */
function parseMessageInfo(addinf: string): {
  message: string;
  messageType: MessageType;
  dialogType: 'ok' | 'yesno' | 'yesnocancel';
} {
  const { normalizedMessage, suffixMessageType, suffixDialogType } =
    normalizeLegacyMessagePayload(addinf);

  const parts = normalizedMessage.split('|');

  let messageType: MessageType = 'information';
  let dialogType: 'ok' | 'yesno' | 'yesnocancel' = 'ok';
  let message = normalizedMessage;

  if (parts.length > 1) {
    const typeStr = parts[0].toLowerCase();
    message = parts.slice(1).join('|');

    // Map type string to MessageType
    if (typeStr === 'warning' || typeStr === 'warn') {
      messageType = 'warning';
    } else if (typeStr === 'error' || typeStr === 'err') {
      messageType = 'error';
    } else if (typeStr === 'question' || typeStr === 'confirm') {
      messageType = 'question';
      dialogType = 'yesno';
    } else {
      messageType = 'information';
    }
  } else if (suffixMessageType) {
    messageType = suffixMessageType;
    dialogType = suffixDialogType;
  }
  return { message, messageType, dialogType };

}

function normalizeLegacyMessagePayload(addinf: string): {
  normalizedMessage: string;
  suffixMessageType?: MessageType;
  suffixDialogType: 'ok' | 'yesno' | 'yesnocancel';
} {
  if (!addinf) {
    return {
      normalizedMessage: '',
      suffixDialogType: 'ok',
    };
  }
  const decodedBreaks = addinf.replace(/&lt;\s*\/?\s*br\s*\/?\s*&gt;/gi, '\n');
  const normalizedBreaks = decodedBreaks
    .replace(/<\s*\/?\s*br\s*\/?\s*>/gi, '\n')
    .replace(/\r\n?/g, '\n');


  const suffixMatch = normalizedBreaks.match(
    /\s*##\s*(INFORMATION|WARNING|ERROR|QUESTION|CONFIRM)\s*$/i,
  );

  let suffixMessageType: MessageType | undefined;
  let suffixDialogType: 'ok' | 'yesno' | 'yesnocancel' = 'ok';
  let withoutSuffix = normalizedBreaks;

  if (suffixMatch?.index !== undefined) {
    withoutSuffix = normalizedBreaks.slice(0, suffixMatch.index);
    const marker = suffixMatch[1].toLowerCase();
    if (marker === 'warning') {
      suffixMessageType = 'warning';
    } else if (marker === 'error') {
      suffixMessageType = 'error';
    } else if (marker === 'question' || marker === 'confirm') {
      suffixMessageType = 'question';
      suffixDialogType = 'yesno';
    } else {
      suffixMessageType = 'information';
⟪?⟫
    }
  }

  const normalizedMessage = withoutSuffix
    .split('\n')
    .map((line) => line.replace(/\t+/g, ' ').replace(/ {2,}/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

   return {
       normalizedMessage,
       suffixMessageType,
       suffixDialogType,
   };
}

/**
 * Parses navigation target and extracts path and query parameters.
 * Supports formats:
 * - "route-name"
 * - "route-name?param1=value1&param2=value2"
 * - "/absolute/path"
 */
function parseNavigationTarget(addinf: string): { path: string; search?: string } {
   if (!addinf) {
       return { path: '/' };
   }

   const [path, queryString] = addinf.split('?');
   return {
       path: path || '/',
       search: queryString ? `?${queryString}` : undefined,
   };
}

function normalizeCommandVerb(verb: string): string {
   return verb
       .trim()
       .replace(/[\s-]+/g, '_')
       .toUpperCase();
}

function isXmlPayload(payload: string): boolean {
   return canRenderInfoXmlTable(payload);
}

function looksLikeInformationalXml(payload: string): boolean {
   if (!payload || payload.trim() === '') {
       return false;
   }

   const infoXmlTagPattern =
       /(?:<|&lt;)\s*\/?\s*(?:effdaterates|taxinfo|item|header|exception)\b/i;

   return infoXmlTagPattern.test(payload);
}
// ------------------------------------------------------------------------
// Command Handler Builder Class
// ------------------------------------------------------------------------

/**
 * Command Handler Builder Class
 * Builder Pattern class for constructing command handlers.
 * Provides a fluent API for configuring dependencies before building
 * the final command execution handler.
 * @example
 * ```typescript
 * const handlers = new CommandHandlerBuilder()
 *   .withFormMethods(formMethods)
 *   .withSmartNavigate(smartNavigate)
    * .withSmartNavigate(smartNavigate)
    * .withDialogStore(dialogStore)
    * .withPubSub(pubSub)
    * .build();
    *
    * await handlers.execute(browserCommand);
    * ```
    */
export class CommandHandlerBuilder {
   private config: CommandHandlerConfig = {};

   /**
    * Sets the react-hook-form methods for form field manipulation.
    * Required for: SET_TEXT, SET_DISABLED, SET_REQUIRED, LOAD_COMBO, CLEAR_COMBO
    */
   withFormMethods(formMethods: UseFormReturn<any> & FormStoreMethods): this {
       this.config.formMethods = formMethods;
       return this;
   }

   /**
    * Sets the smart navigate function for navigation commands.
    * Required for: NAVIGATE, NAVIGATE_CYCLING, REFRESH_PAGE
    */
   withSmartNavigate(smartNavigate: SmartNavigateFunction): this {
       this.config.smartNavigate = smartNavigate;
       return this;
   }

   /**
    * Sets the dialog store for message display commands.
    * Required for: DISPLAY_MESSAGE, DISPLAY_ERROR, DISPLAY_WARNING, DISPLAY_QUESTION
    */
   withDialogStore(dialogStore: DialogStore): this {
       this.config.dialogStore = dialogStore;
       return this;
   }

   /**
    * Sets the global variable store for SET_VARIABLE commands.
    * Required for: SET_VARIABLE
    */
   withGlobalVariableStore(globalVariableStore: GlobalVariableStore): this {
       this.config.globalVariableStore = globalVariableStore;
       return this;
   }

   /**
    * Sets the PubSub instance for event emission.
    * Optional but recommended for debugging and inter-component communication.
    */
   withPubSub(pubSubInstance: typeof pubSub): this {
       this.config.pubSub = pubSubInstance;
       return this;
   }

   /**
    * Sets the modal close callback for CLOSE_MODAL command.
    * Required for: CLOSE_MODAL
    */
    withModalCloseCallback(
        callback: (deferredNavigation?: {
            action: string;
            nodeKey?: string;
            policyId?: string;
        }) => void,
    ): this {
        this.config.modalCloseCallback = callback;
        return this;
    }

    /**
     * Builds and returns the command handlers object with execute method.
     * Call this after configuring all necessary dependencies.
     */
    build(): CommandHandlers {
        const config = this.config;
        logger.debug('Building command handlers', {
            hasFormMethods: !!config.formMethods,
            hasSmartNavigate: !!config.smartNavigate,
            hasDialogStore: !!config.dialogStore,
            hasGlobalVariableStore: !!config.globalVariableStore,
            hasPubSub: !!config.pubSub,
        });

        return {
        execute: async (command: BrowserCommand): Promise<CommandResult> => {
                const { verb, noun, addinf } = command;
                const normalizedVerb = normalizeCommandVerb(verb);

                console.log('===Executing_command===', { verb, noun, addinf: addinf });

                logger.debug('Executing command', {
                    verb: normalizedVerb,
                    noun,
                    addinf: addinf?.substring(0, 100),
                });

                try {
                    // Route to specific handler based on verb
                    switch (normalizedVerb) {
                        // Field Updates
                        case 'SET_TEXT':
                            await handleSetText(config, noun, addinf);
                            break;
            case 'SET_VARIABLE':
                await handleSetVariable(config, noun, addinf);
                break;
            case 'SET_DISABLED':
                await handleSetDisabled(config, noun, addinf);
                break;
            case 'SET_REQUIRED':
                await handleSetRequired(config, noun, addinf);
                break;
            case 'SET_VISIBLE':
                await handleSetVisible(config, noun, addinf);
                break;
            case 'SET_READONLY':
                await handleSetReadOnly(config, noun, addinf);
                break;
            // Dropdown Commands
            case 'LOAD_COMBO':
                await handleLoadCombo(config, noun, addinf);
                break;
            case 'LOAD_COMBOS':
                await handleLoadCombos(config, noun, addinf);
                break;
            case 'CLEAR_COMBO':
                await handleClearCombo(config, noun);
                break;
            case 'CLEAR_ACTIONMENU':
                await handleClearActionMenu(config, noun, addinf);
                break;

            // Message Commands
            case 'DISPLAY_MESSAGE':
                await handleDisplayMessage(config, noun, addinf);
                break;
            case 'DISPLAY_ERROR':
                await handleDisplayError(config, noun, addinf);
                break;
            case 'DISPLAY_WARNING':
                await handleDisplayWarning(config, noun, addinf);
                break;
            case 'DISPLAY_QUESTION':
                await handleDisplayQuestion(config, noun, addinf);
                break;
            case 'DISPLAY_INFORMATION':
                console.log('[DISPLAY_INFORMATION] Case triggered', {
                    config,
                    noun,
                    location: 'switch-case',
                    addinf,
                });
                await handleDisplayInformation(config, noun, addinf);
                break;
            case 'DISPLAY_TAXCITY_INFORMATION':
                await handleDisplayInformation(
                    config,
                    noun,
                    addinf,
                    'DISPLAY_TAXCITY_INFORMATION',
                );
                break;

            // Navigation Commands
            case 'NAVIGATE':
                await handleNavigate(config, noun, addinf);
                break;
            case 'NAVIGATE_CYCLING':
                await handleNavigateCycling(config, noun, addinf);
                break;
            case 'OPEN_WINDOW':
                await handleOpenWindow(config, noun, addinf);
                break;
            case 'REFRESH_PAGE':
                await handleRefreshPage(config, noun, addinf);
                break;

            // Modal Commands
            case 'CLOSE_MODAL':
                await handleCloseModal(config, noun, addinf);
                break;

            default:
                logger.warn('Unknown command verb', { verb, noun });
                break;
            }

            // Success
            config.pubSub?.emit('command:executed', { matchcode: noun, value: addinf });
            return { success: true, verb, noun };
        } catch (err) {
            logger.error('Command execution failed', err as Error, {
                verb,
                noun,
                addinf,
            });
            config.pubSub?.emit('command:error', { error: err as Error, verb, noun });
            return {
                success: false,
                error: err as Error,
                verb,
                noun,
            };
        }

        },
    };
}
}

// ⟪?⟫

async function handleClearActionMenu(
    config: CommandHandlerConfig,
    noun: string,
    addinf: string,
): Promise<void> {
    console.log('CLEAR_ACTION_MENU', { noun, addinf, config });
    // Implement if needed, currently no standard way to identify action menus in our forms
}

/**
 * SET_TEXT: Updates form field value
 * @param noun - Field matchcode
 * @param addinf - New value to set
 */
async function handleSetText(
    config: CommandHandlerConfig,
    noun: string,
    addinf: string,
): Promise<void> {
    const value = addinf;

    logger.info('[handleSetText] Setting field value', {
        matchcode: noun,
        value: value?.substring(0, 50),
        hasFormMethods: !!config.formMethods,
    });
    console.log('[SET_TEXT_COMBO]', { noun, value, config });
    // Update via react-hook-form if available
    if (config.formMethods) {
        try {
            config.formMethods.setValue(noun, value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });
            logger.info('[handleSetText] ✅ setValue called successfully', {
                matchcode: noun,
                value: value?.substring(0, 30),
            });
        } catch (error) {
            logger.error('[handleSetText] ❌ setValue failed', error as Error, {
                matchcode: noun,
                value,
            });
            throw error;
    }
} else {
    logger.warn('[handleSetText] ⚠️ formMethods not available', { matchcode: noun });
}

// Emit event for backwards compatibility
config.pubSub?.emit('form:field-updated', { matchcode: noun, value });
}

/**
 * Parses SET_VARIABLE addinf values into primitive JavaScript values.
 *
 * Examples:
 * - '"488536"' => '488536'
 * - 'true' / 'False' / 'T' / 'F' => boolean
 * - '123' / '123.45' => number
 * - anything else => string
 */
function parseSetVariableValue(addinf: string): unknown {
    if (!addinf) {
        console.warn('[parseSetVariableValue] Empty addinf, returning empty string');
        return '';
    }

    const trimmed = addinf.trim();

    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        const unwrapped = trimmed.slice(1, -1);
        const unescaped = unwrapped
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\\\/g, '\\');

        // Trim whitespace for legacy right/left padded quoted values.
        return unescaped.trim();
    }

    const lower = trimmed.toLowerCase();
    if (lower === 'true' || trimmed === 'T') {
        return true;
    }

    if (lower === 'false' || trimmed === 'F') {
        return false;
    }

    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
        return Number(trimmed);
    }

    return trimmed;
}

/**
 * SET_VARIABLE: Sets a global variable accessible across the app.
 * @param noun - Variable name (e.g., mstrPolicyID, mstrTransactionType)
 * @param addinf - Variable value (may include quotes for strings)
 */
async function handleSetVariable(
    config: CommandHandlerConfig,
    noun: string,
    addinf: string,
): Promise<void> {
    if (!config.globalVariableStore) {
        throw new Error('GlobalVariableStore not configured for SET_VARIABLE command');
    }

    if (!noun || noun.trim() === '') {
        logger.error('SET_VARIABLE: Empty variable name', new Error('Empty noun'), {
            noun,
            addinf,
        });
        return; // Don't throw - allow other commands to continue
    }
    try {
        const value = parseSetVariableValue(addinf);
        config.globalVariableStore.setVariable(noun, value);

        logger.debug('SET_VARIABLE command executed', { noun, value });
        config.pubSub?.emit('global:variable-updated', { name: noun, value });
    } catch (error) {
        logger.error('SET_VARIABLE failed', error as Error, { noun, addinf });
        // Don't throw - allow other commands to continue
    }
}


/**
 * SET_DISABLED: Enables or disables a form field
 * @param noun - Field matchcode
 * @param addinf - "true" or "false" string ("T" or "F")
 */
async function handleSetDisabled(
    config: CommandHandlerConfig,
    noun: string,
    addinf: string,
): Promise<void> {
    const disabled = addinf.toLowerCase() === 'true' || addinf === '1' || addinf === 'T';

    logger.info('[handleSetDisabled] Setting field disabled state', {
        matchcode: noun,
        disabled,
        addinf,
    });

    // Update field metadata via form methods
  if (config.formMethods?.setFieldDisabled) {
    config.formMethods.setFieldDisabled(noun, disabled);
    logger.info('[handleSetDisabled] ✅ Field disabled state updated', {
      matchcode: noun,
      disabled,
    });
  } else {
    logger.warn('[handleSetDisabled] ⚠️ FormMethods not configured', {
      noun,
      disabled,
    });
  }

  // Emit event for backwards compatibility
  config.pubSub?.emit('form:field-updated', { matchcode: noun, value: { disabled } });
}

/**
 * SET_REQUIRED: Marks field as required or optional
 * @param noun - Field matchcode
 * @param addinf - "true" or "false" string ("T" or "F")
 */
async function handleSetRequired(
  config: CommandHandlerConfig,
  noun: string,
  addinf: string,
): Promise<void> {
  const required = addinf.toLowerCase() === 'true' || addinf === '1' || addinf === 'T';
  // Update field metadata via form methods
  if (config.formMethods?.setFieldRequired) {
    config.formMethods.setFieldRequired(noun, required);
    logger.debug('SET_REQUIRED command executed via form methods', { noun, required });
  } else {
    logger.warn('FormMethods not configured for SET_REQUIRED command', {
      noun,
      required,
    });
  }

  // Emit event for backwards compatibility
  config.pubSub?.emit('form:field-updated', { matchcode: noun, value: { required } });

}

/**
 * SET_VISIBLE: Shows or hides a form field
 * @param noun - Field matchcode
 * @param addinf - "true" or "false" string ("T" or "F")
 */
async function handleSetVisible(
  config: CommandHandlerConfig,
  noun: string,
  addinf: string,
): Promise<void> {
  const visible = addinf.toLowerCase() === 'true' || addinf === '1' || addinf === 'T';
  // Update field metadata via form methods
  if (config.formMethods?.setFieldVisible) {
    config.formMethods.setFieldVisible(noun, visible);
    logger.debug('SET_VISIBLE command executed via form methods', { noun, visible });
  } else {
    logger.warn('FormMethods not configured for SET_VISIBLE command', {
      noun,
      visible,
    });
  }

  // Emit event for backwards compatibility
  config.pubSub?.emit('form:field-updated', { matchcode: noun, value: { visible } });

}

/**
 * SET_READONLY: Makes field read-only or editable
 * @param noun - Field matchcode
 * @param addinf - "true" or "false" string ("T" or "F")
 */
async function handleSetReadOnly(
  config: CommandHandlerConfig,
  noun: string,
  addinf: string,
): Promise<void> {
  const readOnly = addinf.toLowerCase() === 'true' || addinf === '1' || addinf === 'T';
  // Update field metadata via form methods
  if (config.formMethods?.setFieldReadOnly) {
    config.formMethods.setFieldReadOnly(noun, readOnly);
    logger.debug('SET_READONLY command executed via form methods', { noun, readOnly });
  } else {
    logger.warn('FormMethods not configured for SET_READONLY command', {
      noun,
      readOnly,
    });
  }

  // Emit event for backwards compatibility
  config.pubSub?.emit('form:field-updated', { matchcode: noun, value: { readOnly } });

}

/**
 * LOAD_COMBO: Populates dropdown with options from XML
 * @param noun - Field matchcode
 * @param addinf - XML string with combo items
 */
async function handleLoadCombo(
  config: CommandHandlerConfig,
  noun: string,
  addinf: string,
): Promise<void> {
  if (!config.formMethods) {
    throw new Error('FormMethods not configured for LOAD_COMBO command');
  }

  const items = addinf?.trim().startsWith('<')
    ? parseComboXml(addinf)
    : parseComboItems(addinf).map((item) => ({
        value: item.value,
        label: item.label,
        selected: false,
        disabled: false,
      }));

  // Log parsed items for debugging (temporary)
  try {
    console.debug('[LOAD_COMBO] noun:', noun, 'parsedItemCount:', items.length);
    if (items.length > 0) {
      // show first few items to avoid huge logs
      console.debug('[LOAD_COMBO] sampleItems:', items.slice(0, 5));
    } else {
      console.debug('[LOAD_COMBO] no items parsed from addinf');
    }
  } catch (e) {
    // swallow logging errors
  }

  // Set runtime dropdown options via metadata API
  if (config.formMethods.setFieldOptions) {
    config.formMethods.setFieldOptions(noun, items);
  }

  // If there's a selected item, also set the value
  const selectedItem = items.find((item) => item.selected);
  if (selectedItem) {
    config.formMethods.setValue(`${noun}_value`, selectedItem.value, { shouldValidate: true });
  }

  config.pubSub?.emit('form:field-updated', { matchcode: noun, value: items });
}

/**
 * LOAD_COMBOS: Loads multiple combos at once
 * @param noun - Comma-separated field matchcodes
 * @param addinf - XML with multiple combo definitions
 */
async function handleLoadCombos(
  config: CommandHandlerConfig,
  noun: string,
  addinf: string,
): Promise<void> {
  if (!config.formMethods) {
    throw new Error('FormMethods not configured for LOAD_COMBOS command');
   }

   // Parse noun as comma-separated list
   const fields = noun.split(',').map((f) => f.trim());

   // Parse addinf as XML with multiple combo sections
   // Expected format: <combos><combo name="field1">...</combo><combo name="field2">...</combo></combos>
   try {
       const parser = new DOMParser();
       const doc = parser.parseFromString(addinf, 'text/xml');
       const combos = doc.querySelectorAll('combo');

       combos.forEach((combo) => {
           const comboName = combo.getAttribute('name');
           if (comboName && fields.includes(comboName)) {
               const items = parseComboXml(combo.innerHTML);
               try {
                   console.debug(
                       '[LOAD_COMBOS] comboName:',
                       comboName,
                       'parsedItemCount:',
                       items.length,
                   );
                   if (items.length > 0)
                       console.debug('[LOAD_COMBOS] sampleItems:', items.slice(0, 5));
               } catch {}
               if (config.formMethods?.setFieldOptions) {
                   config.formMethods.setFieldOptions(comboName, items);
               }
               config.pubSub?.emit('form:field-updated', { matchcode: comboName, value: items });
           }
       });
   } catch (error) {
       logger.error('Error parsing LOAD_COMBOS XML', error as Error, {
           noun,
           addinf: addinf.substring(0, 200),
       });
       throw error;
   }
}

/**
 * CLEAR_COMBO: Removes all options from dropdown
 * @param noun - Field matchcode
 */
async function handleClearCombo(config: CommandHandlerConfig, noun: string): Promise<void> {
   if (!config.formMethods) {
       throw new Error('FormMethods not configured for CLEAR_COMBO command');
   }

   try {
       console.debug('[CLEAR_COMBO] Clearing combo for', noun);
   } catch {}

   if (config.formMethods.clearFieldOptions) {
       config.formMethods.clearFieldOptions(noun);
   }
   config.formMethods.setValue(`${noun}_value`, '', { shouldValidate: false });
   config.formMethods.setValue(noun, '', { shouldValidate: false });
   config.pubSub?.emit('form:field-updated', { matchcode: noun, value: [] });
}

/**
 * DISPLAY_MESSAGE: Shows information dialog
 * @param noun - Dialog title (optional)
 * @param addinf - Message text or "type|message"
 */
async function handleDisplayMessage(
   config: CommandHandlerConfig,
   noun: string,
   addinf: string,
): Promise<void> {
   if (!config.dialogStore) {
       throw new Error('DialogStore not configured for DISPLAY_MESSAGE command');
   }

   const { message, messageType, dialogType } = parseMessageInfo(addinf);

   config.dialogStore.onOpenDialog({
       message: message.includes('\n')
           ? createElement('p', { style: { whiteSpace: 'pre-line' } }, message)
           : message,
       messageType,
       dialogType,
       title: noun || undefined,
   });

   config.pubSub?.emit('dialog:opened', { type: messageType });
}

/**
 * DISPLAY_ERROR: Shows error dialog
 * @param noun - Dialog title (optional)
 * @param addinf - Error message
 */
async function handleDisplayError(
   config: CommandHandlerConfig,
   noun: string,
   addinf: string,
): Promise<void> {
   if (!config.dialogStore) {
       throw new Error('DialogStore not configured for DISPLAY_ERROR command');
   }

   config.dialogStore.onOpenDialog({
       message: addinf,
       messageType: 'error',
       dialogType: 'ok',
       title: noun || 'Error',
   });

   config.pubSub?.emit('dialog:opened', { type: 'error' });
}

/**
 * DISPLAY_WARNING: Shows warning dialog
    * @param noun - Dialog title (optional)
    * @param addinf - Warning message
    */
async function handleDisplayWarning(
       config: CommandHandlerConfig,
       noun: string,
       addinf: string,
   ): Promise<void> {
       if (!config.dialogStore) {
           throw new Error('DialogStore not configured for DISPLAY_WARNING command');
       }

       config.dialogStore.onOpenDialog({
           message: addinf,
       messageType: 'warning',
       dialogType: 'ok',
       title: noun || 'Warning',
   });

   config.pubSub?.emit('dialog:opened', { type: 'warning' });
}

/**
 * DISPLAY_QUESTION: Shows confirmation dialog with Yes/No buttons
 * @param noun - Dialog title (optional)
 * @param addinf - Question text
 */
async function handleDisplayQuestion(
   config: CommandHandlerConfig,
   noun: string,
   addinf: string,
): Promise<void> {
   if (!config.dialogStore) {
       throw new Error('DialogStore not configured for DISPLAY_QUESTION command');
   }

   config.dialogStore.onOpenDialog({
       message: addinf,
       messageType: 'question',
       dialogType: 'yesno',
       title: noun || 'Confirm',
   });

   config.pubSub?.emit('dialog:opened', { type: 'question' });
}

/**
 * DISPLAY_INFORMATION / DISPLAY_TAXCITY_INFORMATION: Opens informational dialog.
 *
 * Behavior:
 * - If addinf is XML, render structured table content using InfoXmlContent
 * - Otherwise, fall back to plain text informational dialog

 * Routing & Extensibility Guidance:
 * - Always route informational payloads through dialogStore.onOpenDialog for consistent modal handling.
 * - If addinf is XML (e.g., <addinf> or other supported root tags), render <InfoXmlContent xmlData={addinf}⟪?⟫
 * - If addinf is not XML, show the plain text in the dialog.
 * - For new XML payloads, extend InfoXmlContent or swap in a new renderer as needed, but keep using the sam⟪?⟫
 * - No new modal component is needed; DialogProvider and InfoXmlContent are sufficient and designed for ext⟪?⟫
 *
 * Example usage:
 *   handleDisplayInformation(config, noun, addinf, 'DISPLAY_INFORMATION');
 */
async function handleDisplayInformation(
    config: CommandHandlerConfig,
    noun: string,
    addinf: string,
    verb: 'DISPLAY_INFORMATION' | 'DISPLAY_TAXCITY_INFORMATION' = 'DISPLAY_INFORMATION',
): Promise<void> {
    // Explicit logs for browser console visibility
    console.log(`[${verb}] handleDisplayInformation START`, {
        noun,
        addinf,
        config,
        location: 'function-entry',
        envDev: typeof import.meta !== 'undefined' ? import.meta.env.DEV : undefined,
    });
    // Defensive: warn if logs are not visible due to environment
    if (
        typeof window !== 'undefined' &&
        typeof import.meta !== 'undefined' &&
        !import.meta.env.DEV
    ) {
        console.warn(
            `[${verb}] handleDisplayInformation: Running in production mode, some logs may be filtered.`,
        );
    }
    if (!config.dialogStore) {
        // Defensive: log and throw if dialogStore is missing
        // This is the most common cause of the dialog not opening
        // Ensure DialogProvider is mounted at the app root and useDialogStore is from the same context
        console.error(`[${verb}] command: DialogStore not configured. Dialog will not open.`);
        throw new Error(`${verb} command requires DialogStore`);
    }

const title =
    noun || (verb === 'DISPLAY_TAXCITY_INFORMATION' ? 'Tax City Information' : 'Information');

// Defensive: log dialog open attempt
const shouldRenderInfoXml = isXmlPayload(addinf) || looksLikeInformationalXml(addinf);

console.log(`[${verb}] handleDisplayInformation OPEN_DIALOG`, {
    title,
    isXml: shouldRenderInfoXml,
    location: 'dialog-open',
});

    // Robust extensible handling: XML payloads get InfoXmlContent, others get plain text.
    if (shouldRenderInfoXml) {
        config.dialogStore.onOpenDialog({
            title,
            messageType: 'information',
            dialogType: 'ok',
        message: createElement(InfoXmlContent, { xmlData: addinf }),
    });
} else {
    config.dialogStore.onOpenDialog({
        title,
        messageType: 'information',
        dialogType: 'ok',
        message: addinf,
    });
}

    config.pubSub?.emit('dialog:opened', { type: 'information' });
    // Confirm dialog opened
    console.log(`[${verb}] handleDisplayInformation END`, {
        title,
        location: 'function-exit',
    });
}

/**
 * NAVIGATE: Navigates to a different route using smart navigation
 * @param noun - Navigation context (unused)
 * @param addinf - Route path and optional query params
 */
async function handleNavigate(
    config: CommandHandlerConfig,
    _noun: string,
    addinf: string,
): Promise<void> {
    if (!config.smartNavigate) {
        throw new Error('SmartNavigate function not configured for NAVIGATE command');
    }

    const { path, search } = parseNavigationTarget(addinf);
    const fullPath = search ? `${path}${search}` : path;

    // Use smart navigation (will revalidate if same route, navigate if different)
    config.smartNavigate(fullPath);
}

/**
 * NAVIGATE_CYCLING: Navigates with cycling context using stored action and button.
 * @param _noun - Unused (NAVIGATE_CYCLING reads all context from global variables)
 * @param _addinf - Unused
 */
async function handleNavigateCycling(
    config: CommandHandlerConfig,
    _noun: string,
    _addinf: string,
): Promise<void> {
    // noun/addinf are unused - NAVIGATE_CYCLING reads context from global variables
    void _noun;
    void _addinf;

    if (!config.smartNavigate) {
        throw new Error('SmartNavigate function not configured for NAVIGATE_CYCLING command');
    }

    if (!config.globalVariableStore) {
        throw new Error('GlobalVariableStore not configured for NAVIGATE_CYCLING command');
    }

    // Guard: prevent redundant SPA navigation when a short-lived skip flag is present.
    // Some flows set `sessionStorage.skipLegacyPolicyInfo = '1'` before initial navigation
    // to avoid duplicate navigations caused by subsequent NAVIGATE_CYCLING browser-commands.
    try {
        if (
            typeof window !== 'undefined' &&
            window.sessionStorage?.getItem('skipLegacyPolicyInfo') === '1'
        ) {
            logger.debug('NAVIGATE_CYCLING: Skipping navigation due to skipLegacyPolicyInfo flag');
            return;
        }
    } catch (e) {
        // sessionStorage access may throw in some environments; fail safe and continue
        logger.debug('NAVIGATE_CYCLING: sessionStorage check failed', e as Error);
    }

    // Get the current action from SESSION STORAGE (not GlobalVariableStore)
    // In legacy VBScript, action comes from marrSessionInformation(4), not from browser commands
    const sessionInfo = getItem<Record<string, unknown>>('sessionInformation');
    let currentAction: string | undefined;
    let storedNodeKey: string | undefined;
    let sessionXmlDetail: string | undefined;

    if (sessionInfo) {
      // sessionInfo can be stored as array (legacy) or object (new)
      if (Array.isArray(sessionInfo)) {
        // Legacy array format: [compLoc, userId, policyId, nodeKey, action, diagnosticMode, xmlDetail]
        currentAction = sessionInfo[4] as string | undefined;
        storedNodeKey = sessionInfo[3] as string | undefined;
        sessionXmlDetail =
          typeof sessionInfo[6] === 'string' ? (sessionInfo[6] as string) : undefined;
      } else {
        // Object format: { compLoc, userId, policyId, nodeKey, action, diagnosticMode, sessionXml }
        currentAction = sessionInfo.action as string | undefined;
        storedNodeKey = sessionInfo.nodeKey as string | undefined;
        sessionXmlDetail =
          typeof sessionInfo.sessionXml === 'string'
            ? (sessionInfo.sessionXml as string)
            : undefined;
      }
    }

    // Get other variables from GlobalVariableStore
    const buttonMatchcode = config.globalVariableStore.getVariable<string>('mstrCurrentButton');
    const policyId = config.globalVariableStore.getVariable<string>('mstrPolicyID');
    let nodeKey = config.globalVariableStore.getVariable<string>('mstrNodeKey');

    // Fallback to sessionInformation if nodeKey not in GlobalVariableStore
    if (!nodeKey && storedNodeKey) {
      nodeKey = storedNodeKey;
    }

    if (!currentAction || String(currentAction).trim() === '') {
      logger.error(
        'NAVIGATE_CYCLING: mstrAction is not in session storage. Cannot navigate without action context.',
        new Error('mstrAction is empty'),
        { sessionInfo },
      );

      throw new Error(
        'Cannot navigate: mstrAction is required but not found in session storage. Make sure smartNaviga⟪?⟫
      );
    }
    // Update sessionInformation.policyId from mstrPolicyID if available
    if (sessionInfo && policyId) {
      const updated = Array.isArray(sessionInfo) ? [...sessionInfo] : { ...sessionInfo };

      if (Array.isArray(updated)) {
        updated[2] = String(policyId); // policyId at index 2 in array format
      } else {
        updated.policyId = String(policyId);
      }

      setItem('sessionInformation', updated);
    }

    const normalizedCurrentAction = String(currentAction).trim().toUpperCase();
  const normalizedButton = buttonMatchcode ? String(buttonMatchcode).trim().toUpperCase() : undefined;

  const usePolicyInfoLobCompatibilityAction =
    normalizedCurrentAction === 'RLVUPDATE' &&
    (normalizedButton === 'NEXT' || normalizedButton === 'PREVIOUS');

  const cyclingActionForUrl = usePolicyInfoLobCompatibilityAction ? 'ADD' : String(currentAction);

  if (usePolicyInfoLobCompatibilityAction) {
    logger.info('NAVIGATE_CYCLING: Applying RLVUPDATE NEXT/PREVIOUS compatibility override', {
        originalAction: String(currentAction),
        overrideAction: cyclingActionForUrl,
        buttonMatchcode: normalizedButton,
      });
    }


    const result = buildCyclingUrl({
      currentAction: cyclingActionForUrl,
      buttonMatchcode: buttonMatchcode ? String(buttonMatchcode) : undefined,
      policyId: String(policyId || '0'),
      nodeKey: String(nodeKey || 'POL|POL|0|'),
    });

    logger.info('NAVIGATE_CYCLING: Built URL', {
      resolvedAction: result.resolvedAction,
      targetFrame: result.targetFrame,
      deferNavigation: result.deferNavigation,
    });

    if (result.deferNavigation && config.modalCloseCallback) {
      logger.debug('NAVIGATE_CYCLING: Deferring navigation until modal closes');
      config.modalCloseCallback({
        action: result.resolvedAction,
        policyId: String(policyId || '0'),
        nodeKey: String(nodeKey || 'POL|POL|0|'),
      });
      return;
    }

    // Navigate to the React route, not the API endpoint
    // The loader/dataStrategy will call the PageNavigation API with these params
  const currentRoute = window.location.pathname;
  const targetUrl = `${currentRoute}${result.search}`;

  if (typeof sessionXmlDetail === 'string' && sessionXmlDetail.trim() !== '') {
    setPendingXmlDetail(sessionXmlDetail, targetUrl);
  }

  // Use smartNavigate with the current route + query params
  // This triggers the loader which will call the PageNavigation API
  config.smartNavigate(targetUrl);

  config.globalVariableStore.setVariable('mstrCurrentButton', undefined);
}

/**
 * CLOSE_MODAL: Closes modal dialog with optional deferred navigation
 * @param noun - Navigation action (if deferred navigation needed)
 * @param addinf - Node key or additional navigation data
 */
async function handleCloseModal(
  config: CommandHandlerConfig,
  noun: string,
  addinf: string,
): Promise<void> {
  if (!config.modalCloseCallback) {
    logger.warn('Modal close callback not configured for CLOSE_MODAL command');
    return;
  }

  // Check if deferred navigation is needed (modal chain)
  const deferredNavigation = noun
    ? {
        action: noun,
        nodeKey: addinf || undefined,
      }
    : undefined;

    logger.info('CLOSE_MODAL command executed', {
    hasDeferredNavigation: !!deferredNavigation,
    action: noun,
    nodeKey: addinf,
    });

    // Call the modal close callback (will close dialog and handle deferred navigation)
    config.modalCloseCallback(deferredNavigation);
}

/**
 * OPEN_WINDOW: Opens URL in new window/tab
 * @param noun - Window name/target
 * @param addinf - URL to open
 */
async function handleOpenWindow(
    config: CommandHandlerConfig,
    noun: string,
    addinf: string,
): Promise<void> {
    const windowName = noun || '_blank';
    const url = addinf || '/';

    window.open(url, windowName);
    logger.info('OPEN_WINDOW command executed', { url, windowName });
    config.pubSub?.emit('command:executed', { matchcode: noun, value: url });
}

/**
 * REFRESH_PAGE: Reloads the current page or navigates to path
 * @param noun - Refresh type (hard|soft)
 * @param addinf - Optional path to navigate to
 */
async function handleRefreshPage(
    config: CommandHandlerConfig,
    noun: string,
    addinf: string,
): Promise<void> {
    if (addinf) {
        // Navigate to specific path using smart navigation
        if (!config.smartNavigate) {
            throw new Error('SmartNavigate function not configured for REFRESH_PAGE command');
        }
        // Use forceNavigate: false to allow smart refresh detection
        config.smartNavigate(addinf);
    } else {
        // Hard or soft reload
        const hardReload = noun === 'hard';
        window.location.reload();
        logger.info('REFRESH_PAGE command executed', { reloadType: hardReload ? 'hard' : 'soft' });
    }
}

/**
 * CALL_SERVER: Makes async call to backend (placeholder)
 * @param config - Command handler configuration
 * @param noun - API endpoint or action name
 * @param addinf - Request payload
 * @param resfil - Resource file reference
 *
 * NOTE: This function is currently unused and commented out.
 * XMLServerCall API is now used for server calls via modal submit pattern.
 */
/* async function handleCallServer(
    config: CommandHandlerConfig,
    noun: string,
    addinf: string,
    resfil?: string,
): Promise<void> {
    logger.debug('CALL_SERVER command (placeholder)', {
        noun,
        addinf: addinf.substring(0, 100),
        resfil,
    });

    // Placeholder: In production, this would call your backend API
    // Example:
    // const [result, error] = await safeAwait(
    //   fetch(`/api/${noun}`, {
    //     method: 'POST',
    //     body: JSON.stringify({ addinf, resfil })
    //   })
    // );
    //
    // if (error) {
    //   throw error;
    // }

    // For now, just log and emit event
    config.pubSub?.emit('command:executed', { matchcode: noun, value: addinf });
} */

