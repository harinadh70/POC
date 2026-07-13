import { createFeatureLogger } from '@utils/logger-builder';
import type { OptionItem } from '@/types';
import type { Call } from '@/services/xml-server-call';

const logger = createFeatureLogger('util', 'BuildEEDataArray');

/**
 * Enhanced EEData Array Builder
 * ================================
 *
 * Implements legacy VBScript SetArrayData behavior for XMLServerCall
 * Supports control-type-specific data population
 *
 * EEData Structure (13 elements: indices 0-12):
 *   0 - XML file path
 *   1 - Field matchcode
 *   2 - Data1 (control-specific: display label for combo/select)
 *   3 - Data2 (control-specific: selected value)
 *   4 - Data3 (control-specific: selected value duplicate)
 *   5 - Process indicator (0=pre, 1=post)
 *   6 - Date string (MM/DD/YYYY) or empty
 *   7 - Combo adjusted list index or empty
 *   8 - Rule attribute from XML
 *   9 - Previous label (combo/select only) or empty
 *   10 - Previous value (combo/select only) or empty
 *   11 - Alternate NodeKey (for XMLList)
 *   12 - Control XML element
 */

/**
 * Control Metadata for EEData context
 */
export interface ControlMetadata {
    matchcode: string;
    label?: string;
    controlType:
        | 'textbox'
        | 'textarea'
        | 'select'
        | 'date'
        | 'calendar'
        | 'checkbox'
        | 'icheckbox'
        | 'radio'
        | 'radiobutton'
        | 'combo'
        | 'kpcombo'
        | 'numeric'
        | string;
    options?: OptionItem[];
    showZero?: boolean; // For combos: default true (offset=0), false (offset=1)
    rule?: string;
    value?: unknown; // Current value
}

/**
 * Enhanced EEData Array Parameters
 */
export interface BuildEEDataArrayParams {
    xmlFileName: string;
    buttonMatchcode: string;
    formData: Record<string, unknown>;
    fieldOrder?: string[];
    utpOrder?: string[];
    sessionXml?: Array<{ name: string; value: string }>;
    processIndicator?: string;
    controlMetadata?: ControlMetadata;
    primaryFieldValue?: unknown; // For buttons: the field value to populate at index 2
    previousValue?: unknown; // For combo/select: the previous selected value (for indices 9-10)
    previousLabel?: string; // For combo/select: the previous selected label (to avoid re-lookup)
}

export interface LegacyPrePostPlanParams {
    matchcode: string;
    control?: Record<string, unknown>;
    callsByType: Record<string, Call[]>;
    runtimeOptionsCount?: number;
    baseFormData: Record<string, unknown>;
}

export interface LegacyPrePostPlanResult {
    selectedCallType: string;
    runtimeCalls: Call[];
    processIndicator: '0' | '1';
    payloadFormData: Record<string, unknown>;
}

/**
 * Resolve pre/post commit call plan using legacy dropdown semantics.
 *
 * Rules:
 * - Default to post calls.
 * - For dropdown-like controls with no available list items, use pre calls when present.
 * - If post calls are missing but pre exists, fallback to pre.
 * - For pre calls, blank the committed field in payload formData.
 */
export function resolveLegacyPrePostPlan({
    matchcode,
    control,
    callsByType,
    runtimeOptionsCount = 0,
    baseFormData,
}: LegacyPrePostPlanParams): LegacyPrePostPlanResult | null {
    const postCalls = callsByType.post ?? [];
    const preCalls = callsByType.pre ?? [];
    const rawControlType = String(control?.['@controltype'] ?? control?.controltype ?? '')
        .trim()
        .toLowerCase();

    const isDropdownControl =
        rawControlType.includes('combo') ||
        rawControlType.includes('select') ||
        rawControlType.includes('list') ||
        Object.prototype.hasOwnProperty.call(control ?? {}, 'listitems') ||
        Object.prototype.hasOwnProperty.call(control ?? {}, '@limittolist');
    const rawListItems = control?.listitems as unknown;

    const hasServerListItems = (() => {
        if (!rawListItems) return false;
        if (Array.isArray(rawListItems)) return rawListItems.length > 0;
        if (typeof rawListItems !== 'object') return false;
        const obj = rawListItems as Record<string, unknown>;
        const item = obj.item;
        if (Array.isArray(item)) return item.length > 0;
        if (item && typeof item === 'object') return true;
        return false;
    })();

    const hasListItems = runtimeOptionsCount > 0 || hasServerListItems;

    let selectedCallType = 'post';
    let runtimeCalls = postCalls;

    if (isDropdownControl && !hasListItems && preCalls.length > 0) {
        selectedCallType = 'pre';
        runtimeCalls = preCalls;
    } else if (runtimeCalls.length === 0 && preCalls.length > 0) {
        selectedCallType = 'pre';
        runtimeCalls = preCalls;
    }

    if (runtimeCalls.length === 0) {
        return null;
    }

    const payloadFormData =
        selectedCallType === 'pre'
            ? {
                  ...baseFormData,
                  [matchcode]: '',
              }
            : baseFormData;

    return {
        selectedCallType,
        runtimeCalls,
        processIndicator: selectedCallType === 'pre' ? '0' : '1',
        payloadFormData,
    };
}

