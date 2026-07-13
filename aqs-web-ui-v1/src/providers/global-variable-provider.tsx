/* eslint-disable react-refresh/only-export-components */

import { useCallback, useEffect, useMemo, useRef, type PropsWithChildren } from 'react';

// utils
import createStore from '@utils/create-store';
import { createFeatureLogger } from '@utils/logger-builder';
import { getItem, removeItem, setItem } from '@utils/session-storage';

// types
import type { GlobalVariableStore } from '@/types';

type VariablesMap = Record<string, unknown>;

// ----------------------------------------

const logger = createFeatureLogger('global-variables', 'GlobalVariableProvider');
const GLOBAL_VARIABLES_STORAGE_KEY = 'aqs:global-variables';

interface GlobalVariableState {
    variables: Record<string, unknown>;
}

const { Provider, useStore } = createStore<GlobalVariableState>({
    variables: {},
});

// ----------------------------------------

interface GlobalVariableProviderContentProps extends PropsWithChildren {
    children: React.ReactNode;
}

const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {
    const [variables, setStore] = useStore((store) => store.variables);
    const isHydratedRef = useRef(false);

    // Hydrate persisted variables once on provider mount
    useEffect(() => {
        const persisted = getItem<Record<string, unknown>>(GLOBAL_VARIABLES_STORAGE_KEY, {});
        if (persisted && Object.keys(persisted).length > 0) {
            setStore({ variables: persisted });

            logger.debug('Hydrated global variables from sessionStorage', {
                variableCount: Object.keys(persisted).length,
            });
        }
        isHydratedRef.current = true;
    }, [setStore]);

    // Persist variables whenever they change after hydration
    // TODO ⟪missing lines 52-53 — not captured in photos⟫
    useEffect(() => {
        // TODO ⟪missing line 55 — not captured in photos⟫
        if (Object.keys(variables).length === 0) {
            const isRemoved = removeItem(GLOBAL_VARIABLES_STORAGE_KEY);
            if (!isRemoved) {
                logger.warn('Failed to persist global variables to sessionStorage', {
                    operation: 'remove',
                });
            }
            return;
        }

        // TODO ⟪missing lines 66-68 — not captured in photos⟫
        const isSaved = setItem(GLOBAL_VARIABLES_STORAGE_KEY, variables);
        if (!isSaved) {
            logger.warn('Failed to persist global variables to sessionStorage', {
                operation: 'set',
            });
        }
    }, [variables]);

    return <>{children}</>;
};

// ----------------------------------------

const GlobalVariableProvider = ({ children }: PropsWithChildren) => {
    return (
        <Provider>
            <GlobalVariableProviderContent>{children}</GlobalVariableProviderContent>
        </Provider>
    );
};

/**
 * Hook for reading and mutating legacy global variables.
 * Supports dynamic names like mstrPolicyID and GlobalVars.mblnPolicyRated.
 *
 * IMPORTANT: `getVariable` and `getAllVariables` read from a synchronous ref
 * so that values set via `setVariable` are visible within the same execution
 * frame (e.g., sequential browser-command processing). Without the ref,
 * React's batched state updates would cause stale-closure reads.
 */
export function useGlobalVariableStore(): GlobalVariableStore {
    const [variables, setStore] = useStore((store) => store.variables);

    // Ref that is updated synchronously inside setVariable and via useEffect,
    // so that getVariable always returns the freshest value even before
    // React re-renders the component.
    const variablesRef = useRef<VariablesMap>(variables);

    // Sync ref whenever variables change (can't do this during render)
    useEffect(() => {
        variablesRef.current = variables;
    }, [variables]);

    const setVariable = useCallback(
        (name: string, value: unknown) => {
            if (!name || name.trim() === '') {
                logger.warn('Ignoring SET_VARIABLE with empty variable name');
                return;
            }

            // Use functional update so concurrent SET_VARIABLE calls merge with the freshest state.
            setStore((prevStore) => {
                const updated: VariablesMap = { ...prevStore.variables, [name]: value };
                // Synchronously update the ref so that subsequent getVariable calls
                // within the same execution frame see the new value.
                variablesRef.current = updated;
                return { variables: updated };
            });
        },
        [setStore],
    );

    const getVariable = useCallback(
        <T = unknown,>(name: string): T | undefined => {
            if (!name) {
                return undefined;
            }
            // Read from ref for synchronous freshness (avoids stale closure).
            return variablesRef.current[name] as T | undefined;
        },
        [], // Stable reference – reads from ref, not from closed-over state
    );

    const getAllVariables = useCallback((): Record<string, unknown> => {
        return { ...variablesRef.current };
    }, []);

    const clearVariables = useCallback(() => {
        variablesRef.current = {};
        setStore({ variables: {} });
    }, [setStore]);

    // The returned object is stable (depends only on stable callbacks) so that
    // consumers like CommandHandlerBuilder don't needlessly rebuild.
    return useMemo(
        () => ({
            variables,
            setVariable,
            getVariable,
            getAllVariables,
            clearVariables,
        }),
        [variables, setVariable, getVariable, getAllVariables, clearVariables],
    );
}

export { GlobalVariableProvider };
