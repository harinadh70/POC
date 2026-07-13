import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';

/**
 * AppLayout — the shell (SDD §2.2): AppBar header + brand + user + logout,
 * with the routed page rendered in the Outlet. Guards auth.
 */
export function AppLayout() {
  const isAuth = useAuthStore((s) => s.isAuthenticated);
  const session = useAuthStore((s) => s.session);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  if (!isAuth) return <Navigate to="/login" replace />;

  return (
    <Box sx={{ minHeight: '100%', bgcolor: 'background.default' }}>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer', fontWeight: 800, letterSpacing: '-0.02em' }}
            onClick={() => navigate('/dashboard')}
          >
            AQS Portal
          </Typography>
          <Chip
            label="React POC"
            size="small"
            sx={{ ml: 1.5, bgcolor: 'rgba(255,255,255,0.16)', color: '#fff', fontFamily: 'monospace' }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" sx={{ mr: 2, opacity: 0.9 }}>
            {session?.userId} · {session?.compLoc}
          </Typography>
          <Button color="inherit" size="small" onClick={() => { logout(); navigate('/login'); }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
