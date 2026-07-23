// MODIFIED — original: src/components/ui/field-renderer.tsx (aqs-web-ui real POC)
// Integrated: GAP #70 + #74 (OnFocusHandler + OnFocusPreProcess, VBS 6878-7274 / 7430-7522),
//             GAP #71 + #72 (OnKeyPressHandler + OnKeyUpHandler, VBS 7277-7414)
// #70: handleBlur — postprocessblanks skip + setPreviousMatchcode + syncDataChanged (dirty on blur)
// #74: handleFocus — 'pre' EE call (postProcessAction '0') now fires for NON-combo fields too
// #71+#72: handleChange — empty<->non-empty transition re-triggers validation for the required gate
// Every change is fenced with  >>> GAP #NN ... <<< GAP #NN  markers.

import { Suspense, useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormField as Field } from './form-field';
import { ActionButton } from './action-button';

// registry
import { FIELD_REGISTRY, FIELD_META } from './registry';
import type { FieldRegistryKey } from './registry';

// utils
import { resolveProperty } from '@utils/schema-merger';
import { buildControllerRules } from '@utils/validation-rules';
import {
	executeFormActionBindings,
	type FieldCommitState,
	type FormActionContext,
} from '@utils/form-action-executor';
import { toSafeString } from '@utils/to-safe-string';

// context
import { useDerivedFieldState } from '@/contexts/derived-fields-context';
import { useFormRendererContext } from '@components/ui/form-renderer-context';
import { useRuntimeOverride } from '@stores/runtime-override-store';
import { useHandlers } from '@/contexts/handlers-context';
import { useComboOptions } from '@stores/combo-options-store';
import { usePendingFocus, useFocusActions } from '@stores/focus-store';

// >>> GAP #70: OnFocusHandler — pristine-snapshot dirty sync + mstrPreviousMatchcode tracking
import { usePristineSnapshotContext } from '@hooks/use-pristine-snapshot';
import { useGlobalVarsActions } from '@stores/global-vars-store';
// <<< GAP #70

// types
import type { ComponentType } from 'react';
import type { OptionItem } from '@types/form';
import type { ControlNode } from '@types/layout';
import type { ActionBinding } from '@types/frame';

// ---------------------------------------
// Narrow component prop interfaces (kept for type-safe rendering)
// ---------------------------------------

interface ComponentProps {
	textbox: {
		name: string;
		value: string;
		onChange: (value: string) => void;
		onBlur?: () => void;
		disabled?: boolean;
	};

	textarea: {
		name: string;
		value: string;
		onChange: (value: string) => void;
		onBlur?: () => void;
		disabled?: boolean;
		rows?: number;
	};

	date: {
		name: string;
		value: string;
		onChange: (value: string) => void;
		onBlur?: () => void;
		disabled?: boolean;
	};

