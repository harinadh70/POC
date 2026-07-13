import { lazy, Suspense } from 'react';
import { redirect } from 'react-router';
import { Loader } from '@components/loader';
import { GlobalErrorBoundary } from '@components/error-boundary';

// utils
import { clientRootLoader } from '@features/root/utils/loader';
import {
    hydrateNavigationContextMiddleware,
    rootMenuMiddleware,
} from '@features/root/utils/middleware';
import { clientLoginLoader } from '@features/auth/utils/loader';
import { clientLoginAction, clientLogoutAction } from '@features/auth/utils/action';
import { clientDashboardLoader } from '@features/dashboard/utils/loader';
import { dynamicFormLoader } from '@features/form/utils/dynamic-form-loader';
import { policyInformationLoader } from '@features/policy/utils/policyInformationLoader';
import { policyInformationAction } from '@features/policy/utils/action';
import { ultimateCoverLoader } from '@features/policy/utils/ultimateCoverLoader';
import { lobActionMenuLoader } from '@features/policy/utils/lobActionMenuLoader';
import { authMiddleware, permissionsMiddleware } from '@features/auth/middleware';
import { policyInfoSkipMiddleware } from '@features/policy/utils/middleware';
import { dashboardInitMiddleware } from '@features/dashboard/utils/middleware';

// pages
import Root from '@pages/root';

// types
import type { RouteObject } from 'react-router';

// ------------------------------------

const Login = lazy(() => import('@pages/login'));
const Dashboard = lazy(() => import('@pages/dashboard'));
const DynamicFormPage = lazy(() => import('@pages/dynamic-form-page'));
const PolicyInformationPage = lazy(() => import('@pages/PolicyInformationPage'));
const UltimateCoverPage = lazy(() => import('@pages/UltimateCoverPage'));
const LobActionMenuPage = lazy(() => import('@pages/lob-action-menu-page'));
const PageNotFound = lazy(() => import('@pages/page-not-found'));

// ------------------------------------

const routes: RouteObject[] = [
    {
        id: 'root',
        path: '/',
        Component: Root,
        HydrateFallback: Loader,
        loader: clientRootLoader,
        middleware: [hydrateNavigationContextMiddleware, rootMenuMiddleware],
        ErrorBoundary: GlobalErrorBoundary,
        children: [
            {
                path: 'login',
                loader: clientLoginLoader,
                action: clientLoginAction,
                element: (
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                id: 'dashboard',
                path: 'Main_ISLLSYS_20010101',
                loader: clientDashboardLoader,
                middleware: [
                    authMiddleware, // Must run first: ensures authenticated user/session context.
                    permissionsMiddleware, // Must run second: enforces page-level access for authenticated r⟪cut off at screen edge⟫
                    dashboardInitMiddleware, // Feature-specific initialization after auth/permissions pass.
                ],
                element: (
                    <Suspense fallback={<Loader />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                id: 'dynamic-form',
                path: 'form/:aspFileName/:policyId?',
                loader: dynamicFormLoader,
                middleware: [authMiddleware, permissionsMiddleware],
                element: (
                    <Suspense fallback={<Loader />}>
                        <DynamicFormPage />
                    </Suspense>
                ),
            },
            {
                path: 'policyinfo',
                loader: policyInformationLoader,
                action: policyInformationAction,
                middleware: [policyInfoSkipMiddleware, authMiddleware, permissionsMiddleware],
                element: (
                    <Suspense fallback={<Loader />}>
                        <PolicyInformationPage />
                    </Suspense>
                ),
            },
            {
                path: 'ultimate-cover',
                loader: ultimateCoverLoader,
                middleware: [authMiddleware, permissionsMiddleware],
                element: (
                    <Suspense fallback={<Loader />}>
                        <UltimateCoverPage />
                    </Suspense>
                ),
            },
            {
                path: 'lob-action-menu',
                loader: lobActionMenuLoader,
                middleware: [authMiddleware, permissionsMiddleware],
                element: (
                    <Suspense fallback={<Loader />}>
                        <LobActionMenuPage />
                    </Suspense>
                ),
            },
            {
                path: 'PageNotFound',
                element: (
                    <Suspense fallback={<Loader />}>
                        <PageNotFound />
                    </Suspense>
                ),
            },
            {
                path: 'logout',
                loader: () => redirect('/login'),
                action: clientLogoutAction,
            },
            {
                path: '*',
                element: (
                    <Suspense fallback={<Loader />}>
                        <PageNotFound />
                    </Suspense>
                ),
            },
        ],
    },
];

// ------------------------------------

export { routes };

