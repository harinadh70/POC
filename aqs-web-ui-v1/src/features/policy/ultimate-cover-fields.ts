// Ultimate Cover field definitions and configurations
// Note: control types are mapped to FieldRenderer supported types
export interface FieldConfig {
    matchcode: string;
    label: string;
    controlType: 'textbox' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'calendar';
    visible?: boolean;
    required?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    options?: Array<{ label: string; value: string }>;
    defaultValue?: string | boolean;
    maxLength?: number;
    hint?: string;
    dateFormat?: string;
    isNumeric?: boolean;
    left?: number | string;
    top?: number | string;
}

// Policy Tab Fields - Reordered for 2-column layout (left fields pairing with right column fields)
export const ultimateCoverPolicyTabFields: FieldConfig[] = [
    {
        matchcode: 'BOPPOLEXT_Coi_StringValue',
        label: 'Coinsurance',
        controlType: 'select',
        required: true,
        tabIndex: 1,
    },
    {
        matchcode: 'BOPPOL_NIRM7',
        label: 'Expense Mod',
        controlType: 'textbox',
        tabIndex: 21,
        isNumeric: true,
        left: '50%',
        top: '0px',
    },
    {
        matchcode: 'BOPPOL_LDED2',
        label: 'Building Deductible',
        controlType: 'select',
        required: true,
        tabIndex: 2,
    },
    {
        matchcode: 'BOPPOLEXT_TerRsk_StringValue',
        label: 'Terrorism Coverage',
        controlType: 'select',
        disabled: true,
        tabIndex: -1,
        left: '50%',
        top: '28px',
    },

    {
        matchcode: 'BOPPOL_LDED1',
        label: 'Pers Prop Deductible',
        controlType: 'select',
        required: true,
        tabIndex: 3,
    },
    {
        matchcode: 'BOPPOLEXT_SdsDed_StringValue',
        label: 'Sewer, Drain or Sump Ded',
        controlType: 'select',
        tabIndex: 22,
        left: '50%',
        top: '56px',
    },

    {
        matchcode: 'BOPPOLEXT_Idd_StringValue',
        label: 'Transit Deductible',
        controlType: 'select',
        tabIndex: 4,
    },
    {
        matchcode: 'BOPPOLEXT_SplDed_StringValue',
        label: 'Sprinkler Leakage Ded',
        controlType: 'select',
        tabIndex: 23,
        left: '50%',
        top: '93px',
    },
    {
        matchcode: 'BOPPOLEXT_Fdd_StringValue',
        label: 'Flood Deductible',
        controlType: 'select',
        tabIndex: 5,
    },
    {
        matchcode: 'BOPPOLEXT_PbdDed_BooleanValue',
        label: 'Per Building Ded',
        controlType: 'checkbox',
        tabIndex: 24,
        left: '50%',
        top: '125px',
    },

    {
        matchcode: 'BOPPOLEXT_Eqd_StringValue',
        label: 'Earthquake Deductible',
        controlType: 'select',
        tabIndex: 6,
    },
    {
        matchcode: 'BOPPOLEXT_AllBldRofSrf_BooleanValue',
        label: 'All Bldgs Roof Surfacing',
        controlType: 'checkbox',
        tabIndex: 25,
        left: '50%',
        top: '160px',
    },
    {
        matchcode: 'BOPPOLEXT_EqdPer_StringValue',
        label: 'EQ Percentage Deductible',
        controlType: 'select',
        tabIndex: 7,
    },
    {
        matchcode: 'BOPPOLEXT_Wsh_StringValue',
        label: 'Wind/Hail Deductible',
        controlType: 'select',
        tabIndex: 8,
    },
    {
        matchcode: 'BOPPOLEXT_WatDam_StringValue',
        label: 'Water Damage Deductible',
        controlType: 'select',
        tabIndex: 9,
    },
    {
        matchcode: 'BOPPOLEXT_Loc_DoubleValue',
        label: '# of Locations',
        controlType: 'textbox',
        disabled: true,
        tabIndex: 10,
        isNumeric: true,
    },
    {
        matchcode: 'BOPPOLEXT_Csp_StringValue',
        label: 'CSP Code',
        controlType: 'textbox',
        required: true,
        tabIndex: 11,
    },
    {
        matchcode: 'BOPPOL_LPRISTANAM',
        label: 'Primary State',
        controlType: 'select',
        tabIndex: 12,
    },
    {
        matchcode: 'BOPPOLEXT_AgdVal_BooleanValue',
        label: 'Agreed Value',
        controlType: 'checkbox',
        tabIndex: 13,
    },
    {
        matchcode: 'BOPPOL_BMRFMRCEXC',
        label: 'Microfracture or Microcracking Exclusion',
        controlType: 'checkbox',
        tabIndex: 14,
    },
];

// Details Tab Fields
export const ultimateCoverDetailsTabFields: FieldConfig[] = [
    {
        matchcode: 'BOPPOL_LEXPPOLNUM',
        label: 'Prev. Policy Number',
        controlType: 'textbox',
        maxLength: 20,
        tabIndex: 2,
    },
    {
        matchcode: 'BOPPOL_NRLVEFFDAT',
        label: 'Rate Level Eff. Date',
        controlType: 'date',
        tabIndex: 3,
    },
    {
        matchcode: 'BOPPOL_LRLVTCT',
        label: 'Rate Level',
        controlType: 'radio',
        tabIndex: 4,
    },
    {
        matchcode: 'BOPPOL_NRLVDAT',
        label: 'Eff. Date of Rates',
        controlType: 'date',
        disabled: true,
        tabIndex: 5,
    },
    {
        matchcode: 'BOPPOL_NMINPRM',
        label: 'Minimum Premium',
        controlType: 'textbox',
        disabled: true,
        tabIndex: 1,
        isNumeric: true,
    },
];