/**
 * Textbox/Textarea Handler
 *
 * Populates:
 *   data2 = value
 *   data3-7 = empty
 *
 * Example:
 *   Policy Number, "12345"POLPOLEXT_NyxClsTyp_StringValue
 *   -> ["12345", "", "", "", ""]
 */
function buildTextboxEEData(
    value: unknown,
    buttonMatchcode?: string,
): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
    console.log('in POLPOLEXT_NyxClsTyp_StringValue', buttonMatchcode);
    if ((buttonMatchcode === 'POLPOLEXT_Nyx_BooleanValue_INFO')) {
        return [String(value || ''), 'POL|POL|0', '', '', ''];
    }
    return [String(value || ''), '', '', '', ''];
}

/**
 * Select Handler (HTML SELECT)
 *
 * Matches VBS SELECT control:
 *   data2 = display text (label)
 *   data3 = selected value
 *   data4 = selected value (duplicate)
 *   data7 = empty (NOT set for SELECT)
 *   data9-10 = previous selection (label, value) if provided
 *
 * Example (selected label="Apartment Package", value="AK", previous="Condo", "CD"):
 *   -> [["Apartment Package", "AK", "AK", "", ""], ["Condo", "CD"]]
 */
function buildSelectEEData(
    value: unknown,
    options: OptionItem[] = [],
    previousValue?: unknown,
    previousLabel?: string,
): [
    data: [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown],
    previous: [data9: unknown, data10: unknown],
] {
    const selectedIndex = options.findIndex((opt) => opt.value === value);
    const selectedOption = options[selectedIndex];
    const displayText = selectedOption?.label || String(value || '');
    const selectedValue = selectedOption?.value || String(value || '');

    // Find previous selection
    // Use previousLabel if provided (from session storage), otherwise look it up
    let resolvedPreviousLabel = previousLabel || '';
    let previousValueStr = '';
    if (previousValue !== undefined && !previousLabel) {
        const previousIndex = options.findIndex((opt) => opt.value === previousValue);
        const previousOption = options[previousIndex];
        resolvedPreviousLabel = previousOption?.label || String(previousValue || '');
        previousValueStr = previousOption?.value || String(previousValue || '');
    } else {
        previousValueStr = String(previousValue || '');
    }

    logger.debug('[EEData] Select data built', {
        displayText,
        selectedValue,
        selectedIndex,
        previousLabel: resolvedPreviousLabel,
        previousValue,
        selectedIndex,
    });

    return [
        [
            displayText, // data2: Display text (label)
            selectedValue, // data3: Selected value
            selectedValue, // data4: Selected value (duplicate)
            '', // data6: Not a date
            '', // data7: EMPTY for SELECT (not combo)
        ],
        [resolvedPreviousLabel, previousValueStr], // data9-10: Previous selection (label, value)
    ];
}

/**
 * Combo Handler (COMBO, KPCOMBO)
 *
 * Matches VBS SetArrayData logic for COMBO/KPCOMBO:
 *   data2 = display text (label)
 *   data3 = selected value
 *   data4 = selected value
 *   data7 = adjusted list index (with ShowZero offset)
 *   data9-10 = previous selection (label, value) if provided
 *
 * ShowZero behavior:
 *   ShowZero=T (default): offset = 0 → index 0 becomes 0
 *   ShowZero=F: offset = 1 → index 0 becomes 1 (shows "---" option)
 *
 * Example (ShowZero=F, selected index 5, label="Apartment Package", value="AK", previous="Condo", "CD"):
 *   → [["Apartment Package", "AK", "AK", "", 6], ["Condo", "CD"]]
 */
