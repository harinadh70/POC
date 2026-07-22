// ============================================================================
// GAP #65: InfoButtonOnClick (VBS lines 6472-6549)
// ============================================================================
//
// VBS FLOW:
//   1. User clicks the Info/Lookup icon button next to a field
//   2. VBS reads the button's "calltype" attribute from the control definition:
//      - calltype = "INFO"   → informational lookup (display only)
//      - calltype = "LOOKUP" → selection lookup (pick a value from a list)
//      - calltype = "SEARCH" → search dialog (filter/find an entity)
//   3. VBS reads the "related control" — the input field the info button
//      is associated with (e.g., btnInfoZIP is related to dtaZIP)
//   4. Builds EEData:
//      matchcode = related control matchcode (e.g., "dtaZIP")
//      lValue = current value of the related field
//      xValue = "" (or selected index for combos)
//      callType = the button's calltype attribute ("INFO"/"LOOKUP"/"SEARCH")
//      postProcessAction = "1"
//   5. Posts to server via xmlServerCall
//   6. Server returns browser commands:
//      - For INFO:   DISPLAY_MESSAGE or DISPLAY_INFORMATION with the lookup text
//      - For LOOKUP: OPEN_MODAL with a selection grid/list
//      - For SEARCH: OPEN_MODAL with a search form + results grid
//   7. VBS dispatches the browser commands (modal opens, message shows, etc.)
//   8. For LOOKUP/SEARCH: when user selects a value in the modal,
//      the modal posts back and the server returns SET_TEXT commands
//      to populate the related field(s) on the parent form
//
// REAL POC ALREADY HAS:
//   - FieldRenderer (v2): renders an info icon button when showInfoIcon is
//     true on the ControlNode. The icon is <InfoOutlinedIcon> in an IconButton.
//   - No handler for the info click — the v1 code had onInfoClick prop that
//     delegated to handleFieldCommit with event type 'click', but v2 has
//     no equivalent wiring.
//   - executeFormActionBindings: can execute 'custom' handler type bindings
//   - handlerForBrowserCommands: dispatches DISPLAY_MESSAGE, OPEN_MODAL, etc.
//   - Modal infrastructure: clientModalLoader/clientModalAction for modal pages
//   - HandlersContext: handler registration via import.meta.glob
//
// WHAT THIS CODE ADDS:
//   - handleInfoButtonClick: reads the control's calltype, builds EEData,
//     calls the server, dispatches response commands
//   - Calltype branching: INFO shows a message, LOOKUP opens a selection
//     modal, SEARCH opens a search modal
//   - Handler registration: exports as 'onInfoButtonClick' for the handler
//     chain (auto-discovered via import.meta.glob)
//   - Integration guide showing how to wire into FieldRenderer v2
//
// WHERE TO ADD: src/handlers/common/info-lookup.ts
// ============================================================================

// ---------------------------------------------------------------------------
// Store imports
// ---------------------------------------------------------------------------
import { SessionStoreApi } from '@/stores/session-store';

// ---------------------------------------------------------------------------
// Service imports — EEData building + server call + command dispatch
// ---------------------------------------------------------------------------
import { baseQuery } from '@/utils/http-instance';
import { handlerForBrowserCommands } from '@/handlers/common/command';
import type { CommandHandlers } from '@/handlers/common/command';

// ---------------------------------------------------------------------------
// Handler type — matches the Real POC's handler registration system
// ---------------------------------------------------------------------------
import type { HandlerFunction, HandlerSchema } from '@/types/handler';


// ============================================================================
// Types
// ============================================================================

/**
 * Calltype values for info buttons.
 *
 * VBS: These were string attributes on the button control definition.
 * Each calltype results in a different server-side behavior and
 * client-side response handling.
 */
export type InfoCallType = 'INFO' | 'LOOKUP' | 'SEARCH';

/**
 * Arguments for the info button handler.
 *
 * These map to the VBS variables read from the button's control definition
 * and the related field's current state.
 */
export interface InfoButtonArgs {
    /** Matchcode of the RELATED FIELD (not the button itself).
     *  VBS: The "related control" attribute on the info button. */
    matchcode: string;

