import { useRouteLoaderData, useSubmit, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

// utils
import isEmpty from 'lodash-es/isEmpty';

// assets
import logo from '@images/brandLogo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// ---------------------------------------

type RootLoaderData = {
    userInfo: string[] | undefined;
    menuInfo: Record<string, unknown> | undefined;
};

// ---------------------------------------

function Header() {
    const rootData = useRouteLoaderData('root') as RootLoaderData;
    const location = useLocation();
    const submit = useSubmit();
    const navigate = useNavigate();

    const isLoginPage = location.pathname === '/';
    const isLoggedIn = !isEmpty(rootData?.userInfo) && !isLoginPage;

    // Use menu data from API (via root loader) or fallback to empty array
    const menus = (rootData?.menuInfo?.menus as any[]) || [];

    // Menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
      setAnchorEl(event.currentTarget);
      setOpenMenu(menuName);
    };

    const handleClose = () => {
      setAnchorEl(null);
      setOpenMenu(null);
    };

    const handleMenuAction = (item: any) => {
      handleClose();

      if (item.action === 'SelectTab') {
        navigate(`/tab/${item.args}`);
      } else if (item.action === 'Logout') {
        navigate('/logout');
      } else if (item.action === 'OpenExternalLink') {
        window.open(item.args?.split('#')[0], '_blank');
      } else if (item.action === 'LaunchModal') {
        // modal logic here
      }
    };

    const handleCancel = () => navigate('/', { replace: true });
    const handleLogout = () => submit(null, { method: 'post', action: '/logout' });

    return (
        <Stack
            component={'header'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            height={60}
            className=" !px-8 bg-white shadow-xl! relative z-10"
        >
            {/* LEFT SIDE: LOGO */}
            <Stack direction={'row'} alignItems={'center'} gap={4}>
                <img src={logo} alt="Logo" className="!w-[170px]" />
                {isLoggedIn && menus && menus.length > 0 && (
                    <Stack direction="row" gap={2} alignItems="center">
                        {menus.map((menu: any) => (
                            <Box key={menu['@name']}>
                                <Button
                                    onClick={(e) => handleOpen(e, menu['@name'])}
                                    endIcon={<KeyboardArrowDownIcon />}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        color: '#0A2C6E',
                                        fontWeight: 500,
                                        whiteSpace: 'nowrap', // keep label on one line
                                        minWidth: 'fit-content',
                                        '&:hover, &.selected': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    {menu['@name']}
                                </Button>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={openMenu === menu['@name']}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    sx={{
                                        '& .MuiPaper-root': {
                                            borderRadius: '0px',
                                            boxShadow: 'none',
                                            border: '1px solid #0A2C6E',
                                            top: '60px !important',
                                            '& .MuiMenu-list': {
                                                padding: 0,
                                            },
                                        },
                                    }}
                                >
                                    {menu.item &&
                                        Array.isArray(menu.item) &&
                                        menu.item.filter(Boolean).map((item: any, idx: number) => (
                                            <MenuItem
                                                key={idx}
                                                onClick={() => handleMenuAction(item)}
                                                sx={{
                                                    borderRadius: '0px',
                                                    boxShadow: 'none',
                                                    fontSize: '0.9rem',
                                                    color: '#0A2C6E',
                                                    '&:hover': {
                                                        backgroundColor: '#004e9F',
                                                        boxShadow: 'none',
                                                        color: '#fff',
                                                        textDecoration: 'underline',
                                                    },
                                                }}
                                            >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                </Menu>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Stack>

            {/* RIGHT SIDE: MENUS + LOGOUT */}
            <Stack direction={'row'} gap={3} alignItems={'center'}>
                {/* Dynamic Menus from API */}

                {/* Logout / Cancel */}
                {isLoggedIn ? (
                    <Button
                        variant="tertiary"
                        className="rounded-none! px-7! py-4!    "
                        endIcon={<LogoutIcon />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button variant="primary" className="px-7! py-1!" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="secondary" className="px-7! py-1!">
                            Help
                        </Button>
                    </>
                )}
            </Stack>
        </Stack>
    );
}

// ------------------------------------------

export { Header };

