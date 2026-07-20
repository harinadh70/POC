// COMPLETE REFERENCE — src/features/frame/components/static-renderer.tsx
// Contains ALL changes: usePageInit (GAP 1+2), Breadcrumb (GAP 3),
// pristine captureAll (shell #77). Change blocks are marked >>> GAP.
// If your branch's renderer has extra logic not shown here, lift the
// marked blocks into YOUR file instead of replacing wholesale.

import { useEffect, useMemo, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';

// components
import { FormRenderer } from '@components/ui/form-renderer';
import { Breadcrumb } from '@/components/breadcrumb';
import { RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';
import { PristineStoreApi } from '@/stores/pristine-store';

// contexts
import { HandlersProvider } from '@/contexts/handlers-context';

// hooks
import { usePageInit } from '@/hooks/use-page-init';

// utils
import { mergeSchemaWithLayout, buildDefaultValues } from '@utils/schema-merger';
import { buildLayoutTree } from '@utils/layout-tree-builder';

// types
import type { ClientStaticLoader } from '../utils/loader';
import type { FormLayoutNode } from '@/types/layout';

// ------------------------------------------------

function StaticRenderer() {
    const loaderData = useLoaderData<ClientStaticLoader>();

    useEffect(() => {
        return () => {
            RuntimeOverrideStoreApi.getState().actions.clearAll();
        };
    }, []);

    // --- Path 1: hand-crafted .tsx frame component (e.g. Start page) ---
    if (loaderData.component?.default) {
        const FrameComponent = loaderData.component.default;
        return (
            <Box
                component={'main'}
                className="flex flex-col grow items-center justify-center bg-[#EEF9FF]! h-full"
            >
                <Box component={'section'} className="flex grow w-full">
                    <FrameComponent />
                </Box>
            </Box>
        );
    }

    // --- Path 2: JSON schema-driven rendering ---
    if (loaderData.schema) {
        return (
            <HandlersProvider handlers={loaderData.handlers}>
                <SchemaRenderer />
            </HandlersProvider>
        );
    }

    // --- Fallback: no component and no schema ---
    return (
        <Box
            component={'main'}
            className="flex flex-col grow items-center justify-center px-10! py-10! bg-[#EEF9FF]! h-full"
        >
            <Box component={'section'} className="flex grow w-full">
                <Alert severity="warning">
                    <AlertTitle>No Frame Component</AlertTitle>
                    <Typography variant="body2">
                        Frame has no component module configured.
                    </Typography>
                </Alert>
            </Box>
        </Box>
    );
}

function SchemaRenderer() {
    const loaderData = useLoaderData<ClientStaticLoader>();
    const isFirstRender = useRef(true);

    const controls = useMemo(
        () => loaderData.layout?.controls ?? [],
        [loaderData.layout?.controls],
    );

    const schema = loaderData.schema;

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

    // >>> GAP: breadcrumb / path label (window_onload GAP 3)
    const pathStart = schema?.pageHeader?.pathstart as number | string | undefined;
    const pathEnd = schema?.pageHeader?.pathend as number | string | undefined;
    const hasPathLabelControl = useMemo(
        () => mergedFields.some((f) => f.matchcode?.toLowerCase() === 'pathlabel'),
        [mergedFields],
    );
    // <<< GAP

    return (
        <Box component="main" className="flex flex-col grow bg-[#EEF9FF]! h-full">
            {/* >>> GAP: breadcrumb element */}
            <Breadcrumb
                pathStart={pathStart}
                pathEnd={pathEnd}
                hasPathLabelControl={hasPathLabelControl}
            />
            {/* <<< GAP */}
            <Box component="section" className="flex grow w-full overflow-auto">
                <FormRenderer
                    layoutNode={layoutNode as FormLayoutNode}
                    defaultValues={defaultValues}
                    context={loaderData.context}
                    schema={schema}
                />
            </Box>
        </Box>
    );
}

export { StaticRenderer };
export default StaticRenderer;