function buildComboEEData(
    value: unknown,
    options: OptionItem[] = [],
    showZero: boolean = true,
    previousValue?: unknown,
    previousLabel?: string,
): [
    data: [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown],
    previous: [data9: unknown, data10: unknown],
] {
    const listIndex = options.findIndex((opt) => opt.value === value);
    const selectedOption = options[listIndex];
    const displayText = selectedOption?.label || String(value || '');
    const selectedValue = selectedOption?.value || String(value || '');

    // Calculate offset: ShowZero=F → 1, ShowZero=T → 0
    const offset = showZero ? 0 : 1;
    const adjustedIndex = listIndex >= 0 ? listIndex + offset : offset - 1;
    // Find previous selection
    // Use previousLabel if provided (from session storage), otherwise look it up
    let resolvedPreviousLabel = previousLabel || '';
    let previousValueStr = '';
    if (previousValue !== undefined && !previousLabel) {
        const previousIndex = options.findIndex((opt) => opt.value === previousValue);
        const previousOption = options[previousIndex];
        resolvedPreviousLabel = previousOption?.label || String(previousValue || '');
        previousValueStr = previousOption?.value || String(previousValue || '');
    } else {
        previousValueStr = String(previousValue || '');
    }
    logger.debug('[EEData] Combo data built', {
        value,
        displayText,
        listIndex,
        selectedValue,
        offset,
        adjustedIndex,
        previousLabel: resolvedPreviousLabel,
        previousValue,
    });

    return [
        [
            displayText, // data2: Display text (label)
            selectedValue, // data3: Selected value
            selectedValue, // data4: Selected value (duplicate)
            '', // data6: Not a date
            adjustedIndex, // data7: Adjusted list index for COMBO
        ],
        [resolvedPreviousLabel, previousValueStr], // data9-10: Previous selection (label, value)
    ];
}

/**
 * Date Handler
 *
 * Populates (from MM/DD/YYYY format):
 *   data2 = month (MM with leading zero)
 *   data3 = day (DD with leading zero)
 *   data4 = year (YYYY)
 *   data6 = full date string (MM/DD/YYYY with leading zeros)
 *
 * Example:
 *   "3/11/2026" or "03/11/2026"
 *   → ["03", "11", "2026", "03/11/2026"]
 */
function buildDateEEData(
    value: unknown,
): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
    if (!value || typeof value !== 'string') {
        logger.warn('[EEData] Date: Invalid value', { value });
        return ['', '', '', '', ''];
    }
    // Parse date format (MM/DD/YYYY or M/D/YYYY or YYYY-MM-DD)
    let month = '';
    let day = '';
    let year = '';

    // Handle MM/DD/YYYY or M/D/YYYY format
    if (value.includes('/')) {
        const parts = value.split('/');
        if (parts.length !== 3) {
            logger.warn('[EEData] Date: Invalid format (expected MM/DD/YYYY)', { value });
            return ['', '', '', '', ''];
        }
        month = parts[0].padStart(2, '0'); // Pad month to 2 digits
        day = parts[1].padStart(2, '0'); // Pad day to 2 digits
        year = parts[2];
    }
    // Handle YYYY-MM-DD format (ISO)
    else if (value.includes('-')) {
        const parts = value.split('-');
        if (parts.length !== 3) {
            logger.warn('[EEData] Date: Invalid format (expected YYYY-MM-DD)', { value });
            return ['', '', '', '', ''];
        }
        year = parts[0];
        month = parts[1].padStart(2, '0');
        day = parts[2].padStart(2, '0');
    } else {
        logger.warn('[EEData] Date: Unknown format', { value });
        return ['', '', '', '', ''];
    }

    // Build full date string with padded zeros (MM/DD/YYYY)
    const fullDateString = `${month}/${day}/${year}`;

    logger.debug('[EEData] Date data built', {
        value,
        month,
        day,
        year,
        fullDateString,
    });

    return [
        month, // data2: Month (MM with leading zero)
        day, // data3: Day (DD with leading zero)
        year, // data4: Year (YYYY)
        fullDateString, // data6: Full date string (MM/DD/YYYY)
        '', // data7: Empty (not combo)
    ];
}

