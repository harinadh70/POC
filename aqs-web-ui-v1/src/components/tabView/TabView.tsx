import * as React from 'react';
import { Box, Tabs, Tab, Badge } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import TabPanel from './TabPanel';

export interface TabItem {
    /** Unique id for the tab */
    id: string;
    /** Label text/node for the tab */
    label: React.ReactNode;
    /** Optional icon */
    icon?: React.ReactElement<unknown> | string;
    /** Disable the tab */
    disabled?: boolean;
    /** Hide the tab entirely */
    hidden?: boolean;
    /** Badge content (e.g., count) */
    badgeContent?: React.ReactNode;

    /** Prefer: content renderer function (lazy evaluated) */
    render?: () => React.ReactNode;
    /** Or: static content */
    content?: React.ReactNode;

    /** Lazy mount: render only when first active */
    lazy?: boolean;
    /** Keep mounted after first open */
    keepMounted?: boolean;

    /** Optional per-tab sx */
    sx?: SxProps<Theme>;
}

export type TabVariant = 'standard' | 'scrollable' | 'fullWidth';

export interface TabViewProps {
    /** Tabs config */
    tabs: TabItem[];

    /** Controlled active tab id */
    value?: string;
    /** Uncontrolled initial tab id */
    initialTabId?: string;

    /** onChange callback */
    onChange?: (activeId: string, activeIndex: number, tab: TabItem) => void;

    /** MUI Tabs props */
    variant?: TabVariant;
    orientation?: 'horizontal' | 'vertical';
    centered?: boolean;
    allowScrollButtons?: 'auto' | 'on' | 'off';
    size?: 'small' | 'medium';

    /** Styling */
    tabsSx?: SxProps<Theme>;
    tabSx?: SxProps<Theme>;
    panelSx?: SxProps<Theme>;
    contentPadding?: number;

    /** Auto-fix if active tab becomes hidden/removed */
    autoFixHiddenSelection?: boolean;
}

/**
 * Reusable, dynamic Tab View:
 * - Supports controlled/uncontrolled usage
 * - Lazy mount + keepMounted
 * - Hidden/disabled tabs, badges, icons
 */
const TabView: React.FC<TabViewProps> = ({
    tabs,
    value,
    initialTabId,
    onChange,
    variant = 'scrollable',
    orientation = 'horizontal',
    centered = false,
    allowScrollButtons = 'auto',
    //size = 'small',
    tabsSx,
    tabSx,
    panelSx,
    contentPadding = 2,
    autoFixHiddenSelection = true,
}) => {
    //const theme = useTheme();

    // visible tabs
    const visibleTabs = React.useMemo(() => tabs.filter((t) => !t.hidden), [tabs]);

    // find index by id
    const indexById = React.useCallback(
        (id?: string) => (id ? visibleTabs.findIndex((t) => t.id === id) : -1),
        [visibleTabs],
    );

    // uncontrolled state
    const [uncontrolledId, setUncontrolledId] = React.useState<string | undefined>(() => {
        if (value !== undefined) return undefined;
        const candidate =
            initialTabId && visibleTabs.some((t) => t.id === initialTabId)
                ? initialTabId
                : visibleTabs[0]?.id;
        return candidate;
    });

    const activeId = value !== undefined ? value : uncontrolledId;
    let activeIndex = indexById(activeId);

    // auto-fix if active becomes hidden or not found
    React.useEffect(() => {
        if (!autoFixHiddenSelection) return;
        if (activeIndex === -1 && visibleTabs.length > 0) {
            const fixId = visibleTabs[0].id;
            if (value === undefined) setUncontrolledId(fixId);
            onChange?.(fixId, 0, visibleTabs[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, visibleTabs.length]);

    // track which tabs have mounted (for lazy+keepMounted)
    const [mountedIds, setMountedIds] = React.useState<Set<string>>(new Set());
    React.useEffect(() => {
        if (activeId) {
            setMountedIds((prev) => {
                if (prev.has(activeId)) return prev;
                const next = new Set(prev);
                next.add(activeId);
                return next;
            });
        }
    }, [activeId]);

    // a11y helpers
    const a11y = (index: number) => ({
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    });

    const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
        const nextTab = visibleTabs[newIndex];
        if (!nextTab) return;
        if (value === undefined) {
            setUncontrolledId(nextTab.id);
        }
        onChange?.(nextTab.id, newIndex, nextTab);
    };

    // Ensure index is valid
    activeIndex = Math.max(0, Math.min(activeIndex, visibleTabs.length - 1));

    const scrollButtons: 'auto' | boolean =
        allowScrollButtons === 'on' ? true : allowScrollButtons === 'off' ? false : 'auto';

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={activeIndex}
                onChange={handleChange}
                variant={variant}
                orientation={orientation}
                centered={centered}
                scrollButtons={scrollButtons}
                sx={tabsSx}
                TabIndicatorProps={{ sx: { height: 3 } }}
            >
                {visibleTabs.map((t, idx) => {
                    const labelNode =
                        t.badgeContent !== undefined ? (
                            <Badge color="secondary" badgeContent={t.badgeContent} max={999}>
                                <Box component="span">{t.label}</Box>
                            </Badge>
                        ) : (
                            t.label
                        );
                    return (
                        <Tab
                            key={t.id}
                            label={labelNode}
                            icon={t.icon}
                            iconPosition={t.icon ? 'start' : undefined}
                            disabled={t.disabled}
                            sx={tabSx}
                            {...a11y(idx)}
                        />
                    );
                })}
            </Tabs>

            {visibleTabs.map((t, idx) => {
                const isActive = idx === activeIndex;
                const shouldRender = t.lazy
                    ? isActive || (t.keepMounted && mountedIds.has(t.id))
                    : true;

                return (
                    <TabPanel
                        key={t.id}
                        id={`tabpanel-${idx}`}
                        aria-labelledby={`tab-${idx}`}
                        hidden={!isActive}
                        sx={panelSx}
                        padding={contentPadding}
                    >
                        {shouldRender ? (t.render ? t.render() : t.content) : null}
                    </TabPanel>
                );
            })}
        </Box>
    );
};

export default TabView;
