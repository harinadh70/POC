import { create } from 'zustand';
import type { BrowserCommand } from '@/types';

/**
 * browserCommandStore (SDD §3.3.3) — the sink for user-facing commands the
 * backend sends that aren't a direct control mutation: messages, modal/window
 * requests. Control-level commands (SET_VISIBLE etc.) go to the page store.
 */
export interface Notification {
  id: number;
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

interface BrowserCommandState {
  notifications: Notification[];
  /** A command asking us to open a modal page, staged for the modal host. */
  pendingModal: BrowserCommand | null;
  notify: (severity: Notification['severity'], message: string) => void;
  dismiss: (id: number) => void;
  openModal: (cmd: BrowserCommand) => void;
  clearModal: () => void;
}

let nid = 0;

export const useBrowserCommandStore = create<BrowserCommandState>((set) => ({
  notifications: [],
  pendingModal: null,
  notify: (severity, message) =>
    set((s) => ({ notifications: [...s.notifications, { id: ++nid, severity, message }] })),
  dismiss: (id) =>
    set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
  openModal: (cmd) => set({ pendingModal: cmd }),
  clearModal: () => set({ pendingModal: null }),
}));
