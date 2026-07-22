// ============================================================================
// GAPS #70 + #74: OnFocusHandler + OnFocusPreProcess
// (VBS lines 6878-7274, 7430-7522)
// ============================================================================
//
// VBS BEHAVIOR:
//
//   Sub OnFocusHandler(pstrMatchcode):
//     1. Runs OnFocusPostProcess for the PREVIOUS field (the one losing focus):
//        - If mstrPreviousMatchcode <> "" and mstrPreviousMatchcode <> pstrMatchcode:
//          - Finds the previous control
//          - If postprocessblanks = FALSE and the field value is blank: SKIP the
//            server call entirely (this is the key optimization — avoids round-trips
//            for empty fields that don't need post-processing)
//          - Otherwise: builds EEData with postProcessAction="0" and fires XMLServerCall
//     2. Sets mstrPreviousMatchcode = pstrMatchcode (now the current field)
//     3. Runs OnFocusPreProcess for the CURRENT field (the one gaining focus):
//        - Checks if the control has calls[] with type="pre"
//        - If so: fires XMLServerCall with postProcessAction="0" to let the
//          server set up the field before the user interacts with it
//        - This is used for fields that need dynamic population or validation
//          setup when they receive focus
//     4. Captures initial values via SetInitialValueData (EEData[9],[10])
//
//   The post-process on blur and pre-process on focus form a paired handshake:
//     blur(oldField) -> post-process(oldField, action="0")
//     focus(newField) -> pre-process(newField, action="0")
//
// REAL POC STATUS:
//   - field-renderer.tsx HAS onBlurWithValue that fires EE server calls on blur
//   - field-renderer.tsx HAS onFocusWithBindings that handles combo lazy-load
//     and schema onFocus bindings
//   - handlers/common/payload.ts HAS handlerForInitialValue() that captures
//     initial lValue/xValue at focus-in time
//   - PageBuildControl type HAS postprocessblanks?: boolean (confirmed in common.ts)
//   - form.ts SelectFieldSchema HAS postProcessBlanks: z.boolean().default(false)
//   - control-to-field.tsx maps postprocessblanks from API to form field
//
//   BUT:
//   - NO postprocessblanks check in handleBlur — the EE call fires for empty
//     fields even when postprocessblanks=false (unnecessary server round-trips)
//   - NO previousMatchcode tracking — there's no way to know which field just
//     lost focus, so the blur-to-focus handshake is broken
//   - NO pre-process server call on focus for non-combo fields — only combos
//     trigger a server call on focus (for lazy loading options)
//   - Non-combo fields with calls[type="pre"] are ignored on focus
//
// FIX:
//   1. Add previousMatchcode to focus-store.ts
//   2. Enhance handleBlur in field-renderer.tsx with postprocessblanks check
//   3. Enhance handleFocus in field-renderer.tsx with pre-process EE call
//   4. Show exact code changes (old -> new)
//
// ============================================================================

// ----------------------------------------------------------------
// STEP 1: Extend Focus Store
// ----------------------------------------------------------------
// In src/stores/focus-store.ts, add previousMatchcode tracking:
//
// CURRENT focus-store.ts:
//   interface FocusStoreState {
//       pendingFocus: string | null;
//   }
//   // Actions: requestFocus(matchcode), clearFocus()
//
// MODIFIED focus-store.ts (add previousMatchcode):
//
//   interface FocusStoreState {
//       pendingFocus: string | null;
//       /** Matchcode of the field that most recently had focus. mstrPreviousMatchcode */
//       previousMatchcode: string;
//       /** Initial values captured at focus-in time for the current field. */
//       initialValues: { lValue: string; xValue: string } | null;
//   }
//
//   interface FocusActions {
//       requestFocus: (matchcode: string) => void;
//       clearFocus: () => void;
//       setPreviousMatchcode: (matchcode: string) => void;
//       setInitialValues: (values: { lValue: string; xValue: string } | null) => void;
//   }
//
//   const defaultFocus = {
//       pendingFocus: null,
//       previousMatchcode: '',
//       initialValues: null,
//   };
//
// Export new selectors:
//   export const usePreviousMatchcode = () =>
//       useFocusStore((state) => state.previousMatchcode);
//   export const useInitialValues = () =>
//       useFocusStore((state) => state.initialValues);

