// COMPLETE REFERENCE — src/layouts/tab-layout.tsx
// Contains ALL changes: initialTab preselect + Cancel focus + forced tab
// handler (window_onload GAPs 4-6) and pendingTab switch-before-focus
// (shell #79, needs focus-store v2). Change blocks are marked >>> GAP.
// Requires ./render-layout-node to exist in your branch's layouts folder
// (it does — the import matched during the earlier integration).

import { useEffect, useRef, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { RenderLayoutNode } from './render-layout-node';
import { FocusStoreApi, usePendingTab, useFocusActions } from '@/stores/focus-store';

// types
import type { SyntheticEvent } from 'react';
import type { TabContainerNode } from '@/types/layout';

interface TabLayoutProps {
    node: TabContainerNode;
    /** Tab to show on mount (legacy mqsTab). Defaults to the first tab. */
    initialTab?: number;
    /** Fired after any tab activation — user click or programmatic. */
    onTabClick?: (tabIndex: number) => void;
}

function TabLayout({ node, initialTab = 0, onTabClick }: TabLayoutProps) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [mountedTabs, setMountedTabs] = useState<Set<number>>(
        () => new Set([initialTab]),
    );
    const didInitRef = useRef(false);

    // >>> GAP 4-6: one-time init when the session asks for a non-first tab
    useEffect(() => {
        if (didInitRef.current || initialTab === 0) return;
        didInitRef.current = true;

        setActiveTab(initialTab);
        setMountedTabs((prev) => new Set(prev).add(initialTab));

        // GAP 5: focus Cancel when a non-first tab is preselected
        FocusStoreApi.getState().actions.requestFocus('dtaCancel');

        // GAP 6: fire the tab-click handler after programmatic selection
        onTabClick?.(initialTab);
    }, [initialTab, onTabClick]);
    // <<< GAP

    // >>> GAP #79: switch tab BEFORE focusing when a focus request targets
    // a control hosted on another tab (focus-store v2 pendingTab)
    const pendingTab = usePendingTab();
    const focusActions = useFocusActions();
    useEffect(() => {
        if (pendingTab === null) return;
        setActiveTab(pendingTab);
        setMountedTabs((prev) => new Set(prev).add(pendingTab));
        focusActions.clearTab();
    }, [pendingTab, focusActions]);
    // <<< GAP

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setMountedTabs((prev) => new Set(prev).add(newValue));
        onTabClick?.(newValue);
    };

    return (
        <Box>
            <Tabs
                value={activeTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                {node.tabs.map((tab, i) => (
                    <Tab
                        key={tab.id}
                        id={`tab-${tab.id}`}
                        aria-controls={`tabpanel-${tab.id}`}
                        label={tab.label}
                        value={i}
                    />
                ))}
            </Tabs>

            {node.tabs.map((tab, i) => (
                <Box
                    key={tab.id}
                    role="tabpanel"
                    id={`tabpanel-${tab.id}`}
                    aria-labelledby={`tab-${tab.id}`}
                    hidden={activeTab !== i}
                    sx={{ p: 1 }}
                >
                    {mountedTabs.has(i) && (
                        <RenderLayoutNode node={tab} />
                    )}
                </Box>
            ))}
        </Box>
    );
}

export { TabLayout };
export default TabLayout;
