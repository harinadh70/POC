import Box from '@mui/material/Box';
import { usePageStore } from '@/stores/page-store';
import { FieldRenderer } from './FieldRenderer';

/**
 * FormRenderer — lays out the current page's controls (SDD §2.3.7).
 * Reads controls from the page store and renders each via FieldRenderer in a
 * responsive 2-column grid (dynamic control positioning, SDD §2.6).
 *
 * This component is fully generic: it has zero knowledge of Policy or any LOB.
 */
export function FormRenderer() {
  const order = usePageStore((s) => s.order);
  const controls = usePageStore((s) => s.controls);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: 2,
        alignItems: 'start',
      }}
    >
      {order.map((mc) => {
        const c = controls[mc];
        if (!c || c.type === 'button') return null;
        return (
          <Box key={mc} sx={{ gridColumn: c.colSpan === 2 ? '1 / -1' : 'auto' }}>
            <FieldRenderer control={c} />
          </Box>
        );
      })}
    </Box>
  );
}
