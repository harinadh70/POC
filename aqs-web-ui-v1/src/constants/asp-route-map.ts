/**
 * ASP Route Map - Maps legacy ASP filenames to React routes
 *
 * Supports:
 * - Exact mappings (e.g., 'Main_ISLLSYS_20010101.asp' -> 'Main_ISLLSYS_20010101')
 * - Pattern-based mappings using * wildcard (e.g., 'Pol_PIPHPOL_*' -> 'policyinfo')
 *
 * Pattern rules:
 * - Use * as wildcard for any characters
 * - Patterns are checked after exact matches
 * - First matching pattern wins
 */
export const ASP_Route_Map: Record<string, string> = {
    // System routes
    'Main_ISLLSYS_20010101.asp': 'Main_ISLLSYS_20010101',
    'Modal_ISLLSYS_20010101.asp': 'new-policy-dialog',
    'PageNotFound.asp': 'PageNotFound',
    'PageNotFound.aspx': 'PageNotFound',

    // Policy Information - Pattern for all versions
    'Pol_PIPHPOL_*.asp': 'policyinfo',
    'Pol_PIPHPOL_*.aspx': 'policyinfo',

    // LOB Action Menu - Pattern for all versions
    'ActMnu_*_Lob_*.asp': 'lob-action-menu',
    'ActMnu_*_Lob_*.aspx': 'lob-action-menu',

    // LOB Detail Pages - Pattern for all LOB types and versions
    // Matches: Pol_PIPHBOP_Ucp_20250201.asp, Pol_PIPHLIA_*.asp, etc.
    'Pol_PIPH*_*.asp': 'ultimate-cover',
    'Pol_PIPH*_*.aspx': 'ultimate-cover',
};
