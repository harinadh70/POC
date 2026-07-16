import { useEffect, useRef, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { RenderLayoutNode } from './render-layout-node';
import { FocusStoreApi } from '@/stores/focus-store';

// types
import type { SyntheticEvent } from 'react';
import type { TabContainerNode } from '@/types/layout';

// VBS gaps addressed:
// GAP 4: Tab selection from session (mqsTab) — lines 347-358
// GAP 5: Cancel focus on tab switch — line 349
// GAP 6: Force tab click handler after programmatic selection — line 351

interface TabLayoutProps {
    node: TabContainerNode;
    /** Tab to show on mount (legacy mqsTab). Defaults to the first tab. */
    initialTab?: number;
    /** Fired after any tab activation — user click or programmatic (legacy OnTabClickHandler). */
    onTabClick?: (tabIndex: number) => void;
}

function TabLayout({ node, initialTab = 0, onTabClick }: TabLayoutProps) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [mountedTabs, setMountedTabs] = useState<Set<number>>(
        () => new Set([initialTab]),
    );
    const didInitRef = useRef(false);

    // GAP 4: one-time init when the session asks for a non-first tab.
    useEffect(() => {
        if (didInitRef.current || initialTab === 0) return;
        didInitRef.current = true;

        // The state initializers only see the mount-time value — these setters
        // cover an initialTab that arrives after mount (no-ops otherwise).
        setActiveTab(initialTab);
        setMountedTabs((prev) => new Set(prev).add(initialTab));

        // GAP 5: When showing a non-first tab, focus Cancel button
        // VBS: If Not dtaCancel.disabled And visible Then dtaCancel.focus
        FocusStoreApi.getState().actions.requestFocus('dtaCancel');

        // GAP 6: After programmatic tab selection, fire OnTabClickHandler
        // VBS: Call mobjAQSMain.OnTabClickHandler(Window)
        onTabClick?.(initialTab);
    }, [initialTab, onTabClick]);

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
