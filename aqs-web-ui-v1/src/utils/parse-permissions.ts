import type { FieldPermission, PermissionSnapshot } from '@/types';

const ASP_FILE_PATTERN = /([A-Za-z0-9_]+\.asp)\b/gi;
const DENY_KEYWORD_PATTERN = /(deny|denied|forbid|forbidden|block|blocked|disallow|restricted)/i;
const PAGE_KEYWORD_PATTERN = /(asp|page|route|file)/i;
const ACTION_KEYWORD_PATTERN = /(action|actions|verb|verbs|command|commands)/i;
const FIELD_CONTAINER_PATTERN = /(field|fields|control|controls|permission|permissions)/i;

const FIELD_VISIBLE_KEYS = new Set(['visible', 'isvisible']);
const FIELD_EDITABLE_KEYS = new Set(['editable', 'iseditable']);
const FIELD_REQUIRED_KEYS = new Set(['required', 'isrequired']);
const FIELD_HIDDEN_KEYS = new Set(['hidden', 'ishidden']);
const FIELD_DISABLED_KEYS = new Set(['disabled', 'isdisabled']);
const FIELD_ENABLED_KEYS = new Set(['enabled', 'isenabled']);
const FIELD_READ_ONLY_KEYS = new Set(['readonly', 'read_only', 'read-only', 'isreadonly']);

/**
 * Normalize `xdiSecurity` + `xdiOptions` payloads into a stable permissions snapshot.
 *
 * @param xdiSecurity - Raw security payload from GetUserData
 * @param xdiOptions - Raw options payload from GetUserData
 * @returns Normalized `PermissionSnapshot`
 */
export function parsePermissions(
    xdiSecurity: Record<string, unknown> | null | undefined,
    xdiOptions: Record<string, unknown> | null | undefined,
): PermissionSnapshot {
    const rawSecurity = toRecord(xdiSecurity);
    const rawOptions = toRecord(xdiOptions);

    const allowedAspFiles = new Set<string>();
    const deniedAspFiles = new Set<string>();
    collectPagePermissions(rawSecurity, [], allowedAspFiles, deniedAspFiles);

    const allow = new Set<string>();
    const deny = new Set<string>();
    collectActionPermissions(rawSecurity, [], allow, deny);
    collectActionPermissions(rawOptions, [], allow, deny);

    const fields = collectFieldPermissions(rawSecurity);

    return {
        rawSecurity,
        rawOptions,
        page: {
            allowedAspFiles: [...allowedAspFiles],
            deniedAspFiles: [...deniedAspFiles],
        },
        actions: {
            allow: [...allow],
            deny: [...deny],
        },
        fields,
    };
}

/**
 * Backward-compatible alias for callers that prefer `normalizePermissions` naming.
 */
export const normalizePermissions = parsePermissions;

function collectPagePermissions(
    node: unknown,
    path: string[],
    allowed: Set<string>,
    denied: Set<string>,
): void {
    if (typeof node === 'string') {
        if (!path.some((key) => PAGE_KEYWORD_PATTERN.test(key))) {
            return;
        }

        const fileNames = extractAspFiles(node);
        if (fileNames.length === 0) {
            return;
        }
        const target = isDenyPath(path) ? denied : allowed;
        for (const fileName of fileNames) {
            target.add(fileName);
        }
        return;
    }
    if (Array.isArray(node)) {
        for (const item of node) {
            collectPagePermissions(item, path, allowed, denied);
        }
        return;
    }
    if (!isRecord(node)) {
        return;
    }

    for (const [key, value] of Object.entries(node)) {
        collectPagePermissions(value, [...path, key], allowed, denied);
    }
}

function collectActionPermissions(
    node: unknown,
    path: string[],
    allow: Set<string>,
    deny: Set<string>,
): void {
    if (typeof node === 'string') {
        if (!path.some((key) => ACTION_KEYWORD_PATTERN.test(key))) {
            return;
        }

        for (const action of extractActionNames(node)) {
            (isDenyPath(path) ? deny : allow).add(action);
        }
        return;
    }

    if (Array.isArray(node)) {
        for (const item of node) {
            collectActionPermissions(item, path, allow, deny);
        }
        return;
    }

    if (!isRecord(node)) {
        return;
    }

    const inActionPath = path.some((key) => ACTION_KEYWORD_PATTERN.test(key));

    for (const [key, value] of Object.entries(node)) {
        if (inActionPath) {
            const boolValue = toBoolean(value);
            if (boolValue !== undefined && isActionNameCandidate(key)) {
                (boolValue ? allow : deny).add(normalizeActionName(key));
                continue;
            }
        }

        collectActionPermissions(value, [...path, key], allow, deny);
    }
}

