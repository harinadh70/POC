// PolicyInformation static field mapping
// This file maps PolicyInformation tab fields for legacy ASP modernization.
// Each field is identified by its matchcode (field ID), label, and control type.
export interface PolicyInformationField {
    matchcode: string; // Unique field identifier (from ASP/XML)
    name: string; // Camel-case name for form bindings
    label: string; // UI label
    controlType: 'textbox' | 'select' | 'radio' | 'checkbox' | 'date' | 'textarea';
    tab: string; // TABPOL | TABDET | TABBIL | TABINS | TABAGT
    options?: Array<{ value: string; label: string }>;
    highlight?: boolean; // Optional highlighting
    highlightColor?: string; // Optional highlight background color
    highlightBorderColor?: string; // Optional highlight border color
    required?: boolean; // Field is required for form submission
}

// Static mapping derived from Pol_PIPHPOL_... ASP (TABPOL fields shown)
export const PolicyInformationFields: PolicyInformationField[] = [
    // TABPOL (Policy)
    {
        matchcode: 'POLPOLV3X_LEXLIDX',
        name: 'pathId',
        label: 'Path ID',
        controlType: 'textbox',
        tab: 'TABPOL',
        required: true,
    },
    {
        matchcode: 'POLPOL_LPOLNUM',
        name: 'policyNumber',
        label: 'Policy Number',
        controlType: 'textbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOL_NEFFDAT',
        name: 'effectiveDate',
        label: 'Effective Date',
        controlType: 'date',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOL_NEXPDAT',
        name: 'expirationDate',
        label: 'Expiration Date',
        controlType: 'date',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOL_LRLVTCT',
        name: 'rateLevel',
        label: 'Rate Level',
        controlType: 'radio',
        tab: 'TABPOL',
        options: [
            { value: 'NEW', label: 'New' },
            { value: 'RENEWAL', label: 'Renewal' },
        ],
    },
    {
        matchcode: 'POLPOLEXT_LrgRskRul_BooleanValue',
        name: 'largeRiskRuleExemption',
        label: 'Lg. Risk Rule Exemption',
        controlType: 'checkbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOLEXT_Cnv_BooleanValue',
        name: 'convenience',
        label: 'Convenience',
        controlType: 'checkbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOL_LCMP',
        name: 'companyName',
        label: 'Company Name',
        controlType: 'select',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOL_LPLN',
        name: 'plan',
        label: 'Plan',
        controlType: 'select',
        tab: 'TABPOL',
        required: true,
    },
    {
        matchcode: 'POLPOLV3X_LPRDCDE',
        name: 'productCode',
        label: 'Product Code',
        controlType: 'select',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOLEXT_PgmCdeDes_StringValue',
        name: 'program',
        label: 'Program',
        controlType: 'textbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLXCP_POLPOL_TERRSK_LMSC',
        name: 'terrorismCoverage',
        label: 'Terrorism Coverage',
        controlType: 'select',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOLEXT_ExcNbc_BooleanValue',
        name: 'excludeNBC',
        label: 'Exclude NBC',
        controlType: 'checkbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOLEXT_TutOpr_BooleanValue',
        name: 'tutoringOperations',
        label: 'Tutoring Operations',
        controlType: 'checkbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOLEXT_NyxFreTrd_BooleanValue',
        name: 'nyxFreeTrade',
        label: 'NY Free Trade Zone',
        controlType: 'checkbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOLEXT_NyxClsTyp_StringValue',
        name: 'nyftzClassType',
        label: 'NYFTZ Class Type',
        controlType: 'select',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOLEXT_NyxClsCde_StringValue',
        name: 'nyftzClassCode',
        label: 'Class Code',
        controlType: 'textbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOLV3X_LBUSDES',
        name: 'namedInsuredProfession',
        label: "Named Insured's Profession",
        controlType: 'select',
        tab: 'TABPOL',
        highlight: true,
        highlightColor: '#fff8de',
        required: true,
    },
    {
        matchcode: 'POLPOL_LBUSTYP',
        name: 'businessType',
        label: 'Business Type',
        controlType: 'select',
        tab: 'TABPOL',
        highlight: true,
        highlightColor: '#fff8de',
        required: true,
    },
    {
        matchcode: 'POLPOL_LPRISTANAM',
        name: 'primaryState',
        label: 'Primary State',
        controlType: 'select',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOLEXT_SafCdt_StringValue',
        name: 'safetyCreditGroup',
        label: 'Safety Credit Group',
        controlType: 'select',
        tab: 'TABPOL',
        highlight: true,
        highlightColor: '#fff8de',
    },
    {
        matchcode: 'POLPOLEXT_DocSta_StringValue',
        name: 'documentPrimaryState',
        label: 'Document Primary State',
        controlType: 'select',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLPOL_LPOLTYP',
        name: 'policyType',
        label: 'Policy Type',
        controlType: 'select',
        tab: 'TABPOL',
        required: true,
    },
    {
        matchcode: 'POLPOL_LPMADES',
        name: 'pmaDescription',
        label: 'PMA Description',
        controlType: 'select',
        tab: 'TABPOL',
        required: true,
    },

    // TABPOL Insured / Agency grouped fields (kept on same tab in legacy), map to TABPOL for now
    {
        matchcode: 'POLNAM_LINSPRINAM_1',
        name: 'insuredPrimaryName',
        label: 'Primary Insured',
        controlType: 'textbox',
        tab: 'TABPOL',
        required: true,
    },
    {
        matchcode: 'POLNAM_LINSCTY_1',
        name: 'insuredCity',
        label: 'City',
        controlType: 'textbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLNAM_LINSSTA_1',
        name: 'insuredState',
        label: 'State',
        controlType: 'select',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLAGT_LAGTNUM_1',
        name: 'agencyCode',
        label: 'Agency Code',
        controlType: 'textbox',
        tab: 'TABPOL',
        required: true,
    },

    // Additional Agency fields observed in ASP
    {
        matchcode: 'POLAGT_LPCRNUM_1',
        name: 'agencySubCode',
        label: 'Agency Sub Code',
        controlType: 'textbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLAGT_LAGTPRINAM_1',
        name: 'agencyName',
        label: 'Agency Name',
        controlType: 'textbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLAGT_LPCRNAM_1',
        name: 'agencySubName',
        label: 'Agency Sub Name',
        controlType: 'textbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLAGT_LAGTCTY_1',
        name: 'agencyCity',
        label: 'City/State',
        controlType: 'textbox',
        tab: 'TABPOL',
    },
    {
        matchcode: 'POLAGT_LAGTSTA_1',
        name: 'agencyState',
        label: 'State',
        controlType: 'select',
        tab: 'TABPOL',
    },

    // Placeholder entries for other tabs (will be expanded later)
    {
        matchcode: 'POLDET_LDETNUM',
        name: 'detailNumber',
        label: 'Detail Number',
        controlType: 'textbox',
        tab: 'TABDET',
    },
    // Policy Detail (TABDET) fields from Pol_PIPHPOL_... ASP
    {
        matchcode: 'POLPOL_LEXPPOLNUM',
        name: 'prevPolicyNumber',
        label: 'Prev. Policy Number',
        controlType: 'textbox',
        tab: 'TABDET',
    },
    {
        matchcode: 'POLPOL_NRLVEFFDAT',
        name: 'rateLevelEffDate',
        label: 'Rate Level Eff. Date',
        controlType: 'date',
        tab: 'TABDET',
    },
    {
        matchcode: 'POLPOL_NRLVDAT',
        name: 'effDateOfRates',
        label: 'Eff. Date of Rates',
        controlType: 'date',
        tab: 'TABDET',
    },
    {
        matchcode: 'POLPOL_NSHRTRMFAC',
        name: 'termFactor',
        label: 'Term Factor',
        controlType: 'textbox',
        tab: 'TABDET',
    },
    {
        matchcode: 'POLPOL_HSHRTRMFAC',
        name: 'termFactorOverride',
        label: 'Term Factor Override',
        controlType: 'checkbox',
        tab: 'TABDET',
    },
    {
        matchcode: 'POLPOL_NMINPRM',
        name: 'policyMinimum',
        label: 'Policy Minimum',
        controlType: 'textbox',
        tab: 'TABDET',
    },
    {
        matchcode: 'POLPOL_LMINCLC',
        name: 'recalcBalMeetMP',
        label: 'Recalc Bal/Meet MP',
        controlType: 'checkbox',
        tab: 'TABDET',
    },
    {
        matchcode: 'POLPOL_NTCTDAT',
        name: 'processingDate',
        label: 'Processing Date',
        controlType: 'date',
        tab: 'TABDET',
    },
    {
        matchcode: 'POLBIL_LBILNUM',
        name: 'billingNumber',
        label: 'Billing Number',
        controlType: 'textbox',
        tab: 'TABBIL',
    },
    {
        matchcode: 'POLINS_LINSNUM',
        name: 'insuredNumber',
        label: 'Insured Number',
        controlType: 'textbox',
        tab: 'TABINS',
    },
    {
        matchcode: 'POLAGT_LAGTNUM',
        name: 'agentNumber',
        label: 'Agent Number',
        controlType: 'textbox',
        tab: 'TABAGT',
    },
];

// Rendering should always use `matchcode` as primary key. When dynamic JSON arrives,
// normalize it to the PolicyInformationField shape and merge by matchcode.
