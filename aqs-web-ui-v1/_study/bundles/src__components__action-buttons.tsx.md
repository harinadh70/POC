# BUNDLE for src/components/action-buttons.tsx
# 26 photo fragment(s), ascending start-line order.


========== IMG_2004.md ==========
---
photo: IMG_2004.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 1-33
orientation: 0
confidence: high
notes: Single tab "action-buttons.tsx 7" (7 problems). Breadcrumb "aqs-web-ui > src > components > action-buttons.tsx > ...". Explorer shows expanded tree - src/assets/svgs (icon2.svg partially occluded, icon3.svg, icon4.svg), components/data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx (selected, 7), button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, more cut off. Status bar - 9 errors 0 warnings, No Solution, hitanshu/experimental*, Ln 1 Col 1. Line 28 '@mui/material' has red squiggle. Clock 4:35 PM 7/10/2026.
---
   1	/**
   2	 * ActionButtons Component
   3	 * ----------------------
   4	 * Dynamically renders action buttons (OK, Cancel, Next, Submit, Delete, Add, etc.)
   5	 * from the API response. Buttons are identified by matchcode.
   6	 *
   7	 * Supported matchcodes (sourced from the full AQS legacy codebase):
   8	 *   Navigation : OK | NEXT | CANCEL | BACK | OKSPECIAL
   9	 *   CRUD       : ADD | DELETE | SAVE | APPLY
  10	 *   Search     : SEARCH | SET_SEARCH
  11	 *   Form       : SUBMIT | RESET | CLEAR
  12	 *   Misc       : RATE | COPYADDRESS | OVERRIDEPRINT
  13	 *
  14	 * Features:
  15	 *   - Auto-discovers button controls from raw API controls array
  16	 *   - Respects `@disabled`, `@visible`, and `@text` from API
  17	 *   - Accepts runtime overrides (e.g. from required-field validation or browser commands)
  18	 *   - Preserves button `calls` for the click handler
  19	 *   - Renders in configurable horizontal or vertical layout
  20	 *   - Fully driven by data - no manual button JSX required
  21	 *
  22	 * NOTE: This component does NOT contain required-field validation logic itself.
  23	 *       Use the `useRequiredFieldValidation` hook to compute the `buttonOverrides`
  24	 *       prop from the current form state.
  25	 */
  26	
  27	import React, { useMemo } from 'react';
  28	import { Stack, Button } from '@mui/material';
  29	import { BUTTON_MATCHCODES } from '@/constants/button-matchcodes';
  30	
  31	// ---------------------------------------------------------------------------
  32	// Types
  33	// ---------------------------------------------------------------------------