function collectFieldPermissions(source: Record<string, unknown>): Record<string, FieldPermission> {
    const fields: Record<string, FieldPermission> = {};

    const visit = (node: unknown, path: string[]): void => {
        if (Array.isArray(node)) {
            for (const item of node) {
                visit(item, path);
            }
            return;
        }

        if (!isRecord(node)) {
            return;
        }

        if (hasFieldPermissionFlags(node)) {
            const matchcodeValue = getStringValue(node.matchcode) ?? deriveMatchcodeFromPath(path);
            if (matchcodeValue) {
                fields[matchcodeValue] = {
                    ...(fields[matchcodeValue] ?? { visible: true, editable: true }),
                    ...toFieldPermission(node),
                };
            }
        }

        for (const [key, value] of Object.entries(node)) {
            const nextPath = [...path, key];
            if (
                !path.some((segment) => FIELD_CONTAINER_PATTERN.test(segment)) &&
                !FIELD_CONTAINER_PATTERN.test(key)
            ) {
                visit(value, nextPath);
                continue;
            }
            visit(value, nextPath);
        }
    };

    visit(source, []);
    return fields;
}

function toFieldPermission(value: Record<string, unknown>): FieldPermission {
    const visibleValue =
        readBoolean(value, FIELD_VISIBLE_KEYS) ??
        invertBoolean(readBoolean(value, FIELD_HIDDEN_KEYS)) ??
        true;

    const editableValue =
        readBoolean(value, FIELD_EDITABLE_KEYS) ??
        readBoolean(value, FIELD_ENABLED_KEYS) ??
        invertBoolean(readBoolean(value, FIELD_DISABLED_KEYS)) ??
        invertBoolean(readBoolean(value, FIELD_READ_ONLY_KEYS)) ??
        true;

    const requiredValue = readBoolean(value, FIELD_REQUIRED_KEYS);

    return {
        visible: visibleValue,
        editable: editableValue,
        ...(requiredValue === undefined ? {} : { required: requiredValue }),
    };
}

function hasFieldPermissionFlags(value: Record<string, unknown>): boolean {
    return Object.keys(value).some((key) => {
        const normalizedKey = normalizeKey(key);
        return (
            FIELD_VISIBLE_KEYS.has(normalizedKey) ||
            FIELD_EDITABLE_KEYS.has(normalizedKey) ||
            FIELD_REQUIRED_KEYS.has(normalizedKey) ||
            FIELD_HIDDEN_KEYS.has(normalizedKey) ||
            FIELD_DISABLED_KEYS.has(normalizedKey) ||
            FIELD_ENABLED_KEYS.has(normalizedKey) ||
            FIELD_READ_ONLY_KEYS.has(normalizedKey)
        );
    });
}

function readBoolean(value: Record<string, unknown>, keys: Set<string>): boolean | undefined {
    for (const [key, raw] of Object.entries(value)) {
        if (!keys.has(normalizeKey(key))) {
            continue;
        }
        const boolValue = toBoolean(raw);
        if (boolValue !== undefined) {
            return boolValue;
        }
    }
    return undefined;
}

function deriveMatchcodeFromPath(path: string[]): string | undefined {
    if (path.length === 0) {
        return undefined;
    }

    const candidate = path[path.length - 1].trim();
    if (!candidate || FIELD_CONTAINER_PATTERN.test(candidate)) {
        return undefined;
    }

    return candidate;
}

function extractAspFiles(value: string): string[] {
    const matches = value.match(ASP_FILE_PATTERN);
    if (!matches) {
        return [];
    }

    return matches.map((file) => file.replace(/^.*[\\/]/, ''));
}

function extractActionNames(value: string): string[] {
    const segments = value
        .split(/[|,;\n\r\t ]+/)
        .map((segment) => normalizeActionName(segment))
        .filter((segment) => segment.length > 0)
        .filter((segment) => !segment.endsWith('.ASP'))
        .filter((segment) => segment !== 'ALLOW' && segment !== 'DENY');

    return [...new Set(segments)];
}

function normalizeActionName(value: string): string {
    return value.trim().toUpperCase();
}

function isActionNameCandidate(value: string): boolean {
    if (!value || ACTION_KEYWORD_PATTERN.test(value)) {
        return false;
    }

    return /^[A-Za-z_][A-Za-z0-9_:-]*$/.test(value);
}

function isDenyPath(path: string[]): boolean {
    return path.some((key) => DENY_KEYWORD_PATTERN.test(key));
}

function invertBoolean(value: boolean | undefined): boolean | undefined {
    if (value === undefined) {
        return undefined;
    }

    return !value;
}

function toRecord(value: Record<string, unknown> | null | undefined): Record<string, unknown> {
    if (!isRecord(value)) {
        return {};
    }

    return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeKey(value: string): string {
    return value.trim().toLowerCase().replace(/[_-]/g, '');
}

function getStringValue(value: unknown): string | undefined {
    if (typeof value !== 'string') {
        return undefined;
    }

    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
}

function toBoolean(value: unknown): boolean | undefined {
    if (typeof value === 'boolean') {
        return value;
    }

    if (typeof value === 'number') {
        if (value === 1) return true;
        if (value === 0) return false;
        return undefined;
    }

    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (!normalized) {
            return undefined;
        }

        if (['t', 'true', 'y', 'yes', '1'].includes(normalized)) {
            return true;
        }

        if (['f', 'false', 'n', 'no', '0'].includes(normalized)) {
            return false;
        }
    }

    return undefined;
}