/**
 * Checkbox Handler
 *
 * Populates:
 *   data2 = "YES" (checked) or "NO" (unchecked)
 *   data3 = 1 (checked) or 0 (unchecked)
 *   data4-7 = empty
 *
 * Example:
 *   true → ["YES", 1, "", "", ""]
 *   false → ["NO", 0, "", "", ""]
 */
function buildCheckboxEEData(
    value: unknown,
): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
    const isChecked = Boolean(value);

    logger.debug('[EEData] Checkbox data built', {
        value,
        isChecked,
        data2: isChecked ? 'YES' : 'NO',
        data3: isChecked ? 1 : 0,
    });

    return [
        isChecked ? 'YES' : 'NO', // data2: Display text
        isChecked ? 1 : 0, // data3: Index (1=checked, 0=unchecked)
        '', // data4: Empty
        '', // data6: Empty
        '', // data7: Empty
    ];
}

/**
 * Radio Button Handler
 *
 * Populates:
 *   data2 = selected value
 *   data3 = selected index
 *   data4-7 = empty
 *
 * Example (selected "NEW" at index 0):
 *   -> ["NEW", 0, "", ""]
 */
function buildRadioEEData(
    value: unknown,
    options: OptionItem[] = [],
): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
    const selectedIndex = options.findIndex((opt) => opt.value === value);

    logger.debug('[EEData] Radio data built', {
        value,
        selectedIndex,
        options: options.length,
    });

    return [
        String(value || ''), // data2: Selected value
        selectedIndex >= 0 ? selectedIndex : -1, // data3: Selected index
        '', // data4: Empty
        '', // data6: Empty
        '', // data7: Empty
    ];
}

/**
 * Date Format Detection
 *
 * Detects if a value matches common date formats:
 *   - M/D/YYYY (e.g., 3/12/2025)
 *   - MM/DD/YYYY (e.g., 03/12/2025)
 *   - YYYY-MM-DD (e.g., 2025-03-12)
 *
 * @param value - Value to check
 * @returns true if value matches date pattern, false otherwise
 */
function isDateFormat(value: unknown): boolean {
    if (!value || typeof value !== 'string') {
        return false;
    }

    // Match M/D/YYYY, MM/DD/YYYY (numeric month, day, year with /)
    // Match YYYY-MM-DD (ISO format with -)
    const dateRegex = /^(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})$/;
    return dateRegex.test(value.trim());
}

/**
 * Build EEData Array
 *
 * Creates 13-element array matching legacy VBScript marrEEData(0-12)
 * Handles all control types with appropriate data population
 *
 * @param params - BuildEEDataArrayParams
 * @returns 13-element EEData array for XMLServerCall
 *
 * Example output for combo selection change from "Mobile Home Park" (MP, index 99) to "Non Profit" (NP, index 6):
 * [
 *   "../../pol/xml/Rlv_PIPHPOL_20010101.xml", // 0: XML path
 *   "POLPOLV3X_LPRDCDE", // 1: Matchcode
 *   "Non Profit", // 2: Current selected label
 *   "NP", // 3: Current selected value
 *   "NP", // 4: Current selected value (duplicate)
 *   "1", // 5: Post-process
 *   "", // 6: Not date
 *   "6", // 7: Current adjusted index (with ShowZero offset)
 *   "", // 8: Rule
 *   "Mobile Home Park", // 9: Previous selected label
 *   "MP", // 10: Previous selected value
 *   "", // 11: Alt nodekey
 *   "", // 12: Control XML
 * ]
 */