========== IMG_2005.md ==========
---
photo: IMG_2005.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 11-44
orientation: 0
confidence: high
notes: Continuation of IMG_2004 (overlaps lines 12-33). Line 11 mostly hidden behind breadcrumb bar (fragment "...SUBMIT | RESET | CLEAR" visible). Explorer same expanded tree as IMG_2004; action-buttons.tsx selected (7 problems). Status bar - 9 errors 0 warnings, No Solution, hitanshu/experimental*, Ln 1 Col 1. '@mui/material' on line 28 has red squiggle. Line 41 reads '@utporder' (possible on-screen spelling; transcribed verbatim). Clock 4:35 PM 7/10/2026.
---
  11	 *   Form       : SUBMIT | RESET | CLEAR   ⟪partially occluded by breadcrumb⟫
  12	 *   Misc       : RATE | COPYADDRESS | OVERRIDEPRINT
  13	 *
  14	 * Features:
  15	 *   - Auto-discovers button controls from raw API controls array
  16	 *   - Respects `@disabled`, `@visible`, and `@text` from API
  17	 *   - Accepts runtime overrides (e.g. from required-field validation or browser commands)
  18	 *   - Preserves button `calls` for the click handler
  19	 *   - Renders in configurable horizontal or vertical layout
  20	 *   - Fully driven by data - no manual button JSX required
  21	 *
  22	 * NOTE: This component does NOT contain required-field validation logic itself.
  23	 *       Use the `useRequiredFieldValidation` hook to compute the `buttonOverrides`
  24	 *       prop from the current form state.
  25	 */
  26	
  27	import React, { useMemo } from 'react';
  28	import { Stack, Button } from '@mui/material';
  29	import { BUTTON_MATCHCODES } from '@/constants/button-matchcodes';
  30	
  31	// ---------------------------------------------------------------------------
  32	// Types
  33	// ---------------------------------------------------------------------------
  34	
  35	/** Matches the shape of a raw control item from the page-build API response */
  36	export interface RawButtonControl {
  37	    '@matchcode'?: string;
  38	    '@text'?: string;
  39	    '@disabled'?: string;
  40	    '@visible'?: string;
  41	    '@utporder'?: string | number;
  42	    '@controltype'?: string;
  43	    calls?: unknown;
  44	    [key: string]: unknown;


========== IMG_2006.md ==========
---
photo: IMG_2006.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 22-55
orientation: 0
confidence: high
notes: Continuation of IMG_2005 (overlaps 22-44). Confirms line 41 is '@utporder'?: string | number;. Line 55 partially cut by status bar - reads "* Raw controls array from API (`pageBuild Page controls control`)" (pageBuild slightly blurred at cutoff). Squiggles under 'react' (line 27) and '@mui/material' (line 28). Same explorer/status bar (9 errors, No Solution, hitanshu/experimental*). Clock 4:35 PM 7/10/2026.
---
  22	 * NOTE: This component does NOT contain required-field validation logic itself.
  23	 *       Use the `useRequiredFieldValidation` hook to compute the `buttonOverrides`
  24	 *       prop from the current form state.
  25	 */
  26	
  27	import React, { useMemo } from 'react';
  28	import { Stack, Button } from '@mui/material';
  29	import { BUTTON_MATCHCODES } from '@/constants/button-matchcodes';
  30	
  31	// ---------------------------------------------------------------------------
  32	// Types
  33	// ---------------------------------------------------------------------------
  34	
  35	/** Matches the shape of a raw control item from the page-build API response */
  36	export interface RawButtonControl {
  37	    '@matchcode'?: string;
  38	    '@text'?: string;
  39	    '@disabled'?: string;
  40	    '@visible'?: string;
  41	    '@utporder'?: string | number;
  42	    '@controltype'?: string;
  43	    calls?: unknown;
  44	    [key: string]: unknown;
  45	}
  46	
  47	/** Runtime override for a single button's meta (disabled / visible) */
  48	export interface ButtonOverride {
  49	    disabled?: boolean;
  50	    visible?: boolean;
  51	}
  52	
  53	export interface ActionButtonsProps {
  54	    /**
  55	     * Raw controls array from API (`pageBuild Page controls control`)   ⟪cut off by status bar⟫


========== IMG_2007.md ==========
---
photo: IMG_2007.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 35-68
orientation: 0
confidence: high
notes: Continuation of IMG_2006 (overlaps 35-55). Line 55 here fully legible - confirms `pageBuild.Page.controls.control`. Line 68 partially cut by status bar (only "/**" visible). Same explorer/status bar (9 errors, No Solution, hitanshu/experimental*, Ln 1 Col 1). Clock 4:35 PM 7/10/2026.
---
  35	/** Matches the shape of a raw control item from the page-build API response */
  36	export interface RawButtonControl {
  37	    '@matchcode'?: string;
  38	    '@text'?: string;
  39	    '@disabled'?: string;
  40	    '@visible'?: string;
  41	    '@utporder'?: string | number;
  42	    '@controltype'?: string;
  43	    calls?: unknown;
  44	    [key: string]: unknown;
  45	}
  46	
  47	/** Runtime override for a single button's meta (disabled / visible) */
  48	export interface ButtonOverride {
  49	    disabled?: boolean;
  50	    visible?: boolean;
  51	}
  52	
  53	export interface ActionButtonsProps {
  54	    /**
  55	     * Raw controls array from API (`pageBuild.Page.controls.control`).
  56	     * The component filters out only known button matchcodes.
  57	     */
  58	    controls: RawButtonControl[];
  59	
  60	    /**
  61	     * Runtime overrides keyed by UPPER-CASED matchcode.
  62	     * These take precedence over the API's `@disabled` / `@visible`.
  63	     * Typically produced by `useRequiredFieldValidation().buttonDisableMap`
  64	     * merged with `useComputedButtonStates()`.
  65	     */
  66	    buttonOverrides?: Record<string, ButtonOverride>;
  67	
  68	    /**   ⟪cut off by status bar⟫


========== IMG_2008.md ==========
---
photo: IMG_2008.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 46-78
orientation: 0
confidence: high
notes: Continuation of IMG_2007 (overlaps 46-68). Same explorer/status bar (9 errors, No Solution, hitanshu/experimental*, Ln 1 Col 1). Clock 4:35 PM 7/10/2026.
---
  46	
  47	/** Runtime override for a single button's meta (disabled / visible) */
  48	export interface ButtonOverride {
  49	    disabled?: boolean;
  50	    visible?: boolean;
  51	}
  52	
  53	export interface ActionButtonsProps {
  54	    /**
  55	     * Raw controls array from API (`pageBuild.Page.controls.control`).
  56	     * The component filters out only known button matchcodes.
  57	     */
  58	    controls: RawButtonControl[];
  59	
  60	    /**
  61	     * Runtime overrides keyed by UPPER-CASED matchcode.
  62	     * These take precedence over the API's `@disabled` / `@visible`.
  63	     * Typically produced by `useRequiredFieldValidation().buttonDisableMap`
  64	     * merged with `useComputedButtonStates()`.
  65	     */
  66	    buttonOverrides?: Record<string, ButtonOverride>;
  67	
  68	    /**
  69	     * Called when any action button is clicked.
  70	     * Receives the button matchcode (upper-cased) as argument.
  71	     */
  72	    onButtonClick?: (matchcode: string) => void;
  73	
  74	    /** Layout direction. Default: 'row' */
  75	    orientation?: 'row' | 'column';
  76	
  77	    /** MUI Stack spacing. Default: 1 */
  78	    spacing?: number;


========== IMG_2009.md ==========
---
photo: IMG_2009.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 62-94 (sticky-scroll: 53)
orientation: 0
confidence: high
notes: Continuation of IMG_2008 (overlaps 62-78). Sticky header line 53 "export interface ActionButtonsProps {". Line 62 mostly occluded behind sticky header (fragment "These take precedence over the API's @disabled / @visible" barely visible/blurred). Same status bar (9 errors, No Solution, hitanshu/experimental*, Ln 1 Col 1). Clock 4:35 PM 7/10/2026.
---
  53	export interface ActionButtonsProps {
  62	     * These take precedence over the API's `@disabled` / `@visible`.   ⟪occluded by sticky header⟫
  63	     * Typically produced by `useRequiredFieldValidation().buttonDisableMap`
  64	     * merged with `useComputedButtonStates()`.
  65	     */
  66	    buttonOverrides?: Record<string, ButtonOverride>;
  67	
  68	    /**
  69	     * Called when any action button is clicked.
  70	     * Receives the button matchcode (upper-cased) as argument.
  71	     */
  72	    onButtonClick?: (matchcode: string) => void;
  73	
  74	    /** Layout direction. Default: 'row' */
  75	    orientation?: 'row' | 'column';
  76	
  77	    /** MUI Stack spacing. Default: 1 */
  78	    spacing?: number;
  79	
  80	    /** Additional sx passed to the outer container */
  81	    sx?: Record<string, unknown>;
  82	}
  83	
  84	// BUTTON_MATCHCODES imported from @/constants/button-matchcodes
  85	
  86	// ---------------------------------------------------------------------------
  87	// Helpers
  88	// ---------------------------------------------------------------------------
  89	
  90	const flagToBool = (v: unknown, defaultVal = false): boolean => {
  91	    if (v === undefined || v === null || v === '') return defaultVal;
  92	    if (typeof v === 'boolean') return v;
  93	    const s = String(v).trim().toUpperCase();
  94	    return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';


========== IMG_2010.md ==========
---
photo: IMG_2010.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 76-107 (sticky-scroll: 53)
orientation: 0
confidence: high
notes: Continuation of IMG_2009 (overlaps 76-94). Sticky header line 53 "export interface ActionButtonsProps {". Line 76 (first after sticky) mostly hidden. Same status bar (9 errors, No Solution, hitanshu/experimental*, Ln 1 Col 1). Clock 4:35 PM 7/10/2026.
---
  53	export interface ActionButtonsProps {
  76	   ⟪occluded by sticky header⟫
  77	    /** MUI Stack spacing. Default: 1 */
  78	    spacing?: number;
  79	
  80	    /** Additional sx passed to the outer container */
  81	    sx?: Record<string, unknown>;
  82	}
  83	
  84	// BUTTON_MATCHCODES imported from @/constants/button-matchcodes
  85	
  86	// ---------------------------------------------------------------------------
  87	// Helpers
  88	// ---------------------------------------------------------------------------
  89	
  90	const flagToBool = (v: unknown, defaultVal = false): boolean => {
  91	    if (v === undefined || v === null || v === '') return defaultVal;
  92	    if (typeof v === 'boolean') return v;
  93	    const s = String(v).trim().toUpperCase();
  94	    return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';
  95	};
  96	
  97	/** Derive a display order for each button matchcode */
  98	const defaultOrder = (mc: string): number => {
  99	    switch (mc) {
 100	        // Primary actions
 101	        case 'OK':
 102	        case 'OKSPECIAL':
 103	            return 1;
 104	        case 'NEXT':
 105	            return 2;
 106	        case 'SUBMIT':
 107	        case 'SAVE':


========== IMG_2011.md ==========
---
photo: IMG_2011.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 82-115
orientation: 0
confidence: high
notes: Continuation of IMG_2010 (overlaps 83-107). Line 82 mostly hidden behind breadcrumb (closing "}" faintly visible). No sticky header in this shot. Same status bar (9 errors, No Solution, hitanshu/experimental*, Ln 1 Col 1). Clock 4:35 PM 7/10/2026.
---
  82	}   ⟪partially occluded by breadcrumb⟫
  83	
  84	// BUTTON_MATCHCODES imported from @/constants/button-matchcodes
  85	
  86	// ---------------------------------------------------------------------------
  87	// Helpers
  88	// ---------------------------------------------------------------------------
  89	
  90	const flagToBool = (v: unknown, defaultVal = false): boolean => {
  91	    if (v === undefined || v === null || v === '') return defaultVal;
  92	    if (typeof v === 'boolean') return v;
  93	    const s = String(v).trim().toUpperCase();
  94	    return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';
  95	};
  96	
  97	/** Derive a display order for each button matchcode */
  98	const defaultOrder = (mc: string): number => {
  99	    switch (mc) {
 100	        // Primary actions
 101	        case 'OK':
 102	        case 'OKSPECIAL':
 103	            return 1;
 104	        case 'NEXT':
 105	            return 2;
 106	        case 'SUBMIT':
 107	        case 'SAVE':
 108	            return 3;
 109	        case 'APPLY':
 110	            return 4;
 111	
 112	        // CRUD actions
 113	        case 'ADD':
 114	            return 10;
 115	        case 'DELETE':


========== IMG_2012.md ==========
---
photo: IMG_2012.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 90-123
orientation: 0
confidence: medium
notes: New file vs previous photos in this chunk - action-buttons.tsx (7 problems), only open tab. Breadcrumb aqs-web-ui > src > components > action-buttons.tsx > ... Line 91 is dim/overlapped by sticky-scroll shadow directly under the pinned line 90 header; text reconstructed from faint visible characters and logical inference, marked low-confidence with ⟪?⟫ for uncertain tokens. Explorer shows broader tree: aqs-web-ui > src > assets > svgs (icon2.svg, icon3.svg, icon4.svg visible, more above cut off) > components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx) > modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts) > tabView (TabPanel.tsx, TabView.tsx) > action-buttons.tsx (7, selected/highlighted), button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx (cut off). Status bar: aqs-web-ui, hitanshu/experimental*, 9 errors 0 warnings, No Solution, 4:35 PM 7/10/2026. Note error count dropped to 9 (from 24 in TabView.tsx photos) since this is a different file's problem count shown in status bar... actually VS Code problem counts are workspace-wide, so 9/0 here vs 24/0 earlier suggests some errors were fixed between photos, or count is per-file tab (7 shown on tab badge for this file specifically).
---
90	const flagToBool = (v: unknown, defaultVal = false): boolean => {
91		if (v === undefined || v === null || v === ⟪?⟫) return defaultVal;  ⟪dim/overlapped by sticky header, low confidence⟫
92		if (typeof v === 'boolean') return v;
93		const s = String(v).trim().toUpperCase();
94		return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';
95	};
96
97	/** Derive a display order for each button matchcode */
98	const defaultOrder = (mc: string): number => {
99		switch (mc) {
100			// Primary actions
101			case 'OK':
102			case 'OKSPECIAL':
103				return 1;
104			case 'NEXT':
105				return 2;
106			case 'SUBMIT':
107			case 'SAVE':
108				return 3;
109			case 'APPLY':
110				return 4;
111
112			// CRUD actions
113			case 'ADD':
114				return 10;
115			case 'DELETE':
116				return 11;
117
118			// Search / domain actions
119			case 'SEARCH':
120			case 'SET_SEARCH':
121				return 20;
122			case 'RATE':
123				return 21;


========== IMG_2013.md ==========
---
photo: IMG_2013.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 98, 102-134
orientation: 0
confidence: high
notes: Tab "action-buttons.tsx 7" (7 problems). Line 98 is a sticky-scroll header. Status bar: branch hitanshu/experimental*, 9 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Explorer sidebar visible: aqs-web-ui > src > assets > svgs (icon2.svg partially, icon3.svg, icon4.svg); components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog?.tsx (partially cut). OUTLINE / TIMELINE / C# PROJECT DETAILS sections below. src and components folders have modified (dot) git markers. Line 134 mostly cut off at bottom edge. Taskbar clock 4:35 7/10/20…
---
 98      const defaultOrder = (mc: string): number => {
102              case 'OKSPECIAL':
103                  return 1;
104              case 'NEXT':
105                  return 2;
106              case 'SUBMIT':
107              case 'SAVE':
108                  return 3;
109              case 'APPLY':
110                  return 4;
111
112              // CRUD actions
113              case 'ADD':
114                  return 10;
115              case 'DELETE':
116                  return 11;
117
118              // Search / domain actions
119              case 'SEARCH':
120              case 'SET_SEARCH':
121                  return 20;
122              case 'RATE':
123                  return 21;
124              case 'COPYADDRESS':
125                  return 22;
126              case 'OVERRIDEPRINT':
127                  return 23;
128
129              // Navigation helpers
130              case 'BACK':
131                  return 80;
132              case 'RESET':
133                  return 81;
134              case 'CLEAR':⟪cut off at bottom⟫


========== IMG_2014.md ==========
---
photo: IMG_2014.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 98, 115-147
orientation: 0
confidence: high
notes: Same file as IMG_2013, scrolled down; overlaps lines 115-133. Line 98 is sticky-scroll header. Tab "action-buttons.tsx 7". Status bar: hitanshu/experimental*, 9 errors 0 warnings, No Solution, Ln 1 Col 1, TypeScript JSX. Same Explorer sidebar as IMG_2013. Line 147 partially cut at bottom ("const baseSx = {").
---
 98      const defaultOrder = (mc: string): number => {
115              case 'DELETE':
116                  return 11;
117
118              // Search / domain actions
119              case 'SEARCH':
120              case 'SET_SEARCH':
121                  return 20;
122              case 'RATE':
123                  return 21;
124              case 'COPYADDRESS':
125                  return 22;
126              case 'OVERRIDEPRINT':
127                  return 23;
128
129              // Navigation helpers
130              case 'BACK':
131                  return 80;
132              case 'RESET':
133                  return 81;
134              case 'CLEAR':
135                  return 82;
136              case 'CANCEL':
137                  return 99; // Cancel always last
138
139              default:
140                  return 50;
141          }
142      };
143
144      // -----------------------------------------------------------------------
145      // Shared sx tokens
146      // -----------------------------------------------------------------------
147      const baseSx = {


========== IMG_2015.md ==========
---
photo: IMG_2015.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 98, 128-160
orientation: 0
confidence: high
notes: Same file, scrolled further; overlaps IMG_2014 lines 128-147. Line 98 sticky-scroll header. Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Same Explorer sidebar. Line 160 last visible ("case 'OK':").
---
 98      const defaultOrder = (mc: string): number => {
128
129              // Navigation helpers
130              case 'BACK':
131                  return 80;
132              case 'RESET':
133                  return 81;
134              case 'CLEAR':
135                  return 82;
136              case 'CANCEL':
137                  return 99; // Cancel always last
138
139              default:
140                  return 50;
141          }
142      };
143
144      // -----------------------------------------------------------------------
145      // Shared sx tokens
146      // -----------------------------------------------------------------------
147      const baseSx = {
148          fontSize: '14px',
149      } as const;
150
151      /** Determine visual variant and style based on button's role */
152      const getButtonStyle = (
153          mc: string,
154      ): {
155          variant: 'primary' | 'secondary' | 'text';
156          sx: Record<string, unknown>;
157      } => {
158          switch (mc) {
159              // — Primary (contained dark-blue) ——————————
160              case 'OK':


========== IMG_2016.md ==========
---
photo: IMG_2016.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 98, 139-170
orientation: 0
confidence: high
notes: Same file, scrolled; overlaps IMG_2015 lines 139-160. Line 98 sticky-scroll header. Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Same Explorer sidebar. Line 171 cut off at bottom edge (gutter shows 171 partially).
---
 98      const defaultOrder = (mc: string): number => {
139              default:
140                  return 50;
141          }
142      };
143
144      // -----------------------------------------------------------------------
145      // Shared sx tokens
146      // -----------------------------------------------------------------------
147      const baseSx = {
148          fontSize: '14px',
149      } as const;
150
151      /** Determine visual variant and style based on button's role */
152      const getButtonStyle = (
153          mc: string,
154      ): {
155          variant: 'primary' | 'secondary' | 'text';
156          sx: Record<string, unknown>;
157      } => {
158          switch (mc) {
159              // — Primary (contained dark-blue) ——————————
160              case 'OK':
161              case 'OKSPECIAL':
162              case 'NEXT':
163              case 'SUBMIT':
164              case 'SAVE':
165                  return {
166                      variant: 'primary',
167                      sx: {
168                          ...baseSx,
169                      },
170                  };


========== IMG_2017.md ==========
---
photo: IMG_2017.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 146-178
orientation: 0
confidence: high
notes: Same file, scrolled; overlaps IMG_2016 lines 146-170. No sticky-scroll header this time (top visible line is 146). Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Same Explorer sidebar. Line 178 last fully visible; 179 cut off.
---
146      // -----------------------------------------------------------------------
147      const baseSx = {
148          fontSize: '14px',
149      } as const;
150
151      /** Determine visual variant and style based on button's role */
152      const getButtonStyle = (
153          mc: string,
154      ): {
155          variant: 'primary' | 'secondary' | 'text';
156          sx: Record<string, unknown>;
157      } => {
158          switch (mc) {
159              // — Primary (contained dark-blue) ——————————
160              case 'OK':
161              case 'OKSPECIAL':
162              case 'NEXT':
163              case 'SUBMIT':
164              case 'SAVE':
165                  return {
166                      variant: 'primary',
167                      sx: {
168                          ...baseSx,
169                      },
170                  };
171
172              // — Destructive (contained red) ——————————
173              case 'DELETE':
174                  return {
175                      variant: 'secondary',
176                      sx: {
177                          ...baseSx,
178                      },


========== IMG_2018.md ==========
---
photo: IMG_2018.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 152, 160-191
orientation: 0
confidence: high
notes: Same file, scrolled; overlaps IMG_2017 lines 160-178. Line 152 sticky-scroll header ("const getButtonStyle = ("). Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Same Explorer sidebar. Line 192 cut off at bottom (partial "...baseSx" visible).
---
152      const getButtonStyle = (
160              case 'OK':
161              case 'OKSPECIAL':
162              case 'NEXT':
163              case 'SUBMIT':
164              case 'SAVE':
165                  return {
166                      variant: 'primary',
167                      sx: {
168                          ...baseSx,
169                      },
170                  };
171
172              // — Destructive (contained red) ——————————
173              case 'DELETE':
174                  return {
175                      variant: 'secondary',
176                      sx: {
177                          ...baseSx,
178                      },
179                  };
180
181              // — Accent actions (outlined blue) ——————————
182              case 'ADD':
183              case 'APPLY':
184              case 'RATE':
185              case 'SEARCH':
186              case 'SET_SEARCH':
187              case 'COPYADDRESS':
188              case 'OVERRIDEPRINT':
189                  return {
190                      variant: 'primary',
191                      sx: {


========== IMG_2019.md ==========
---
photo: IMG_2019.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 152, 170-202
orientation: 0
confidence: high
notes: Same file, scrolled; overlaps IMG_2018 lines 170-191. Line 152 sticky-scroll header. Line 170 partially occluded by header (shows closing "};" fragment — consistent with "};" from prior photo context, marked partial). Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Line 202 last visible ("},"), 203 cut off.
---
152      const getButtonStyle = (
170                  }; ⟪partially occluded by sticky header⟫
171
172              // — Destructive (contained red) ——————————
173              case 'DELETE':
174                  return {
175                      variant: 'secondary',
176                      sx: {
177                          ...baseSx,
178                      },
179                  };
180
181              // — Accent actions (outlined blue) ——————————
182              case 'ADD':
183              case 'APPLY':
184              case 'RATE':
185              case 'SEARCH':
186              case 'SET_SEARCH':
187              case 'COPYADDRESS':
188              case 'OVERRIDEPRINT':
189                  return {
190                      variant: 'primary',
191                      sx: {
192                          ...baseSx,
193                      },
194                  };
195
196              // — Default (neutral outlined) ——————————
197          default:
198                  return {
199                      variant: 'secondary',
200                      sx: {
201                          ...baseSx,
202                      },


========== IMG_2020.md ==========
---
photo: IMG_2020.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 152, 184-215
orientation: 0
confidence: high
notes: Same file, scrolled; overlaps IMG_2019 lines 184-202. Line 152 sticky-scroll header; line 183 occluded by it (partial "case ..." visible). Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Line 215 last visible, 216 cut off.
---
152      const getButtonStyle = (
183          ⟪case 'APPLY': — occluded by sticky header⟫
184              case 'RATE':
185              case 'SEARCH':
186              case 'SET_SEARCH':
187              case 'COPYADDRESS':
188              case 'OVERRIDEPRINT':
189                  return {
190                      variant: 'primary',
191                      sx: {
192                          ...baseSx,
193                      },
194                  };
195
196              // — Default (neutral outlined) ——————————
197          default:
198                  return {
199                      variant: 'secondary',
200                      sx: {
201                          ...baseSx,
202                      },
203                  };
204          }
205      };
206
207      // -----------------------------------------------------------------------
208      // Parsed button for rendering
209      // -----------------------------------------------------------------------
210
211      interface ParsedButton {
212          matchcode: string; // UPPER-CASED
213          text: string;
214          disabled: boolean;
215          visible: boolean;


========== IMG_2021.md ==========
---
photo: IMG_2021.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 152, 194-226
orientation: 0
confidence: high
notes: Same file, scrolled; overlaps IMG_2020 lines 194-215. Line 152 sticky-scroll header. Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Line 225 "controls," has red squiggle underline (error). Line 226 partially cut: "buttonOverrides = {}," visible.
---
152      const getButtonStyle = (
194                  };
195
196              // — Default (neutral outlined) ——————————
197          default:
198                  return {
199                      variant: 'secondary',
200                      sx: {
201                          ...baseSx,
202                      },
203                  };
204          }
205      };
206
207      // -----------------------------------------------------------------------
208      // Parsed button for rendering
209      // -----------------------------------------------------------------------
210
211      interface ParsedButton {
212          matchcode: string; // UPPER-CASED
213          text: string;
214          disabled: boolean;
215          visible: boolean;
216          utporder: number;
217          raw: RawButtonControl;
218      }
219
220      // -----------------------------------------------------------------------
221      // Component
222      // -----------------------------------------------------------------------
223
224      export const ActionButtons: React.FC<ActionButtonsProps> = ({
225          controls,
226          buttonOverrides = {},⟪cut off at bottom⟫


========== IMG_2022.md ==========
---
photo: IMG_2022.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 206-239
orientation: 0
confidence: high
notes: Same file, scrolled; overlaps IMG_2021 lines 206-226. No sticky header (top line 206). Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Red squiggles under "controls" (225) and "onButtonClick" (227). Line 239 last visible.
---
206
207      // -----------------------------------------------------------------------
208      // Parsed button for rendering
209      // -----------------------------------------------------------------------
210
211      interface ParsedButton {
212          matchcode: string; // UPPER-CASED
213          text: string;
214          disabled: boolean;
215          visible: boolean;
216          utporder: number;
217          raw: RawButtonControl;
218      }
219
220      // -----------------------------------------------------------------------
221      // Component
222      // -----------------------------------------------------------------------
223
224      export const ActionButtons: React.FC<ActionButtonsProps> = ({
225          controls,
226          buttonOverrides = {},
227          onButtonClick,
228          orientation = 'row',
229          spacing = 1,
230          sx = {},
231      }) => {
232          /** Extract, normalise and sort buttons from raw controls */
233          const buttons: ParsedButton[] = useMemo(() => {
234              if (!controls || controls.length === 0) return [];
235
236              const extracted: ParsedButton[] = [];
237
238              for (const ctrl of controls) {
239                  const mc = (ctrl['@matchcode'] || '').toString().toUpperCase();


========== IMG_2023.md ==========
---
photo: IMG_2023.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 222-255
orientation: 0
confidence: high
notes: Same file, scrolled; overlaps IMG_2022 lines 222-239. Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Red squiggles under "controls" (225) and "onButtonClick" (227). Line 255 mostly cut off at bottom (comment continues: "// fallback (e.g. OK=1) from accidentally sorting ahead of a server-ordered").
---
222      // -----------------------------------------------------------------------
223
224      export const ActionButtons: React.FC<ActionButtonsProps> = ({
225          controls,
226          buttonOverrides = {},
227          onButtonClick,
228          orientation = 'row',
229          spacing = 1,
230          sx = {},
231      }) => {
232          /** Extract, normalise and sort buttons from raw controls */
233          const buttons: ParsedButton[] = useMemo(() => {
234              if (!controls || controls.length === 0) return [];
235
236              const extracted: ParsedButton[] = [];
237
238              for (const ctrl of controls) {
239                  const mc = (ctrl['@matchcode'] || '').toString().toUpperCase();
240                  if (!BUTTON_MATCHCODES.has(mc)) continue;
241
242                  extracted.push({
243                      matchcode: mc,
244                      text: (ctrl['@text'] as string) || mc,
245                      disabled: flagToBool(ctrl['@disabled']),
246                      visible: flagToBool(ctrl['@visible'], true),
247                      utporder: Number(ctrl['@utporder'] ?? defaultOrder(mc)),
248                      raw: ctrl,
249                  });
250              }
251
252              // Sort: buttons with explicit server @utporder come first (sorted among
253              // themselves by that value); buttons without @utporder follow, sorted by
254              // the component's built-in defaultOrder.  This prevents the defaultOrder
255              // fallback (e.g. OK=1) from accidentally sorting ahead of a server-ordered⟪cut off⟫


========== IMG_2024.md ==========
---
photo: IMG_2024.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 224, 233, 235-265
orientation: 0
confidence: high
notes: Same file, scrolled; overlaps IMG_2023 lines 235-255. Two sticky-scroll headers: 224 (export const ActionButtons...) and 233 (const buttons: ParsedButton[] = useMemo...). Line 234-235 area partly occluded/blurred under headers — line 234 barely legible, matches "if (!controls || controls.length === 0) return [];" from IMG_2023. Tab "action-buttons.tsx 7"; 9 errors 0 warnings; No Solution; hitanshu/experimental*. Line 265 last visible.
---
224      export const ActionButtons: React.FC<ActionButtonsProps> = ({
233          const buttons: ParsedButton[] = useMemo(() => {
234              ⟪if (!controls || controls.length === 0) return []; — blurred under sticky header⟫
235
236              const extracted: ParsedButton[] = [];
237
238              for (const ctrl of controls) {
239                  const mc = (ctrl['@matchcode'] || '').toString().toUpperCase();
240                  if (!BUTTON_MATCHCODES.has(mc)) continue;
241
242                  extracted.push({
243                      matchcode: mc,
244                      text: (ctrl['@text'] as string) || mc,
245                      disabled: flagToBool(ctrl['@disabled']),
246                      visible: flagToBool(ctrl['@visible'], true),
247                      utporder: Number(ctrl['@utporder'] ?? defaultOrder(mc)),
248                      raw: ctrl,
249                  });
250              }
251
252              // Sort: buttons with explicit server @utporder come first (sorted among
253              // themselves by that value); buttons without @utporder follow, sorted by
254              // the component's built-in defaultOrder.  This prevents the defaultOrder
255              // fallback (e.g. OK=1) from accidentally sorting ahead of a server-ordered
256              // button like NEXT (@utporder=100).
257              extracted.sort((a, b) => {
258                  const aExplicit = a.raw['@utporder'] != null && a.raw['@utporder'] !== '';
259                  const bExplicit = b.raw['@utporder'] != null && b.raw['@utporder'] !== '';
260
261                  if (aExplicit && !bExplicit) return -1;
262                  if (!aExplicit && bExplicit) return 1;
263
264                  // Both in the same group — compare by utporder value
265                  if (a.utporder !== b.utporder) return a.utporder - b.utporder;


========== IMG_2025.md ==========
---
photo: IMG_2025.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 248-278
orientation: 0
confidence: high
notes: Sticky-scroll headers show line 224 `export const ActionButtons: React.FC<ActionButtonsProps> = ({` and line 233 `const buttons: ParsedButton[] = useMemo(() => {`. Tab shows "action-buttons.tsx 7" (7 problems); status bar "No Solution", 9 errors 0 warnings, branch hitanshu/experimental*, TypeScript JSX, Ln 1 Col 1, Tab Size 4, UTF-8 CRLF. Red squiggle under `buttonOverrides[btn.matchcode]` on line 276. Explorer sidebar visible: aqs-web-ui/src/assets/svgs (icon2.svg, icon3.svg, icon4.svg), components/data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialo… (cut off). Lines 279+ partially cut at bottom (`...btn,` visible at ~278).
---
224    export const ActionButtons: React.FC<ActionButtonsProps> = ({     [sticky header]
233        const buttons: ParsedButton[] = useMemo(() => {                [sticky header]
248                    raw: ctrl,
249                });
250            }
251
252            // Sort: buttons with explicit server @utporder come first (sorted among
253            // themselves by that value); buttons without @utporder follow, sorted by
254            // the component's built-in defaultOrder.  This prevents the defaultOrder
255            // fallback (e.g. OK=1) from accidentally sorting ahead of a server-ordered
256            // button like NEXT (@utporder=100).
257            extracted.sort((a, b) => {
258                const aExplicit = a.raw['@utporder'] != null && a.raw['@utporder'] !== '';
259                const bExplicit = b.raw['@utporder'] != null && b.raw['@utporder'] !== '';
260
261                if (aExplicit && !bExplicit) return -1;
262                if (!aExplicit && bExplicit) return 1;
263
264                // Both in the same group — compare by utporder value
265                if (a.utporder !== b.utporder) return a.utporder - b.utporder;
266                return defaultOrder(a.matchcode) - defaultOrder(b.matchcode);
267            });
268
269            return extracted;
270        }, [controls]);
271
272        /** Apply runtime overrides to produce final render-ready state */
273        const visibleButtons = useMemo(() => {
274            return buttons
275                .map((btn) => {
276                    const override = buttonOverrides[btn.matchcode];
277                    return {
278                        ...btn,


========== IMG_2026.md ==========
---
photo: IMG_2026.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 262-291
orientation: 0
confidence: high
notes: Continuation of IMG_2025 (scrolled down). Sticky headers show lines 224, 233, 257. Red squiggle under `buttonOverrides[btn.matchcode]` (line 276) and under `direction={orientation}` / `spacing={spacing}` (lines 290-291). Line 292 partially visible at bottom (`sx={{` likely, cut). Tab "action-buttons.tsx 7"; status bar: No Solution, 9 errors 0 warnings, hitanshu/experimental*, TypeScript JSX. Same Explorer sidebar as IMG_2025.
---
224    export const ActionButtons: React.FC<ActionButtonsProps> = ({     [sticky header]
233        const buttons: ParsedButton[] = useMemo(() => {                [sticky header]
257            extracted.sort((a, b) => {                                 [sticky header]
262                if (!aExplicit && bExplicit) return 1;
263
264                // Both in the same group — compare by utporder value
265                if (a.utporder !== b.utporder) return a.utporder - b.utporder;
266                return defaultOrder(a.matchcode) - defaultOrder(b.matchcode);
267            });
268
269            return extracted;
270        }, [controls]);
271
272        /** Apply runtime overrides to produce final render-ready state */
273        const visibleButtons = useMemo(() => {
274            return buttons
275                .map((btn) => {
276                    const override = buttonOverrides[btn.matchcode];
277                    return {
278                        ...btn,
279                        disabled: override?.disabled ?? btn.disabled,
280                        visible: override?.visible ?? btn.visible,
281                    };
282                })
283                .filter((btn) => btn.visible);
284        }, [buttons, buttonOverrides]);
285
286        if (visibleButtons.length === 0) return null;
287
288        return (
289            <Stack
290                direction={orientation}
291                spacing={spacing}


========== IMG_2027.md ==========
---
photo: IMG_2027.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 269-299
orientation: 0
confidence: high
notes: Continuation (scrolled from IMG_2026). Sticky headers lines 224, 233. Red squiggles under buttonOverrides[btn.matchcode] (277) and under the entire JSX block lines 290-299 (direction, spacing, sx, justifyContent, ...sx, }}, {visibleButtons.map...}, getButtonStyle) — likely unresolved identifiers/JSX type errors. Tab "action-buttons.tsx 7"; No Solution; 9 errors 0 warnings; branch hitanshu/experimental*. Same Explorer sidebar as prior photos.
---
224    export const ActionButtons: React.FC<ActionButtonsProps> = ({     [sticky header]
233        const buttons: ParsedButton[] = useMemo(() => {                [sticky header]
269            return extracted;
270        }, [controls]);
271
272        /** Apply runtime overrides to produce final render-ready state */
273        const visibleButtons = useMemo(() => {
274            return buttons
275                .map((btn) => {
276                    const override = buttonOverrides[btn.matchcode];
277                    return {
278                        ...btn,
279                        disabled: override?.disabled ?? btn.disabled,
280                        visible: override?.visible ?? btn.visible,
281                    };
282                })
283                .filter((btn) => btn.visible);
284        }, [buttons, buttonOverrides]);
285
286        if (visibleButtons.length === 0) return null;
287
288        return (
289            <Stack
290                direction={orientation}
291                spacing={spacing}
292                sx={{
293                    justifyContent: 'flex-end',
294                    ...sx,
295                }}
296            >
297                {visibleButtons.map((btn) => {
298                    const style = getButtonStyle(btn.matchcode);
299


========== IMG_2028.md ==========
---
photo: IMG_2028.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 280-310
orientation: 0
confidence: high
notes: Continuation (scrolled from IMG_2027). Sticky headers lines 224, 273, 275 (const visibleButtons = useMemo(() => { / .map((btn) => {). Line 280 partially occluded by sticky-scroll shadow ("visible: override?.visible ?? btn.visible,"). Red squiggles under entire JSX region lines 290-310 (Stack props, visibleButtons.map, Button props). Line 310 `</Button>` partially visible at bottom edge. Tab "action-buttons.tsx 7"; No Solution; 9 errors 0 warnings; hitanshu/experimental*.
---
224    export const ActionButtons: React.FC<ActionButtonsProps> = ({     [sticky header]
273        const visibleButtons = useMemo(() => {                         [sticky header]
275            .map((btn) => {                                            [sticky header]
280                        visible: override?.visible ?? btn.visible,
281                    };
282                })
283                .filter((btn) => btn.visible);
284        }, [buttons, buttonOverrides]);
285
286        if (visibleButtons.length === 0) return null;
287
288        return (
289            <Stack
290                direction={orientation}
291                spacing={spacing}
292                sx={{
293                    justifyContent: 'flex-end',
294                    ...sx,
295                }}
296            >
297                {visibleButtons.map((btn) => {
298                    const style = getButtonStyle(btn.matchcode);
299
300                    return (
301                        <Button
302                            key={btn.matchcode}
303                            variant={style.variant}
304                            size="small"
305                            disabled={btn.disabled}
306                            onClick={() => onButtonClick?.(btn.matchcode)}
307                            sx={style.sx}
308                        >
309                            {btn.text}
310                        </Button>


========== IMG_2029.md ==========
---
photo: IMG_2029.JPG
type: vscode-code
file: aqs-web-ui/src/components/action-buttons.tsx
lines: 292-316
orientation: 0
confidence: high
notes: End of the file (line 316 last, file ends after `};` on 315). Sticky header line 224. Line 291 partially occluded under sticky shadow (`spacing={spacing}`). Red squiggles under whole JSX block lines 292-313. Tab "action-buttons.tsx 7"; No Solution; 9 errors 0 warnings; hitanshu/experimental*.
---
224    export const ActionButtons: React.FC<ActionButtonsProps> = ({     [sticky header]
292                sx={{
293                    justifyContent: 'flex-end',
294                    ...sx,
295                }}
296            >
297                {visibleButtons.map((btn) => {
298                    const style = getButtonStyle(btn.matchcode);
299
300                    return (
301                        <Button
302                            key={btn.matchcode}
303                            variant={style.variant}
304                            size="small"
305                            disabled={btn.disabled}
306                            onClick={() => onButtonClick?.(btn.matchcode)}
307                            sx={style.sx}
308                        >
309                            {btn.text}
310                        </Button>
311                    );
312                })}
313            </Stack>
314        );
315    };
316
