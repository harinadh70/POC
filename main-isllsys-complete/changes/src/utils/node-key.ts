// VBS: Main_ISLLSYS #36 SetExpiredNumber          (lines 2782-2815)
//    + #23 GetActionMenuNameException (lines 1937-1964)
// Pure nodeKey string utilities.

/**
 * #36: replace the 3rd pipe-field of a nodeKey with the expired number.
 *   replaceExpiredNumber('POL|POL|0|', '123') -> 'POL|POL|123|'
 */
export function replaceExpiredNumber(nodeKey: string, expiredNumber: string | number): string {
    const hadTrailing = nodeKey.endsWith('|');
    const parts = nodeKey.replace(/\|$/, '').split('|');
    if (parts.length >= 3) parts[2] = String(expiredNumber);
    return parts.join('|') + (hadTrailing ? '|' : '');
}

/**
 * #23: derive the LOB/program key used for menu + toolbar routing.
 * Normal rule: first pipe-field. BOP exception (legacy): the program type
 * lives in the 4th element (5th when present) — verify the exact elements
 * against a live BOP nodeKey at integration.
 */
export function lobFromNodeKey(nodeKey: string): string {
    const parts = nodeKey.replace(/\|$/, '').split('|');
    const lob = (parts[0] ?? '').toUpperCase();

    if (lob === 'BOP') {
        const programType = parts[4] || parts[3] || '';
        return programType ? `${lob}|${programType}` : lob;
    }
    return lob;
}

export default { replaceExpiredNumber, lobFromNodeKey };
