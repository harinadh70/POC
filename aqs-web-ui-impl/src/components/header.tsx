import { useLocation, useLoaderData, useSubmit, useNavigate } from 'react-router';
import { Button, Typography } from '@mui/material';
import { Menus } from '@/resources/menu';

// assets
import logo from '@images/brand-logo.png';

// icons
import { Logout } from '@mui/icons-material';

// types
import type { ClientRootLoader } from '@features/root/utils/loader';

// VBS gap addressed:
// GAP 7: Menu timing update — lines 374-379
// After page load, update menu bar's timing display.
// VBS: If mobjMenuFrame.mblnPageReady Then mobjMenuFrame.UpdateInfo()

import { usePageLoadTiming } from '@/hooks/use-page-load-timing';

function Header() {
    const location = useLocation();
    const submit = useSubmit();
    const navigate = useNavigate();
    const loaderData = useLoaderData<ClientRootLoader>();
    const timing = usePageLoadTiming();

    const isLoginPage = location.pathname === '/login';
    const isLoggedIn = loaderData.isAuthenticated && !isLoginPage;

    const handleLogout = () => {
        void submit(null, { method: 'post', action: '/logout' });
    };

    const handleCancel = () => navigate('/', { replace: true });

    return (
        <header className="flex h-15 items-center justify-between px-8 bg-white relative z-10 shadow-xl">
            <div className="flex items-center gap-4">
                <img src={logo} alt="AQS Logo" className="w-36 cursor-pointer" />
                {isLoggedIn ? <Menus /> : null}
            </div>
            <div className="flex items-center gap-2">
                {/* GAP 7: Show page load timing when available */}
                {isLoggedIn && timing !== null && (
                    <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', mr: 2, fontFamily: 'monospace' }}
                    >
                        {timing}ms
                    </Typography>
                )}
                {isLoggedIn ? (
                    <Button
                        data-testid="logout-btn"
                        variant="contained"
                        startIcon={<Logout />}
                        className="rounded-2xl! px-7! py-1! capitalize!"
                        sx={{
                            backgroundColor: '#07255E',
                            '&:hover': {
                                backgroundColor: '#0092cc',
                                boxShadow: 'none',
                            },
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button
                            data-testid="cancel-btn"
                            variant="contained"
                            className="rounded-2xl! px-7! py-1! capitalize! bg-[#07255E]!"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}

export { Header };
