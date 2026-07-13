// Snippet: React Router v7 route hosting for a converted page.
// Follows .docs/execute-action-migration-plan.md (loader-based data strategy,
// same approach as the SSO refactor) and the frame-system renderers.

// --- route module: src/features/<page>/<page>-route.tsx ---------------------

// import { StaticFrameRenderer } from '../../components/frame-renderers/static-frame-renderer';
// import { usePageModalFlow } from './use-<page>-modal-flow';

/**
 * Loader resolves navigation/session BEFORE render (no per-page
 * user-permissions call — windowTitle comes from the navigation response).
 */
export async function pageLoader(/* { request, params } */) {
  // const sessionInfo = await resolveNavigation(params.nodeKey);
  // return { sessionInfo };
  return null; // TODO
}

export default function PageRoute() {
  // const { sessionInfo } = useLoaderData<typeof pageLoader>();
  //
  // Option A — full page hosted in the frame system (schema-on-load):
  // return (
  //   <StaticFrameRenderer
  //     currentPageIdentity={...}   // from sessionInfo (XmlFile/NodeKey)
  //     handlerContext={...}
  //   />
  // );
  //
  // Option B — page runs as a modal inside an existing flow:
  // const flow = usePageModalFlow({ sessionInfo, onClose });
  // return <ModalDialog {...engineProps(flow)} />;
  return null; // TODO
}

// --- register in the routes config ------------------------------------------
// {
//   path: 'uw/my-page',            // TODO
//   loader: pageLoader,
//   Component: PageRoute,
//   ErrorBoundary: ContentErrorBoundary,
// }
