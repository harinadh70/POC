// ---------------------------------------------
// MODIFIED — GAP #81: BuildTab (VBS 8888-8977)
// Original: aqs-web-ui-actual/src/layouts/tab-layout.tsx
// Target:   src/layouts/tab-layout.tsx
// Tab panels swapped to <LazyTabPanel> (first-activation mount, then kept
// mounted hidden). Changes marked >>> GAP #81 ... <<< GAP #81.
// ---------------------------------------------

import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { RenderLayoutNode } from './render-layout-node';

// >>> GAP #81: BuildTab — lazy tab panel component
import { LazyTabPanel } from '@components/ui/lazy-tab-panel';
// <<< GAP #81

// types
import type { SyntheticEvent } from 'react';
import type { TabContainerNode } from '@/types/layout';

// -----------------------------------------------------
// TabLayout
// MUI Tabs container. Lazy-mounts tab panels — a panel is only
// mounted the first time its tab is activated.
// -----------------------------------------------------

interface TabLayoutProps {
	node: TabContainerNode;
}

function TabLayout({ node }: TabLayoutProps) {
	const [activeTab, setActiveTab] = useState(0);
	// >>> GAP #81: BuildTab — per-panel first-activation tracking moved into
	// LazyTabPanel (hasBeenActive state); the mountedTabs Set is removed.
	// <<< GAP #81

	const handleChange = (_: SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	return (
		<Box>
			<Tabs value={activeTab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
				{node.tabs.map((tab, i) => (
					<Tab
						key={tab.id}
						label={tab.label}
						value={i}
						// >>> GAP #81: BuildTab — pair each tab with its LazyTabPanel aria ids
						id={`tab-${String(i)}`}
						aria-controls={`tabpanel-${String(i)}`}
						// <<< GAP #81
					/>
				))}
			</Tabs>

			{/* >>> GAP #81: BuildTab — panels swapped to LazyTabPanel: children mount
			    on first activation, then stay mounted hidden (display: none) */}
			{node.tabs.map((tab, i) => (
				<LazyTabPanel key={tab.id} index={i} value={activeTab}>
					{tab.children.map((child) => (
						<RenderLayoutNode key={child.id} node={child} />
					))}
				</LazyTabPanel>
			))}
			{/* <<< GAP #81 */}
		</Box>
	);
}

export { TabLayout };