    /** Current value of the related field. */
    value: string;

    /** Calltype from the button's schema definition.
     *  Determines server behavior and response type.
     *  Default: 'INFO' */
    callType?: InfoCallType;

    /** The button's own matchcode (for session stamping). */
    buttonMatchcode?: string;

    /** Schema definition of the related field (passed through for context). */
    schema?: unknown;

    /** Additional context (e.g., page context, combo options). */
    context?: unknown;

    /** XML file name for the current page. */
    xmlFileName?: string;

    /** Command handlers for processing server response. */
    commandHandlers?: CommandHandlers;

    /** Alternative command runner (e.g., from executeFormActionBindings). */
    runCommands?: (commands: unknown[]) => void | Promise<void>;
}

/**
 * Result of the info button server call.
 */
export interface InfoButtonResult {
    /** Whether the server call succeeded. */
    success: boolean;
    /** Browser commands from the server response. */
    commands?: unknown[];
    /** For INFO calltype: the display text returned by the server. */
    displayText?: string;
}


// ============================================================================
// handleInfoButtonClick — core handler
// ============================================================================

/**
 * Handle the Info/Lookup/Search button click.
 *
 * VBS: InfoButtonOnClick (lines 6472-6549)
 *   - Read calltype from button attributes
 *   - Built EEData with related field matchcode + current value
 *   - Posted to server via xmlServerCall
 *   - Dispatched browser commands (DISPLAY_MESSAGE, OPEN_MODAL, etc.)
 *
 * Real POC: Builds the same EEData shape, posts via baseQuery, and
 * dispatches commands via handlerForBrowserCommands. The calltype
 * determines the server's response behavior:
 *   - INFO:   Server returns DISPLAY_MESSAGE/DISPLAY_INFORMATION
 *   - LOOKUP: Server returns OPEN_MODAL with a selection grid
 *   - SEARCH: Server returns OPEN_MODAL with a search form
 *
 * @param args  Info button arguments (field matchcode, value, calltype)
 * @returns     Result with success flag and commands
 */