	numeric: {
		name: string;
		value: string;
		onChange: (value: string) => void;
		onBlur?: () => void;
		disabled?: boolean; // [truncated]
		name: string;
		checked: boolean;
		onChange: (checked: boolean) => void;
		onBlur?: () => void;
		label: string; // [truncated]
// [gap: lines 76-91 not photographed]
	checkbox: {
		name: string;
		checked: boolean;
		onChange: (checked: boolean) => void;
		onBlur?: () => void;
		label: string;
		disabled?: boolean;
	};
}

type ComponentRegistry = {
	[K in keyof ComponentProps]: ComponentType<ComponentProps[K]>;
};

interface RHFFieldLike {
	value: unknown;
	onChange: (...args: unknown[]) => void;
}

const COMPONENT_REGISTRY = FIELD_REGISTRY as unknown as ComponentRegistry;

// >>> GAP #71+#72: OnKeyPress/OnKeyUp — previous-emptiness tracker (module scope, keyed by matchcode)
const fieldWasEmptyByMatchcode = new Map<string, boolean>();
// <<< GAP #71+#72

function buildFieldState(value: unknown, controlNode: ControlNode): FieldCommitState {
	const ct = controlNode.field.controltype;

	if (ct === 'checkbox') {
		const checked = Boolean(value);
		return {
			lValue: checked ? 'YES' : 'NO',
			xValue: checked ? '1' : '0',
		};
	}

	if (ct === 'combo') {
		// value is the option's value attribute; label is needed for lValue
		// For now, use value as both until combo options are wired
		const strValue = toSafeString(value ?? ''); // [truncated]
		return { lValue: strValue, xValue: strValue };
	}

	// textbox / textarea / numeric / date
	return {
		lValue: toSafeString(value ?? ''),
		xValue: '',
	};
}

function getEEBindings(controlNode: ControlNode): ActionBinding[] {
	// 1. Prefer explicit schema events (static pages with authored schema)
	const schemaBindings = controlNode.field.schemaEvents?.onBlur ?? [];
	if (schemaBindings.length > 0) return schemaBindings;

	// 2. Fall back to calls[] from the raw API control (dynamic pages).
	const hasPostCall = controlNode.field.calls.some((c) => c.type === 'post');
	if (!hasPostCall) return [];

	// Synthetic server-ee binding - name is the matchcode
	return [{ type: 'server-ee', name: controlNode.field.matchcode }]; // [truncated]
// FieldRenderer v2
// Accepts a ControlNode (schema metadata + MergedField runtime state).
// Reads derived visibility/disabled overrides from DerivedFieldsContext.
// ---------------------------------------------------------------

interface FieldRendererProps {
	controlNode: ControlNode;
}

function FieldRenderer({ controlNode }: FieldRendererProps) {
	const { control, getValues, setValue, trigger, handleSubmit, reset } =
		useFormContext<Record<string, unknown>>();
	const formRendererCtx = useFormRendererContext();
	const navigate = useNavigate();
	const formValues = useWatch({ control }) as Record<string, unknown>;

	// Read derived overrides from context (set by FormRenderer's DerivedFieldsProvider)
	const derived = useDerivedFieldState(controlNode.field.matchcode);
	const runtimeOverride = useRuntimeOverride(controlNode.field.matchcode);
	const handlers = useHandlers();
	const isVisible = runtimeOverride?.visible ?? derived?.visible ?? controlNode.field.visible;
	const isDisabled = runtimeOverride?.disabled ?? derived?.disabled ?? controlNode.field.disabled;
	const isRequired = runtimeOverride?.required ?? controlNode.field.required;
	const isReadOnly = runtimeOverride?.readOnly ?? false;

	// Runtime options loaded by LOAD_COMBO / ADD_LISTITEM commands
	const runtimeComboOptions = useComboOptions(controlNode.field.matchcode);

	// Focus request from SET_FOCUS browser command
	const pendingFocus = usePendingFocus();
	const focusActions = useFocusActions(); // [truncated]

	// >>> GAP #70: OnFocusHandler — pristine snapshot (dirty sync) + previous-matchcode actions
	const { syncDataChanged } = usePristineSnapshotContext();
	const globalVarsActions = useGlobalVarsActions();
	// <<< GAP #70

	// >>> GAP #71+#72: OnKeyPress/OnKeyUp — seed the emptiness tracker on mount, clear on unmount
	useEffect(() => {
		const matchcode = controlNode.field.matchcode;
		if (!fieldWasEmptyByMatchcode.has(matchcode)) {
			const initial = toSafeString(getValues()[matchcode] ?? controlNode.field.text ?? '');
			fieldWasEmptyByMatchcode.set(matchcode, initial.trim() === '');
		}
		return () => {
			fieldWasEmptyByMatchcode.delete(matchcode);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [controlNode.field.matchcode]);
	// <<< GAP #71+#72
	// renderWhen: simple field-equality expression evaluation (Phase 3)
	// Full expression via new Function is Phase 5
	if (!shouldRender(controlNode.schema?.renderWhen, formValues)) return null;
	if (!isVisible) return null;

	// Button controls bypass the Controller wrapper entirely
	if (controlNode.field.controltype === 'button') {
		return <ActionButton node={controlNode} />;
	}

	if (!(controlNode.field.controltype in COMPONENT_REGISTRY)) return null;

	const validationRules = buildControllerRules(controlNode.schema?.validations ?? [], getValues);
	const label = resolveProperty(controlNode.schema?.label, controlNode.field.ctrllabel);
	const buildFieldContext = (value: unknown): FormActionContext => ({
		getValues,
		setValue,
		trigger,
		handleSubmit,
		reset,
		navigate,
		routerContext: formRendererCtx.routerContext,
		control: controlNode.field, // [truncated]
// [gap: lines 203-325 not photographed]

	// [reconstructed] handleBlur / handleChange / handleFocus below re-create the existing
	// handler wrappers from the unphotographed region above (they are passed to
	// renderFieldComponent as onBlurWithValue / onChangeWithBindings / onFocusWithBindings).
	// Merge ONLY the fenced GAP blocks into the real handlers.

	const handleBlur = async (value: unknown) => {
		// >>> GAP #70: OnFocusHandler — dirty derivation on blur (pristine-snapshot diff)
		syncDataChanged(controlNode.field.matchcode, value);
		// <<< GAP #70

		const bindings = getEEBindings(controlNode);
		if (bindings.length === 0) return;

		// >>> GAP #70: OnFocusHandler — blank fields do not post unless @postprocessblanks (VBS 6878-7274)
		const isBlank = toSafeString(value ?? '').trim() === '';
		if (isBlank && !controlNode.field.postprocessblanks) return;
		// <<< GAP #70

		// >>> GAP #70: OnFocusHandler — mstrPreviousMatchcode tracking before the server call
		// (setPreviousMatchcode already exists on the global-vars-store actions interface)
		globalVarsActions.setPreviousMatchcode(controlNode.field.matchcode);
		// <<< GAP #70

		await executeFormActionBindings(bindings, buildFieldContext(value));
	};

	const handleChange = async (value: unknown, rhfOnChange: (...args: unknown[]) => void) => {
		rhfOnChange(value);

		// >>> GAP #71+#72: OnKeyPress/OnKeyUp — empty<->non-empty transition recomputes the gate
		// Re-triggering RHF validation updates formState, which useRequiredGate() derives from.
		const matchcode = controlNode.field.matchcode;
		const isEmpty = toSafeString(value ?? '').trim() === '';
		const wasEmpty = fieldWasEmptyByMatchcode.get(matchcode);
		fieldWasEmptyByMatchcode.set(matchcode, isEmpty);
		if (wasEmpty !== undefined && wasEmpty !== isEmpty) {
			await trigger(matchcode);
		}
		// <<< GAP #71+#72

		const bindings = controlNode.field.schemaEvents?.onChange ?? [];
		if (bindings.length === 0) return;
		await executeFormActionBindings(bindings, buildFieldContext(value));
	};

	const handleFocus = async (value: unknown) => {
		// Schema-authored onFocus bindings (static pages) — pre-process semantics
		const schemaBindings = controlNode.field.schemaEvents?.onFocus ?? [];
		if (schemaBindings.length > 0) {
			await executeFormActionBindings(schemaBindings, {
				...buildFieldContext(value),
				postProcessAction: '0',
			});
			return;
		}

		// Combo lazy-load — <call type="pre"> fires on focus with postProcessAction '0'
		const hasPreCall = controlNode.field.calls.some((c) => c.type === 'pre');
		if (!hasPreCall) return;
		if (controlNode.field.controltype === 'combo') {
			await executeFormActionBindings(
				[{ type: 'server-ee', name: controlNode.field.matchcode }],
				{ ...buildFieldContext(value), postProcessAction: '0' },
			);
			return;
		}

		// >>> GAP #74: OnFocusPreProcess — fire 'pre' EE calls for NON-combo controls too (VBS 7430-7522)
		// Legacy pre-process ran for ANY control carrying a <call type="pre">, not only combos.
		await executeFormActionBindings(
			[{ type: 'server-ee', name: controlNode.field.matchcode }],
			{ ...buildFieldContext(value), postProcessAction: '0' },
		);
		// <<< GAP #74
	};
function shouldRender(
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	return fn({ data: formValues }) as boolean;
	} catch (err) {
		console.warn('[FieldRenderer] renderWhen evaluation error:', err, renderWhen);
		return true; // fail-open: never accidentally hide a field on a bad expression
	}
}

// ---------------------------------------------------------------
// renderFieldComponent
// Type-safe dispatch to the correct lazy component.
// ---------------------------------------------------------------

function renderFieldComponent(
	controlNode: ControlNode,
	rhfField: RHFFieldLike,
	isDisabled: boolean,
	isReadOnly: boolean,
	onBlurWithValue: (value: unknown) => Promise<void>,
	onChangeWithBindings: (
		value: unknown,
		rhfOnChange: (...args: unknown[]) => void,
	) => Promise<void>,
	onFocusWithBindings: (value: unknown) => Promise<void>,
	runtimeComboOptions: OptionItem[] | undefined,
) {
	const field = controlNode.field;
	const controltype = field.controltype;
	// readOnly is surfaced as disabled until individual components add native readOnly support
	const effectiveDisabled = isDisabled || isReadOnly;

	switch (controltype) {
		case 'checkbox': {
			const Component = COMPONENT_REGISTRY.checkbox;
			return (
				// [truncated]
					disabled={effectiveDisabled}
				/>
			);
		}

		case 'radiobutton': {
			const Component = COMPONENT_REGISTRY.radiobutton;
			const options = (field.listitems.item ?? []).map((item) => ({
				value: item.value,
				label: item.displayText,
				disabled: false as const,
			}));
			return (
				<Component
					name={field.matchcode}
					value={toSafeString(rhfField.value)}
					onChange={(value) => {
						void onChangeWithBindings(value, rhfField.onChange);
					}}
					onBlur={() => {
						void onBlurWithValue(rhfField.value); // [truncated]
					onBlur={() => { // [truncated]
                <Component
