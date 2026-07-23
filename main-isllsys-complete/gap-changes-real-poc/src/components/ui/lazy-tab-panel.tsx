// ---------------------------------------------
// GAP #81 — BuildTab (VBS 8888-8977)
// NEW FILE — target: src/components/ui/lazy-tab-panel.tsx
// Tab panel that mounts children only on first activation, then keeps them
// mounted but hidden (display: none) so form state survives tab switches —
// mirrors the legacy build-once XSLT tab cache.
// ---------------------------------------------

import { useState } from 'react';
import { Box } from '@mui/material';

// types
import type { ReactNode } from 'react';

// -----------------------------------------------------
// LazyTabPanel
// Pairs with TabLayout: panel ids/labels follow the tab-${index} /
// tabpanel-${index} convention used by tab-layout.tsx.
// -----------------------------------------------------

interface LazyTabPanelProps {
	/** This panel's tab index */
	index: number;
	/** Currently active tab index (TabLayout activeTab) */
	value: number;
	children?: ReactNode;
}

function LazyTabPanel({ index, value, children }: LazyTabPanelProps) {
	const isActive = value === index;
	const [hasBeenActive, setHasBeenActive] = useState(isActive);

	// First activation — mount children from this render onward. Render-phase
	// state adjustment keeps the mount synchronous with the tab click.
	if (isActive && !hasBeenActive) {
		setHasBeenActive(true);
	}

	return (
		<Box
			role="tabpanel"
			hidden={!isActive}
			id={`tabpanel-${String(index)}`}
			aria-labelledby={`tab-${String(index)}`}
			className={isActive ? undefined : 'hidden'}
		>
			{hasBeenActive ? children : null}
		</Box>
	);
}

export { LazyTabPanel };