export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
    const {
        xmlFileName,
        buttonMatchcode,
        formData,
        processIndicator = '1',
        controlMetadata,
        primaryFieldValue,
        previousValue,
        previousLabel,
        sessionXml,
    } = params;

    // Get current field value from form data
    // For buttons: use primaryFieldValue (the actual field value like policy number)
    // For fields: use formData[buttonMatchcode] (the field's own value)
    const fieldValue =
        primaryFieldValue !== undefined ? primaryFieldValue : formData[buttonMatchcode];

    // Process indicator:
    // - '0' = pre-process
    // - '1' = post-process
    // - legacy branch tokens can also be passed through (e.g., 'yes'/'no')

    // Build control-specific data
    let data2: unknown = '';
    let data3: unknown = '';
    let data4: unknown = '';
    let data6: string = '';
    let data7: unknown = '';
    let data9: unknown = '';
    let data10: unknown = '';

    // Field-specific override for POLPOL_NRLVDAT to match legacy EEData structure
    if (buttonMatchcode === 'POLPOL_NRLVDAT') {
        // Robust nodeKey extraction: check all case variants in formData, then sessionXml, then fallback
        let nodeKey = '';
        const nodeKeyCandidates = ['nodeKey', 'NodeKey', 'NODEKEY'];
        // 1. Direct key match (common cases)
        for (const key of nodeKeyCandidates) {
            if (typeof formData[key] === 'string' && formData[key]) {
                nodeKey = formData[key];
                break;
            }
        }
        // 2. Fallback: search all formData keys case-insensitively
        if (!nodeKey) {
            const foundKey = Object.keys(formData).find(
                (k) => typeof k === 'string' && k.toLowerCase() === 'nodekey',
            );
            if (foundKey && typeof formData[foundKey] === 'string') {
                nodeKey = formData[foundKey];
            }
        }
        // 3. If not found in formData, try sessionXml (case-insensitive)
        if (!nodeKey && sessionXml && Array.isArray(sessionXml)) {
            const found = sessionXml.find((x) => x.name && x.name.toLowerCase() === 'nodekey');
            if (found && typeof found.value === 'string') {
                nodeKey = found.value;
            }
        }
        logger.debug('[EEData] POLPOL_NRLVDAT nodeKey resolved', {
            nodeKey,
            formDataKeys: Object.keys(formData),
            formDataValues: Object.entries(formData),
            sessionXml,
        });
        const dateValue = typeof fieldValue === 'string' ? fieldValue : '';

        data2 = '';
        data3 = 'POL|POL|0|';
        data4 = '';
        data6 = '';
        data7 = '';
        data9 = dateValue;
        data10 = '';
    } else if (controlMetadata) {
        // Auto-detect date format from value before switch
        // If value matches date pattern, override controlType to 'date'
        let controlType = controlMetadata.controlType.toLowerCase().trim();

        if (isDateFormat(fieldValue)) {
            logger.debug('[EEData] Auto-detected date format, overriding controlType to date', {
                matchcode: buttonMatchcode,
                originalControlType: controlMetadata.controlType,
                fieldValue,
            });
            controlType = 'date';
        }

        console.log('Determined control type for EEData:', controlType);

        switch (controlType) {
            // TEXT-BASED CONTROLS
            case 'textbox':
            case 'textarea':
            case 'numeric':
                [data2, data3, data4, data6, data7] = buildTextboxEEData(fieldValue, buttonMatchcode);
                break;
            // HTML SELECT CONTROLS (separate from COMBO)
            case 'select': {
                const [currentData, previousData] = buildSelectEEData(
                    fieldValue,
                    controlMetadata.options,
                    previousValue,
                    previousLabel,
                );
                [data2, data3, data4, data6, data7] = currentData;
                [data9, data10] = previousData;
                break;
            }

            // COMBO AND KPCOMBO CONTROLS
            case 'combo':
            case 'kpcombo': {
                const [currentData, previousData] = buildComboEEData(
                    fieldValue,
                    controlMetadata.options,
                    controlMetadata.showZero,
                    previousValue,
                    previousLabel,
                );
                [data2, data3, data4, data6, data7] = currentData;
                [data9, data10] = previousData;
                break;
            }

            // DATE CONTROLS
            case 'date':
            case 'calendar':
                [data2, data3, data4, data6, data7] = buildDateEEData(fieldValue);
                break;

            // BOOLEAN CONTROLS
            case 'checkbox':
            case 'icheckbox':
                [data2, data3, data4, data6, data7] = buildCheckboxEEData(fieldValue);
                break;

            // RADIO CONTROLS
            case 'radio':
            case 'radiobutton':
                [data2, data3, data4, data6, data7] = buildRadioEEData(
                    fieldValue,
                    controlMetadata.options,
                );
                break;

            // UNKNOWN: Default to textbox
            default:
                logger.warn('[EEData] Unknown control type, using textbox handler', {
                    matchcode: buttonMatchcode,
                    controlType: controlMetadata.controlType,
                });
                [data2, data3, data4, data6, data7] = buildTextboxEEData(fieldValue);
        }
    } else {
        // No metadata provided: check if value is date format, else use textbox (safest default)
        if (isDateFormat(fieldValue)) {
            logger.debug('[EEData] Auto-detected date format, using date handler', {
                matchcode: buttonMatchcode,
            });
            [data2, data3, data4, data6, data7] = buildDateEEData(fieldValue);
        } else {
            logger.debug('[EEData] No control metadata, using textbox handler', {
                matchcode: buttonMatchcode,
            });
            [data2, data3, data4, data6, data7] = buildTextboxEEData(fieldValue);
        }
    }

    // Construct full XML file path
    // If relative: ../../pol/xml/Rlv_PIPHPOL_20010101.xml
    const fullXmlPath = xmlFileName?.includes('../../') ? xmlFileName : `../../${xmlFileName}`;

    // Extract optional rule attribute from control
    const ruleAttribute = controlMetadata?.rule || '';

    // Alternate nodekey for XMList controls (TODO: implement when needed)
    const alternateNodeKey = '';

    // Control XML serialization (TODO: implement when needed)
    const controlXml = '';

    // Build final 13-element EEData array (indices 0-12)
    // This matches legacy marrEEData(0 to 12)
    const payload: unknown[] = [
        fullXmlPath, // 0: XML file path
        buttonMatchcode, // 1: Field matchcode
        data2, // 2: Data1 (control-specific)
        data3, // 3: Data2 (control-specific)
        data4, // 4: Data3 (control-specific)
        processIndicator, // 5: Process indicator ("0"=pre, "1"=post)
        data6, // 6: Date string (MM/DD/YYYY) or empty
        data7, // 7: Combo adjusted list index or empty
        ruleAttribute, // 8: Rule attribute from XML
        data9, // 9: Previous label (for combo/select) or empty
        data10, // 10: Previous value (for combo/select) or empty
        alternateNodeKey, // 11: Alternate NodeKey
        controlXml, // 12: Control XML
    ];
    logger.debug('[EEData] Array built successfully', {
        xmlFileName: fullXmlPath,
        buttonMatchcode,
        controlType: controlMetadata?.controlType,
        fieldValue,
        payloadLength: payload.length,
        data2,
        data3,
        data4,
        data6,
        data7,
        data9,
        data10,
    });

    return payload;
}

