// ============================================================================
// REBASE — field-renderer.tsx vs team commit 81e0b7ea
// Target: src/components/ui/field-renderer.tsx
// ============================================================================
//
// WHY THIS IS A PATCH, NOT A FULL FILE:
//   The earlier field-renderer.tsx change file was written against the
//   pre-refactor base and imported three modules the team deleted/replaced:
//     - '@stores/combo-options-store'  (deleted → useComboOptions on unified store)
//     - '@stores/focus-store'          (deleted → usePendingFocus/useFocusActions on unified store)
//     - '@hooks/use-pristine-snapshot' (superseded → team's @stores/pristine-store)
//   The team also already rewrote field-renderer's imports (IMG_5916/5917) and
//   implemented the focus round-trip (use-focus-roundtrip hook + unified-store
//   requestFocus/pendingFocus/isFocusProgrammatic/previousMatchcode). Only the
//   IMPORT lines of the team's field-renderer were photographed, not its body,
//   so a correct full-file replacement can't be reconstructed. This patch keeps
//   only the piece that is still an open gap and layers cleanly onto the team's
//   current handleChange.
//
// STATUS OF EACH ORIGINAL BLOCK AFTER 81e0b7ea:
//   GAP #70/#74 (focus post/pre-process, setPreviousMatchcode, pristine dirty-sync)
//       → NOW TEAM-OWNED. Focus round-trip lives in the unified store
//         (requestFocus/pendingFocus/isFocusProgrammatic/previousMatchcode) +
//         the pre-existing use-focus-roundtrip hook; dirty state lives in
//         pristine-store. Drop these blocks.
//   GAP #71/#72 (keystroke → required-gate recompute)  → STILL OPEN.
//       The team did NOT add an aggregate required-field gate (see
//       hooks/use-required-gate.ts). This block re-triggers RHF validation only
//       when a field flips empty<->non-empty, which is what useRequiredGate()
//       derives from. Keep — apply below.
//   Optional: blank-blur skip unless @postprocessblanks — apply only if the
//       team's handleBlur doesn't already gate blank posts (body not photographed).
//
// ─── APPLY: GAP #71/#72 keystroke → required-gate recompute ─────────────────
//
// (1) Module scope — previous-emptiness tracker (add near the top, after the
//     component registry):
//
//        // >>> GAP #71+#72: previous-emptiness tracker (keyed by matchcode)
//        const fieldWasEmptyByMatchcode = new Map<string, boolean>();
//        // <<< GAP #71+#72
//
// (2) Inside FieldRenderer — seed on mount, clear on unmount:
//
//        // >>> GAP #71+#72: seed the emptiness tracker on mount, clear on unmount
//        useEffect(() => {
//            const matchcode = controlNode.field.matchcode;
//            if (!fieldWasEmptyByMatchcode.has(matchcode)) {
//                const initial = toSafeString(getValues()[matchcode] ?? controlNode.field.text ?? '');
//                fieldWasEmptyByMatchcode.set(matchcode, initial.trim() === '');
//            }
//            return () => { fieldWasEmptyByMatchcode.delete(matchcode); };
//            // eslint-disable-next-line react-hooks/exhaustive-deps
//        }, [controlNode.field.matchcode]);
//        // <<< GAP #71+#72
//
// (3) Inside handleChange — after rhfOnChange(value), before the onChange bindings:
//
//        // >>> GAP #71+#72: empty<->non-empty transition recomputes the gate.
//        // Re-triggering RHF validation updates formState, which useRequiredGate() reads.
//        const matchcode = controlNode.field.matchcode;
//        const isEmpty = toSafeString(value ?? '').trim() === '';
//        const wasEmpty = fieldWasEmptyByMatchcode.get(matchcode);
//        fieldWasEmptyByMatchcode.set(matchcode, isEmpty);
//        if (wasEmpty !== undefined && wasEmpty !== isEmpty) {
//            await trigger(matchcode);
//        }
//        // <<< GAP #71+#72
//
// Requires `trigger` from useFormContext() and `toSafeString` from
// '@utils/to-safe-string' (both already imported in the team's field-renderer).
//
// ─── OPTIONAL: blank-blur skip (GAP #70 leftover, verify first) ─────────────
// If the team's handleBlur does not already skip blank posts, add before the
// EE server call:
//        // Blank fields do not post unless @postprocessblanks (VBS OnFocusHandler)
//        const isBlank = toSafeString(value ?? '').trim() === '';
//        if (isBlank && !controlNode.field.postprocessblanks) return;
// ============================================================================
