// MODIFIED — original: src/stores/session-store.ts
// GAP #17 — SetFrameTitle support (eebrowser.vbs lines 1440-1519):
// adds windowTitle + pathLabel state with setWindowTitle / setPathLabel actions,
// wired into clearSession and the selector exports. See GAP markers.

import { create } from 'zustand';

// hooks
import { useShallow } from 'zustand/react/shallow';

// utils
import { xmlParser } from '@utils/xml-parser';

// types
import type { Session, SessionPayload, XMLItem } from '@/types/common';

// ----------------------------------------------

// define the shape of our session actions
interface SessionAction {
	setSession: (session: Partial<Omit<Session, 'actions'>>) => void;
	updateSessionFromArray: (arr: unknown[]) => void;
	updateSessionFromResponse: (flat: Partial<SessionPayload>) => void;
	getXmlDetailItem: (name: string) => string;
	setXmlDetailItem: (name: string, value: string) => void;
	clearXmlDetailItem: (name: string) => void;
	toPayload: () => Omit<SessionPayload, 'EEData'>;
	clearSession: () => void;
	// >>> GAP #17: SetFrameTitle actions
	setWindowTitle: (windowTitle: string) => void;
	setPathLabel: (pathLabel: string) => void;
	// <<< GAP #17
}

// define the shape of our session state
interface SessionState extends Session {
	// >>> GAP #17: SetFrameTitle state — document.title = windowTitle + " - " + pathLabel
	/** Application title (windowTitle user option, served via the Navigation API) */
	windowTitle: string;
	/** Current page path description (mstrPathLabel from the cycling response) */
	pathLabel: string;
	// <<< GAP #17
	actions: SessionAction;
}

const defaultSession: Omit<Session, never> = {
	compLoc: 'PIPH',
	userId: '',
	policyId: '0',
	nodeKey: 'POL|POL|0',
	action: 'START',
	diagnosticMode: '0',
	xmlDetail: { items: [] },
	xmlFileName: '',
	xmlFilePath: '',
	aspFilePath: '',
	policyNumber: '',
	primaryInsured: '',
	transactionType: '',
	expiredNumber: '0',
};

// >>> GAP #17: SetFrameTitle defaults (merged into store init + clearSession below)
const defaultTitleState = { windowTitle: '', pathLabel: '' };
// <<< GAP #17

