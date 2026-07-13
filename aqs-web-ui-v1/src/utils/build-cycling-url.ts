import { z } from 'zod';
import { getActionConfig, getButtonConfig, type ActionButtonConfig } from '@/config/action-config';
import { createFeatureLogger } from '@utils/logger-builder';

const logger = createFeatureLogger('navigation', 'BuildCyclingUrl');

// Frame Convention: Uppercase frame values (MAIN, MODAL, NEWWINDOW)
// to match legacy VBScript system and frame-router.ts normalization.
// See: Main_ISLLSYS_20010101.vbs line 4537 for legacy reference.

const BuildCyclingUrlParamsSchema = z.object({
  currentAction: z.string(), // Allow empty, validate in function body
  buttonMatchcode: z.string().optional(),
  policyId: z.string(), // Allow empty, will use default
  nodeKey: z.string(), // Allow empty, will use default
  targetFrame: z.string().optional(),
  additionalParams: z.record(z.string(), z.string()).optional(),
});

export interface BuildCyclingUrlParams {
  /** Current action context (REQUIRED) */
  currentAction: string;
  /** Button matchcode (OPTIONAL) - used for action combining */
  buttonMatchcode?: string;
  /** Policy ID (REQUIRED) */
  policyId: string;
  /** Node key (REQUIRED) */
  nodeKey: string;
  /** Target frame (OPTIONAL) - resolved from config */
  targetFrame?: string;
  /** Additional query parameters (OPTIONAL) */
  additionalParams?: Record<string, string>;
}

export interface BuildCyclingUrlResult {
  path: string;
  search: string;
  fullUrl: string;
  resolvedAction: string;
  targetFrame: string;
  deferNavigation: boolean;
}

/**
 * Builds cycling URL with proper action combining logic.
 * Simplified to 4 query parameters: action, frame, policyId, nodeKey.
 *
 * Session data (userId, compLoc, diagnosticMode, xmlDetail) is sent
 * via POST body by the navigation service, NOT in query string.
 */
export function buildCyclingUrl(params: BuildCyclingUrlParams): BuildCyclingUrlResult {
  const parsed = BuildCyclingUrlParamsSchema.safeParse({
    ...params,
    policyId: params.policyId || '0',
    nodeKey: params.nodeKey || 'POL|POL|0|',
    additionalParams: params.additionalParams ?? {},
  });

  console.log('[buildCyclingUrl] Input params:', params);

  if (!parsed.success) {
    logger.error('Invalid buildCyclingUrl params (Zod validation failed)', {
      issues: parsed.error.issues,
      params,
    });
    throw new Error('buildCyclingUrl: invalid parameters');
  }

  const { currentAction, buttonMatchcode, policyId, nodeKey, targetFrame, additionalParams } =
    parsed.data;

  // Business logic validation
  if (!currentAction || currentAction.trim() === '') {
    logger.error('currentAction is required but was empty or whitespace', {
      params,
      parsedData: parsed.data,
    });
    throw new Error(
      'buildCyclingUrl: currentAction is required. Ensure mstrAction is set in GlobalVariableStore befo⟪?⟫'
    );
  }

  logger.debug('Building cycling URL', {
    currentAction,
    buttonMatchcode,
    policyId,
    nodeKey,
  });

  const actionConfig = getActionConfig(currentAction);

  let resolvedAction = currentAction;
  let buttonConfig: ActionButtonConfig | undefined;
  let finalFrame = (
    targetFrame ||
    actionConfig.defaultBehavior?.frameTarget ||
    'MAIN'
  ).toUpperCase();
  let deferNavigation = actionConfig.defaultBehavior?.deferNavigation || false;

  if (buttonMatchcode) {
    buttonConfig = getButtonConfig(currentAction, buttonMatchcode);

    if (buttonConfig⟪?⟫.customAction) {
      resolvedAction = buttonConfig.customAction;
      logger.debug('Using custom action', { customAction: resolvedAction });
    } else if (buttonConfig⟪?⟫.combinedAction) {
      resolvedAction = buttonConfig.combinedAction;
      logger.debug('Using configured combined action', { resolvedAction });
    } else if (buttonConfig.useDynamicCombine) {
      resolvedAction = `${currentAction}|${buttonMatchcode.toUpperCase()}`;
      logger.debug('Combined action with button', { resolvedAction });
    }

    if (buttonConfig.targetFrame) {
      finalFrame = buttonConfig.targetFrame.toUpperCase();
    }
    if (buttonConfig.deferNavigation !== undefined) {
      deferNavigation = buttonConfig.deferNavigation;
    }
  }

  const queryParams = new URLSearchParams();
  queryParams.set('action', resolvedAction);
  queryParams.set('frame', finalFrame);
  queryParams.set('policyId', policyId);
  queryParams.set('nodeKey', nodeKey);

  if (additionalParams) {
    for (const [key, value] of Object.entries(additionalParams)) {
      queryParams.set(key, value);
    }
  }

  const path = '/api/PageNavigation';
  const search = `?${queryParams.toString()}`;
  const fullUrl = `${path}${search}`;

  logger.info('Built cycling URL', {
    resolvedAction,
    targetFrame: finalFrame,
    deferNavigation,
    urlLength: fullUrl.length,
  });

  return {
    path,
    search,
    fullUrl,
    resolvedAction,
    targetFrame: finalFrame,
    deferNavigation,
  };
}