export async function handleInfoButtonClick(
    args: InfoButtonArgs,
): Promise<InfoButtonResult> {
    const {
        matchcode,
        value,
        callType = 'INFO',
        buttonMatchcode,
        schema,
        context,
        xmlFileName = '',
        commandHandlers,
        runCommands,
    } = args;

    // -----------------------------------------------------------------------
    // 1. Stamp session variables
    //    VBS: Set mstrCurrentButton = button matchcode (or related matchcode)
    //    Real POC: SessionStoreApi.getState().actions.setSession
    // -----------------------------------------------------------------------
    const session = SessionStoreApi.getState();
    session?.actions?.setSession?.({
        key: 'mstrCurrentButton',
        value: buttonMatchcode ?? matchcode,
    });

    // -----------------------------------------------------------------------
    // 2. Build EEData for the server call
    //
    // VBS EEData shape for info buttons:
    //   matchcode = related field matchcode (NOT the button matchcode)
    //   lValue = current value of the related field
    //   xValue = "" (or combo index if the field is a combo)
    //   callType = INFO / LOOKUP / SEARCH
    //   postProcessAction = "1"
    //
    // The calltype is the key discriminator — the server uses it to decide
    // what data to return:
    //   INFO   → returns display text/message
    //   LOOKUP → returns a modal page with a selection grid
    //   SEARCH → returns a modal page with search form + results
    // -----------------------------------------------------------------------
    const eeData = {
        controlMatchcode: matchcode,
        controlText: value,             // lValue = current field value
        controlIndex: '',               // xValue = empty for info buttons
        initialLValue: value,           // initial value for change detection
        initialXValue: '',
        postProcessAction: '1',
        data3: '',
        callType: callType,
        comboListIndex: '',
        alternateNodeKey: '',
        dateString: '',
        comboValue: '',
        xmlFileName,
    };

    // -----------------------------------------------------------------------
    // 3. POST to server
    //
    // VBS: Used xmlServerCall with the EEData
    // Real POC: POST to /ui/page/data with the standard payload shape
    // -----------------------------------------------------------------------
    const payload = {
        object: 'ZENTEDTCTL',
        ...(session?.toPayload?.() ?? {}),
        eeData,
        callType: 'POST',
    };

    let response: unknown;
    try {
        response = await baseQuery({
            method: 'POST',
            url: '/ui/page/data',
            data: payload,
        });
    } catch (error) {
        console.error(`[info-lookup] Server call failed for ${callType}:`, error);
        return { success: false };
    }

    // -----------------------------------------------------------------------
    // 4. Parse and dispatch server response commands
    //
    // VBS: Iterated browser commands, dispatched each one.
    // The calltype determines what commands come back:
    //
    //   INFO calltype → typically:
    //     DISPLAY_MESSAGE or DISPLAY_INFORMATION with lookup text
    //     (e.g., ZIP code lookup returns city/state info)
    //
    //   LOOKUP calltype → typically:
    //     OPEN_MODAL with a selection grid page
    //     User picks a value → modal posts → SET_TEXT commands populate
    //     the related field(s) on the parent form
    //
    //   SEARCH calltype → typically:
    //     OPEN_MODAL with a search/filter form page
    //     User searches, picks a result → same SET_TEXT flow as LOOKUP
    //
    // Real POC: handlerForBrowserCommands handles all of these verbs.
    // OPEN_MODAL triggers the modal infrastructure (clientModalLoader),
    // DISPLAY_MESSAGE triggers ModalStoreApi.setVariant, and SET_TEXT
    // calls the onSetFieldValue callback.
    // -----------------------------------------------------------------------
    const responseData = response as {
        results?: {
            aqs?: {
                browserCtl?: { call?: unknown[] };
            };
        };
        commands?: unknown[];
    } | null;

    const commands =
        responseData?.results?.aqs?.browserCtl?.call ??
        responseData?.commands;

    let displayText: string | undefined;

    if (Array.isArray(commands) && commands.length > 0) {
        // Extract display text from DISPLAY_MESSAGE/DISPLAY_INFORMATION
        // commands before dispatching (for the result return value)
        for (const cmd of commands) {
            const verb = (cmd as { verb?: string })?.verb?.toUpperCase();
            if (verb === 'DISPLAY_MESSAGE' || verb === 'DISPLAY_INFORMATION') {
                displayText = (cmd as { noun?: string })?.noun ?? '';
            }
        }

        // Dispatch all commands through the handler chain
        if (runCommands) {
            await runCommands(commands);
        } else if (commandHandlers) {
            handlerForBrowserCommands(commands as any[], commandHandlers);
        }
    }

    return { success: true, commands, displayText };
}


// ============================================================================
// Handler registration export
// ============================================================================

/**
 * Named handler for the handler chain.
 *
 * The Real POC discovers handlers via import.meta.glob('/src/handlers/common/*.ts').
 * Each handler module exports a `handlers` record matching HandlerModuleSchema.
 *
 * To register this handler, place this file at src/handlers/common/info-lookup.ts.
 * It will be auto-discovered and available as 'onInfoButtonClick' in the
 * merged handler map.
 *
 * In the form schema or button bindings, reference it as:
 *   { type: 'custom', name: 'onInfoButtonClick' }
 *
 * The handler reads calltype and related field info from the schema args:
 *   {
 *       type: 'custom',
 *       name: 'onInfoButtonClick',
 *       args: {
 *           matchcode: 'dtaZIP',         // related field
 *           callType: 'LOOKUP',          // INFO, LOOKUP, or SEARCH
 *           buttonMatchcode: 'btnZIP',   // the button's own matchcode
 *       }
 *   }
 */
export const infoButtonHandler: HandlerFunction = async (handlerSchema: HandlerSchema) => {
    // Extract args from the handler schema
    const args = handlerSchema.args ?? {};
    const matchcode = (args.matchcode as string) ?? '';
    const callType = (args.callType as InfoCallType) ?? 'INFO';
    const buttonMatchcode = args.buttonMatchcode as string | undefined;
    const value = (args.value as string) ?? '';
    const xmlFileName = handlerSchema.context?.xmlFilePath ?? '';

    if (!matchcode) {
        console.warn('[info-lookup] No matchcode provided in handler args.');
        return;
    }

    await handleInfoButtonClick({
        matchcode,
        value,
        callType,
        buttonMatchcode,
        xmlFileName,
    });
};

