// VBS: Main_ISLLSYS #83 ShowZeroText (lines 8986-9022)
// Derive the combo's empty-option label from the control's showzero
// attribute:
//   undefined / "F"  -> no empty option at all (null)
//   "T"              -> blank empty option ("")
//   any other string -> that string is the empty-option label

export function showZeroLabel(showzero: string | undefined): string | null {
    if (showzero === undefined) return null;
    const v = showzero.trim();
    if (v === '' || v.toUpperCase() === 'F') return null;
    if (v.toUpperCase() === 'T') return '';
    return v;
}

export default showZeroLabel;
