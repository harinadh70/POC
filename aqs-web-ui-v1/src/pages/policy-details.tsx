import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Container,
  CssBaseline,
  Paper,
  Stack,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from '@mui/material';
import { FormRenderer } from '@components/form-renderer';
import { normalizeServiceConfig } from '../utils/normalize-service-config';
import type { FormValues, NormalizedField } from '@/types';

import TabView from '@/components/tabView/TabView';
import type { TabItem } from '@/components/tabView/TabView';

const PATH_ID_FIELD = 'POLPOLV3X_LEXLIDX';

const PolicyDetailsPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('policy');

  // ===== Tabs =====
  const tabs: TabItem[] = [
    { id: 'policy', label: 'Policy', lazy: true, keepMounted: true },
    { id: 'policyDetails', label: 'Policy Details', lazy: true, keepMounted: true },
    { id: 'billingMisc', label: 'Billing / Misc', lazy: true, keepMounted: true },
    { id: 'insured', label: 'Insured Details', lazy: true, keepMounted: true },
    { id: 'agentDetails', label: 'Agent Details', lazy: true, keepMounted: true },
  ];

  // ===== Service config (fields) =====
  const serviceResponse = [
    // LEFT
    {
      matchcode: 'POLPOLV3X_LEXLIDX',
      ctrllabel: 'Path ID',
      controltype: 'textbox',
      disabled: false,
      visible: true,
      required: false,
      value: '',
      maxlength: '10',
      tabindex: 1,
      ctrlwidth: '250',
      section: 'left',
      listitems: [],
      hasPostProcess: true,
      postProcessSubroutine: 'POLPOLV3X_LEXLIDX_PostProcess_PI',
      apiCallOnChange: true,
    },
    {
      matchcode: 'POLPOL_LPOLNUM',
      ctrllabel: 'Policy Number',
      controltype: 'textbox',
      disabled: true, // auto-filled
      visible: true,
      required: false, // auto-filled
      value: '',
      maxlength: '20',
      tabindex: '2',
      ctrlwidth: '250',
      section: 'left',
      listitems: [],
      autoFillTrigger: 'POLPOLV3X_LEXLIDX',
    },
    {
      matchcode: 'POLPOL_NEFFDAT',
      ctrllabel: 'Effective Date',
      controltype: 'calendar',
      iscalendar: true,
      disabled: false,
      visible: true,
      required: false,
      value: '',
      maxlength: '10',
      tabindex: '3',
      ctrlwidth: '250',
      section: 'left',
      listitems: [],
    },
    {
      matchcode: 'POLPOL_NEXPDAT',
      ctrllabel: 'Expiration Date',
      controltype: 'calendar',
      iscalendar: true,
      disabled: false,
      visible: true,
      required: false,
      value: '',
      maxlength: '10',
      minDate: new Date().toISOString().split('T')[0], // today
      tabindex: '4',
      ctrlwidth: '250',
      section: 'left',
      listitems: [],
    },
    {
      matchcode: 'POLPOL_LCMP',
      ctrllabel: 'Company',
      controltype: 'combo',
      disabled: false,
      visible: true,
      required: false,
      value: '',
      tabindex: '5',
      ctrlwidth: '250',
      listitems: [
        { key: 'ACE Insurance Company', label: 'ACE Insurance Company' },
        { key: 'AIC Insurance Company', label: 'AIC Insurance Company' },
        { key: 'Alliance Insurance Company', label: 'Alliance Insurance Company' },
      ],
      section: 'left',
    },
    {
      matchcode: 'POLPOLV3X_LPRDCDE',
      ctrllabel: 'Product Code',
      controltype: 'combo',
      disabled: false,
      visible: true,
      required: false,
      value: '',
      tabindex: '6',
      ctrlwidth: '250',
      listitems: [
        { key: 'Businessowners', label: 'Businessowners' },
        { key: 'Commercial Auto', label: 'Commercial Auto' },
        { key: 'General Liability', label: 'General Liability' },
        { key: 'Property', label: 'Property' },
        { key: 'Workers Compensation', label: 'Workers Compensation' },
      ],
      section: 'left',
    },

    // RIGHT
    {
      matchcode: 'POLPOLEXT_PgmCdeDes_StringValue',
      ctrllabel: 'Program',
      controltype: 'textbox',
      disabled: true,
      visible: true,
      required: false,
      value: '',
      maxlength: '40',
      tabindex: '7',
      ctrlwidth: '250',
      section: 'right',
      listitems: [],
      autoFillTrigger: 'POLPOLV3X_LEXLIDX',
    },
    {
      matchcode: 'POLPOL_LRLVTCT',
      ctrllabel: 'Rate Level',
      controltype: 'radio',
      disabled: false,
      visible: true,
      required: false,
      value: 'N',
      tabindex: '8',
      ctrlwidth: '300',
      listitems: [
        { key: 'N', label: 'New' },
        { key: 'R', label: 'Renewal' },
      ],
      section: 'right',
    },
    {
      matchcode: 'POLPOL_NRLVEFFDAT',
      ctrllabel: 'Rate Level Effective Date',
      controltype: 'calendar',
      iscalendar: true,
      disabled: false,
      visible: true,
      required: false,
      value: '',
      maxlength: '10',
      tabindex: '9',
      ctrlwidth: '250',
      section: 'right',
      listitems: [],
    },
    {
      matchcode: 'POLPOL_LBUSTYP',
      ctrllabel: 'Business Type',
      controltype: 'combo',
      disabled: false,
      visible: true,
      required: false,
      value: '',
      tabindex: '10',
      ctrlwidth: '250',
      listitems: [
        { key: 'Corporate', label: 'Corporate' },
        { key: 'Partnership', label: 'Partnership' },
        { key: 'Proprietor', label: 'Proprietor' },
        { key: 'Non-Profit', label: 'Non-Profit' },
      ],
      section: 'right',
    },
    {
      matchcode: 'POLPOL_LPOLTYP',
      ctrllabel: 'Policy Type',
      controltype: 'textbox',
      disabled: false,
      visible: true,
      required: false,
      value: '',
      maxlength: '30',
      tabindex: '11',
      ctrlwidth: '250',
      section: 'right',
      listitems: [],
      highlight: true,
      highlightColor: '#FFFF66',
      highlightBorderColor: '#0a6f6f',
    },
    {
      matchcode: 'POLPOLV3X_LBUSDES',
      ctrllabel: 'Business Description',
      controltype: 'combo',
      disabled: false,
      visible: true,
      required: false,
      value: '',
      tabindex: '12',
      ctrlwidth: '300',
      listitems: [
        { key: 'BOP-ISO', label: 'Businessowners - ISO' },
        { key: 'BOP-PROG', label: 'Businessowners - Program' },
        { key: 'CONTRACTORS', label: 'Contractors' },
        { key: 'RETAIL', label: 'Retail' },
        { key: 'RESTAURANTS', label: 'Restaurants' },
      ],
      section: 'right',
      highlight: true,
      highlightColor: '#FFFF66',
      highlightBorderColor: '#0a6f6f',
    },

    // {
    //   matchcode: 'CHK_INCLUDE_RECEIPT',
    //   label: 'Include Receipt',
    //   controlType: 'checkbox',
    //   required: false,
    //   disabled: false,
    //   visible: true,
    //   tabIndex: 15,
    //   width: 320,
    //   defaultValue: true,
    // },

    // Buttons (kept out of FormRenderer by normalizer)
    {
      matchcode: 'NEXT',
      text: 'Next',
      controltype: 'button',
      visible: true,
      disabled: false,
      section: 'buttons',
    },
    {
      matchcode: 'CANCEL',
      text: 'Cancel',
      controltype: 'button',
      visible: true,
      disabled: false,
      section: 'buttons',
    },
  ];

  // Normalize once
  const fields = useMemo(() => normalizeServiceConfig(serviceResponse) as NormalizedField[], []);
  console.log('Normalized fields:', fields);
  // ---- Blank on load
  const blankValues: FormValues = {
    POLPOLV3X_LEXLIDX: '',
    POLPOL_LPOLNUM: '',
    POLPOL_NEFFDAT: '',
    POLPOL_NEXPDAT: '',
    POLPOL_LCMP: '',
    POLPOLV3X_LPRDCDE: '',
    POLPOLEXT_PgmCdeDes_StringValue: '',
    POLPOL_LRLVTCT: '',
    POLPOL_NRLVEFFDAT: '',
    POLPOL_LBUSTYP: '',
    POLPOL_LPOLTYP: '',
    POLPOLV3X_LBUSDES: '',
  };

  // ---- Form state & remount key
  const [values, setValues] = useState<FormValues>(blankValues);
  const [formKey, setFormKey] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Track last loaded Path ID to avoid duplicate fetches
  const lastLoadedPathIdRef = useRef<string>('');

  // Helpers
  const formatDateMMDDYYYY = (date: Date): string => {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };
  const addDays = (date: Date, days: number): Date => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const handleValuesChange = useCallback(
    (nextValues: FormValues) => {
      // Example auto-calc: Expiration = Effective + 365 (when Effective changes)
      const effChanged =
        nextValues.POLPOL_NEFFDAT && nextValues.POLPOL_NEFFDAT !== values.POLPOL_NEFFDAT;
      if (effChanged) {
        const parts = String(nextValues.POLPOL_NEFFDAT).split('/');
        if (parts.length === 3) {
          const [mm, dd, yyyy] = parts.map((x) => Number(x));
          if (mm && dd && yyyy) {
            const eff = new Date(yyyy, mm - 1, dd);
            const exp = addDays(eff, 365);
            return setValues({
              ...nextValues,
              POLPOL_NEXPDAT: formatDateMMDDYYYY(exp),
            });
          }
        }
      }
      setValues(nextValues);
    },
    [values],
  );

  const handleCommitField = useCallback(
    async (matchcode: string, _value: string | boolean, eventType: string) => {
      // Trigger auto-populate when Path ID loses focus (blur) or user hits Enter
      if (matchcode === PATH_ID_FIELD && (eventType === 'blur' || eventType === 'enter')) {
        await ensureAutoPopulate();
      }
      // Place for PATCH/PUT single field if needed
      // console.log('Commit field:', { matchcode, value, eventType });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values],
  );
  const handleSubmit = useCallback(() => {
    alert('Submitting:\n' + JSON.stringify(values, null, 2));
  }, [values]);

  // ---- Mock API: fetch by Path ID (replace with your real call)
  async function fetchPolicyByPathId(pathId: string): Promise<Partial<FormValues>> {
    // simulate latency
    await new Promise((res) => setTimeout(res, 500));
    const today = new Date();
    const exp = addDays(today, 365);

    return {
      POLPOL_LPOLNUM: `POL-${pathId}`,
      POLPOLEXT_PgmCdeDes_StringValue: 'Standard Program',
      POLPOL_NEFFDAT: formatDateMMDDYYYY(today),
      POLPOL_NEXPDAT: formatDateMMDDYYYY(exp),
      POLPOL_LRLVTCT: 'N',
      POLPOL_LCMP: 'AIC',
      POLPOLV3X_LPRDCDE: 'BOP',
      POLPOL_LBUSTYP: 'COR',
      POLPOL_LPOLTYP: 'Commercial Package',
      POLPOLV3X_LBUSDES: 'BOP-ISO',
      POLPOLV3X_LEXLIDX: pathId,
    };
  }

  // ---- Shared trigger used by onBlur/Enter and on tab click
  const ensureAutoPopulate = useCallback(async () => {
    const pathId = String(values[PATH_ID_FIELD] ?? '').trim();
    if (!pathId) return; // nothing to load
    if (lastLoadedPathIdRef.current === pathId) return; // already loaded, avoid duplicate fetch
    if (loading) return;

    try {
      setLoading(true);
      const apiData = await fetchPolicyByPathId(pathId);
      const safeApiData = Object.entries(apiData).reduce<FormValues>((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});

      // Merge & re-init form (remount to apply initialValues fresh)
      const merged: FormValues = { ...values, ...safeApiData };
      setValues(merged);
      lastLoadedPathIdRef.current = pathId;
      setFormKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  }, [loading, values]);

  // ---- Tab change also triggers auto-populate
  const handleTabChange = (id: string) => {
    setActiveId(id);
    void ensureAutoPopulate();
  };
  return (
    <>
    <div className="bg-gray-50 w-full min-h-screen p-6">
        <div className="grid grid-cols-[1fr_3fr] gap-2 items-start w-full">
            {/* Left column - 25% */}
            <div className="col-span-1">
                <div>
                    <h1 className="text-xl font-semibold text-center">Left Panel</h1>
                </div>
            </div>

            {/* Right column - 75% */}
            <div className="col-span-1">
                <CssBaseline />
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    <Paper variant="outlined" sx={{ p: 3 }}>
                        {loading && <LinearProgress sx={{ mb: 2 }} />}

                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={!values[PATH_ID_FIELD]}
                            >
                                OK
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={!values[PATH_ID_FIELD]}
                            >
                                Next
                            </Button>
                            <Button variant="contained" onClick={handleSubmit}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={handleSubmit}>
                                Path Update
                            </Button>
                        </Stack>

                        <Stack spacing={2}>
                            <Typography variant="h6">
                                {values[PATH_ID_FIELD]
                                    ? `Policy : ${values[PATH_ID_FIELD]} In Process Quote`
                                    : 'Policy Details - In Process Quote'}
                                {loading && ' (Loading...)'}
                            </Typography>
                            <Divider />

                            <TabView
                                tabs={tabs}
                                value={activeId}
                                onChange={(id) => handleTabChange(id)} // 👉 triggers populate on cl⟪?⟫
                                variant="scrollable"
                                size="small"
                                contentPadding={2}
                                tabsSx={{ borderBottom: 1, borderColor: 'divider' }}
                            />

                            <FormRenderer
                                key={formKey} // 👉 remount so new initialValues apply after fetch
                                fields={fields}
                                initialValues={values} // 👉 use latest values as initial for this m⟪?⟫
                                onValuesChange={handleValuesChange} // 👉 will receive onBlur/Enter fr⟪?⟫
                                onCommitField={handleCommitField}
                                labelWidth={220}
                                fieldsPerRow={2}
                                responsive={false}
                            />
                        </Stack>
                    </Paper>
                </Container>
            </div>
        </div>
    </div>
    </>
  );
};

export default PolicyDetailsPage;
