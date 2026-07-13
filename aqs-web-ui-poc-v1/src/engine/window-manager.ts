import type { SessionInfo } from '@/types';

/**
 * windowManager — the improved "windows on click" engine.
 *
 * Replaces the literal VBScript port (unique-named popups, alert(), state in the
 * URL, guard logic duplicated across files) with the target design from SDD §11:
 * a window REGISTRY that reuses/focuses one window per key, hands state off via
 * sessionStorage (not the URL), and reports problems through the app's own
 * notification system. All browser access is injected, so it is unit-testable.
 */

export interface OpenWindowRequest {
  /** Stable key — one window per policy/page. e.g. `${policyId}:${pageId}`. */
  key: string;
  /** Minimal route to open. Must NOT carry sensitive payload. */
  url: string;
  /** Handoff state for the child window — stored in sessionStorage, not the URL. */
  state?: Record<string, unknown>;
  width?: number;
  height?: number;
}

export type OpenResult = 'opened' | 'focused' | 'blocked' | 'skipped';

/** Browser + app dependencies, injected so the manager can be tested in isolation. */
export interface WindowManagerDeps {
  openWindow: (url: string, name: string, features: string) => Window | null;
  /** True when the current page is itself a popup (window.opener exists). */
  isChildWindow: () => boolean;
  /** Persist handoff state for the child window to read on bootstrap. */
  setHandoff: (key: string, state: unknown) => void;
  /** Surface a message through the app's notification system (no alert()). */
  notify: (severity: 'warning' | 'error' | 'info', message: string) => void;
}

const HANDOFF_PREFIX = 'aqs:handoff:';
const DEFAULT_W = 900;
const DEFAULT_H = 640;

export function createWindowManager(deps: WindowManagerDeps) {
  /** key → live window handle. This IS the "one window per policy" guarantee. */
  const registry = new Map<string, Window>();

  function open(req: OpenWindowRequest): OpenResult {
    // Guard (single source of truth): never spawn windows from inside a popup.
    if (deps.isChildWindow()) return 'skipped';

    // Reuse: a live window for this key already exists → focus it, don't duplicate.
    const existing = registry.get(req.key);
    if (existing && !existing.closed) {
      existing.focus();
      return 'focused';
    }
    registry.delete(req.key); // drop any stale (closed) handle

    // Handoff via sessionStorage — the URL stays clean, sensitive data never
    // touches the address bar or browser history.
    if (req.state) deps.setHandoff(HANDOFF_PREFIX + req.key, req.state);

    const features = [
      `width=${req.width ?? DEFAULT_W}`,
      `height=${req.height ?? DEFAULT_H}`,
      'scrollbars=yes',
      'resizable=yes',
      'toolbar=no',
      'menubar=no',
      'location=no',
    ].join(',');

    const handle = deps.openWindow(req.url, `AQS_${req.key}`, features);
    if (!handle || handle.closed) {
      deps.notify('warning', 'Pop-up blocked. Please allow pop-ups for this site to open the window.');
      return 'blocked';
    }

    registry.set(req.key, handle);
    handle.focus();
    return 'opened';
  }

  /** Close and forget every tracked window — call on logout (SDD §11.9). */
  function closeAll(): void {
    for (const w of registry.values()) {
      try {
        if (!w.closed) w.close();
      } catch {
        /* cross-origin or already gone — ignore */
      }
    }
    registry.clear();
  }

  return { open, closeAll };
}

/** Build a stable window key from the session (one window per policy + page). */
export function windowKey(session: Pick<SessionInfo, 'policyId'>, pageId: string): string {
  return `${session.policyId ?? '0'}:${pageId}`;
}
