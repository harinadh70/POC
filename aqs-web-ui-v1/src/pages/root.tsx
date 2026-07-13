import { useEffect } from 'react';
import { Outlet, useNavigate, useLoaderData, useLocation } from 'react-router';
import { Header } from '@components/header';
import { Footer } from '@components/footer';
import { SubHeader } from '@components/sub-header';
import { FormProvider } from '@providers/form-provider';
import { DialogProvider } from '@providers/dialog-provider';
import { BrowserCommandsProvider } from '@providers/browser-commands-provider';
import { ThemeProvider } from '@providers/theme-provider';

// utils
import isEmpty from 'lodash-es/isEmpty';

// ----------------------------------------
// Type Definitions
// ----------------------------------------

/**
 * Menu information from MENU action response
 * CRITICAL: MENU response contains header navigation data (frame="MENU")
 * NOT a navigable page route. Only menus array and queryString are relevant.
 */
interface MenuInfo {
    menus: unknown[];
    queryString?: string;
}

/**
 * Root loader data structure
 */
interface RootLoaderData {
    userInfo?: {
        userId?: string;
    };
    menuInfo?: MenuInfo;
}
// ----------------------------------------------
// Root Layout Component
⟪?⟫
⟪?⟫
⟪?⟫
/**
 * This is the main layout wrapper for the entire application.
 * It establishes the provider hierarchy and renders the common UI shell (Header/Footer).
 *
 * Provider Hierarchy (order is critical due to dependencies):
 *
 * 1. FormProvider
 *    - Manages dynamic form state for XML-driven forms
 *    - Provides form field values, errors, and update methods
 *    - NOW INCLUDES: Field metadata (disabled, visible, readOnly, required) from browser commands
 *    - Used by: BrowserCommandsProvider (SET_TEXT, SET_DISABLED commands), form components
 *    - Store: { values, errors, touched, isSubmitting, fieldMetadata }
 *
 * 2. DialogProvider
 *    - Manages application-wide dialog state (modals, alerts, confirmations)
 *    - Provides methods to open/close dialogs with different types (ok, yesno, yesnocancel)
 *    - Used by: BrowserCommandsProvider (SHOW_MESSAGE commands), error boundaries
 *    - Store: { open: boolean, message: ReactNode, dialogType, messageType, callbacks }
 *
 * 3. BrowserCommandsProvider
 *    - Interprets and executes server browser-commands from XML responses
 *    - Depends on: FormProvider (for SET_TEXT, SET_DISABLED, etc.), DialogProvider (for SHOW_MESSAGE),
 *      and app-level GlobalVariableProvider (for SET_VARIABLE)
 *    - Depends on: Router context (for NAVIGATE commands via useNavigate)
 *    - Handles commands: SET_TEXT, LOAD_COMBO, NAVIGATE, SHOW_MESSAGE, SET_DISABLED, etc.
 *    - Store: { commands, executedCommands, pendingCommands, isExecuting }
 *
 * Why This Order?
 *    - FormProvider and DialogProvider are independent (no dependencies on each other)
 *    - BrowserCommandsProvider depends on Form and Dialog stores in this layout
 *    - GlobalVariableProvider is mounted at app level and is shared across routes
 *    - All providers must be INSIDE RouterProvider to use Router hooks (useNavigate, useLocation)
 *    - This structure is defined in Root (not App.tsx) so providers are within Router context
 *
 * Layout Structure:
 * - Header: Top navigation bar with menu (uses sessionInformation from localStorage)
 * - Outlet: React Router renders child route components here
 * - Footer: Bottom copyright/info bar
 */
export default function Root() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo, menuInfo } = useLoaderData<RootLoaderData>();

    /**
     * Cascading navigation pattern (mimics legacy LoadNextPage callback)
     *
     * After MENU loads successfully, automatically navigate to dashboard.
     * This creates TWO separate navigation events:
     * 1. Navigate to '/' → action='MENU' → load menu data (frame="MENU" - header navigation)
     * 2. Navigate to '/Main_ISLLSYS_20010101' → action='MAIN' → load dashboard page (frame="MAIN")
     *
     * CRITICAL: MENU response has frame="MENU" (not a page, just menu data for header)
     *           MAIN response has frame="MAIN" and the actual page FileName
     *
     * Landing Route:
     * - ALWAYS navigate to hardcoded '/Main_ISLLSYS_20010101'
     * - MENU response does NOT contain navigable page information
     * - Dynamic routing happens AFTER MAIN action in Dashboard component
     *
     * Matches legacy:
     * - ExecuteAction("MENU") → menu loads → LoadNextPage() fires
     * - LoadNextPage() → ExecuteAction(mstrAction="MAIN") → loads Main_ISLLSYS_20010101.asp
     */
    useEffect(() => {
        // Only trigger if:
        // 1. Currently on root path (not already on dashboard)
        // 2. Menu has loaded successfully (menuInfo exists)
        // 3. User is authenticated (userInfo exists)
        if (location.pathname === '/' && menuInfo && userInfo?.userId) {
            console.log('[Root] MENU loaded - cascading to dashboard (mimics LoadNextPage)');
            // Always navigate to hardcoded dashboard route
            // MENU response doesn't contain page FileName (it's frame data, not route data)
            navigate('/Main_ISLLSYS_20010101', {
                replace: true, // Replace history to avoid back button issues
            });
        }
    }, [location.pathname, menuInfo, userInfo, navigate]);

    return (
        <ThemeProvider>
            <FormProvider>
                <DialogProvider>
                    <BrowserCommandsProvider>
                        <Header />
                        {!isEmpty(menuInfo) ? <SubHeader /> : null}
                        <Outlet />
                        <Footer />
                    </BrowserCommandsProvider>
                </DialogProvider>
            </FormProvider>
        </ThemeProvider>
    );
}
