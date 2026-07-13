// PolicyInformation tabbed field rendering
// Uses static mapping from policy-information-fields.ts and FormRenderer for all tabs
// Rendering is matchcode-driven for future dynamic JSON integration
import { getItem as getPolicyID } from '@utils/session-storage';
import React, { useEffect, useMemo, useCallback } from 'react';
import { useLoaderData, useNavigation } from 'react-router';
// loader-driven: no direct PageNavigation calls here
import Tabs from '@/components/tabView/TabView';
import TabPanel from '@/components/tabView/TabPanel';
import { POLICY_TABS, DEFAULT_ACTIVE_TAB } from '@features/policy/constants/tab-definitions';
import { PolicyInformationFields, type PolicyInformationField } from '../policy-information-fields';
import type { BrowserCommand, CommitEventType, FormValues, NormalizedField } from '@/types';
import { FormRenderer } from '@/components/form-renderer';
import { FieldRenderer } from '@/components/field-renderer';
import { Button as ActionButton } from '@/components/button';
import { getItem } from '@/utils/local-storage';
import { extractCallsByTypeFromPageBuild } from '@/utils/build-xml-server-call-payload';
import type { PageBuildResponse } from '@/services/page-build';
import { resolveLegacyPrePostPlan } from '@/utils/build-eedata-array';
// loader-driven data is provided by the route loader
import { useFormMethods, useFormStore } from '@/providers/form-provider';
import type { SessionInfo } from '@features/auth/services/auth';
import { pubSub } from '@/utils/pub-sub';
import { Divider, LinearProgress, Typography } from '@mui/material';
import { useBrowserCommands } from '@/hooks/use-browser-commands';
import {
    useFormCommit,
    type CommitPlanContext,
    type CommitPlanResult,
    type ResponseCommandAdapterContext,
} from '@/hooks/use-form-commit';
// Validation utilities for button state management
import { checkRequiredFields } from '@/utils/required-field-validation';
import { computePageBuildButtonOverrides } from '@/utils/button-state-manager';
import { CommonDataGrid } from '@/components/data-grid/data-grid';
import { getGridConfig } from '@/components/data-grid/data-grid-config-registry';
//import type { GenericRow } from '@components/data-grid/data-grid-normalize';

interface PolicyInformationLoaderData {
    pageBuild?: unknown;
    xmlFileName?: string;
    xmlFilePath?: string;
    tabFilePath?: string;
    xmlListFilePath?: string;
    normalizedByTab?: Record<string, NormalizedField[]>;
    controlsByTab?: Record<string, Array<{ matchcode: string; text: string }>>;
    initialValuesByTab?: Record<string, Record<string, string | boolean | number | null>>;
    tabsOrder?: string[];
    formKey?: string;
    browserCommands?: BrowserCommand[];
    pageButtons?: Array<{
        matchcode: string;
        text: string;
        disabled?: boolean;
        visible?: boolean;
    }>;
}

// Group fields by tab (static mapping)
const fieldsByTab: Record<string, PolicyInformationField[]> = {};
for (const field of PolicyInformationFields) {
    if (!fieldsByTab[field.tab]) fieldsByTab[field.tab] = [];
    fieldsByTab[field.tab].push(field);
}

// Debug: Log which fields have required flag set
console.log('[PolicyInformation] DEBUG - Original PolicyInformationFields with required:', {
    total: PolicyInformationFields.length,
    requiredFields: PolicyInformationFields.filter((f) => f.required).map((f) => ({
        matchcode: f.matchcode,
        label: f.label,
        required: f.required,
    })),
});

