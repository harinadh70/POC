import { useRouteLoaderData } from 'react-router';
import { isActionAllowed as checkActionAllowed } from '@utils/check-action-permission';
import type { DashboardLoaderData } from '@features/dashboard/utils/loader';

/**
 * React hook for checking action permissions in components.
 *
 * This hook reads permissions from the dashboard route loader via
 * `useRouteLoaderData('dashboard')`, using React Router's native data flow.
 *
 * @remarks
 * This removes the need for a dedicated permissions provider and keeps
 * authorization state co-located with route loader data.
 */
export function useActionGuard() {
  const loaderData = useRouteLoaderData<DashboardLoaderData>('dashboard');
  const permissions = loaderData?.permissions ?? null;

  const isActionAllowed = (action: string): boolean => {
    return checkActionAllowed(action, permissions);
  };

  return {
    isActionAllowed,
    permissions,
  };
}