// ----------------------------------------------------------------
// STEP 2: Enhanced handleBlur with postprocessblanks Check
// ----------------------------------------------------------------
//
// LOCATION: src/components/ui/field-renderer.tsx
// Inside the FieldRenderer component, the onBlurWithValue callback
//
// ---- CURRENT CODE (approximate, from photo analysis): ----
//
//   const onBlurWithValue = async (value: unknown) => {
//       const eeBindings = getEEBindings(controlNode);
//       if (eeBindings.length === 0) return;
//
//       const fieldState = buildFieldState(value, controlNode);
//       const context = buildFieldContext(value);
//
//       await executeFormActionBindings(eeBindings, {
//           ...context,
//           fieldState,
//           control: controlNode.field,
//           xmlFileName: formRendererCtx.xmlFileName,
//           postProcessAction: '1',
//       });
//   };
//
// ---- NEW CODE (with postprocessblanks check + previousMatchcode): ----
//
//   const onBlurWithValue = async (value: unknown) => {
//       const matchcode = controlNode.field.matchcode;
//
//       // --- GAP #70: postprocessblanks check ---
//       // VBS: If postprocessblanks = FALSE and the field is blank, skip the
//       // server call entirely. This avoids unnecessary round-trips for fields
//       // that don't need server validation when left empty.
//       //
//       // postprocessblanks is on the raw PageBuildControl (common.ts line 190)
//       // and mapped to postProcessBlanks on the form field (form.ts line 68).
//       // For ControlNode.field (which is MergedField extending Control),
//       // it's available as controlNode.field.postprocessblanks.
//       const postprocessblanks = controlNode.field.postprocessblanks ?? false;
//       const fieldValue = toSafeString(value ?? '');
//
//       if (!postprocessblanks && fieldValue.trim().length === 0) {
//           // Field is blank and postprocessblanks=false: skip EE call.
//           // Still update previousMatchcode so the next focus handler knows.
//           FocusStoreApi.getState().actions.setPreviousMatchcode(matchcode);
//           return;
//       }
//
//       // --- GAP #70: Update previousMatchcode on blur ---
//       // Set BEFORE the server call so that if the server response triggers
//       // a SET_FOCUS command, the new field's onFocus handler sees the correct
//       // previousMatchcode.
//       FocusStoreApi.getState().actions.setPreviousMatchcode(matchcode);
//
//       const eeBindings = getEEBindings(controlNode);
//       if (eeBindings.length === 0) return;
//
//       const fieldState = buildFieldState(value, controlNode);
//       const context = buildFieldContext(value);
//
//       // Retrieve initial values captured at focus-in time (EEData[9],[10])
//       const initialValues = FocusStoreApi.getState().initialValues;
//
//       await executeFormActionBindings(eeBindings, {
//           ...context,
//           fieldState: {
//               ...fieldState,
//               // Pass initial values so handlerForEEData can populate [9],[10]
//           },
//           control: controlNode.field,
//           xmlFileName: formRendererCtx.xmlFileName,
//           postProcessAction: '1',
//           // GAP #77: Pass initial values for change detection on the server
//           initialLValue: initialValues?.lValue ?? '',
//           initialXValue: initialValues?.xValue ?? '',
//       });
//
//       // Clear initial values after blur completes (they're per-focus-session)
//       FocusStoreApi.getState().actions.setInitialValues(null);
//   };

