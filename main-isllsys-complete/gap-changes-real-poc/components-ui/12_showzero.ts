// ============================================================================
// GAP #83: ShowZeroText (VBS lines 8986-9022)
// ============================================================================
//
// VBS BEHAVIOR:
//   Function ShowZeroText(strShowZero) derives the combo's empty-option
//   (first/placeholder item) from the control's showzero attribute:
//     - "F" or empty  -> no empty option (combo starts with first data item)
//     - "T"           -> blank empty option (value="", label="")
//     - any string    -> that string is the empty-option label (value="")
//   This empty option lets the user "unselect" back to nothing. VBS calls
//   ShowZeroText during combo population (FillSelectList) and prepends the
//   result to the <option> list.
//
// REAL POC STATUS:
//   - The showzero attribute EXISTS in control definitions — it arrives in the
//     PageBuild API response as @showzero on combo/select controls.
//   - The NormalizedField type (src/types.ts) does NOT have a showZero prop,
//     but the raw control JSON carries it as `@showzero`.
//   - The utility function showZeroLabel() is already written in
//     changes/src/utils/show-zero-text.ts (returns null, "", or the label).
//   - The select.tsx component (src/components/select.tsx) does NOT use
//     showzero at all — it has no empty-option/placeholder logic.
//
// FIX:
//   1. Add showZero to NormalizedField type
//   2. Pass it through schema-merger / field normalization
//   3. Consume in select.tsx to prepend the empty option
//
// WHERE TO MODIFY: src/types.ts, src/utils/schema-merger.ts, src/components/select.tsx
// ============================================================================

import { showZeroLabel } from '@/utils/show-zero-text';

// ---------------------------------------------------------------------------
// STEP 1: Add showZero to NormalizedField type
// ---------------------------------------------------------------------------
// In src/types.ts, add to the NormalizedField interface:
//
//   export interface NormalizedField {
//       // ... existing fields (matchcode, label, controlType, required, etc.)
//
//       /**
//        * VBS showzero attribute — controls whether the combo has an empty
//        * first option. Values: "F" (no empty), "T" (blank empty), or a
//        * custom label string for the empty option.
//        */
//       showZero?: string;
//   }

// ---------------------------------------------------------------------------
// STEP 2: Pass showZero through field normalization
// ---------------------------------------------------------------------------
// In src/utils/schema-merger.ts (or wherever raw API controls are normalized
// into NormalizedField objects), add:
//
//   BEFORE:
//     const normalized: NormalizedField = {
//         matchcode: raw['@matchcode'] ?? '',
//         label: raw['@text'] ?? '',
//         controlType: raw['@controltype'] ?? 'textbox',
//         // ...other fields...
//     };
//
//   AFTER:
//     const normalized: NormalizedField = {
//         matchcode: raw['@matchcode'] ?? '',
//         label: raw['@text'] ?? '',
//         controlType: raw['@controltype'] ?? 'textbox',
//         showZero: raw['@showzero'],               // <-- ADD THIS
//         // ...other fields...
//     };

// ---------------------------------------------------------------------------
// STEP 3: Consume showZero in select.tsx
// ---------------------------------------------------------------------------
// The select.tsx component uses MUI Autocomplete. The change adds a
// synthetic empty option at the start of the options list when showZero
// indicates one should exist.

/**
 * Demonstrates the showZero integration for select.tsx.
 *
 * The existing select component receives its options array (ComboItem[])
 * and renders them via MUI Autocomplete. This change prepends an empty
 * option when the field's showZero attribute calls for one.
 */

// Types matching the existing select.tsx option shape
interface ComboItem {
    value: string;
    label: string;
    selected?: boolean;
    disabled?: boolean;
}

/**
 * Build the empty option (if any) from the showZero attribute.
 * Returns null if no empty option should be added.
 */
function buildShowZeroOption(showZero: string | undefined): ComboItem | null {
    const label = showZeroLabel(showZero);

    // null means "no empty option" — showzero was "F" or undefined
    if (label === null) return null;

    // label is "" (showzero="T") or a custom string (showzero="-- Select --")
    return {
        value: '',
        label: label,
        selected: false,
        disabled: false,
    };
}

// ---------------------------------------------------------------------------
// select.tsx MODIFICATION — old code vs new code
// ---------------------------------------------------------------------------

// ---- BEFORE (in select.tsx, where options are assembled) ----
//
// The component receives options via lazy-load pub-sub (LOAD_COMBO event)
// or from the field's pre-populated options array. The options are used
// directly with no empty-option consideration:
//
//   const [options, setOptions] = useState<ComboItem[]>(
//       field.options ?? []
//   );
//
//   // ... pub-sub subscription that calls setOptions(parsedItems) ...
//
//   <Autocomplete
//       options={options}
//       // ...
//   />

// ---- AFTER (with showZero handling) ----
//
// Import showZeroLabel:
//   import { showZeroLabel } from '@/utils/show-zero-text';
//
// Read showZero from the field definition:
//   const { showZero } = field;   // NormalizedField now has showZero
//
// Compute the display options with the empty option prepended:

/**
 * Prepend the showZero empty option to the options list.
 * Called in useMemo so it only recomputes when options or showZero change.
 *
 * Usage in select.tsx:
 *   const displayOptions = useMemo(
 *       () => prependShowZeroOption(options, field.showZero),
 *       [options, field.showZero],
 *   );
 *
 * Then pass displayOptions to Autocomplete instead of options:
 *   <Autocomplete options={displayOptions} ... />
 */
export function prependShowZeroOption(
    options: ComboItem[],
    showZero: string | undefined,
): ComboItem[] {
    const emptyOption = buildShowZeroOption(showZero);

    // No empty option needed — return options unchanged
    if (!emptyOption) return options;

    // Avoid duplicate: if options already start with a value="" item, skip
    if (options.length > 0 && options[0].value === '') return options;

    return [emptyOption, ...options];
}

// ---------------------------------------------------------------------------
// FULL select.tsx DIFF (pseudocode showing where changes go)
// ---------------------------------------------------------------------------
//
// function SelectField({ field, control, ... }: SelectFieldProps) {
//     const [options, setOptions] = useState<ComboItem[]>(field.options ?? []);
//
//     // ... existing pub-sub logic for LOAD_COMBO / CLEAR_COMBO ...
//
// +   // GAP #83: prepend empty option based on showZero attribute
// +   const displayOptions = useMemo(
// +       () => prependShowZeroOption(options, field.showZero),
// +       [options, field.showZero],
// +   );
//
//     return (
//         <Controller
//             name={field.matchcode}
//             control={control}
//             render={({ field: rhfField }) => (
//                 <Autocomplete
// -                   options={options}
// +                   options={displayOptions}
//                     // ... rest of Autocomplete props unchanged ...
//                 />
//             )}
//         />
//     );
// }

export { buildShowZeroOption };
export default prependShowZeroOption;
