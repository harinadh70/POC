/**
 * @file detect-modal-type.ts
 * @description Pattern detection for modal dialog types
 *
 * Determines which modal pattern to use based on cycling response,
 * xmlFilePath conventions, and PageBuild response analysis.
 *
 * @see modal-strategy-validation.md for modal type categories
 */

import { createFeatureLogger } from '@/utils/logger-builder';

const logger = createFeatureLogger('util', 'DetectModalType');

// ========================================
// Types
// ========================================

/**
 * Modal pattern types supported by the framework
 */
export type ModalType =
    | 'dataEntry'  // New/create modals - Three-API Pattern
    | 'edit'  // Edit modals with field commits
    | 'selection'  // Selection/lookup modals
    | 'confirmation'  // Yes/No/Cancel dialogs
    | 'info'  // Read-only information modals
    | 'multiStep'  // Multi-step wizard modals
    | 'fieldCommit';  // Modals with field-level commits

export interface ModalTypeDetectionInput {
    /** Cycling response data */
    cyclingResponse?: {
        /** Explicit modal type from backend */
        modalType?: ModalType;
        /** XML file path identifier */
        xmlFilePath?: string;
        /** Frame type */
        frame?: string;
    };

    /** PageBuild response data */
    pageBuildResponse?: {
        /** Form controls array */
        controls?: Array<{
            '@disabled'?: string;
            '@matchcode'?: string;
            '@controltype'?: string;
        }>;
        /** Tab/step indicators */
        tabs?: unknown;
    };
}

// ========================================
// Utility Functions
// ========================================

/**
 * Detect modal type based on available data
 *
 * Decision tree:
 * 1. Check cycling response for explicit modalType
 * 2. Check xmlFilePath naming convention
 * 3. Analyze PageBuild response structure
 * 4: Fallback to 'dataEntry' (default)
 *
 * @param input - Detection input data
 * @returns Detected modal type
 *
 * @example
 * ```typescript
 * const modalType = detectModalType({
 *   cyclingResponse: {
 *     xmlFilePath: "NewRnl_ISLLSYS_20010101.xml"
 *   }
 * });
 * // Returns: 'dataEntry'
 * ```
 */
export function detectModalType(input: ModalTypeDetectionInput): ModalType {
    logger.debug('Detecting modal type', {
        hasExplicitType: !!input.cyclingResponse?.modalType,
        xmlFilePath: input.cyclingResponse?.xmlFilePath,
        hasPageBuildResponse: !!input.pageBuildResponse,
    });

    // Step 1: Check for explicit modalType in cycling response
    if (input.cyclingResponse?.modalType) {
        logger.info('Using explicit modal type from cycling response', {
            modalType: input.cyclingResponse.modalType,
        });
        return input.cyclingResponse.modalType;
    }

    // Step 2: Check xmlFilePath naming convention
    if (input.cyclingResponse?.xmlFilePath) {
        const fileName = input.cyclingResponse.xmlFilePath.toLowerCase();

        // Pattern: NewRnl_*, New_* → 'dataEntry'
        if (fileName.includes('newrnl_') || fileName.includes('new_')) {
            logger.info('Detected dataEntry modal from xmlFilePath', { fileName });
            return 'dataEntry';
        }

        // Pattern: Edit_* → 'edit'
        if (fileName.includes('edit_')) {
            logger.info('Detected edit modal from xmlFilePath', { fileName });
            return 'edit';
        }

        // Pattern: Select_*, Lookup_* → 'selection'
        if (fileName.includes('select_') || fileName.includes('lookup_')) {
            logger.info('Detected selection modal from xmlFilePath', { fileName });
            return 'selection';
        }

        // Pattern: Confirm_* → 'confirmation'
        if (fileName.includes('confirm_')) {
            logger.info('Detected confirmation modal from xmlFilePath', { fileName });
            return 'confirmation';
        }

        // Pattern: Info_*, View_* → 'info'
        if (fileName.includes('info_') || fileName.includes('view_')) {
            logger.info('Detected info modal from xmlFilePath', { fileName });
            return 'info';
        }
    }

    // Step 3: Analyze PageBuild response (if available)
    if (input.pageBuildResponse?.controls) {
        const controls = input.pageBuildResponse.controls;

        // Check if all controls are disabled (read-only modal)
        const allDisabled = controls.every((ctrl) => ctrl['@disabled'] === 'T');
        if (allDisabled && controls.length > 0) {
            logger.info('Detected info modal - all controls disabled', {
                controlCount: controls.length,
            });
            return 'info';
        }

        // Check for multi-step indicators (tabs, steps)
        if (input.pageBuildResponse.tabs) {
            logger.info('Detected multiStep modal - has tabs/steps');
            return 'multiStep';
        }

        // Check for field commit patterns (controls with @commit="T" or commit handlers)
        const hasFieldCommits = controls.some((ctrl) => {
            const matchcode = ctrl['@matchcode'] || '';
            const controlType = ctrl['@controltype'] || '';
            // Common patterns for fields that trigger commits
            return (
                (controlType === 'select' || controlType === 'dropdown') &&
                !['OK', 'CANCEL', 'SUBMIT', 'NEXT', 'BACK'].includes(matchcode)
            );
        });

        if (hasFieldCommits) {
            logger.info('Detected fieldCommit modal - has commit-enabled fields');
            return 'fieldCommit';
        }
    }

    // Step 4: Default fallback
    logger.info('Using default modal type: dataEntry');
    return 'dataEntry';
}

/**
 * Get modal behavior flags based on modal type
 *
 * @param modalType - Detected modal type
 * @returns Behavior flags for the modal
 *
 * @example
 * ```typescript
 * const flags = getModalBehaviorFlags('edit');
 * // Returns: { enableFieldCommits: true, skipPageBuild: false, ... }
 * ```
 */
export function getModalBehaviorFlags(modalType: ModalType) {
  const flags = {
    enableFieldCommits: false,
    skipPageBuild: false,
    skipXMLServerCall: false,
    isMultiStep: false,
    isReadOnly: false,
  };

  switch (modalType) {
    case 'dataEntry':
      // Standard Three-API Pattern
      break;

    case 'edit':
    case 'fieldCommit':
      flags.enableFieldCommits = true;
      break;

    case 'selection':
      flags.skipXMLServerCall = true; // May not need XMLServerCall on submit
      break;

    case 'confirmation':
      flags.skipPageBuild = true; // Static content, no form structure needed
      break;

    case 'info':
      flags.skipXMLServerCall = true;
      flags.isReadOnly = true;
      break;

    case 'multiStep':
      flags.isMultiStep = true;
      break;
  }

  logger.debug('Modal behavior flags', { modalType, flags });
  return flags;
}

