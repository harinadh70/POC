import { create } from 'zustand';

/**
 * appStateStore (SDD §3.3.2) — global variables shared across the app.
 * This is the React home for the legacy session array (marrSessionInformation),
 * dirty flags, and page-scoped variables set via SET_VARIABLE commands.
 */
interface AppState {
  /** Legacy-style global variables addressed by name (SET_VARIABLE / SET_TEXT). */
  variables: Record<string, unknown>;
  /** Unsaved-changes flag, mirrors the legacy dirty flag. */
  isDirty: boolean;
  setVariable: (name: string, value: unknown) => void;
  getVariable: (name: string) => unknown;
  setDirty: (dirty: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  variables: {},
  isDirty: false,
  setVariable: (name, value) =>
    set((s) => ({ variables: { ...s.variables, [name]: value } })),
  getVariable: (name) => get().variables[name],
  setDirty: (isDirty) => set({ isDirty }),
  reset: () => set({ variables: {}, isDirty: false }),
}));
