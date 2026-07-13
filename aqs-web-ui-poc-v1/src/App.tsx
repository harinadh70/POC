import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { theme } from '@/theme/theme';
import { router } from '@/router';
import { NotificationHost } from '@/engine/modal/NotificationHost';

/**
 * App root — theme + router + the global NotificationHost that renders
 * DISPLAY_* browser commands.
 */
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <NotificationHost />
    </ThemeProvider>
  );
}
