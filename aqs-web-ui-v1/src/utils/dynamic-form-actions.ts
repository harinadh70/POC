// Utility functions for dynamic form actions and calls extraction from page-build API
// This enables generic handling for all pages
import { z } from 'zod';
import type { PageBuildResponse } from '@features/page-build/services/page-build';

// Define Zod schema for action controls
export const ActionControlSchema = z.object({
  matchcode: z.string(),
  text: z.string(),
  calls: z.array(z.unknown()),
  '@subroutine': z.string().optional(),
});

export type ActionControl = z.infer<typeof ActionControlSchema>;
/**
 * Extracts action controls and their associated calls from a page-build response.
 * Returns an array of { matchcode, text, calls } for each action control.
 */
export function extractActionControls(pageData: PageBuildResponse | null) {
  if (!pageData || !pageData.Page || !pageData.Page.controls || !pageData.Page.controls.control)
    return [];
  const controls = pageData.Page.controls.control;
  return controls
    .filter((ctrl: any) => ctrl.calls && ctrl['@matchcode'])
    .map((ctrl: any) => ({
      matchcode: ctrl['@matchcode'],
      text: ctrl['@text'],
      calls: Array.isArray(ctrl.calls.call)
        ? ctrl.calls.call
        : ctrl.calls.call
          ? [ctrl.calls.call]
          : [],
    }));
}

// Additional utilities for eeData and dynamic form handling can be added here.

/**
 * Builds EEData array dynamically based on control, form state, and navigation data.
 */
export function buildEEData(
  control: any,
  formState: Record<string, string>,
  navigationData?: { xmlFilePath?: string },
): string[] {
  const xmlFilePath = navigationData?.xmlFilePath ?? '';
  const matchcode = control['@matchcode'] ?? '';
  const policyType = formState['PolicyType'] || 'NEW';
  const transactionId = formState['transactionid'] || control['@transactionid'] || '1';

  return [
    xmlFilePath, // XML file path
    matchcode, // Action/control identifier
    policyType, // Policy type
    transactionId, // Transaction ID
    '', // Reserved/unused
    transactionId, // Transaction ID (repeat)
    '',
    '',
    '', // Reserved/unused
    matchcode, // Action/control identifier (repeat)
    '',
    '',
    '', // Reserved/unused
  ];
}

/**
 * Builds an XML string for the xmlDetail property from form state and keys.
 */
