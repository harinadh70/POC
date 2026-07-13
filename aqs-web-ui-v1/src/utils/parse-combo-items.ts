import type { OptionItem } from '@/types';

/**
 * Parse LOAD_COMBO pipe-delimited array into normalized select options.
 *
 * Format: ["", "Label1|Value1", "Label2|Value2"]
 * where entries are split on the pipe (|) character.
 */
export function parseComboItems(input: unknown): OptionItem[] {
    if (!input) {
        return [];
    }

    let items: string[] = [];

    if (Array.isArray(input)) {
        items = input.filter((item): item is string => typeof item === 'string');
    } else if (typeof input === 'string') {
        items = [input];
    } else {
        return [];
    }

    const parsed: OptionItem[] = [];

    for (const item of items) {
        const trimmed = item.trim();
        if (trimmed === '') {
            continue;
        }

        const pipeIndex = trimmed.indexOf('|');
        if (pipeIndex === -1) {
            parsed.push({
                label: trimmed,
                value: trimmed,
            });
            continue;
        }

        const label = trimmed.substring(0, pipeIndex).trim();
        const value = trimmed.substring(pipeIndex + 1).trim();

        parsed.push({
            label: label || value,
            value: value || label,
        });
    }

    return parsed;
}