/** Handler module export — auto-discovered by import.meta.glob. */
export const handlers: Record<string, HandlerFunction> = {
    onInfoButtonClick: infoButtonHandler,
};


// ============================================================================
// INTEGRATION GUIDE
// ============================================================================
//
// === 1. Handler registration (auto-discovered) ===
//
// Place this file at: src/handlers/common/info-lookup.ts
// The import.meta.glob pattern in file-resolver.ts will auto-discover it.
// It will be available in the merged handler map as 'onInfoButtonClick'.
//
// === 2. Wire into FieldRenderer v2 ===
//
// The v2 FieldRenderer at src/components/ui/field-renderer.tsx renders an
// info icon when showInfoIcon is true on the ControlNode. Currently there
// is no onClick handler wired to it.
//
// Add the info button click handler to FieldRenderer:
//
//   // In field-renderer.tsx, find the info icon rendering:
//   {controlNode.field.showInfoIcon && (
//       <IconButton
//           size="small"
//           onClick={() => {
//               // NEW: dispatch info button click
//               const infoHandler = handlers?.['onInfoButtonClick'];
//               if (infoHandler) {
//                   void infoHandler({
//                       context: routerContext,
//                       schema: formSchema,
//                       commands: [],
//                       args: {
//                           matchcode: controlNode.matchcode,
//                           value: rhfField.value ?? '',
//                           callType: controlNode.field.infoCallType ?? 'INFO',
//                           buttonMatchcode: `btnInfo${controlNode.matchcode}`,
//                       },
//                   });
//               }
//           }}
//       >
//           <InfoOutlinedIcon fontSize="small" />
//       </IconButton>
//   )}
//
// === 3. Alternative: Direct wiring without handler chain ===
//
// If you prefer to bypass the handler chain for simpler integration:
//
//   import { handleInfoButtonClick } from '@/handlers/common/info-lookup';
//
//   // In the info icon onClick:
//   onClick={() => void handleInfoButtonClick({
//       matchcode: controlNode.matchcode,
//       value: rhfField.value ?? '',
//       callType: controlNode.field.infoCallType ?? 'INFO',
//       xmlFileName,
//       commandHandlers: buildCommandCallbacks(formActionContext),
//   })}
//
// === 4. Schema binding (for XML-driven pages) ===
//
// In the XML schema definition, info buttons can be bound:
//   {
//       matchcode: 'btnInfoZIP',
//       controlType: 'button',
//       relatedControl: 'dtaZIP',
//       infoCallType: 'LOOKUP',
//       schemaEvents: {
//           onClick: [
//               { type: 'custom', name: 'onInfoButtonClick' }
//           ]
//       }
//   }
//
// The handler reads matchcode/callType from args, falling back to the
// related control's matchcode if not explicitly provided.
//
// === 5. Calltype behavior summary ===
//
//   INFO:
//     - Server returns DISPLAY_MESSAGE/DISPLAY_INFORMATION
//     - handlerForBrowserCommands dispatches to ModalStoreApi.setVariant
//     - User sees an information dialog, no selection needed
//     - Example: ZIP code lookup → shows city/state
//
//   LOOKUP:
//     - Server returns OPEN_MODAL with a selection grid
//     - clientModalLoader loads the modal page
//     - User selects a value → modal posts → SET_TEXT commands populate
//       the related field(s)
//     - Example: Agent lookup → opens agent list → user picks → agent ID
//       and name populate the form
//
//   SEARCH:
//     - Server returns OPEN_MODAL with a search form
//     - Same flow as LOOKUP but with a filter/search form before results
//     - Example: Insured search → user enters name/DOB → results grid →
//       user picks → insured data populates the form
//
// ============================================================================

export default handleInfoButtonClick;
