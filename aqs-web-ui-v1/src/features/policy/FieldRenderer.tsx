// Generic FieldRenderer for PolicyInformation
// Renders fields based on controlType, using matchcode-driven logic.
// Compatible with static mapping and future dynamic JSON integration.

import React from 'react';
import { type PolicyInformationField } from './policy-information-fields';
import type { NormalizedField } from '@/types';
import { TextInput } from '@/components/text';
import { SelectInput } from '@/components/select';
import { RadioInput } from '@/components/radio';
import { CheckboxInput } from '@/components/checkbox';
import { DateInput } from '@/components/date';
import { TextAreaInput } from '@/components/textarea';

interface FieldRendererProps {
    field: PolicyInformationField | NormalizedField;
    value?: unknown;
    onChange?: (matchcode: string, value: unknown) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {
    switch (field.controlType) {
        case 'textbox':
            return (
                <TextInput
                    value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
                    onChange={(v) => onChange?.(field.matchcode, v)}
                    disabled={(field as any).disabled}
                />
            );
        case 'select':
            return (
                <SelectInput
                    options={(field as any).options ?? []}
                    value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
                    onChange={(v) => onChange?.(field.matchcode, v)}
                    disabled={(field as any).disabled}
                />
            );
        case 'radio':
            return (
                <RadioInput
                    options={(field as any).options ?? []}
                    value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
                    onChange={(v) => onChange?.(field.matchcode, v)}
                    disabled={(field as any).disabled}
                />
            );
        case 'checkbox':
            return (
                <CheckboxInput
                    checked={Boolean((field as any).defaultValue ?? value)}
                    onChange={(v) => onChange?.(field.matchcode, v)}
                    disabled={(field as any).disabled}
                />
            );
        case 'date':
            return (
                <DateInput
                    value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
                    onChange={(v) => onChange?.(field.matchcode, v)}
                    disabled={(field as any).disabled}
                />
            );
        case 'textarea':
            return (
                <TextAreaInput
                    value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
                    onChange={(v) => onChange?.(field.matchcode, v)}
                    disabled={(field as any).disabled}
                />
            );
        default:
            return null;
    }
};

// For dynamic JSON, pass normalized field objects with matchcode and controlType.
