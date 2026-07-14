import { useState } from 'react';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import { useAuthStore } from '@/stores/auth-store';
import { getLob } from '@/lobs/registry';
import { windowLoad, useWindowLoad, type WindowLoadResult } from '@/engine/load/window-load';
import { FormRenderer } from '@/engine/renderers/FormRenderer';
import { DataGridRenderer } from '@/engine/renderers/DataGridRenderer';
import { ButtonsRenderer } from '@/engine/renderers/ButtonsRenderer';

/**
 * Route loader (SDD §4.5, §5.3): the loader half of the legacy Window_OnLoad.
 * Delegates to windowLoad() — the Task 5 TS conversion of second_window_onload
 * (Eebrowser.vbs lines 120–397). Runs before the page renders.
 */
export async function lobPageLoader({ params }: LoaderFunctionArgs): Promise<WindowLoadResult> {
  const session = useAuthStore.getState().session ?? { userId: 'guest', compLoc: 'PIHW' };
  const lob = params.lob!;
  return windowLoad(
    { session, lob, pageId: params.pageId! },
    (pageId) => getLob(lob)?.pages?.[pageId],
  );
}

/**
 * LobPage — the ONE generic page host for every LOB. It resolves nothing
 * LOB-specific itself; the engine + config do the work.
 */
export function LobPage() {
  const loadResult = useLoaderData() as WindowLoadResult;
  const { pageBuild, pageConfig } = loadResult;
  const [tab, setTab] = useState(0);

  // The effect half of the legacy Window_OnLoad (hydrate, flags, commands,
  // page hook, timing) — see engine/load/window-load.ts.
  useWindowLoad(loadResult);

  const tabs = pageBuild.tabs ?? [];

  return (
    <Box>
      <Stack2 title={pageBuild.title} strategy={pageConfig?.strategy} />

      {tabs.length > 0 && (
        <Tabs value={tab} onChange={(_e, v) => setTab(v)} sx={{ mb: 2, minHeight: 40 }}>
          {tabs.map((t) => (
            <Tab key={t.id} label={t.label} sx={{ minHeight: 40 }} />
          ))}
        </Tabs>
      )}

      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <FormRenderer />

        {pageBuild.actions && pageBuild.actions.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <ButtonsRenderer actions={pageBuild.actions} />
          </>
        )}
      </Paper>

      {(pageBuild.grids ?? []).map((g) => (
        <Box key={g.listName} sx={{ mt: 3 }}>
          <DataGridRenderer list={g} />
        </Box>
      ))}
    </Box>
  );
}

function Stack2({ title, strategy }: { title: string; strategy?: string }) {
  return (
    <Box sx={{ mb: 2, display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
      <Typography variant="h6">{title}</Typography>
      {strategy && (
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
          strategy: {strategy}
        </Typography>
      )}
    </Box>
  );
}