// ----------------------------------------------------------------
// STEP 3: Enhanced handleFocus with Pre-Process Server Call
// ----------------------------------------------------------------
//
// LOCATION: src/components/ui/field-renderer.tsx
// Inside the FieldRenderer component, the onFocusWithBindings callback
//
// ---- CURRENT CODE (approximate): ----
//
//   const onFocusWithBindings = async (value: unknown) => {
//       // Schema-level onFocus bindings (e.g., combo lazy-load)
//       const focusBindings = controlNode.schema?.events?.onFocus ?? [];
//       if (focusBindings.length === 0) return;
//
//       const context = buildFieldContext(value);
//       await executeFormActionBindings(focusBindings, {
//           ...context,
//           control: controlNode.field,
//           xmlFileName: formRendererCtx.xmlFileName,
//       });
//   };
//
// ---- NEW CODE (with pre-process EE call + initial value capture): ----
//
//   const onFocusWithBindings = async (value: unknown) => {
//       const matchcode = controlNode.field.matchcode;
//
//       // --- GAP #74: Skip if focusing the same field (no-op) ---
//       // VBS: If mstrPreviousMatchcode = pstrMatchcode, skip pre-process.
//       // This happens when a field loses and regains focus without another
//       // field in between (e.g., clicking outside the form and back).
//       const previousMatchcode = FocusStoreApi.getState().previousMatchcode;
//       // Note: We still capture initial values even for same-field re-focus.
//
//       // --- GAP #77: Capture initial values at focus-in time ---
//       // VBS: SetInitialValueData captures EEData[9] and [10] when a field
//       // gains focus. These are sent with the subsequent blur EE call so the
//       // server can compare old vs new values.
//       const initialValues = handlerForInitialValue({
//           field: controlNode.field,
//           value: toSafeString(value ?? ''),
//           selectedIndex: undefined, // TODO: pass actual index for combos
//           comboValue: undefined,    // TODO: pass actual combo value
//       });
//       FocusStoreApi.getState().actions.setInitialValues(initialValues);
//
//       // --- Existing: Schema-level onFocus bindings (combo lazy-load, etc.) ---
//       const focusBindings = controlNode.schema?.events?.onFocus ?? [];
//       if (focusBindings.length > 0) {
//           const context = buildFieldContext(value);
//           await executeFormActionBindings(focusBindings, {
//               ...context,
//               control: controlNode.field,
//               xmlFileName: formRendererCtx.xmlFileName,
//           });
//       }
//
//       // --- GAP #74: Pre-process server call for non-combo fields ---
//       // VBS: OnFocusPreProcess checks if the control has calls[] with type="pre".
//       // If so, it fires an XMLServerCall with postProcessAction="0".
//       // The Real POC only does this for combo lazy-load. We need to extend it
//       // to ALL fields that have pre-process bindings.
//       //
//       // Skip if same field (VBS: If mstrPreviousMatchcode <> pstrMatchcode)
//       if (previousMatchcode === matchcode) return;
//
//       const hasPreCall = controlNode.field.calls.some((c) => c.type === 'pre');
//       if (hasPreCall) {
//           const fieldState = buildFieldState(value, controlNode);
//           const context = buildFieldContext(value);
//
//           // Build a synthetic server-ee binding for the pre-process call
//           const preProcessBinding = {
//               type: 'server-ee' as const,
//               name: matchcode,
//           };
//
//           await executeFormActionBindings([preProcessBinding], {
//               ...context,
//               fieldState,
//               control: controlNode.field,
//               xmlFileName: formRendererCtx.xmlFileName,
//               // postProcessAction="0" signals to the server that this is a
//               // pre-process call (focus-enter), not a post-process (blur-exit).
//               // VBS: marrEEData(5) = "0"
//               postProcessAction: '0',
//               initialLValue: initialValues.initialLValue,
//               initialXValue: initialValues.initialXValue,
//           });
//       }
//   };

// ----------------------------------------------------------------
// STEP 4: Import Changes for field-renderer.tsx
// ----------------------------------------------------------------
//
// ADD these imports to field-renderer.tsx:
//
//   import { FocusStoreApi } from '@stores/focus-store';
//   import { handlerForInitialValue } from '@/handlers/common/payload';
//
// The existing imports for toSafeString, buildFieldState, getEEBindings,
// executeFormActionBindings, etc. are already present.

