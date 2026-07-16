import { useEffect } from 'react';
import { initDataChangedFlag, applyNextButtonRules } from '@utils/page-init-rules';

/**
 * Runs the two Eebrowser window_onload init rules when a page mounts and
 * again whenever the rendered page changes.
 *
 * `pageKey` must change identity per page — pass the schema object from the
 * loader. The renderer components stay mounted across same-route navigations
 * (React Router reuses the element), so keying on the showNextOnEdit value
 * alone would skip re-init when two pages share the same value.
 *
 * Both rules are idempotent, so StrictMode's double effect run is safe.
 *
 * @param showNextOnEdit - pageHeader.showNextOnEdit from the schema ("T" | "F" | undefined)
 * @param pageKey - per-page identity (the schema object from the loader)
 */
export function usePageInit(showNextOnEdit: string | undefined, pageKey?: unknown): void {
    useEffect(() => {
        initDataChangedFlag();
        applyNextButtonRules(showNextOnEdit);
    }, [showNextOnEdit, pageKey]);
}