// Normalize static PolicyInformationField -> NormalizedField for FormRenderer
const normalizedStaticByTab: Record<string, NormalizedField[]> = Object.keys(fieldsByTab).reduce(
    (acc, tab) => {
        acc[tab] = (fieldsByTab[tab] || []).map(
            (f) =>
                ({
                    matchcode: f.matchcode,
                    label: f.label,
                    controlType: (f.controlType as any) ?? 'textbox',
                    showInfoIcon:
                        f.matchcode === 'POLPOL_NRLVDAT' ||
                        f.matchcode === 'POLPOLEXT_Cnv_BooleanValue' ||
                        f.matchcode === 'POLPOLEXT_NyxClsTyp_StringValue',
                    infoAriaLabel:
                        f.matchcode === 'POLPOL_NRLVDAT'
                            ? 'Show Eff. Date of Rates information'
                            : f.matchcode === 'POLPOLEXT_Cnv_BooleanValue'
                                ? 'Show Convenience information'
                                : f.matchcode === 'POLPOLEXT_NyxClsTyp_StringValue'
                                    ? 'Show NYFTZ information'
                                    : undefined,
                    infoMatchcode:
                        f.matchcode === 'POLPOLEXT_Cnv_BooleanValue'
                            ? 'POLPOLEXT_Cnv_BooleanValue_INFO'
                           : f.matchcode === 'POLPOLEXT_NyxClsTyp_StringValue'
                               ? 'POLPOLEXT_Nyx_BooleanValue_INFO'
                               : undefined,
                   options: f.options
                       ? f.options.map((o) => ({ label: o.label, value: o.value }))
                       : [],
                   defaultValue: f.controlType === 'checkbox' ? false : '',
                   disabled: false,
                   visible: true,
                   required: f.required ?? false,
                   highlight: f.highlight,
                   highlightColor: f.highlightColor,
                   highlightBorderColor: f.highlightBorderColor,
               }) as NormalizedField,
           );
           return acc;
       },
       {} as Record<string, NormalizedField[]>,
   );

   // Debug: Log normalized fields with required flag
   console.log('[PolicyInformation] DEBUG - Normalized fields with required:', {
       tabsWithFields: Object.keys(normalizedStaticByTab),
       requiredFieldsByTab: Object.entries(normalizedStaticByTab).reduce(
           (acc, [tab, fields]) => {
               const required = fields.filter((f) => f.required);
               if (required.length > 0) {
                   acc[tab] = required.map((f) => ({
                       matchcode: f.matchcode,
                       label: f.label,
                       required: f.required,
                   }));
               }
               return acc;
           },
           {} as Record<string, any>,
       ),
   });

   // Helper: return normalized fields for a tab, falling back to patterns found in TABPOL
   // Note: static normalized mapping available in `normalizedStaticByTab`

  const PolicyInformation: React.FC = () => {
       const loaderData = useLoaderData() as PolicyInformationLoaderData;
       const navigation = useNavigation();
       const [activeTab, setActiveTab] = React.useState<string>(DEFAULT_ACTIVE_TAB);
       const formMethods = useFormMethods();
       const [fieldMetadata] = useFormStore((store) => store.fieldMetadata);
       const { executeCommands, isExecuting } = useBrowserCommands(loaderData?.browserCommands ?? []);
       // Track FormRenderer field value changes
       const [rendererFormValues, setRendererFormValues] = React.useState<Record<string, unknown>>({});

       // Loader-provided data (normalized fields, controls, defaults, browserCommands)
       // loaderData shape: { pageBuildRaw, normalizedByTab, controlsByTab, initialValuesByTab, tabsOrder, form ⟪?⟫
       // Grid config for Insured Details tab
       const insuredGridConfig = getGridConfig('INSURED_DETAILS');
       //const [selectedInsuredRow, setSelectedInsuredRow] = React.useState<GenericRow | null>(null);
       // Subscribe to global tab:selected event for programmatic tab switching
       useEffect(() => {
           const unsubscribe = pubSub.subscribe('tab:selected', (data) => {
               setActiveTab(data.tabMatchcode);
           });
           return () => unsubscribe();
       }, []);

       // Handle form value changes from FormRenderer
       const handleFormValuesChange = useCallback((values: FormValues) => {
           console.log('[PolicyInformation] FormRenderer values changed:', values);
           setRendererFormValues(values);
       }, []);

       const policyCommitSessionInfo = useMemo(() => {
           const sessionInfo = (getItem('sessionInformation') as SessionInfo) || ({} as SessionInfo);
           const normalizedAction = (() => {
               const rawAction = String(sessionInfo.action || '')
                   .trim()
                   .toUpperCase();

               // Legacy policy commit flow expects ADD as base action; RATELEVEL is a navigation action.
               if (!rawAction || rawAction === 'RATELEVEL') {
                   return 'ADD';
               }

               return sessionInfo.action;
           })();

           return {
               ...sessionInfo,
               action: normalizedAction,
           } as SessionInfo;
       }, [loaderData?.pageBuild]);

       const navContext = getItem<Record<string, unknown>>('aqs:navigation:context', {});
       const resolvedXmlFileName = useMemo(() => {
           return (
               (typeof navContext?.xmlFileName === 'string' && navContext.xmlFileName.trim()) ||
               (typeof loaderData?.xmlFileName === 'string' && loaderData.xmlFileName.trim()) ||
               (typeof loaderData?.xmlFilePath === 'string' && loaderData.xmlFilePath.trim()) ||
               (typeof (policyCommitSessionInfo as Record<string, unknown>)?.xmlFileName ===
                   'string' &&
                   String((policyCommitSessionInfo as Record<string, unknown>).xmlFileName).trim()) ⟪?⟫
               ''
           );
       };
const adaptResponseCommands = useCallback(
    ({ commands, response }: ResponseCommandAdapterContext): BrowserCommand[] => {
        const escapeXml = (input: string): string =>
            input
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');

        const hasLoadCombo = commands.some((command) => {
            const verb = command.verb.toUpperCase();
            return verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS';
        });
        if (!hasLoadCombo) return commands;

        const listItems = response?.results?.aqs?.ListItems?.value;
        if (!listItems) return commands;

        let comboXml = '';
        if (Array.isArray(listItems)) {
            const items = listItems
                .map((item) => String(item || '').trim())
                .filter((item) => item.length > 0);
            if (items.length > 0) {
                const xmlItems = items
                    .map((item) => {
                        const escaped = escapeXml(item);
                        return `<item value="${escaped}" text="${escaped}" />`;
                    })
                    .join('');
                comboXml = `<items>${xmlItems}</items>`;
            ⟪?⟫
    } else if (typeof listItems === 'string') {
        comboXml = listItems.trim();
    }

    if (!comboXml) return commands;

    return commands.map((command) => {
        const verb = command.verb.toUpperCase();
        if ((verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS') && !command.addinf?.trim()) {
            return {
                ...command,
                addinf: comboXml,
            };
        }
        return command;
    });
},
[],
);

const resolveCommitPlan = useCallback(
    (context: CommitPlanContext): CommitPlanResult | null => {
        const { matchcode, baseFormData, pageBuildData } = context;

        // Special handling for OK button: call CheckRlvChanges_PolPol for validation
        if (matchcode.toUpperCase() === 'OK') {
            return {
                calls: [{ project: 'pZStart', class: 'cZStart', subroutine: 'CheckRlvChanges_PolPol' }],
                callType: 'post',
                processIndicator: '1',
                payloadFormData: baseFormData,
                includeCallMode: false,
                sessionXmlAsString: true,
            };
        }
    }

const callsByType = extractCallsByTypeFromPageBuild(pageBuildData, matchcode);

const controlsRaw =
    typeof pageBuildData === 'object' && pageBuildData !== null
        ? (
              pageBuildData as {
                  Page?: {
                      controls?: {
                          control?:
                              | Array<Record<string, unknown>>
                              | Record<string, unknown>;
                      };
                  }
              )?.Page?.controls?.control
        : undefined;

           const controlArray = Array.isArray(controlsRaw)
               ? controlsRaw
               : controlsRaw
                   ? [controlsRaw]
                   : [];

           const control = controlArray.find((item) => {
               const rawMatchcode = item['@matchcode'] ?? item.matchcode;

               return (
                   String(rawMatchcode ?? '')
                       .trim()
                       .toUpperCase() === matchcode.toUpperCase()
               );
           });

           const plan = resolveLegacyPrePostPlan({
               matchcode,
               control,
               callsByType,
               runtimeOptionsCount: fieldMetadata[matchcode]?.options?.length ?? 0,
               baseFormData,
           });

           if (!plan) {
               console.warn('[PolicyInformation] No commit calls configured for matchcode', {
                   matchcode,
               });
               return null;
           }

           return {
               calls: plan.runtimeCalls,
               callType: plan.selectedCallType,
               processIndicator: plan.processIndicator,
               payloadFormData: plan.payloadFormData,
               includeCallMode: false,
               sessionXmlAsString: true,
           };
           },
           [fieldMetadata],
       );

       const { commitField, isCommitting } = useFormCommit({
           pageBuildData: loaderData?.pageBuild as PageBuildResponse | undefined,
           sessionInfo: policyCommitSessionInfo,
           formMethods,
           xmlFileName: resolvedXmlFileName,
           onCommands: executeCommands,
           resolveCommitPlan,
           adaptResponseCommands,
       });

       const handleFieldCommit = useCallback(
           async (
               matchcode: string,
               value: string | boolean,
               eventType: CommitEventType | 'click' | string,
           ) => {
               const normalizedEventType: CommitEventType =
                   eventType === 'blur' || eventType === 'enter' ? eventType : 'change';
               await commitField(matchcode, value, normalizedEventType);
           },
           [commitField],
       );

       // Build tab configs for Tabs component
       // Prepare normalized mapping from latest PageBuild service fields (loader-provided)
       const normalizedPageBuildMap = React.useMemo(() => {
           try {
               const map = new Map<string, NormalizedField>();
               const tabs = loaderData?.normalizedByTab || {};
               for (const tab of Object.keys(tabs)) {
                   const arr: NormalizedField[] = tabs[tab] || [];
                   arr.forEach((f) => {
                       if (f.matchcode) map.set(f.matchcode, f);
                   });
               }
               return map;
           } catch (e) {
               return new Map<string, NormalizedField>();
           }
       }, [loaderData?.formKey, loaderData?.normalizedByTab]);

       const pageBuildPresenceSet = React.useMemo(() => {
           const presence = new Set<string>();

           const normalizedByTab = loaderData?.normalizedByTab || {};
           for (const tabFields of Object.values(normalizedByTab)) {
               for (const field of tabFields || []) {
                   const matchcode = String(field?.matchcode || '')
                       .trim()
                       .toUpperCase();
                   if (matchcode) presence.add(matchcode);
               }
           }

           const controlsRaw =
               typeof loaderData?.pageBuild === 'object' && loaderData?.pageBuild !== null
                   ? (
                       loaderData.pageBuild as {
                           Page?: {
                               controls?: {
                                   control?:
                                       | Array<Record<string, unknown>>
                                       | Record<string, unknown>;
                               };
                           }
                       }
                   ).Page?.controls?.control
                   : undefined;

           const controls = Array.isArray(controlsRaw)
               ? controlsRaw
               : controlsRaw
                   ? [controlsRaw]
                   : [];

           for (const control of controls) {
               const matchcode = String(control['@matchcode'] ?? control.matchcode ?? '')
                   .trim()
                   .toUpperCase();
               if (matchcode) presence.add(matchcode);
           }

           return presence;
       }, [loaderData?.normalizedByTab, loaderData?.pageBuild]);

       const shouldFilterStaticFieldsByPresence = pageBuildPresenceSet.size > 0;

       const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>
           fields
               .filter((f) => {
                   if (!shouldFilterStaticFieldsByPresence) return true;
                   const matchcode = String(f.matchcode || '')
                       .trim()
                       .toUpperCase();
                   if (!matchcode) return true;
                   return pageBuildPresenceSet.has(matchcode);
               })
               .map((f) => {
                   const pb = f.matchcode ? normalizedPageBuildMap.get(f.matchcode) : undefined;
                   const mappedDefault = f.matchcode ? flatDefaults?.[f.matchcode] : undefined;
                   const resolvedDefaultValue =
                     mappedDefault !== undefined
                       ? typeof mappedDefault === 'boolean'
                         ? mappedDefault
                         : String(mappedDefault)
                       : pb?.defaultValue !== undefined
                         ? pb.defaultValue
                         : f.defaultValue;

                   if (!pb && mappedDefault === undefined) return f;
                   const merged = {
                     ...f,
                     defaultValue: resolvedDefaultValue,
                     disabled: pb?.disabled !== undefined ? pb.disabled : f.disabled,
                     visible: pb?.visible !== undefined ? pb.visible : f.visible,
                     options: pb?.options && pb.options.length ? pb.options : f.options,
                   };
                   return merged;
                 });

             const flatDefaults = React.useMemo(() => {
               const valuesByTab = Object.values(loaderData?.initialValuesByTab || {});
               return valuesByTab.reduce<Record<string, string | boolean | number | null>>(
                 (acc, tabValues) => ({ ...acc, ...tabValues }),
                 {},
               );
             }, [loaderData?.initialValuesByTab]);

             const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {
               const acc: FormValues = {};
               for (const f of fields) {
                 const key = f.matchcode;
                 if (!key) continue;
                 const pbDefault = flatDefaults?.[key];
                 let val: string | boolean = '';
                 if (pbDefault !== undefined) {
                   val = typeof pbDefault === 'boolean' ? pbDefault : String(pbDefault);
                 } else if (f.defaultValue !== undefined) {
                   val = typeof f.defaultValue === 'boolean' ? f.defaultValue : String(f.defaultValue);
                 }
                 // If this is a select/combo field and the provided default looks like a
                 // display label (not the option.value), try to map it to the canonical
                 // option.value so the select doesn't create a synthetic option.
                 if (
                   typeof val === 'string' &&
                   val !== '' &&
                   (f.controlType === 'select' || String(f.controlType) === 'combo') &&
                   Array.isArray(f.options) &&
                   f.options.length > 0
                 ) {
                   const asStr = String(val).trim();
                   // If value already matches an option.value, keep it
                   if (!f.options.some((o) => String(o.value) === asStr)) {
                     // Try to match by label (case-insensitive)
                     const found = f.options.find(
                       (o) => String(o.label).trim().toUpperCase() === asStr.toUpperCase(),
                     );
                     if (found) val = String(found.value);
                   }
                 }
                 if (f.controlType === 'checkbox') val = Boolean(val ?? false);
                 acc[key] = val;
               }
               return acc;
             };

             // Validate required fields and compute button state overrides
             // Uses form values and normalized field definitions to determine if OK/NEXT should be enabled
             // Merge rendererFormValues (from FormRenderer) with watched RHF values (from external updates)

const watchedFormValues = (formMethods as any).watch?.() || formMethods.getValues();
// Use renderer values as primary source, fallback to RHF watched values
const mergedFormValues = { ...watchedFormValues, ...rendererFormValues };

console.log('[PolicyInformation] DEBUG - Merged form values:', {
  rhfValues: watchedFormValues,
  rendererValues: rendererFormValues,
  merged: mergedFormValues,
});

// Field-level action: info icon click handler for POLPOL_NRLVDAT only
const handleFieldInfoClick = (field: NormalizedField, value: string | boolean) => {
  const infoTriggerMatchcode = field.infoMatchcode ?? field.matchcode;
  console.log('[InfoIcon] Clicked info icon', {
    fieldMatchcode: field.matchcode,
    infoTriggerMatchcode,
    value,
  });
  void handleFieldCommit(infoTriggerMatchcode, value, 'click');
};

// Helper: Get default order for button by matchcode
const getDefaultButtonOrder = (matchcode: string): number => {
  const DEFAULT_BUTTON_ORDER: Record<string, number> = {
    NEXT: 1,
    OK: 2,
    CANCEL: 3,
    OKSPECIAL: 4,
    SUBMIT: 5,
    SAVE: 6,
    APPLY: 7,
    ADD: 10,
    DELETE: 11,
    SEARCH: 20,
    SET_SEARCH: 21,
    RATE: 22,
    BACK: 80,
    RESET: 81,
    CLEAR: 82,
    HEADERBTN1: 100,
    PATHUPDATE: 100,
  };
  const upper = matchcode.toUpperCase();
  return DEFAULT_BUTTON_ORDER[upper] ?? 50;
};
const validatedPageButtons = useMemo(() => {
  try {
    const normalizedPageButtons = (loaderData?.pageButtons || []).map((btn) => ({
      ...btn,
      disabled: Boolean(btn.disabled),
      visible: btn.visible ?? true,
}));

// Validate only fields that remain renderable after static presence filtering/merging.
const allFields = Object.values(normalizedStaticByTab).flatMap((tabFields) =>
  mergeFieldsWithPageBuild((tabFields || []) as NormalizedField[]).filter(
    (field) => field.visible !== false,
  ),
);

console.log('[PolicyInformation] DEBUG - Raw allFields structure:', {
  totalFields: allFields.length,
  sampleFields: allFields.slice(0, 3).map((f) => ({
    matchcode: f.matchcode,
    required: f.required,
    label: f.label,
  })),
  requiredFieldsCount: allFields.filter((f) => f.required).length,
  allRequiredFields: allFields
    .filter((f) => f.required)
    .map((f) => ({
      matchcode: f.matchcode,
      label: f.label,
    })),
});

console.log(
  '[PolicyInformation] DEBUG - Current merged form values:',
  mergedFormValues,
);

// Check which required fields are missing values
const validation = checkRequiredFields(allFields, mergedFormValues, {});

console.log('[PolicyInformation] DEBUG - Validation result:', {
  allRequiredFilled: validation.allRequiredFilled,
  missingFieldsCount: validation.missingFields.length,
  missingFields: validation.missingFields.map((f) => ({
    matchcode: f.matchcode,
    label: f.label,
  })),
});

// Compute button overrides based on validation
const overrides = computePageBuildButtonOverrides(
  normalizedPageButtons,
  validation.allRequiredFilled,
);

console.log('[PolicyInformation] DEBUG - Button overrides generated:', {
  overrides: Object.entries(overrides).map(([key, val]) => ({ button: key, ...val })),
});


// Apply overrides to buttons
let buttonsWithOverrides = normalizedPageButtons.map((btn) => {
  // Try to get override by uppercase matchcode (overrides are keyed by uppercase)
  const matchcodeUpper = btn.matchcode?.toUpperCase?.() || '';
  const override = overrides[matchcodeUpper];

  if (override) {
    const result = {
      ...btn,
      disabled: override.disabled,
      visible: override.visible,
    };
    console.log(`[PolicyInformation] DEBUG - Button ${btn.matchcode}:`, {
      original: { disabled: btn.disabled, visible: btn.visible },
      override: override,
      final: { disabled: result.disabled, visible: result.visible },
    });
    return result;
  }
  console.log(
    `[PolicyInformation] DEBUG - No override found for button: ${btn.matchcode}`,
  );
  return btn;
});

// Sort buttons by order: NEXT (1) → OK (2) → CANCEL (3) → others → PathUpdate (100)
buttonsWithOverrides = buttonsWithOverrides.sort((a, b) => {
  const aOrder = getDefaultButtonOrder(a.matchcode);
  const bOrder = getDefaultButtonOrder(b.matchcode);
  return aOrder - bOrder;
});

console.log('[PolicyInformation] Button Validation & Sorting:', {
  allRequiredFilled: validation.allRequiredFilled,
  missingFields: validation.missingFields.map((f) => f.matchcode),
  sortedButtons: buttonsWithOverrides.map((b) => ({
    matchcode: b.matchcode,
    order: getDefaultButtonOrder(b.matchcode),
    disabled: b.disabled,
    visible: b.visible,
  })),
});

return buttonsWithOverrides;
} catch (error) {
console.error('[PolicyInformation] Button validation failed:', error);
return (loaderData?.pageButtons || []).map((btn) => ({
  ...btn,
  disabled: Boolean(btn.disabled),
  visible: btn.visible ?? true,
}));
}
}, [loaderData?.pageButtons, mergedFormValues, shouldFilterStaticFieldsByPresence]);

const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
  id: tab.id,
  label: tab.label,
  accessletter: tab.accessletter,
  render: () => (
    <TabPanel id={tab.id} aria-labelledby={tab.id}>
      {/* For TABPOL try to approximate ASP layout: top-level policy fields, then side-by-side Ins
      {tab.id === 'TABPOL' ? (
        <>
          <div className="space-y-4">
            {/* Policy-level fields: match ASP two-column layout (left/right stacks) */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left column: preserve explicit ordering */}
              <div>
                {(() => {
                  const leftOrder = [
                    'POLPOLV3X_LEXLIDX',
                    'POLPOL_LPOLNUM',
                    'POLPOL_NEFFDAT',
                    'POLPOL_NEXPDAT',
                    'POLPOL_LRLVTCT',
                    'POLPOLEXT_LrgRskRul_BooleanValue',
                    'POLPOLEXT_Cnv_BooleanValue',
                  ];
                  const leftFields = leftOrder
                    .map((mc) =>
                      normalizedStaticByTab['TABPOL']?.find(
                        (f) => f.matchcode === mc,
                      ),
                    )
                    .filter(Boolean) as NormalizedField[];
                  const mergedLeft = mergeFieldsWithPageBuild(leftFields);

                  return (
                    <FormRenderer
                      fields={mergedLeft}
                      initialValues={getInitialValuesForFields(
                        mergedLeft,
                      )}
                      onCommitField={handleFieldCommit}
                      onValuesChange={handleFormValuesChange}
                      useReactHookForm={true}
                      fieldsPerRow={1}
                      onInfoClick={handleFieldInfoClick}
                    />
                  );
                })()}
              </div>

              {/* Right column: preserve explicit ordering */}
              <div>
                {(() => {
                  const rightOrder = [
                    'POLPOL_LCMP',
                    'POLPOLV3X_LPRDCDE',
                    'POLPOL_LPLN',
                    'POLPOLEXT_PgmCdeDes_StringValue',
                    'POLXCP_POLPOL_TERRSK_LMSC',
                    'POLPOLEXT_ExcNbc_BooleanValue',
                    'POLPOLEXT_NyxFreTrd_BooleanValue',
                    'POLPOLEXT_NyxClsTyp_StringValue',
                    'POLPOLEXT_TutOpr_BooleanValue',
                    'POLPOLEXT_NyxClsCde_StringValue',
                  ];
                  const rightFields = rightOrder
                    .map((mc) =>
                      normalizedStaticByTab['TABPOL']?.find(
                        (f) => f.matchcode === mc,
                      )
                    )
                    .filter(Boolean) as NormalizedField[];
                  const mergedRight = mergeFieldsWithPageBuild(rightFields);

                  return (
                    <FormRenderer
                      fields={mergedRight}
                      initialValues={getInitialValuesForFields(
                          mergedRight,
                      )}
                      onCommitField={handleFieldCommit}
                      onValuesChange={handleFormValuesChange}
                      useReactHookForm={true}
                      fieldsPerRow={1}
                      onInfoClick={handleFieldInfoClick}
                  />
              );
          })()}
      </div>
  </div>
  <Divider className="mb-3!" />
  {/* TODO ⟪missing text — JSX comment "Secondary policy fields (Policy Type / PMA / Profession / Business / State /" is truncated at the right edge of the captured photos; closing */} and remainder of comment not captured⟫
  <div className="grid grid-cols-2 gap-6 pt-2">
      <div>
          {(() => {
              const groupLeft = [
                  'POLPOL_LPOLTYP',
                  'POLPOL_LPMADES',
                  'POLPOLV3X_LBUSDES',
              ];
              const leftFields = groupLeft
                  .map((mc) =>
                      normalizedStaticByTab['TABPOL']?.find(
                          (f) => f.matchcode === mc,
                      )
                  .filter(Boolean) as NormalizedField[];
              const merged = mergeFieldsWithPageBuild(leftFields);
              return (
                  <FormRenderer
                      fields={merged}
                      initialValues={getInitialValuesForFields(merged)}
                      onCommitField={handleFieldCommit}
                      onValuesChange={handleFormValuesChange}
                      useReactHookForm={true}
                      fieldsPerRow={1}
                      onInfoClick={handleFieldInfoClick}
                  />
              );
          })()}
      </div>
      <div>
          {(() => {
              const groupRight = [
                  'POLPOL_LBUSTYP',
                  'POLPOL_LPRISTANAM',
                  'POLPOLEXT_SafCdt_StringValue',
                  'POLPOLEXT_DocSta_StringValue',
              ];
              const rightFields = groupRight
                  .map((mc) =>
                      normalizedStaticByTab['TABPOL']?.find(
                          (f) => f.matchcode === mc,
                      )
                  .filter(Boolean) as NormalizedField[];
              const merged = mergeFieldsWithPageBuild(rightFields);
              return (
                  <FormRenderer
                      fields={merged}
                      initialValues={getInitialValuesForFields(merged)}
                      onCommitField={handleFieldCommit}
                      onValuesChange={handleFormValuesChange}
                      useReactHookForm={true}
                      fieldsPerRow={1}
                      onInfoClick={handleFieldInfoClick}
                  />
              );
          })()}
      </div>
  </div>
  <Divider className="my-3!" />
{/* Insured / Agency highlight panel: render correct fields from TABPOL */}
<div className=" pt-4">
  <div className="grid grid-cols-2 gap-6">
      <div className="">
          <Typography className="clsDivHeader tab-heading">
              Insured Information
          </Typography>
          {(() => {
              const arr = [
                  normalizedStaticByTab['TABPOL']?.find(
                      (f) => f.matchcode === 'POLNAM_LINSPRINAM_1',
                  ),
                  normalizedStaticByTab['TABPOL']?.find(
                      (f) => f.matchcode === 'POLNAM_LINSCTY_1',
                  ),
                  normalizedStaticByTab['TABPOL']?.find(
                      (f) => f.matchcode === 'POLNAM_LINSSTA_1',
                  ),
              ].filter(Boolean) as NormalizedField[];
              const merged = mergeFieldsWithPageBuild(arr);
              return (
                  <FormRenderer
                      fields={merged}
                      initialValues={getInitialValuesForFields(
                          merged,
                      )}
                      onCommitField={handleFieldCommit}
                      useReactHookForm={true}
                      fieldsPerRow={1}
                      onInfoClick={handleFieldInfoClick}
                  />
              );
          })()}
      </div>
      <div>
          <Typography className="clsDivHeader tab-heading">
              Agency Information
          </Typography>
          {(() => {
              const arr = [
                  normalizedStaticByTab['TABPOL']?.find(
                      (f) => f.matchcode === 'POLAGT_LAGTNUM_1',
                  ),
                  normalizedStaticByTab['TABPOL']?.find(
                      (f) => f.matchcode === 'POLAGT_LPCRNUM_1',
                  ),
                  normalizedStaticByTab['TABPOL']?.find(
                      (f) => f.matchcode === 'POLAGT_LAGTPRINAM_1',
                  ),
                  normalizedStaticByTab['TABPOL']?.find(
                      (f) => f.matchcode === 'POLAGT_LPCRNAM_1',
                  ),
                  normalizedStaticByTab['TABPOL']?.find(
                      (f) => f.matchcode === 'POLAGT_LAGTCTY_1',
                  ),
                  normalizedStaticByTab['TABPOL']?.find(
                      (f) => f.matchcode === 'POLAGT_LAGTSTA_1',
                  ),
              ].filter(Boolean) as NormalizedField[];
              const merged = mergeFieldsWithPageBuild(arr);
              return (
                  <FormRenderer
                      fields={merged}
                      initialValues={getInitialValuesForFields(
                          merged,
              )}
              onCommitField={handleFieldCommit}
              useReactHookForm={true}
              fieldsPerRow={1}
              onInfoClick={handleFieldInfoClick}
          />
      );
  })()}
</div>
</div>
</div>
{/* TODO ⟪missing lines — blank line(s) before the comment below; photos show 1-2 lines of slack here, not precisely disambiguated⟫ */}
{/* Render remaining static TABPOL fields that weren't placed in left/right or panel */}
{(() => {
    const placed = new Set<string>([
        /* left */
        'POLPOLV3X_LEXLIDX',
        'POLPOL_LPOLNUM',
        'POLPOL_NEFFDAT',
        'POLPOL_NEXPDAT',
        'POLPOL_LRLVTCT',
        'POLPOLEXT_LrgRskRul_BooleanValue',
        'POLPOLEXT_Cnv_BooleanValue',
        'POLPOL_LPOLTYP',
        'POLPOL_LPMADES',
        'POLPOLV3X_LBUSDES',
        /* right */
        'POLPOL_LCMP',
        'POLPOLV3X_LPRDCDE',
        'POLPOL_LPLN',
        'POLPOLEXT_PgmCdeDes_StringValue',
        'POLXCP_POLPOL_TERRSK_LMSC',
        'POLPOLEXT_ExcNbc_BooleanValue',
        'POLPOLEXT_NyxFreTrd_BooleanValue',
        'POLPOLEXT_NyxClsTyp_StringValue',
        'POLPOLEXT_TutOpr_BooleanValue',
        'POLPOLEXT_NyxClsCde_StringValue',
        'POLPOL_LBUSTYP',
        'POLPOL_LPRISTANAM',
        'POLPOLEXT_SafCdt_StringValue',
        'POLPOLEXT_DocSta_StringValue',
        /* insured / agent */
        'POLNAM_LINSPRINAM_1',
        'POLNAM_LINSCTY_1',
        'POLNAM_LINSSTA_1',
        'POLAGT_LAGTNUM_1',
        'POLAGT_LPCRNUM_1',
        'POLAGT_LAGTPRINAM_1',
        'POLAGT_LPCRNAM_1',
        'POLAGT_LAGTCTY_1',
        'POLAGT_LAGTSTA_1',
    ]);

    const allStatic = normalizedStaticByTab['TABPOL'] || [];
    const remaining = allStatic.filter(
        (f) => !placed.has(String(f.matchcode || '')),
    );
    if (!remaining || remaining.length === 0) return null;
    const merged = mergeFieldsWithPageBuild(remaining as NormalizedField[]);
    return (
        <div className="pt-4">
            {/* Tab-level controls (OK/NEXT/etc.) */}
            <div className="mb-2">
                {(loaderData?.controlsByTab?.['TABPOL'] || []).map(
                    (c: any) => (
                        <button
                            key={c.matchcode}
                            className="mr-2 btn btn-sm"
                            onClick={() =>
                                handleFieldCommit(
                                    c.matchcode,
                                    true,
                                    'click',
                                )
                            }
                        >
                            {c.text}
                        </button>
                    ),
                )}
            </div>
            <FormRenderer
                fields={merged}
                initialValues={getInitialValuesForFields(merged)}
                onCommitField={handleFieldCommit}
                useReactHookForm={true}
                fieldsPerRow={2}
                onInfoClick={handleFieldInfoClick}
            />
        </div>
    );
})()}
</>
) : tab.id === 'TABDET' ? (
<div className="space-y-4">
  {/* TABDET: two-column grid layout */}
  <div className="grid grid-cols-2 gap-6">
    {/* Left column */}
    <div className="space-y-4">
      {/* Top fields (vertical stack) */}
      {(() => {
        const topFields = [
          'POLPOL_LEXPPOLNUM',
          'POLPOL_NRLVEFFDAT',
          'POLPOL_NRLVDAT',
        ];
          const fields = topFields
          .map((mc) =>
            normalizedStaticByTab['TABDET']?.find(
              (f) => f.matchcode === mc,
            ),
          .filter(Boolean) as NormalizedField[];
          const merged = mergeFieldsWithPageBuild(fields).map((field) => {
            if (field.matchcode === 'POLPOL_NRLVDAT') {
              return {
                ...field,
                showInfoIcon: true,
                infoAriaLabel:
                  'Show Eff. Date of Rates information',
              };
           }
           return field;
         });

         return (
           <FormRenderer
             fields={merged}
             initialValues={getInitialValuesForFields(merged)}
             onCommitField={handleFieldCommit}
             useReactHookForm={true}
             fieldsPerRow={1}
             onInfoClick={handleFieldInfoClick}
           />
         );
       })()}

       {/* POLPOL_NSHRTRMFAC and POLPOL_HSHRTRMFAC side-by-side */}
       <div className="grid grid-cols-2 gap-2">
         {(() => {
           const sideFields = [
             'POLPOL_NSHRTRMFAC',
             'POLPOL_HSHRTRMFAC',
           ];
           const fields = sideFields
             .map((mc) =>
               normalizedStaticByTab['TABDET']?.find(
                 (f) => f.matchcode === mc,
               ),
             )
           .filter(Boolean) as NormalizedField[];
           const merged = mergeFieldsWithPageBuild(fields).map(
             (f, idx) => (idx === 1 ? { ...f, label: '' } : f),
           );
           const initialVals = getInitialValuesForFields(merged);
           return merged.map((field, idx) => (
             <FieldRenderer
               key={field.matchcode}
               className={
                 idx === 0 ? '' : 'relative right-[-30px]'
               }
               label={field.label}
               value={initialVals[field.matchcode]}
               controlType={field.controlType}
               options={field.options || []}
⟪?⟫ // unreadable in all captured photos
// TODO ⟪missing lines 1045-1055 — not captured in photos⟫
             field.matchcode,
             normalized,
             eventType,
           );
         }}
       />
     ));
   })()}
   </div>
   ));
   {/* Bottom fields (vertical stack) */}
   {(() => {
     const bottomFields = ['POLPOL_NMINPRM', 'POLPOL_LMINCLC'];
     const fields = bottomFields
       .map((mc) =>
         normalizedStaticByTab['TABDET']?.find(
           (f) => f.matchcode === mc,
         ),
       )
     .filter(Boolean) as NormalizedField[];
     const merged = mergeFieldsWithPageBuild(fields);
     return (
       <FormRenderer
         fields={merged}
         initialValues={getInitialValuesForFields(merged)}
         onCommitField={handleFieldCommit}
         useReactHookForm={true}
         fieldsPerRow={1}
         onInfoClick={handleFieldInfoClick}
       />
     );
   })()}
 </div>
 {/* Right column */}
 <div>
   {(() => {
     const rightOrder = ['POLPOL_NTCTDAT'];
     const rightFields = rightOrder
       .map((mc) =>
         normalizedStaticByTab['TABDET']?.find(
           (f) => f.matchcode === mc,
         ),
       )
       .filter(Boolean) as NormalizedField[];
     const mergedRight = mergeFieldsWithPageBuild(rightFields);
     return (
       <FormRenderer
         fields={mergedRight}
         initialValues={getInitialValuesForFields(mergedRight)}
         onCommitField={handleFieldCommit}
         useReactHookForm={true}
         fieldsPerRow={1}
         onInfoClick={handleFieldInfoClick}
       />
     );
   })()}
 </div>
</div>
</div>
) : tab.id === 'TABBIL' ? (
 <div className="space-y-10">
   {/* Render billing fields using loader-provided normalized fields */}
   {(() => {
     const billing = (loaderData?.normalizedByTab?.['TABBIL'] ||
       []) as NormalizedField[];
     // Allow only billing-related matchcodes: union of static TABBIL mapping and loa⟪?⟫ // TODO: comment text truncated at right edge of captured photos, remainder not captured
     const staticBilling = (fieldsByTab['TABBIL'] || []).map(
       (f) => f.matchcode,
     );
     const allowed = new Set<string>([
       ...staticBilling,
       ...billing.map((f) => String(f.matchcode || '')),
     ]);
     const mergedAll = mergeFieldsWithPageBuild(billing);
     const merged = mergedAll.filter((f) =>
       allowed.has(String(f.matchcode || '')),
     );
     return (
       <div>
         <div className="grid grid-cols-2 gap-6">
           <FormRenderer
             fields={merged}
             initialValues={getInitialValuesForFields(merged)}
             onCommitField={handleFieldCommit}
             useReactHookForm={true}
             fieldsPerRow={1}
             onInfoClick={handleFieldInfoClick}
           />
         </div>
       </div>
     );
   })()}
   </div>
   ) : tab.id === 'TABINS' ? (
     <div className="space-y-4">
       {/* Insurer tab: prefer loader-provided fields; otherwise show key/value li */}
       {(() => {
         const fields = (loaderData?.normalizedByTab?.['TABINS'] ||
           []) as NormalizedField[];
         if (fields && fields.length > 0) {
           console.log('[policyInformation] TABINS loader fields', fields);
           const filtered = fields
             .filter(
               (f) =>
                 f.matchcode !== 'POLNAM_LINSZIPEXT' &&
                 f.controlType !== 'button',
             )
             .map((f) => ({ ...f, visible: true }));
           const insButtons = fields
             .filter((f) => f.controlType === 'button')
             .map((f) => ({ ...f, visible: true }));
           console.log('[PolicyInformation] TABINS buttons', insButtons);
           if (filtered.length > 0) {
             const merged = mergeFieldsWithPageBuild(filtered);
             return (
               <>
                 <FormRenderer
                   fields={merged.map((f) => ({
                     ...f,
                     disabled: true,
                   }))}
                   initialValues={getInitialValuesForFields(merged)}
                   onCommitField={handleFieldCommit}
                   useReactHookForm={true}
                   fieldsPerRow={2}
                   onInfoClick={handleFieldInfoClick}
                 />
                 <div className="flex justify-start  gap-3 mb-3!">
                   {(insButtons || []).map((b: any) => (
                     <ActionButton
                       key={b.matchcode}
                       matchcode={b.matchcode}
                       text={b.label}
                       disabled={b.disabled}
                       visible={b.visible}
                       onCommit={handleFieldCommit}
                     />
                   ))}
                 </div>
                 {insuredGridConfig ? (
                   <CommonDataGrid
                     gridConfig={insuredGridConfig}
                     data={loaderData?.insuredGridData || []}
                     onRowClick={(row) =>
                       setSelectedInsuredRow(row as any)
                     }
                   />
                 ) : null}
               </>
               );
             }
             }
             const vals = loaderData?.initialValuesByTab?.['TABINS'] || {};
             return (
               <div>
                 {Object.keys(vals).map((k) => (
                   <div key={k} className="flex justify-between py-1">
        <div className="font-medium">{k}</div>
        <div>{String(vals[k])}</div>
      </div>
    ))}
  </div>
  );
})()}
</div>
) : tab.id === 'TABAGT' ? (
  <div className="space-y-4">
    {/* Agent tab: prefer loader-provided fields; otherwise show key/value li */}
    {(() => {
      const fields = (loaderData?.normalizedByTab?.['TABAGT'] ||
        []) as NormalizedField[];
      const filtered = fields
        .filter((f) => f.matchcode !== 'POLAGT_LAGTNUM_2_LOOKUP')
⟪?⟫ // unreadable in all captured photos
// TODO ⟪missing lines 1232-1232 — not captured in photos⟫
const merged = mergeFieldsWithPageBuild(filtered);
return (
  <FormRenderer
    fields={merged.map((f) => ({ ...f, disabled: true }))}
    initialValues={getInitialValuesForFields(merged)}
    onCommitField={handleFieldCommit}
    useReactHookForm={true}
    fieldsPerRow={2}
    onInfoClick={handleFieldInfoClick}
// TODO ⟪missing lines 1242-1242 — not captured in photos⟫
      );
    }
    const vals = loaderData?.initialValuesByTab?.['TABAGT'] || {};
    return (
      <div>
        {Object.keys(vals).map((k) => (
          <div key={k} className="flex justify-between py-1">
            <div className="font-medium">{k}</div>
            <div>{String(vals[k])}</div>
          </div>
          ))}
        </div>
      );
    })()}
  </div>
  );
  ) : (
⟪?⟫ // unreadable in all captured photos
// TODO ⟪missing lines 1261-1261 — not captured in photos⟫
                {/* Default: render normalized static fields for the tab via FormRenderer */}
            {(() => {
                  const arr = normalizedStaticByTab[tab.id] || [];
                  const merged = mergeFieldsWithPageBuild(arr as NormalizedField[]);
                  return (
                    <FormRenderer
                      fields={merged}
                      initialValues={getInitialValuesForFields(merged)}
                      onCommitField={handleFieldCommit}
                      useReactHookForm={true}
                      fieldsPerRow={2}
                      onInfoClick={handleFieldInfoClick}
                    />
                  );
            })()}
        </div>
        )}
        </TabPanel>
        ),
}));