// ----------------------------------------------------------------
// STEP 5: FormActionContext Type Extension
// ----------------------------------------------------------------
//
// The FormActionContext in form-action-executor.ts needs these optional fields
// to carry initial values and postProcessAction through to handlerForEEData:
//
// ADD to FormActionContext interface in src/utils/form-action-executor.ts:
//
//   export interface FormActionContext {
//       // ... existing fields ...
//
//       /** Post-process action indicator. '0'=pre-process (focus), '1'=post-process (blur). */
//       postProcessAction?: string;
//       /** Initial lValue captured at focus-in time. EEData[9]. */
//       initialLValue?: string;
//       /** Initial xValue captured at focus-in time. EEData[10]. */
//       initialXValue?: string;
//   }
//
// NOTE: These fields may already be partially present in the FormActionContext
// type (the code has context.postProcessAction references). If so, just ensure
// initialLValue and initialXValue are added.

// ----------------------------------------------------------------
// STEP 6: Update executeServerEE to Pass Initial Values
// ----------------------------------------------------------------
//
// In src/utils/form-action-executor.ts, the executeServerEE function builds
// a FieldCommitContext and calls handlerForEEData. It needs to pass through
// the initial values from the FormActionContext:
//
// FIND in executeServerEE (approximately):
//
//   const fieldCommitCtx: FieldCommitContext = {
//       field: context.control,
//       value: context.fieldState.lValue,
//       // ...
//       postProcessAction: context.postProcessAction ?? '1',
//       xmlFileName: context.xmlFileName,
//       ruleAttribute: context.control.ruleAttribute ?? '',
//   };
//
// CHANGE TO:
//
//   const fieldCommitCtx: FieldCommitContext = {
//       field: context.control,
//       value: context.fieldState.lValue,
//       // ...
//       postProcessAction: context.postProcessAction ?? '1',
//       xmlFileName: context.xmlFileName,
//       ruleAttribute: context.control.ruleAttribute ?? '',
//       // GAP #70/#77: Pass initial values from focus-capture
//       initialLValue: context.initialLValue ?? '',
//       initialXValue: context.initialXValue ?? '',
//   };

// ----------------------------------------------------------------
// SUMMARY OF CHANGES BY FILE
// ----------------------------------------------------------------
//
// src/stores/focus-store.ts:
//   - Add previousMatchcode: string (default: '')
//   - Add initialValues: { lValue, xValue } | null (default: null)
//   - Add setPreviousMatchcode action
//   - Add setInitialValues action
//   - Add usePreviousMatchcode selector
//   - Add useInitialValues selector
//
// src/components/ui/field-renderer.tsx:
//   - Import FocusStoreApi, handlerForInitialValue
//   - onBlurWithValue: Add postprocessblanks check (skip if blank + false)
//   - onBlurWithValue: Set previousMatchcode before server call
//   - onBlurWithValue: Pass initial values to executeFormActionBindings
//   - onFocusWithBindings: Capture initial values via handlerForInitialValue
//   - onFocusWithBindings: Skip pre-process if same field re-focused
//   - onFocusWithBindings: Fire pre-process EE for fields with calls[type="pre"]
//
// src/utils/form-action-executor.ts:
//   - Add initialLValue?, initialXValue? to FormActionContext
//   - Pass initialLValue, initialXValue through to FieldCommitContext in executeServerEE
//
// ----------------------------------------------------------------
// EDGE CASES
// ----------------------------------------------------------------
//
// 1. Combo fields already handle onFocus via schema bindings (lazy-load).
//    The new pre-process check only fires for calls[type="pre"], which is
//    separate from the schema onFocus binding. Both can coexist.
//
// 2. postprocessblanks defaults to false (common.ts, form.ts). This means
//    by default, blank fields SKIP the blur server call — matching VBS default.
//    Fields that DO need blank-processing set postprocessblanks="T" in the API.
//
// 3. Tab navigation (Tab key between fields) fires blur on old field then
//    focus on new field. The previousMatchcode is set during blur, so by the
//    time focus fires, it correctly reflects the old field.
//
// 4. Server-triggered SET_FOCUS: When the server sends a SET_FOCUS command,
//    it calls FocusStoreApi.getState().actions.requestFocus(matchcode).
//    The field-renderer.tsx already handles this by calling .focus() on the
//    DOM element. The native focus event then fires onFocusWithBindings,
//    which runs the pre-process flow correctly.
