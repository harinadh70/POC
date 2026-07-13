// Ultimate Cover page types and interfaces

export interface SessionData {
    CompLoc: string;
    UserId: string;
    PolicyId: string;
    NodeKey: string;
    Action: string;
    DiagnosticMode: string;
    SessionXml: string;
}

export interface ListItem {
    '@value': string;
    '#text': string;
}

export interface ControlCallData {
    '@type': string;
    call: Call | Call[];
}

export interface Call {
    '@project': string;
    '@class': string;
    '@subroutine': string;
    '@componenttype'?: string;
}

export interface Control {
    '@matchcode': string;
    '@controltype'?: string;
    '@text'?: string;
    '@default'?: string;
    '@required'?: string;
    '@disabled': string;
    '@visible'?: string;
    '@⟪utporder?⟫'?: string;
    '@limittolist'?: string;
    '@showzero'?: string;
    '@rule'?: string;
    [key: string]: any;
    listitems?: {
        item: ListItem[];
    };
    calls?: ControlCallData | ControlCallData[];
}

export interface PageData {
    '@BOPPOLRLV': string;
    '@matchcode': string;
    '@elapsedtime': string;
    controls: {
        control: Control[];
    };
    treenode?: {
        node: {
            '@text': string;
            '@image': string;
            '@nodekey': string;
            '@parentkey': string;
        };
    };
    calls?: {
        '@type': string;
        call: Call;
    };
}

export interface UltimateCoverPageResponse {
    Session: SessionData;
    Page: PageData;
    ListData: any;
}

export interface UltimateCoverFormData {
    // Policy Tab
    BOPPOLEXT_Coi_StringValue?: string; // Coinsurance
    BOPPOL_LDED2?: string; // Building Deductible
    BOPPOL_LDED1?: string; // Pers Prop Deductible
    BOPPOLEXT_Idd_StringValue?: string; // Transit Deductible
    BOPPOLEXT_Fdd_StringValue?: string; // Flood Deductible
    BOPPOLEXT_Eqd_StringValue?: string; // Earthquake Deductible
    BOPPOLEXT_EqdPer_StringValue?: string; // EQ Percentage Deductible
    BOPPOLEXT_Wsh_StringValue?: string; // Wind/Hail Deductible
    BOPPOLEXT_WatDam_StringValue?: string; // Water Damage Deductible
    BOPPOLEXT_Loc_DoubleValue?: string; // # of Locations
    BOPPOLEXT_Csp_StringValue?: string; // CSP Code
    BOPPOL_LPRISTANAM?: string; // Primary State
    BOPPOLEXT_AgdVal_BooleanValue?: boolean; // Agreed Value
    BOPPOL_BMRFMRCEXC?: boolean; // Microfracture Exclusion
    BOPPOL_NIRM7?: string; // Expense Mod
    BOPPOLEXT_SdsDed_StringValue?: string; // Sewer/Drain/Sump Ded
    BOPPOLEXT_Sp1Ded_StringValue?: string; // Sprinkler Leakage Ded
    BOPPOLEXT_PbdDed_BooleanValue?: boolean; // Per Building Ded
    BOPPOLEXT_AllBldRofSrf_BooleanValue?: boolean; // All Bldgs Roof Surfacing
    BOPPOLEXT_TERRSK_StringValue?: string; // Terrorism Coverage

    // Details Tab
    BOPPOL_LEXPPOLNUM?: string; // Prev. Policy Number
    BOPPOL_NRLVEFFDAT?: string; // Rate Level Eff. Date
    BOPPOL_LRLVTCT?: string; // Rate Level (NEW/RENEWAL)
    BOPPOL_NRLVDAT?: string; // Eff. Date of Rates
    BOPPOL_NMINPRM?: string; // Minimum Premium
