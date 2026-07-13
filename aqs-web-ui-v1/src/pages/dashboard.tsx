import { useLoaderData, useRouteLoaderData, useLocation } from 'react-router';
import { Button, Typography } from '@mui/material';
import PolicyInformation from '@/features/policy/components/PolicyInformation';
import { TabContextProvider } from '@providers/tab-context-provider';

// hooks
import { useBrowserCommands } from '@/hooks/use-browser-commands';
import { useSmartNavigation } from '@hooks/use-smart-navigation';

// types
import type { BrowserCommand } from '@/types';
import type { SessionInfo } from '@/features/auth/services/auth';

// assets
import icn1 from '@svgs/icon1.svg';
import icn2 from '@svgs/icon2.svg';
import icn3 from '@svgs/icon3.svg';
import icn4 from '@svgs/icon4.svg';

// ------------------------------------------

type LoaderData = {
    userInfo: SessionInfo | null;
    // Browser commands from cycling API (via dataStrategy -> loader)
    browserCommands: BrowserCommand[];
};

type RootLoaderData = {
    permissionInfo: Record<string, unknown> | null;
};

// ------------------------------------------

export default function Dashboard() {
    const { userInfo, browserCommands } = useLoaderData() as LoaderData;
    const rootData = useRouteLoaderData('root') as RootLoaderData;
    const permissionInfo = rootData?.permissionInfo;
    const location = useLocation();
    const { smartNavigate } = useSmartNavigation();

    // permissionInfo is now available from root loader for permission-based rendering
    console.log('[DASHBOARD] Permission info from root:', { hasPermissionInfo: !!permissionInfo });

    // Apply browser commands from server (auto-executes on mount/update)
    useBrowserCommands(browserCommands);

    const handlePageNavigation = () => {
        console.log('[DASHBOARD] New Policy button clicked', {
            action: 'STARTOPTIONS',
            frame: 'MODAL',
        });
        smartNavigate(location.pathname, {
            action: 'STARTOPTIONS',
            nodeKey: userInfo?.nodeKey ?? null,
            frame: 'MODAL',
            policyId: userInfo?.policyId ?? '0',
            forceNavigate: false,
            xmlDetail:
                '<items><item name="newpolicytransaction" value="QUOTE"/><item name="transactionid" value="1" ⟪?⟫
        });
        // Determine which view to render (frame param)
        const searchParams = new URLSearchParams(location.search);
        const frame = searchParams.get('frame');

        // Render PolicyInformation tabs for frame === 'main', keep all other dashboard logic unchanged
        // TODO ⟪missing lines — ghosted/unaccepted-suggestion overlay in photos (IMG_2889) obscured this area; exact content/line count between the comment above and the `if` below is uncertain, not captured cleanly in any photo⟫
        if (frame === 'main') {
            return (
                <TabContextProvider>
                    <PolicyInformation />
                </TabContextProvider>
            );
        }
        // ...existing dashboard UI remains unchanged...
        return (
            <>
                {/*
                    Dashboard is currently configured as a leaf route in src/routes.tsx.
                    No child routes are registered under 'Main_ISLLSYS_20010101', so an Outlet
                    is intentionally omitted until nested dashboard routes are introduced
                */}
                <main className=" h-[calc(100vh-122px)]! grid items-center pt-11">
                    {/* TODO ⟪missing line — photos (IMG_2894) show an extra unmatched closing </div> before </main> below, implying an uncaptured wrapper <div> opens here; not reconstructed to avoid fabricating code⟫ */}
                    <div className="grid grid-cols-1 justify-center items-center">
                        <p className="text-[#0A2C6E] text-center w-full text-[1rem]! font-semibold!">
                            Welcome to
                        </p>
                        <p className="text-[#0A2C6E] text-center w-full text-[2.25rem]! font-bold! mb-10!">
                            AQS/advantage
                        </p>
                    </div>
                    <div className="grid grid-cols-3 grid-flow-col justify-center max-w-[50%]! m-auto! gap-4 ⟪?⟫">
                        <div>
                            <Button
                                variant="contained"
                                className="p-4! flex flex-col shadow-none!"
                                sx={{ bgcolor: '#fff' }}
                                onClick={handlePageNavigation}
                            >
                                <img src={icn1} alt="icn1" className=" dashIcon" />
                                <Typography className="dashMenu">New Policy</Typography>

                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                className="p-4! flex flex-col shadow-none!"
                                sx={{ bgcolor: '#fff' }}
                            >
                                <img src={icn2} alt="icn2" className="dashIcon" />
                                <Typography className="dashMenu">Work In Process</Typography>
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                className="p-4! flex flex-col shadow-none! transition-opacity duration-200 ho⟪?⟫"
                                sx={{ bgcolor: '#fff' }}
                            >
                                <img src={icn3} alt="icn3" className="dashIcon" />
                                <Typography className="dashMenu">All Policies</Typography>
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                className="p-4! flex flex-col shadow-none! transition-opacity duration-200 ho⟪?⟫"
                                sx={{ bgcolor: '#fff' }}
                            >
                                <img src={icn4} alt="icn4" className="dashIcon" />
                                <Typography className="dashMenu">Online Print</Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
