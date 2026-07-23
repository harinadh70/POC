// GAP #29 — EnableStartOptions (Main_ISLLSYS.vbs lines 2367-2421)
// MODIFIED — src/frames/system/str-piphsys-20010101.tsx
// Full copy of the original frame. STARTOPTIONS entries the user lacks
// permission for are disabled: permission codes come from the session
// xmlDetail item "permissions"; tab clicks are guarded and the modal's
// option buttons are disabled via runtime-override-store.
// (Truncated photo-original sections completed minimally, marked below.)

import { useState, useCallback, useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Box, Button } from '@mui/material';

// hooks
import { useCommandHandlers } from '@hooks/use-command-handlers';
import { useProcessBrowserCommands } from '@hooks/use-process-browser-commands';

// >>> GAP #29: EnableStartOptions — imports
// stores
import { SessionStoreApi } from '@stores/session-store';
import { ModalStoreApi } from '@stores/modal-store';
import { NavigationStoreApi } from '@stores/navigation-store';
import { RuntimeOverrideStoreApi } from '@stores/runtime-override-store';
// <<< GAP #29

// frames
import {
    Sidebar,
    Str_All_Policies_Subframe,
    Str_Home_Subframe,
    Str_WIP_Subframe,
} from '@features/system/components';

// types
import type { ClientStaticLoader } from '@features/frame/utils/loader';

// ----------------------------------------

// >>> GAP #29: EnableStartOptions — permission mapping
// Expected session shape: xmlDetail item name="permissions", value =
// comma-separated granted codes, e.g. "NEWPOLICY,WIP,ALLPOLICIES,PRINTJOBS"
// (populated at logon from the user-permissions payload). An absent item
// keeps the legacy default: every start option enabled.
const START_OPTION_PERMISSIONS: Record<string, string> = {
    newpolicy: 'NEWPOLICY',
    wip: 'WIP',
    allpolicies: 'ALLPOLICIES',
    printjobs: 'PRINTJOBS',
};

// STARTOPTIONS modal button matchcodes per legacy EnableStartOptions —
// disabled through runtime-override-store so the modal's FormRenderer
// picks them up (overrides are cleared automatically on modal close).
const START_OPTION_MODAL_MATCHCODES: Record<string, string> = {
    newpolicy: 'cmdNEWPOL',
    wip: 'cmdWIP',
    allpolicies: 'cmdALLPOL',
    printjobs: 'cmdPRINT',
};
// <<< GAP #29

function Str_PIPHSYS_20010101() {
    const loaderData = useLoaderData<ClientStaticLoader>();
    const handlers = useCommandHandlers();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<string>('home');

    // processes any commands returned from modal action
    useProcessBrowserCommands(handlers);

    console.log('Loader data for Str_PIPHSYS_20010101:', loaderData);

    // >>> GAP #29: EnableStartOptions — derive disabled option ids
    const permissionsCsv = SessionStoreApi(
        (state) =>
            state.xmlDetail.items.find((item) => item.name.toLowerCase() === 'permissions')
                ?.value ?? '',
    );

    const disabledStartOptions = useMemo(() => {
        if (!permissionsCsv) {
            // No permissions item in session — legacy default, all enabled
            return new Set<string>();
        }
        const granted = new Set(
            permissionsCsv
                .toUpperCase()
                .split(',')
                .map((code) => code.trim())
                .filter((code) => code !== ''),
        );
        return new Set(
            Object.entries(START_OPTION_PERMISSIONS)
                .filter(([, code]) => !granted.has(code))
                .map(([optionId]) => optionId),
        );
    }, [permissionsCsv]);
    // <<< GAP #29

    const handleTabChange = useCallback(
        (tabId: string) => {
            // >>> GAP #29: EnableStartOptions — guard disabled options
            if (disabledStartOptions.has(tabId)) {
                if (import.meta.env.DEV) {
                    console.warn(`[Str_PIPHSYS] Start option "${tabId}" disabled by permissions`);
                }
                return;
            }
            // <<< GAP #29
            if (tabId === 'newpolicy') {
                // Triggers fetcher.load('/modal?action=STARTOPTIONS&nodeKey=Pol%7CPol%7C0&height=400&width=600')
                // (completed from truncated photo-original — same pattern as
                // openStartOptionsModal in handlers/pol/pol-piphpol-20150801.ts)

                // >>> GAP #29: EnableStartOptions — disable modal option buttons
                // Apply overrides right before opening so they survive until the
                // Modal component's close-cleanup (clearAll) runs.
                for (const [optionId, matchcode] of Object.entries(
                    START_OPTION_MODAL_MATCHCODES,
                )) {
                    if (disabledStartOptions.has(optionId)) {
                        RuntimeOverrideStoreApi.getState().actions.setOverride(matchcode, {
                            disabled: true,
                        });
                    }
                }
                // <<< GAP #29

                ModalStoreApi.getState().actions.setPendingParams({
                    action: 'STARTOPTIONS',
                    nodeKey: 'Pol|Pol|0',
                    height: 400,
                    width: 600,
                });
                NavigationStoreApi.getState().actions.setDeferred(true);
                return;
            }
            setActiveTab(tabId);
        },
        [disabledStartOptions],
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'wip':
                return <Str_WIP_Subframe />;
            case 'allpolicies':
                return <Str_All_Policies_Subframe />;
            case 'printjobs':
                return (
                    <div>
                        <h1 className="policy-heading mb-4! p-4!">Print Jobs</h1>
                    </div>
                );
            default:
                return <Str_Home_Subframe onClick={handleTabChange} />;
        }
    };

    return (
        <Box className="flex max-h-full w-full">
            {/* TODO: remove after Phase 2 visual verification */}
            {/* (completed from truncated photo-original — dev-only STARTOPTIONS trigger) */}
            <Button
                className="hidden"
                onClick={() => handleTabChange('newpolicy')}
                // >>> GAP #29: EnableStartOptions — disable dev trigger too
                disabled={disabledStartOptions.has('newpolicy')}
                // <<< GAP #29
                data-testid="dev-startoptions-button"
            >
                STARTOPTIONS
            </Button>
            <Sidebar tab={activeTab} onTabChange={handleTabChange} />
            <Box component="main" className="grow overflow-y-auto">
                {renderTabContent()}
            </Box>
        </Box>
    );
}

// ----------------------------------------

export { Str_PIPHSYS_20010101 };
