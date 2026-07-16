import { useEffect, useMemo, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';

// components
import { FormRenderer } from '@components/ui/form-renderer';
import { Breadcrumb } from '@components/breadcrumb';
import { RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';

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

    // Loader returns a fresh schema object per navigation — its identity is
    // the page identity, so it doubles as the pageKey for usePageInit.
    const schema = loaderData.schema;

    // --- GAP 1 + GAP 2: Data-changed init + ShowNextOnEdit ---
    const showNextOnEdit = schema?.pageHeader?.showNextOnEdit as string | undefined;
    usePageInit(showNextOnEdit, schema);

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

    // --- GAP 3: Breadcrumb / path label ---
    // Schema values may be strings — Breadcrumb normalizes them.
    const pathStart = schema?.pageHeader?.pathstart as number | string | undefined;
    const pathEnd = schema?.pageHeader?.pathend as number | string | undefined;
    const hasPathLabelControl = useMemo(
        () => mergedFields.some((f) => f.matchcode?.toLowerCase() === 'pathlabel'),
        [mergedFields],
    );

    return (
        <Box component="main" className="flex flex-col grow bg-[#EEF9FF]! h-full">
            {/* GAP 3: Breadcrumb rendered above form when schema defines pathstart/pathend */}
            <Breadcrumb
                pathStart={pathStart}
                pathEnd={pathEnd}
                hasPathLabelControl={hasPathLabelControl}
            />
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

export default StaticRenderer;
