// Ultimate Cover tabbed field rendering
// Uses static mapping from ultimate-cover-fields.ts and FormRenderer for all tabs
import React, { useEffect, useMemo, useCallback } from 'react';
import { useLoaderData } from 'react-router';
import Tabs from '@/components/tabView/TabView';
import { Button as ActionButton } from '@/components/button';
import { Typography } from '@mui/material';
import TabPanel from '@/components/tabView/TabPanel';
import { getItem as getPolicyID } from '@utils/session-storage';
import {
    ULTIMATE_COVER_TABS,
    DEFAULT_ACTIVE_TAB,
} from '@/features/policy/constants/ultimate-cover-tab-definitions';
import {
    ultimateCoverPolicyTabFields,
    ultimateCoverDetailsTabFields,
} from '@/features/policy/ultimate-cover-fields';
import type { BrowserCommand, CommitEventType, FormValues, NormalizedField } from '@/types';
import { FormRenderer } from '@/components/form-renderer';
import { getItem } from '@utils/local-storage';
import { extractCallsByTypeFromPageBuild } from '@/utils/build-xml-server-call-payload';
import type { PageBuildResponse } from '@/services/page-build';
import { resolveLegacyPrePostPlan } from '@/utils/build-eedata-array';
import { useFormMethods, useFormStore } from '@/providers/form-provider';
import type { SessionInfo } from '@features/auth/services/auth';
import { pubSub } from '@/utils/pub-sub';
import { LinearProgress } from '@mui/material';
import { useBrowserCommands } from '@/hooks/use-browser-commands';
import {
    useFormCommit,
    type CommitPlanContext,
    type CommitPlanResult,
    type ResponseCommandAdapterContext,
} from '@/hooks/use-form-commit';
import { checkRequiredFields } from '@/utils/required-field-validation';
import { computePageBuildButtonOverrides } from '@/utils/button-state-manager';

interface UltimateCoverLoaderData {
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
    meta?: { loaded?: boolean; error?: string };
}

// Group static fields by tab
const staticFieldsByTab: Record<string, any[]> = {
    TABPOLICY: ultimateCoverPolicyTabFields,
    TABDET: ultimateCoverDetailsTabFields,
};

// Normalize static fields -> NormalizedField
const normalizedStaticByTab: Record<string, NormalizedField[]> = Object.keys(
    staticFieldsByTab,
).reduce(
    (acc, tab) => {
        acc[tab] = (staticFieldsByTab[tab] || []).map(
            (f: any) =>
                ({
                    matchcode: f.matchcode,
                    label: f.label,
                    controlType: (f.controlType as any) ?? 'textbox',
                    options: f.options
                        ? f.options.map((o: any) => ({ label: o.label, value: o.value }))
                        : [],
                    defaultValue: f.controlType === 'checkbox' ? false : '',
                    disabled: f.disabled ?? false,
                    visible: f.visible ?? true,
                    required: f.required ?? false,
                    maxLength: f.maxLength,
                    isNumeric: f.isNumeric,
                    tabIndex: f.tabIndex, // Preserve tabIndex for column layout
                    left: f.left, // Preserve left positioning
                    top: f.top, // Preserve top positioning
                }) as NormalizedField,
        );
        return acc;
    },
    {} as Record<string, NormalizedField[]>,
);

