import { useEffect, useState } from 'react';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import type { PageBuildResponse, PageConfig } from '@/types';
import { api } from '@/engine/api/client';
import { useAuthStore } from '@/stores/auth-store';
import { getLob } from '@/lobs/registry';
import { mergeControlsWithPageBuild } from '@/config/routes';
import { usePageStore } from '@/stores/page-store';
import { dispatchCommands } from '@/engine/commands/dispatch';
import { FormRenderer } from '@/engine/renderers/FormRenderer';
import { DataGridRenderer } from '@/engine/renderers/DataGridRenderer';
import { ButtonsRenderer } from '@/engine/renderers/ButtonsRenderer';

interface LobPageData {
  pageBuild: PageBuildResponse;
  pageConfig?: PageConfig;
  lob: string;
}

/**
 * Route loader (SDD §4.5, §5.3): Navigation API → PageBuild API. Runs before
 * the page renders, exactly like the legacy Window_OnLoad moved into a loader.
 */
export async function lobPageLoader({ params }: LoaderFunctionArgs): Promise<LobPageData> {
  const session = useAuthStore.getState().session ?? { userId: 'guest', compLoc: 'PIHW' };
  const lob = params.lob!;
  const pageId = params.pageId!;
  const nav = await api.navigate({ ...session, lob }, pageId);
  const pageBuild = await api.pageBuild({ ...session, lob }, nav.pageId);
  const pageConfig = getLob(lob)?.pages?.[pageId];
  return { pageBuild, pageConfig, lob };
}

/**
 * LobPage — the ONE generic page host for every LOB. It resolves nothing
 * LOB-specific itself; the engine + config do the work.
 */
export function LobPage() {
  const { pageBuild, pageConfig } = useLoaderData() as LobPageData;
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const merged = mergeControlsWithPageBuild(pageConfig, pageBuild);
    usePageStore.getState().loadPage(pageBuild, merged);
    if (pageBuild.commands?.length) dispatchCommands(pageBuild.commands);
  }, [pageBuild, pageConfig]);

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
