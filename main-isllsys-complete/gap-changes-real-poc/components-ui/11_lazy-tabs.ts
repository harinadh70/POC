// ============================================================================
// GAP #81: BuildTab (VBS lines 8888-8977)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub BuildTab(intTabIndex) is called on first tab click. It runs the
//   XSLT transform for that tab's XML data, injects the resulting HTML into
//   the tab's <div>, and wires up events. Subsequent clicks just show/hide
//   the div — no re-transform. This is lazy loading: tab content is only
//   built when first visited.
//
// REAL POC STATUS:
//   - tab-layout.tsx (changes/modified-reference/tab-layout.tsx) ALREADY has
//     lazy mounting via a `mountedTabs` Set<number>. Tabs are only rendered
//     after first selection, and stay mounted afterward (display: none when
//     not active). This matches the VBS BuildTab pattern.
//   - HOWEVER, the team's ORIGINAL tab.tsx and nested-tab.tsx in the main
//     branch may not have this lazy logic. The gap-changes tab-layout.tsx is
//     a MODIFIED REFERENCE that hasn't been merged yet.
//
// FIX:
//   Provide a standalone, reusable LazyTabPanel wrapper component that can
//   be dropped into any MUI Tabs setup (including the team's tab.tsx) to add
//   lazy mounting without requiring the full tab-layout.tsx rewrite.
//
// WHERE TO ADD: src/components/ui/lazy-tab-panel.tsx
// WIRE INTO: src/layouts/tab.tsx — wrap each tab's content in LazyTabPanel
// ============================================================================

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// LazyTabPanel
// ---------------------------------------------------------------------------
// Reusable wrapper for MUI tab content that implements lazy mounting.
//
// Behavior (mirrors VBS BuildTab):
//   - Children are NOT rendered until the tab is selected for the first time
//   - Once rendered, children stay mounted (hidden via display:none)
//   - This preserves form state, scroll position, and React component state
//     across tab switches — same as VBS which kept the injected HTML in the
//     DOM and toggled visibility
//
// Usage with MUI Tabs:
//   <Tabs value={activeTab} onChange={handleChange}>
//       <Tab label="General" />
//       <Tab label="Coverages" />
//   </Tabs>
//   <LazyTabPanel index={0} value={activeTab}>
//       <GeneralForm />
//   </LazyTabPanel>
//   <LazyTabPanel index={1} value={activeTab}>
//       <CoveragesGrid />   {/* only mounts on first click to tab 1 */}
//   </LazyTabPanel>

interface LazyTabPanelProps {
    /** This panel's tab index. */
    index: number;
    /** Currently active tab index (from MUI Tabs state). */
    value: number;
    /** Tab content — only mounted after first activation. */
    children: ReactNode;
    /**
     * Optional ID prefix for ARIA attributes.
     * Generates role="tabpanel" with proper aria-labelledby.
     */
    idPrefix?: string;
}

/**
 * LazyTabPanel
 *
 * Drop-in replacement for the bare <Box role="tabpanel"> pattern.
 * Tracks whether this tab has EVER been active. On first activation,
 * mounts children. After that, children stay mounted but hidden when
 * the tab is not active (display: none).
 *
 * This matches VBS BuildTab's behavior: XSLT content was generated
 * once on first tab click, then shown/hidden on subsequent clicks.
 */
export function LazyTabPanel({ index, value, children, idPrefix = 'tab' }: LazyTabPanelProps) {
    // Track whether this tab has ever been visited
    const [hasBeenActive, setHasBeenActive] = useState(() => value === index);

    // When the tab becomes active for the first time, mark it as visited
    useEffect(() => {
        if (value === index && !hasBeenActive) {
            setHasBeenActive(true);
        }
    }, [value, index, hasBeenActive]);

    const isActive = value === index;

    return (
        <Box
            role="tabpanel"
            id={`${idPrefix}panel-${index}`}
            aria-labelledby={`${idPrefix}-${index}`}
            // Hidden attribute for accessibility + display:none for layout
            hidden={!isActive}
            sx={{
                display: isActive ? 'block' : 'none',
                p: 1,
            }}
        >
            {/* Only render children after first activation */}
            {hasBeenActive && children}
        </Box>
    );
}

export default LazyTabPanel;

// ---------------------------------------------------------------------------
// INTEGRATION: How to wire into tab.tsx
// ---------------------------------------------------------------------------
//
// BEFORE (team's tab.tsx — renders all tabs eagerly):
//
//   {node.tabs.map((tab, i) => (
//       <Box
//           key={tab.id}
//           role="tabpanel"
//           hidden={activeTab !== i}
//           sx={{ p: 1 }}
//       >
//           <RenderLayoutNode node={tab} />
//       </Box>
//   ))}
//
// AFTER (with LazyTabPanel — lazy mounting):
//
//   import { LazyTabPanel } from '@/components/ui/lazy-tab-panel';
//
//   {node.tabs.map((tab, i) => (
//       <LazyTabPanel
//           key={tab.id}
//           index={i}
//           value={activeTab}
//           idPrefix={`tab-${node.id}`}
//       >
//           <RenderLayoutNode node={tab} />
//       </LazyTabPanel>
//   ))}
//
// This is a DROP-IN replacement — same props flow, same visual behavior,
// but children only mount on first tab visit. The modified-reference
// tab-layout.tsx already has equivalent logic via the mountedTabs Set;
// this component packages it as a reusable primitive.