const UltimateCover: React.FC = () => {
    const loaderData = useLoaderData() as UltimateCoverLoaderData;
    const [activeTab, setActiveTab] = React.useState<string>(DEFAULT_ACTIVE_TAB);
    const formMethods = useFormMethods();
    const [fieldMetadata] = useFormStore((store) => store.fieldMetadata);
    const { executeCommands, isExecuting } = useBrowserCommands(loaderData?.browserCommands ?? []);
    const [rendererFormValues, setRendererFormValues] = React.useState<Record<string, unknown>>({});

    // Subscribe to global tab:selected event for programmatic tab switching
    useEffect(() => {
        const unsubscribe = pubSub.subscribe('tab:selected', (data) => {
            setActiveTab(data.tabMatchcode);
        });
        return () => unsubscribe();
    }, []);

    // Handle form value changes from FormRenderer
    const handleFormValuesChange = useCallback((values: FormValues) => {
        console.log('[UltimateCover] FormRenderer values changed:', values);
        setRendererFormValues(values);
    }, []);

    const ultimateCoverCommitSessionInfo = useMemo(() => {
        const sessionInfo = (getItem('sessionInformation') as SessionInfo) || ({} as SessionInfo);
        return sessionInfo as SessionInfo;
    }, []);

    const navContext = getItem<Record<string, unknown>>('aqs:navigation:context', {});
    const resolvedXmlFileName = useMemo(() => {
        return (
            (typeof navContext?.xmlFileName === 'string' && navContext.xmlFileName.trim()) ||
            (typeof loaderData?.xmlFileName === 'string' && loaderData.xmlFileName.trim()) ||
            (typeof loaderData?.xmlFilePath === 'string' && loaderData.xmlFilePath.trim()) ||
            'Pol_PIPHBOP_Ucp_20250201'
        );
    }, [loaderData?.xmlFileName, loaderData?.xmlFilePath, navContext]);

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
                }
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
                console.warn('[UltimateCover] No commit calls configured for matchcode', {
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

    const { commitField } = useFormCommit({
        pageBuildData: loaderData?.pageBuild as PageBuildResponse | undefined,
        sessionInfo: ultimateCoverCommitSessionInfo,
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

    // Prepare normalized mapping from PageBuild service fields
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
        } catch {
            return new Map<string, NormalizedField>();
        }
    }, [loaderData?.normalizedByTab]);

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
                        };
                    }
                ).Page?.controls?.control
                : undefined;

        const controls = Array.isArray(controlsRaw)
            ? controlsRaw
            : controlsRaw
                ? [controlsRaw]
                : ⟪?⟫;

        for (const control of controls) {
            const matchcode = String(control['@matchcode'] ?? control.matchcode ?? '')
                .trim()
                .toUpperCase();
            if (matchcode) presence.add(matchcode);
        }

        return presence;
    }, [loaderData?.normalizedByTab, loaderData?.pageBuild]);

    const shouldFilterStaticFieldsByPresence = pageBuildPresenceSet.size > 0;

    const flatDefaults = React.useMemo(() => {
        const valuesByTab = Object.values(loaderData?.initialValuesByTab || {});
        return valuesByTab.reduce<Record<string, string | boolean | number | null>>(
            (acc, tabValues) => ({ ...acc, ...tabValues }),
            {}
        );
    }, [loaderData?.initialValuesByTab]);

    const mergeFieldsWithPageBuild = useCallback(
        (fields: NormalizedField[] = []): NormalizedField[] =>
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
                }),
        [
            shouldFilterStaticFieldsByPresence,
            pageBuildPresenceSet,
            normalizedPageBuildMap,
            flatDefaults,
        ],
    );

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
            if (f.controlType === 'checkbox') val = Boolean(val ?? false);
            acc[key] = val;
        }
        return acc;
    };

    const watchedFormValues = (formMethods as any).watch?.() || formMethods.getValues();
    const mergedFormValues = useMemo(
        () => ({ ...watchedFormValues, ...rendererFormValues }),
        [watchedFormValues, rendererFormValues],
    );

    const handleFieldInfoClick = (field: NormalizedField, value: string | boolean) => {
        const infoTriggerMatchcode = field.matchcode;
        console.log('[UltimateCover] Info icon clicked', {
            fieldMatchcode: field.matchcode,
            value,
        });
        void handleFieldCommit(infoTriggerMatchcode, value, 'click');
    };

    const getDefaultButtonOrder = (matchcode: string): number => {
        const DEFAULT_BUTTON_ORDER: Record<string, number> = {
            NEXT: 1,
            OK: 2,
            CANCEL: 3,
            SUBMIT: 5,
            SAVE: 6,
            BACK: 80,
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

            const allFields = Object.values(normalizedStaticByTab).flatMap((tabFields) =>
                mergeFieldsWithPageBuild((tabFields || []) as NormalizedField[]).filter(
                    (field) => field.visible !== false,
                ),
            );

            const validation = checkRequiredFields(allFields, mergedFormValues, {});

            const overrides = computePageBuildButtonOverrides(
                normalizedPageButtons,
                validation.allRequiredFilled,
            );
            let buttonsWithOverrides = normalizedPageButtons.map((btn) => {
                const matchcodeUpper = btn.matchcode?.toUpperCase?.() || '';
                const override = overrides[matchcodeUpper];
                if (override) {
                    return {
                        ...btn,
                        disabled: override.disabled,
                        visible: override.visible,
                    };
                }
                return btn;
            });

            buttonsWithOverrides = buttonsWithOverrides.sort((a, b) => {
                const aOrder = getDefaultButtonOrder(a.matchcode);
                const bOrder = getDefaultButtonOrder(b.matchcode);
                return aOrder - bOrder;
            });

            return buttonsWithOverrides;
        } catch (error) {
            console.error('[UltimateCover] Button validation failed:', error);
            return (loaderData?.pageButtons || []).map((btn) => ({
                ...btn,
                disabled: Boolean(btn.disabled),
                visible: btn.visible ?? true,
            }));
        }
    }, [loaderData?.pageButtons, mergedFormValues, mergeFieldsWithPageBuild]);

    const policyId = getPolicyID<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;
    const transactionType = getPolicyID<Record<string, unknown>>(
        'aqs:global-variables',
        {},
    )?.mstrTransactionType;

    const tabConfigs = ULTIMATE_COVER_TABS.map((tab) => ({
        id: tab.id,
        label: tab.label,
        render: () => {
            const tabFields = mergeFieldsWithPageBuild(normalizedStaticByTab[tab.id] || []);
            const initialValues = getInitialValuesForFields(normalizedStaticByTab[tab.id] || []);
            return (
                <TabPanel id={tab.id} aria-labelledby={tab.id}>
                    <div className="grid gap-5">
                        <FormRenderer
                            fields={tabFields}
                            // buttons={validatedPageButtons as any}
                            initialValues={initialValues}
                            onCommitField={handleFieldCommit}
                            onValuesChange={handleFormValuesChange}
                            useReactHookForm={true}
                            fieldsPerRow={tab.id === 'TABPOLICY' ? 2 : 1}
                            onInfoClick={handleFieldInfoClick}
                        />
                    </div>
                </TabPanel>
            );
        },
    }));

    return (
        <div>
            <h1 className="text-[28px] font-semibold text-left text-[#00205B]">Ultimate Cover</h1>
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
                            display: 'inline-block'
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
            {/* {showBusyBar ? <LinearProgress sx={{ mb: 2 }} /> : null} */}
            <Tabs tabs={tabConfigs} value={activeTab} onChange={(tabId) => setActiveTab(tabId)} />
        </div>
    );
};

export default UltimateCover;
