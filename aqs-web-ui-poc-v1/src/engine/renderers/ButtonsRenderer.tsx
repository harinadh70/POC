import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { ControlDef } from '@/types';
import { useAuthStore } from '@/stores/auth-store';
import { executeAction } from '@/engine/commands/execute-action';
import { useNavigate } from 'react-router-dom';
import { pageIdToPath } from '@/config/routes';

/**
 * ButtonsRenderer — renders page action buttons and routes clicks through
 * executeAction. Button styling by matchcode/action mirrors the reconstructed
 * action-buttons component (ADD/EDIT/DELETE vs OK/SUBMIT vs CANCEL).
 */
function variantFor(action?: string): 'contained' | 'outlined' | 'text' {
  const a = (action ?? '').toUpperCase();
  if (['SAVE', 'SUBMIT', 'OK', 'NEXT'].some((k) => a.includes(k))) return 'contained';
  if (['CANCEL', 'CLOSE', 'BACK'].some((k) => a.includes(k))) return 'text';
  return 'outlined';
}

export function ButtonsRenderer({ actions }: { actions: ControlDef[] }) {
  const session = useAuthStore((s) => s.session);
  const navigate = useNavigate();

  const nav = (pageId: string) => navigate(pageIdToPath(pageId, session?.lob ?? 'POL'));

  return (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
      {actions.map((a) => (
        <Button
          key={a.matchcode}
          variant={variantFor(a.action)}
          color={variantFor(a.action) === 'text' ? 'inherit' : 'primary'}
          onClick={() => {
            if (!session) return;
            void executeAction(
              { session, matchcode: a.matchcode, action: a.action, value: undefined },
              nav,
            );
          }}
        >
          {a.label ?? a.matchcode}
        </Button>
      ))}
    </Stack>
  );
}
