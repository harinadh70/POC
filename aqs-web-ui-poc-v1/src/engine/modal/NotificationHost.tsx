import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useBrowserCommandStore } from '@/stores/browser-command-store';

/**
 * NotificationHost — renders the DISPLAY_* commands the backend sends
 * (error/warning/message/information) as MUI Alerts. Mounted once at app root.
 */
export function NotificationHost() {
  const notifications = useBrowserCommandStore((s) => s.notifications);
  const dismiss = useBrowserCommandStore((s) => s.dismiss);

  return (
    <Snackbar open={notifications.length > 0} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Stack spacing={1}>
        {notifications.map((n) => (
          <Alert key={n.id} severity={n.severity} onClose={() => dismiss(n.id)} variant="filled">
            {n.message}
          </Alert>
        ))}
      </Stack>
    </Snackbar>
  );
}
