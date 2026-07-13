// Template: src/features/<page>/use-<page>-modal-flow.ts
// Thin feature hook for one converted legacy page. Modeled on the selcov
// feature (use-selcov-modal-flow) and the modal-dialog engine.
//
// The engine does the heavy lifting:
//   - use-modal-state:   reducer (LOADING/SUCCESS/ERROR/SUBMITTING/SET_COMMANDS)
//   - use-modal-data:    fetch + normalize page-build JSON
//   - use-modal-actions: commits + buildXMLServerCallPayload + xmlServerCall
//
// This hook only supplies page identity (xml file, matchcodes) and
// page-specific reactions to browserCommands / action results.

import { useCallback } from 'react';
// Adjust import paths to the real relative paths in aqs-web-ui:
// import { useModalState } from '../../components/modal-dialog/use-modal-state';
// import { useModalData } from '../../components/modal-dialog/use-modal-data';
// import { useModalActions } from '../../components/modal-dialog/use-modal-actions';

// ---- Page identity (Step 0 facts) -----------------------------------------

/** Xml file that defines the legacy page (SessionInfo.XmlFile). */
const PAGE_XML_FILE = 'UWMyPage.xml'; // TODO

/** List name(s) — must match GRID_CONFIG_REGISTRY keys. */
const PAGE_LIST_NAME = 'MY_PAGE_LIST_NAME'; // TODO

/** Button matchcodes this page expects (for exhaustiveness checks/tests). */
const PAGE_BUTTONS = ['ADD', 'EDIT', 'DELETE', 'OK', 'CANCEL'] as const; // TODO

// ---- Hook ------------------------------------------------------------------

export interface UsePageModalFlowParams {
  /** Session for the page — comes from route loader / parent modalSession. */
  sessionInfo: unknown; // SessionInfo — use the app's real type
  /** Open/close control if this page runs as a modal in a flow/queue. */
  onClose?: () => void;
}

export function usePageModalFlow({ sessionInfo, onClose }: UsePageModalFlowParams) {
  // const [state, dispatch] = useModalState();
  //
  // 1) Schema on load — same call shape as static-frame-renderer's
  //    useSchemaOnLoad → executeOnLoad → xmlServerCall({ calls, handlerContext }).
  //    use-modal-data handles LOADING/SUCCESS/ERROR dispatches; pass it
  //    PAGE_XML_FILE + sessionInfo so the server executes this page's build.
  //
  // const { load } = useModalData({ xmlFileName: PAGE_XML_FILE, sessionInfo, dispatch });
  //
  // 2) Field commits — engine-provided; page hook normally passes through.
  //
  // const { handleCommitField, executeButtonAction } = useModalActions({
  //   state,
  //   dispatch,
  //   xmlFileName: PAGE_XML_FILE,
  //   sessionInfo,
  // });
  //
  // 3) Page-specific button behavior. Only intercept what differs from the
  //    generic engine behavior (e.g. CANCEL closes this modal, OK advances a
  //    wizard queue). Everything else falls through to executeButtonAction,
  //    which builds the payload:
  //      buildXMLServerCallPayload({
  //        xmlFileName, formData, sessionInfo, calls,
  //        buttonMatchcode, callType, fieldOrder, utpOrder, sessionXml,
  //        primaryFieldValue, previousValue, ...
  //      })
  //    and awaits xmlServerCall(payload).
  const onButton = useCallback(
    async (matchcode: string) => {
      const upper = matchcode.toUpperCase().trim();
      if (upper === 'CANCEL') {
        onClose?.();
        return;
      }
      // await executeButtonAction(buttonFor(upper));
      // TODO: react to response.errors / browserCommands (SET_COMMANDS)
      //       e.g. refresh grid list, close on success, chain next modal.
    },
    [onClose],
  );

  return {
    // state,
    // load,
    // handleCommitField,
    onButton,
    listName: PAGE_LIST_NAME,
    buttons: PAGE_BUTTONS,
  };
}
