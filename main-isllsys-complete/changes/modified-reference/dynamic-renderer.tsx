// COMPLETE REFERENCE — src/features/frame/components/dynamic-renderer.tsx
// Contains ALL changes: usePageInit (GAP 1+2), pristine captureAll (#77).
// Change blocks are marked >>> GAP. No breadcrumb here — dynamic pages
// don't use path labels.

import { useEffect, useMemo, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { Box } from '@mui/material';

// contexts
import { HandlersProvider } from '@/contexts/handlers-context';

// hooks
import { usePageInit } from '@/hooks/use-page-init';

// utils
import { buildDynamicSchema } from '@utils/dynamic-schema-builder';
import { mergeSchemaWithLayout, buildDefaultValues } from '@utils/schema-merger';
import { buildLayoutTree } from '@utils/layout-tree-builder';

// components
import { FormRenderer } from '@components/ui/form-renderer';
import { RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';
import { PristineStoreApi } from '@/stores/pristine-store';

// types
import type { ClientDynamicLoader } from '../utils/loader';
import type { FormLayoutNode } from '@/types/layout';

// -----------------------------------------------------------------------

function DynamicRenderer() {
    const loaderData = useLoaderData<ClientDynamicLoader>();
    const isFirstRender = useRef(true);

    useEffect(() => {
        return () => {
            RuntimeOverrideStoreApi.getState().actions.clearAll();
        };
    }, []);

    const controls = useMemo(
        () => loaderData.layout?.controls ?? [],
        [loaderData.layout?.controls],
    );

    const schema = useMemo(
        () => buildDynamicSchema(controls, loaderData.aspFileName),
        [controls, loaderData.aspFileName],
    );

    // >>> GAP: window_onload rules (dataChanged init + ShowNextOnEdit)
    const showNextOnEdit = schema?.pageHeader?.showNextOnEdit as string | undefined;
    usePageInit(showNextOnEdit, schema);
    // <<< GAP

    // Lifecycle: onMount / onUnmount
    useEffect(() => {
        if (schema?.lifecycle?.onMount) {
            void window.frameHandlerRegistry.call(schema.lifecycle.onMount, {
                context: loaderData.context,
                schema,
                commands: [],
            });
        }

        return () => {
            if (schema?.lifecycle?.onUnmount) {
                void window.frameHandlerRegistry.call(schema.lifecycle.onUnmount, {
                    context: loaderData.context,
                    schema,
                    commands: [],
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schema]);

    // Lifecycle: onUpdate
    useEffect(() => {
        const onUpdate = schema?.lifecycle?.onUpdate;
        if (onUpdate) {
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }
            void window.frameHandlerRegistry.call(onUpdate, {
                context: loaderData.context,
                schema,
                commands: [],
            });
        }
    }, [schema, loaderData.context]);

    const { mergedFields } = useMemo(
        () => mergeSchemaWithLayout(schema, controls),
        [schema, controls],
    );

    const layoutNode = useMemo(
        () => buildLayoutTree(schema, mergedFields),
        [schema, mergedFields],
    );

    const defaultValues = useMemo(
        () => buildDefaultValues(mergedFields),
        [mergedFields],
    );

    // >>> GAP: pristine baseline capture (shell #77 — dirty tracking)
    useEffect(() => {
        PristineStoreApi.getState().actions.captureAll(defaultValues);
    }, [defaultValues]);
    // <<< GAP

    return (
        <HandlersProvider handlers={loaderData.handlers}>
            <Box component="main" className="flex flex-col grow bg-[#EEF9FF]! h-full">
                <Box component="section" className="flex grow w-full overflow-auto">
                    <FormRenderer
                        layoutNode={layoutNode as FormLayoutNode}
                        defaultValues={defaultValues}
                        context={loaderData.context}
                        schema={schema}
                    />
                </Box>
            </Box>
        </HandlersProvider>
    );
}

export { DynamicRenderer };
export default DynamicRenderer;
