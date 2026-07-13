import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { LOB_REGISTRY, lobStats } from '@/lobs/registry';
import { policyEntryPoints } from '@/lobs/policy/policy-config';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Dashboard (sprint task 12) — the scale story, made visual.
 * 156 LOBs: one is active (Policy), the rest are config-ready placeholders that
 * onboard with a registry entry + config folder and zero engine changes.
 */
export function Dashboard() {
  const navigate = useNavigate();
  const setLob = useAuthStore((s) => s.session);
  const stats = lobStats();

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
        <Stat n={stats.total} label="Lines of Business" />
        <Stat n={stats.active} label="Active in POC" tone="success" />
        <Stat n={stats.configReady} label="Config-ready" tone="muted" />
        <Stat n={1} label="Shared engine" tone="primary" />
      </Stack>

      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Lines of Business
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        One engine renders every LOB. Onboarding the next one is configuration, not code.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3,1fr)', md: 'repeat(4,1fr)' },
          gap: 1.5,
        }}
      >
        {LOB_REGISTRY.map((lob) => {
          const active = lob.status === 'active';
          return (
            <Paper
              key={lob.code}
              elevation={0}
              onClick={active ? () => navigate(`/lob/${lob.code}/${policyEntryPoints[0].pageId}`) : undefined}
              sx={{
                p: 1.75,
                border: '1px solid',
                borderColor: active ? 'primary.main' : 'divider',
                borderRadius: 2,
                cursor: active ? 'pointer' : 'default',
                opacity: active ? 1 : 0.55,
                transition: 'transform .12s, box-shadow .12s',
                '&:hover': active ? { transform: 'translateY(-2px)', boxShadow: 3 } : undefined,
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 700 }}>{lob.code}</Typography>
                <Chip
                  size="small"
                  label={active ? 'Active' : 'Config-ready'}
                  color={active ? 'success' : 'default'}
                  variant={active ? 'filled' : 'outlined'}
                  sx={{ height: 20, fontSize: 10 }}
                />
              </Stack>
              <Typography variant="body2" sx={{ mt: 0.5 }} noWrap title={lob.name}>
                {lob.name}
              </Typography>
            </Paper>
          );
        })}
      </Box>

      {setLob && (
        <Paper elevation={0} sx={{ mt: 3, p: 2, border: '1px dashed', borderColor: 'primary.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Quick start — Policy (LOB 1)
          </Typography>
          <Button variant="contained" onClick={() => navigate(`/lob/POL/${policyEntryPoints[0].pageId}`)}>
            {policyEntryPoints[0].label}
          </Button>
        </Paper>
      )}
    </Box>
  );
}

function Stat({ n, label, tone = 'default' }: { n: number; label: string; tone?: string }) {
  const color =
    tone === 'success' ? 'success.main' : tone === 'primary' ? 'primary.main' : tone === 'muted' ? 'text.secondary' : 'text.primary';
  return (
    <Paper elevation={0} sx={{ px: 2.5, py: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 2, minWidth: 130 }}>
      <Typography sx={{ fontSize: 28, fontWeight: 800, color, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
        {n}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
}
