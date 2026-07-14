/**
 * Domain types for the AQS React POC.
 * Grounded in Solution Design Document v13 and the reconstructed engine.
 *
 * The golden rule these types encode: the ENGINE speaks in generic
 * Controls / Commands / PageBuild. Nothing here is Policy-specific — a
 * Line of Business (LOB) is expressed as data (config), never as new types.
 */

/* ─────────────────────────  Session & navigation  ───────────────────────── */

/** Carried on every backend call (SDD §5.3). CompLoc defaults to PIHW server-side. */
export interface SessionInfo {
  userId: string;
  compLoc: string;
  policyId?: string;
  /** Where we are in the navigation tree, e.g. "POL...", "BOP..." */
  nodeKey?: string;
  /** Current LOB code, e.g. "POL". */
  lob?: LobCode;
  action?: string;
  tab?: string;
}

/** Response from the Navigation API — "which page/window loads next" (SDD §5.3). */
export interface NavigationResponse {
  /** The page identifier the router should resolve, e.g. "policy-information". */
  pageId: string;
  frame: FrameType;
  nodeKey?: string;
  title?: string;
}

/** Where an action's result goes — ported from Main_ISLLSYS_20010101.vbs. */
export type FrameType = 'MAIN' | 'MODAL' | 'NEWWINDOW' | 'HIDDEN';

/* ─────────────────────────  Lines of Business  ───────────────────────── */

/** 3-letter LOB code from the navigation tree (POL/BOP/CAU/IRM/WRM/LIA/RMP…). */
export type LobCode = string;

/** One entry in the LOB registry. Adding an LOB = adding one of these + a config folder. */
export interface LobDefinition {
  code: LobCode;
  /** Human label, e.g. "Policy". */
  name: string;
  /** Navigation-tree prefix that routes to this LOB. */
  navPrefix: string;
  /** Whether this LOB is implemented (LOB 1) or config-ready placeholder. */
  status: 'active' | 'config-ready';
  /** Accent color for the dashboard tile. */
  color?: string;
  /** Page configs keyed by pageId — only present for active LOBs. */
  pages?: Record<string, PageConfig>;
}

/* ─────────────────────────  Controls / fields  ───────────────────────── */

/** Field kinds — the union mirrors the legacy .htc → MUI mapping (SDD §7.2). */
export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select' // Dropdown.htc
  | 'combo' // Combo.htc / KPCombo.htc → Autocomplete
  | 'date' // Calendar.htc → DatePicker
  | 'checkbox' // checkbox.htc / AqsChecklist.htc
  | 'radio' // Radiobutton.htc
  | 'label'
  | 'button'; // ImageButton.htc / ToolButton.htc

export interface ComboOption {
  value: string;
  label: string;
}

/**
 * A single control. This is the atom the FieldRenderer draws.
 * `matchcode` is the legacy short code (e.g. BLDCLS, EFFDT) and the stable id.
 */
export interface ControlDef {
  matchcode: string;
  type: FieldType;
  label?: string;
  value?: string | number | boolean | null;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  visible?: boolean;
  maxLength?: number;
  options?: ComboOption[];
  /** Grid position for dynamic control positioning (SDD §2.6). */
  row?: number;
  col?: number;
  colSpan?: number;
  /** Buttons carry an action/frame instead of a value. */
  action?: string;
  frame?: FrameType;
  /** Free-form extras from PageBuild we don't model explicitly. */
  meta?: Record<string, unknown>;
}

/* ─────────────────────────  PageBuild (server → UI)  ───────────────────────── */

/** A server-returned data list that becomes a DataGrid (XmlList.htc → DataGrid). */
export interface GridList {
  listName: string;
  columns: { field: string; header: string; width?: number }[];
  rows: Record<string, unknown>[];
  rowIdField: string;
}

/** Response from the PageBuild API — controls + actions + initial commands (SDD §5.3). */
export interface PageBuildResponse {
  pageId: string;
  title: string;
  tabs?: { id: string; label: string }[];
  controls: ControlDef[];
  grids?: GridList[];
  /** Buttons/actions available on the page. */
  actions?: ControlDef[];
  /** BrowserCommands to apply for initial UI setup. */
  commands?: BrowserCommand[];
}

/* ─────────────────────────  Browser commands (server-driven UI)  ───────────────────────── */

/** The command verbs the backend can send — full set from command-handlers.ts. */
export type CommandType =
  | 'SET_VISIBLE'
  | 'SET_DISABLED'
  | 'SET_READONLY'
  | 'SET_REQUIRED'
  | 'SET_TEXT'
  | 'SET_VARIABLE'
  | 'LOAD_COMBO'
  | 'CLEAR_COMBO'
  | 'NAVIGATE'
  | 'NAVIGATE_CYCLING'
  | 'OPEN_WINDOW'
  | 'REFRESH_PAGE'
  | 'DISPLAY_ERROR'
  | 'DISPLAY_WARNING'
  | 'DISPLAY_MESSAGE'
  | 'DISPLAY_QUESTION'
  | 'DISPLAY_INFORMATION'
  | 'CLOSE_MODAL';

/** One instruction from the server. `target` is a control matchcode where relevant. */
export interface BrowserCommand {
  type: CommandType;
  target?: string;
  value?: unknown;
  options?: ComboOption[];
  message?: string;
  pageId?: string;
}

/* ─────────────────────────  Execute-action result  ───────────────────────── */

export type ActionOutcome =
  | 'COMMANDS_ONLY'
  | 'CONTINUE_TO_LOADER'
  | 'STORE_MODAL_CMD'
  | 'STORE_WINDOW_CMD'
  | 'EXTERNAL_REDIRECT';

export interface ExecuteActionResult {
  outcome: ActionOutcome;
  frame: FrameType;
  commands: BrowserCommand[];
  navigateTo?: string;
  error?: string;
}

/* ─────────────────────────  Page config (static/hybrid)  ───────────────────────── */

/** Render strategy declared per page in its JSON config (SDD §10.2.2). */
export type RenderStrategy = 'dynamic' | 'static' | 'hybrid';

/**
 * The versioned JSON config that makes a page static/hybrid. For `dynamic`
 * pages this is optional — PageBuild alone drives the UI.
 */
export interface PageConfig {
  pageId: string;
  title: string;
  version: string;
  strategy: RenderStrategy;
  tabs?: { id: string; label: string }[];
  /** Static schema controls (merged with PageBuild via mergeControlsWithPageBuild). */
  controls?: ControlDef[];
  /** Grid list names this page hosts. */
  gridListNames?: string[];
  permissions?: string[];
  /**
   * Per-page hooks — the typed replacement for the legacy PageUniqueRoutine
   * Execute calls ("local_window_onload" / "local_before_window_unload").
   */
  onLoad?: () => void;
  onBeforeUnload?: () => void;
}