// create the session store
const useSessionStore = create<SessionState>()((set, get) => ({
	...defaultSession,
	// >>> GAP #17
	...defaultTitleState,
	// <<< GAP #17
	actions: {
		setSession: (session: Partial<Omit<Session, 'actions'>>) => {
			set((prevState) => ({ ...prevState, ...session }));
		},
		clearSession: () => {
			// >>> GAP #17: also reset title state
			set({ ...defaultSession, ...defaultTitleState });
			// <<< GAP #17
		},
		/**
		 * Update session from /data response positional array.
		 * Wire: response.results.aqs.sessionInformation.value[0..6]
		 * 0-indexed (JSON array, not legacy 1-based VBScript):
		 *   [0] compLoc, [1] userId, [2] policyId, [3] nodeKey,
		 *   [4] action,  [5] diagnosticMode, [6] xmlDetail (object or JSON string)
		 */
		updateSessionFromArray: (arr: unknown[]) => {
			// Only replace xmlDetail if the server actually returned one (arr[6] present and non-null).
			// An absent index-6 means the server didn't touch xmlDetail — preserve existing items.

			const parsedXmlDetail =
				arr[6] !== null && arr[6] !== undefined ? xmlParser(arr[6]) : get().xmlDetail;
			const xmlDetail = Array.isArray(parsedXmlDetail)
				? { items: parsedXmlDetail as XMLItem[] }
				: (parsedXmlDetail as Session['xmlDetail']);

			set({
				compLoc: String(arr[0]) || get().compLoc,
				userId: String(arr[1]) || get().userId,
				policyId: String(arr[2]) || get().policyId,
				nodeKey: String(arr[3]) || get().nodeKey,
				action: String(arr[4]) || get().action,
				diagnosticMode: String(arr[5]) || get().diagnosticMode,
				xmlDetail,
			});
		},
		/**
		 * Update session from flat /navigation or /layout response.
		 */
		updateSessionFromResponse: (flat: Partial<SessionPayload>) => {
			const updates: Partial<Omit<SessionState, 'actions'>> = {};
			if (flat.compLoc !== undefined) updates.compLoc = flat.compLoc;
			if (flat.userId !== undefined) updates.userId = flat.userId;
			if (flat.policyId !== undefined)
				updates.policyId =
					typeof flat.policyId === 'string' ? flat.policyId : String(flat.policyId);
			if (flat.nodeKey !== undefined) updates.nodeKey = flat.nodeKey;
			if (flat.action !== undefined) updates.action = flat.action;
			if (flat.diagnosticMode !== undefined) updates.diagnosticMode = flat.diagnosticMode;
			if (flat.xmlDetail !== undefined) updates.xmlDetail = flat.xmlDetail;
			set(updates);
		},
		getXmlDetailItem: (name: string) => {
			const item = get().xmlDetail.items.find(
				(i: XMLItem) => i.name.toLowerCase() === name.toLowerCase(),
			);
			return item?.value ?? '';
		},
		setXmlDetailItem: (name: string, value: string) => {
			set((s) => {
				const exists = s.xmlDetail.items.find(
					(i: XMLItem) => i.name.toLowerCase() === name.toLowerCase(),
				);
				if (exists) {
					return {
						xmlDetail: {
							items: s.xmlDetail.items.map((i) =>
								i.name.toLowerCase() === name.toLowerCase() ? { ...i, value } : i,
							),
						},
					};
				}
				return { xmlDetail: { items: [...s.xmlDetail.items, { name, value }] } };
			});
		},
		clearXmlDetailItem: (name: string) => {
			set((s) => ({
				xmlDetail: {
					items: s.xmlDetail.items.filter(
						(i: XMLItem) => i.name.toLowerCase() !== name.toLowerCase(),
					),
				},
			}));
		},
		toPayload: () => {
			const s = get();
			// Normalise nodeKey — always trailing | (e.g. "POL|POL|0|")
			const nodeKey = s.nodeKey.endsWith('|') ? s.nodeKey : s.nodeKey + '|';
			return {
				compLoc: s.compLoc,
				userId: s.userId,
				policyId: s.policyId,
				nodeKey,
				action: s.action.toUpperCase(), // API expects UPPERCASE
				diagnosticMode: s.diagnosticMode,
				xmlDetail: {
					items: s.xmlDetail.items.map(
						(i: XMLItem): XMLItem => ({
							name: i.name,
							value: i.value,
						}),
					),
				},
			};
		},
		// >>> GAP #17: SetFrameTitle actions — consumed by the frame-title effect
		setWindowTitle: (windowTitle: string) => {
			set({ windowTitle });
		},
		setPathLabel: (pathLabel: string) => {
			set({ pathLabel });
		},
		// <<< GAP #17
	},
}));

export type UseSessionStore = typeof useSessionStore;

export const SessionStoreApi = useSessionStore;

export const useSession = () =>
	useSessionStore(
		useShallow((state) => ({
			compLoc: state.compLoc,
			userId: state.userId,
			policyId: state.policyId,
			nodeKey: state.nodeKey,
			action: state.action,
			diagnosticMode: state.diagnosticMode,
			xmlDetail: state.xmlDetail,
			policyNumber: state.policyNumber,
			primaryInsured: state.primaryInsured,
			transactionType: state.transactionType,
			// >>> GAP #17: expose title state to frame-title consumers
			windowTitle: state.windowTitle,
			pathLabel: state.pathLabel,
			// <<< GAP #17
		})),
	);

export const useSessionActions = () => useSessionStore((state) => state.actions);

// >>> GAP #17: dedicated selectors — used by the SetFrameTitle document.title effect
export const useWindowTitle = () => useSessionStore((state) => state.windowTitle);
export const usePathLabel = () => useSessionStore((state) => state.pathLabel);
// <<< GAP #17
