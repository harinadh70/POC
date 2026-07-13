import { useRouteError } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/**
 * RouteError — the route-level fallback UI (SDD §2.7). Any loader/render error
 * on a page is contained here instead of blanking the whole app.
 */
export function RouteError() {
  const error = useRouteError() as Error;
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', p: 4 }}>
      <Paper elevation={0} sx={{ p: 4, maxWidth: 520, border: '1px solid', borderColor: 'error.light', borderRadius: 2 }}>
        <Typography variant="h6" color="error" sx={{ mb: 1 }}>
          Something went wrong on this page
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {error?.message ?? 'Unknown error'}
        </Typography>
        <Button variant="outlined" onClick={() => (window.location.href = '/dashboard')}>
          Back to dashboard
        </Button>
      </Paper>
    </Box>
  );
}