// Emit tab:selected event when user switches tab
const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    pubSub.emit('tab:selected', { tabstripId: 'policyTabs', tabMatchcode: tabId });
};
const policyId = getPolicyID<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;
const transactionType = getPolicyID<Record<string, unknown>>(
    'aqs:global-variables',
    {},
)?.mstrTransactionType;
const isRouteLoading = navigation.state === 'loading';
const showBusyBar = isRouteLoading || isExecuting || isCommitting;
return (
    <div aria-busy={showBusyBar}>
        <h1 className="text-[28px] font-semibold text-left text-[#00205B]">
            Policy Informations
        </h1>
        {/* Action buttons from PageBuild (OK / NEXT / CANCEL / etc.) with validation overrides */}
        <div className="grid grid-cols-2 items-top mb-4 justify-between">
            <div className="flex items-baseline gap-5">
                <h3>Policy - {(policyId || '') as string}</h3>
                <Typography
                    variant="body2"
                        sx={{
                            mb: 2,
                            color: '#00205B',
                            fontSize: '14px',
                            backgroundColor: '#E9F1FF',
                            padding: '6px',
                            fontWeight: '500',
                            display: 'inline-block',
                        }}
                    >
                        {(transactionType || '') as string}
                    </Typography>
                </div>
                <div className="flex justify-end gap-3">
                    {(validatedPageButtons || []).map((b: any) => (
                        <ActionButton
                            key={b.matchcode}
                            matchcode={b.matchcode}
                            text={b.text}
                            disabled={b.disabled}
                            visible={b.visible}
                            onCommit={handleFieldCommit}
                        />
                    ))}
                </div>
            </div>
            {showBusyBar ? <LinearProgress sx={{ mb: 2 }} /> : null}
            <Tabs
                tabs={tabConfigs}
                value={activeTab}
                onChange={handleTabChange}
                contentPadding={2}
            />
        </div>
    );
};

export default PolicyInformation;
