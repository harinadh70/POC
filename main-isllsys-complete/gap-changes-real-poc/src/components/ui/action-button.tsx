// MODIFIED — original: src/components/ui/action-button.tsx (aqs-web-ui real POC)
// Integrated: GAP #48 — CheckRequiredIndicators required gate (VBS 3536-3821)
// Gated buttons (isGatedButton: OK/NEXT/SAVE/SUBMIT style) disable while useRequiredGate()
// reports the form incomplete; the button title lists the incomplete field labels.
// Every change is fenced with  >>> GAP #48 ... <<< GAP #48  markers.
// NOTE: the photo-original is truncated mid-file (context literal → return JSX);
// the missing region is completed from the field-renderer FormActionContext pattern
// and marked "(completed from truncated photo-original)".

import { Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

// components
import { useFormRendererContext } from '@components/ui/form-renderer-context';

// contexts
import { useHandlers } from '@/contexts/handlers-context';

// >>> GAP #48: CheckRequiredIndicators — required gate (hook lives in src/hooks/use-required-gate)
import { useRequiredGate, isGatedButton } from '@hooks/use-required-gate';
// <<< GAP #48

// utils
import { executeFormActionBindings } from '@utils/form-action-executor';
import { resolveProperty } from '@utils/schema-merger';

// types
import type { ControlNode } from '@/types/layout';
import type { FormActionContext } from '@utils/form-action-executor';

// ----------------------------------------------
// ActionButton
// Renders action buttons (OK, Cancel, NEXT, SAVE, etc.) from a ControlNode.
// Variant detection is based on matchcode keywords (case-insensitive).
// Full click-handler EE wiring is Phase 5 — this phase stubs it.
// ----------------------------------------------

interface ActionButtonProps {
    node: ControlNode;
}

type ButtonVariant = 'contained' | 'outlined';
type ButtonColor = 'primary' | 'inherit' | 'secondary';

function detectVariant(matchcode: string): { variant: ButtonVariant; color: ButtonColor } {
    const code = matchcode.toUpperCase();

    if (/OK|SAVE|NEXT|SUBMIT|ADD/.test(code)) {
        return { variant: 'contained', color: 'primary' };
    }
    if (/CANCEL|CLOSE|BACK/.test(code)) {
        return { variant: 'outlined', color: 'inherit' };
    }
    return { variant: 'contained', color: 'secondary' };
}

function ActionButton({ node }: ActionButtonProps) {
    const { getValues, setValue, trigger, handleSubmit, reset } = useFormContext();
    const navigate = useNavigate();
    const formRendererCtx = useFormRendererContext();
    const handlers = useHandlers();

    // >>> GAP #48: CheckRequiredIndicators — aggregate required-field gate (VBS 3536-3821)
    const { isFormComplete, incompleteFields } = useRequiredGate();
    const isGated = isGatedButton(node.field.matchcode); // OK / NEXT / SAVE / SUBMIT style buttons
    const isBlockedByGate = isGated && !isFormComplete;
    // <<< GAP #48

    const { variant, color } = detectVariant(node.field.matchcode);
    const label = resolveProperty(node.schema?.label, node.field.ctrllabel);

    const handleClick = async () => {
        const bindings = node.schema?.events?.onClick ?? [];
        if (bindings.length === 0) {
            console.warn('[ActionButton] No onClick bindings for:', node.field.matchcode);
            return;
        }

        const context: FormActionContext = {
            getValues,
            setValue,
            trigger,
            handleSubmit,
            reset,
            navigate,
            // (completed from truncated photo-original) — same context shape field-renderer builds
            routerContext: formRendererCtx.context,
            control: node.field,
            xmlFileName: formRendererCtx.context.xmlFileName,
            handlers,
        };

        await executeFormActionBindings(bindings, context);
    };

    return (
        <Button
            variant={variant}
            color={color}
            /* >>> GAP #48: gated buttons disable until every required field is complete */
            disabled={isBlockedByGate}
            title={
                isBlockedByGate
                    ? 'Complete required fields: ' + incompleteFields.join(', ')
                    : undefined
            }
            /* <<< GAP #48 */
            onClick={handleClick}
        >
            {label}
        </Button>
    );
}

export { ActionButton };
