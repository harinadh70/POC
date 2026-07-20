// COMPLETE REFERENCE — src/components/header.tsx
// Contains the timing display (window_onload GAP 7). Defensive build:
// dual exports (works with `import { Header }` AND `import Header`),
// optional-chained loader access (no crash on loader-shape drift).
//
// If the [1]/[2] imports error on your branch, delete that import line
// AND its matching [1]/[2] line in the JSX.

import { useLocation, useLoaderData, useSubmit, useNavigate } from 'react-router';
import { Button, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

import { usePageLoadTiming } from '@/hooks/use-page-load-timing';

import { Menus } from '@/resources/menu'; // [1]
import logo from '@images/brand-logo.png'; // [2]

function Header() {
    const location = useLocation();
    const submit = useSubmit();
    const navigate = useNavigate();
    const loaderData = useLoaderData() as { isAuthenticated?: boolean } | undefined;
    const timing = usePageLoadTiming();

    const isLoginPage = location.pathname === '/login';
    const isLoggedIn = Boolean(loaderData?.isAuthenticated) && !isLoginPage;

    const handleLogout = () => {
        void submit(null, { method: 'post', action: '/logout' });
    };

    const handleCancel = () => navigate('/', { replace: true });

    return (
        <header className="flex h-15 items-center justify-between px-8 bg-white relative z-10 shadow-xl">
            <div className="flex items-center gap-4">
                <img src={logo} alt="AQS Logo" className="w-36 cursor-pointer" /> {/* [2] */}
                {isLoggedIn ? <Menus /> : null} {/* [1] */}
            </div>
            <div className="flex items-center gap-2">
                {/* >>> GAP 7: page load timing display */}
                {isLoggedIn && timing !== null && (
                    <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', mr: 2, fontFamily: 'monospace' }}
                    >
                        {timing}ms
                    </Typography>
                )}
                {/* <<< GAP */}
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
                    <Button
                        data-testid="cancel-btn"
                        variant="contained"
                        className="rounded-2xl! px-7! py-1! capitalize! bg-[#07255E]!"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </header>
    );
}

export { Header };
export default Header;
