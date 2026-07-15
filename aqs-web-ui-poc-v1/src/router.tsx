import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout, shellLoader } from '@/shell/AppLayout';
import { RouteError } from '@/shell/ErrorBoundary';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { LobPage, lobPageLoader } from '@/pages/LobPage';

/**
 * Router (sprint task 10, SDD §4). The `lob/:lob/:pageId` route is the whole
 * point: ONE route + ONE loader serves every LOB and every page.
 */
export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <AppLayout />,
    loader: shellLoader,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'lob/:lob/:pageId',
        element: <LobPage />,
        loader: lobPageLoader,
        errorElement: <RouteError />,
      },
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
]);
