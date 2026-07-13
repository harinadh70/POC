import { create } from 'zustand';
import type { BrowserCommand, ControlDef, PageBuildResponse } from '@/types';

/**
 * pageStore (Form Provider, SDD §2.3.2) — the live state of the currently
 * rendered page: its controls (keyed by matchcode) and their values.
 *
 * This is where server-driven UI actually happens: `applyCommands` mutates
 * controls in response to backend BrowserCommands, and the renderer re-draws.
 */
interface PageState {
  pageId: string | null;
  title: string;
  controls: Record<string, ControlDef>;
  order: string[];
  loadPage: (pb: PageBuildResponse, mergedControls: ControlDef[]) => void;
  setValue: (matchcode: string, value: ControlDef['value']) => void;
  applyCommands: (commands: BrowserCommand[]) => void;
  clear: () => void;
}

export const usePageStore = create<PageState>((set) => ({
  pageId: null,
  title: '',
  controls: {},
  order: [],
  loadPage: (pb, mergedControls) =>
    set(() => {
      const controls: Record<string, ControlDef> = {};
      const order: string[] = [];
      for (const c of mergedControls) {
        controls[c.matchcode] = { visible: true, ...c };
        order.push(c.matchcode);
      }
      return { pageId: pb.pageId, title: pb.title, controls, order };
    }),
  setValue: (matchcode, value) =>
    set((s) => {
      const c = s.controls[matchcode];
      if (!c) return s;
      return { controls: { ...s.controls, [matchcode]: { ...c, value } } };
    }),
  applyCommands: (commands) =>
    set((s) => {
      const controls = { ...s.controls };
      for (const cmd of commands) {
        const target = cmd.target ? controls[cmd.target] : undefined;
        switch (cmd.type) {
          case 'SET_VISIBLE':
            if (target) controls[cmd.target!] = { ...target, visible: Boolean(cmd.value) };
            break;
          case 'SET_DISABLED':
            if (target) controls[cmd.target!] = { ...target, disabled: Boolean(cmd.value) };
            break;
          case 'SET_READONLY':
            if (target) controls[cmd.target!] = { ...target, readOnly: Boolean(cmd.value) };
            break;
          case 'SET_REQUIRED':
            if (target) controls[cmd.target!] = { ...target, required: Boolean(cmd.value) };
            break;
          case 'SET_TEXT':
          case 'SET_VARIABLE':
            if (target)
              controls[cmd.target!] = { ...target, value: cmd.value as ControlDef['value'] };
            break;
          case 'LOAD_COMBO':
            if (target) controls[cmd.target!] = { ...target, options: cmd.options ?? [] };
            break;
          case 'CLEAR_COMBO':
            if (target) controls[cmd.target!] = { ...target, options: [] };
            break;
          // DISPLAY_*, NAVIGATE, OPEN_WINDOW, modal are handled by the command
          // dispatcher against the browser-command store / router, not here.
          default:
            break;
        }
      }
      return { controls };
    }),
  clear: () => set({ pageId: null, title: '', controls: {}, order: [] }),
}));
