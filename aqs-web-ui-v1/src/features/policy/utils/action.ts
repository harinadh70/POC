import { redirect } from 'react-router';
import { createFeatureLogger } from '@utils/logger-builder';
import { getItem } from '@utils/local-storage';
import { readContextFromStorage, syncContextToStorage } from '@utils/session-sync';
import {
    createInitialNavigationContext,
    mergeNavigationContext,
    type NavigationContextValue,
} from '@/context';

import type { ActionFunctionArgs } from 'react-router';
import type { SessionInfo } from '@features/auth/services/auth';
import type { ActionType } from '@/types';

const logger = createFeatureLogger('policy', 'policy-navigation-action');

interface SubmittedNavigationContext {
    action?: string;
    policyId?: string;
    nodeKey?: string;
    userId?: string;
    compLoc?: string;
    xmlDetail?: unknown;
    xmlFileName?: string;
    xmlFilePath?: string;
    tabFileName?: string;
    tabFilePath?: string;
    xmlListFileName?: string;
    xmlListFilePath?: string;
}

interface SubmittedNavigationPayload {
    navData?: Record<string, unknown>;
    sourceContext?: SubmittedNavigationContext; ⟪?⟫
