import { useReducer } from 'react';

import type { NormalizedField } from '@/types';
import type { SessionXmlItem } from '@components/modal-dialog/use-modal-data';
import type { BrowserCommand } from '@utils/apply-server-commands';
import type { ModalPageMetadata, PageBuildButton } from '@utils/transform-pagebuild-response';

export interface ModalState {
    loading: boolean;
    submitting: boolean;
    error: string | null;
    fields: NormalizedField[];
    buttons: PageBuildButton[];
    metadata: ModalPageMetadata;
    fieldOrder: string[];
    utpOrder: string[];
    sessionXml: SessionXmlItem[];
    browserCommands: BrowserCommand[];
}

export type ModalAction =
    | { type: 'LOADING' }
    | {
          type: 'SUCCESS';
          payload: {
              fields: NormalizedField[];
              buttons: PageBuildButton[];
              metadata: ModalPageMetadata;
              fieldOrder: string[];
              utpOrder: string[];
              sessionXml: SessionXmlItem[];
              browserCommands: BrowserCommand[];
          };
      }
    | { type: 'ERROR'; error: string }
    | { type: 'SUBMITTING'; submitting: boolean }
    | { type: 'SET_COMMANDS'; commands: BrowserCommand[] }
    | {
          type: 'PATCH_FIELD_OPTIONS';
          matchcode: string;
          options: Array<{ label: string; value: string }>;
      };

const defaultInitialState: ModalState = {
    loading: false,
    submitting: false,
    error: null,
    fields: [],
    buttons: [],
    metadata: {},
    fieldOrder: [],
    utpOrder: [],
    sessionXml: [],
    browserCommands: [],
};

function modalReducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                fields: action.payload.fields,
                buttons: action.payload.buttons,
                metadata: action.payload.metadata,
                fieldOrder: action.payload.fieldOrder,
                utpOrder: action.payload.utpOrder,
                sessionXml: action.payload.sessionXml,
                browserCommands: action.payload.browserCommands,
            };
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case 'SUBMITTING':
            return {
                ...state,
                submitting: action.submitting,
            };
        case 'SET_COMMANDS':
            return {
                ...state,
                browserCommands: action.commands,
            };
        case 'PATCH_FIELD_OPTIONS':
            return {
                ...state,
                fields: state.fields.map((field) =>
                    field.matchcode === action.matchcode
                        ? {
                              ...field,
                              options: action.options,
                          }
                        : field,
                ),
            };
        default:
            return state;
    }
}

export function useModalState(initialState?: Partial<ModalState>) {
    const [state, dispatch] = useReducer(modalReducer, {
        ...defaultInitialState,
        ...initialState,
    });

    return { state, dispatch };
}
