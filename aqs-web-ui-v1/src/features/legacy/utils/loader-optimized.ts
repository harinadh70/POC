import { redirect } from 'react-router';
import { navigationContext } from '@/context';
import { createFeatureLogger } from '@utils/logger-builder';
import { fetchPageBuild } from '@features/dashboard/services/page-build';
import { normalizeServiceConfig } from '@utils/normalize-service-config';
import { getItem } from '@utils/local-storage';

// OPTIMIZATION: Simple in-memory cache for PageBuild responses
const pageBuildCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

import type { LoaderFunctionArgs } from 'react-router';
import type { SessionInfo } from '@features/auth/services/auth';

// Create logger for legacy loader
const logger = createFeatureLogger('legacy', 'loader');

/**
 * Optimized loader for legacy catch-all route
 *
 * Performance optimizations:
 * - PageBuild response caching
 * - Early returns for cached data
 * - Better error handling
 * - Conditional fetching based on context changes
 */
export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
	const navContext = context.get(navigationContext);
	const url = new URL(request.url);
	const currentPathname = url.pathname;

	logger.debug('Legacy loader called', {
		currentPathname,
		navReactRoute: navContext?.reactRoute,
		action: navContext?.action,
		nodeKey: navContext?.nodeKey,
	});

	// OPTIMIZATION 1: Redirect logic (unchanged but with better logging)
	if (navContext?.reactRoute && navContext.reactRoute !== currentPathname) {
		logger.info('Redirecting to computed reactRoute', {
			from: currentPathname,
			to: navContext.reactRoute,
		});
		throw redirect(navContext.reactRoute);
	}

	// OPTIMIZATION 2: Cache key based on context fingerprint
	const cacheKey = navContext ? `${navContext.xmlFileName}-${navContext.action}-${navContext.nodeKey}` : nu⟪?⟫
	const cached = cacheKey ? pageBuildCache.get(cacheKey) : null;
	const isCacheValid = cached && (Date.now() - cached.timestamp) < CACHE_TTL_MS;

	if (isCacheValid) {
		logger.debug('Using cached PageBuild data', { cacheKey });
		return {
			browserCommands: navContext?.browserCommands || [],
			fileName: navContext?.fileName,
			reactRoute: navContext?.reactRoute,
			xmlFileName: navContext?.xmlFileName,
			xmlDetail: navContext?.xmlDetail,
			frame: navContext?.frame,
			normalizedFields: normalizeServiceConfig(cached.data),
			pageBuildData: cached.data,
			fromCache: true,
		};
	}

	// OPTIMIZATION 3: Conditional PageBuild fetching
	let normalizedFields = [];
	let pageBuildData = null;

	if (navContext?.xmlFileName && navContext?.xmlDetail) {
		try {
			const sessionInfo = getItem<SessionInfo>('sessionInformation');
			if (!sessionInfo) {
				logger.error('Session information not found for PageBuild');
				return createErrorResponse(navContext, 'Session information not found');
			}

			logger.debug('Fetching PageBuild data', {
				xmlFileName: navContext.xmlFileName,
				action: navContext.action,
				nodeKey: navContext.nodeKey,
			});

			pageBuildData = await fetchPageBuild({
				sessionInfo,
				action: navContext.action || 'MAIN',
				nodeKey: navContext.nodeKey || '',
				xmlFileName: navContext.xmlFileName,
			});

			normalizedFields = normalizeServiceConfig(pageBuildData);

			// Cache successful responses
			if (pageBuildData && cacheKey) {
				pageBuildCache.set(cacheKey, { data: pageBuildData, timestamp: Date.now() });
				logger.debug('Cached PageBuild response', { cacheKey });
			}

			logger.info('PageBuild fetched and normalized', {
				fieldCount: normalizedFields.length,
				xmlFileName: navContext.xmlFileName,
			});
		} catch (error) {
			logger.error('Failed to fetch PageBuild', error as Error, {
				xmlFileName: navContext.xmlFileName,
			});
			// Continue with empty fields for graceful degradation
		}
	}

	return {
		browserCommands: navContext?.browserCommands || [],
		fileName: navContext?.fileName,
		reactRoute: navContext?.reactRoute,
		xmlFileName: navContext?.xmlFileName,
		xmlDetail: navContext?.xmlDetail,
		frame: navContext?.frame,
		normalizedFields,
		pageBuildData,
		fromCache: false,
	};
}

function createErrorResponse(navContext: any, error: string) {
	return {
		browserCommands: navContext?.browserCommands || [],
		fileName: navContext?.fileName,
		reactRoute: navContext?.reactRoute,
		xmlFileName: navContext?.xmlFileName,
		xmlDetail: navContext?.xmlDetail,
		frame: navContext?.frame,
		normalizedFields: [],
		error,
	};
}