/** Legacy Implementation Notes for Reference
 * ================================================
 *
 * This implementation mirrors the VBScript SetArrayData function from:
 * Main_ISLLSYS_20010101.vbs (lines 7465-7700)
 *
 * Key Behaviors:
 *
 * 1. TEXTBOX (INPUT type="text")
 *    .marrEEData(2) = objControl.value
 *    .marrEEData(3-4) = ""
 *
 * 2. COMBO (COMBO, KPCOMBO)
 *    .marrEEData(2) = objControl.text            ' Display text
 *    .marrEEData(3) = objControl.value OR listIndex
 *    .marrEEData(4) = objControl.value            ' Always value
 *    .marrEEData(7) = listIndex + intOffset        ' Adjusted index
 *    where intOffset = 1 if ShowZero=F, else 0
 *
 * 3. DATE (INPUT iscalendar="T")
 *    .marrEEData(2) = month (MM)
 *    .marrEEData(3) = day (DD)
 *    .marrEEData(4) = year (YYYY)
 *    .marrEEData(6) = "MM/DD/YYYY"
 *
 * 4. CHECKBOX (ICHECKBOX, INPUT type="checkbox")
 *    .marrEEData(2) = "YES" or "NO"
 *    .marrEEData(3) = 1 or 0
 *
 * 5. RADIO (RADIOBUTTON)
 *    .marrEEData(2) = objControl.value
 *    .marrEEData(3) = objControl.selectedIndex
 *
 * Process Indicator (Index 5):
 *    0 = Pre-process calls (before field change)
 *    1 = Post-process calls (after field change) ← Always from UI
 *
 * FillCallArray2 reads calls from:
 *    <calls type="pre"> or <calls type="post">
 *    based on marrEEData(5) value
 */
