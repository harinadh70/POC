import { redirect } from 'react-router';
import { navigationContext } from '@/context';
import { createFeatureLogger } from '@utils/logger-builder';
import { fetchPageBuild } from '@features/dashboard/services/page-build';
import { normalizeServiceConfig } from '@utils/normalize-service-config';
import { getItem } from '@utils/local-storage';

import type { LoaderFunctionArgs } from 'react-router';
import type { SessionInfo } from '@features/auth/services/auth';

// Create logger for legacy loader
const logger = createFeatureLogger('legacy', 'loader');

/**
 * Loader for legacy catch-all route
 *
 * Handles dynamic rendering of legacy ASP pages via PageBuild + FormRenderer.
 * Includes redirect logic to ensure navigation to computed reactRoute.
 */
export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
    const navContext = context.get(navigationContext);
    const url = new URL(request.url);
    const currentPathname = url.pathname;

    logger.info('Legacy loader called', {
        currentPathname,
        navReactRoute: navContext?.reactRoute,
        action: navContext?.action,
        nodeKey: navContext?.nodeKey,
    });

    // Step 1: Check for redirect to computed reactRoute
    if (navContext?.reactRoute && navContext.reactRoute !== currentPathname) {
        logger.info('Redirecting to computed reactRoute', {
            from: currentPathname,
            to: navContext.reactRoute,
        });
        throw redirect(navContext.reactRoute);
    }

    // Step 2: Fetch PageBuild data if available
    let normalizedFields = [];
    let pageBuildData = null;

    if (navContext?.xmlFileName && navContext?.xmlDetail) {
        try {
            const sessionInfo = getItem<SessionInfo>('sessionInformation');
            if (!sessionInfo) {
                logger.error('Session information not found for PageBuild');
                return {
                    browserCommands: navContext.browserCommands || [],
                    fileName: navContext.fileName,
                    reactRoute: navContext.reactRoute,
                    xmlFileName: navContext.xmlFileName,
                    xmlDetail: navContext.xmlDetail,
                    frame: navContext.frame,
                    normalizedFields: [],
                    error: 'Session information not found',
                };
            }

            // Fetch PageBuild using current action/nodeKey from context
            pageBuildData = await fetchPageBuild({
                sessionInfo,
                action: navContext.action || 'MAIN',
                nodeKey: navContext.nodeKey || '',
                xmlFileName: navContext.xmlFileName,
                // xmlDetail: navContext.xmlDetail, // TODO: Parse XML string to object if needed
            });

            // Normalize fields for FormRenderer
            normalizedFields = normalizeServiceConfig(pageBuildData);

            logger.info('PageBuild fetched and normalized', {
                fieldCount: normalizedFields.length,
                xmlFileName: navContext.xmlFileName,
            });
        } catch (error) {
            logger.error('Failed to fetch PageBuild', error as Error, {
                xmlFileName: navContext.xmlFileName,
            });
            // Continue with empty fields - page can still render with commands
        }
    }

    // Step 3: Return loader data
    return {
        browserCommands: navContext?.browserCommands || [],
        fileName: navContext?.fileName,
        reactRoute: navContext?.reactRoute,
        xmlFileName: navContext?.xmlFileName,
        xmlDetail: navContext?.xmlDetail,
        frame: navContext?.frame,
        normalizedFields,
        pageBuildData,
    };
}
