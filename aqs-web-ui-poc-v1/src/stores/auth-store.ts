import { create } from 'zustand';
import type { SessionInfo } from '@/types';

/**
 * authStore (SDD §3.3.4) — who is logged in + the session carried on every call.
 */
interface AuthState {
  isAuthenticated: boolean;
  session: SessionInfo | null;
  permissions: Set<string>;
  login: (session: SessionInfo, permissions?: string[]) => void;
  logout: () => void;
  can: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  session: null,
  permissions: new Set(),
  login: (session, permissions = []) =>
    set({ isAuthenticated: true, session, permissions: new Set(permissions) }),
  logout: () => set({ isAuthenticated: false, session: null, permissions: new Set() }),
  can: (permission) => get().permissions.has(permission),
}));
