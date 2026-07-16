import { GlobalVarsStoreApi } from '@stores/global-vars-store';
import { SessionStoreApi } from '@stores/session-store';
import { RuntimeOverrideStoreApi } from '@stores/runtime-override-store';

// VBS: Eebrowser second_window_onload lines 172-280
// Two separate init rules that run on every page mount.

const ADD_MODE_EXCLUSIONS = ['EDIT', 'INQUIRY', 'SELECT'];

/**
 * GAP 1: Data-changed flag init by action.
 *
 * VBS lines 172-187:
 *   If action NOT IN ("EDIT","INQUIRY","SELECT") Then
 *       mblnDataChanged = True       ' ADD mode = dirty
 *   Else
 *       mblnDataChanged = False      ' EDIT/INQUIRY = clean
 *       mblnRatingDataChanged = False
 *   End If
 */
export function initDataChangedFlag(): void {
    const action = SessionStoreApi.getState().action.toUpperCase();
    const isAddMode = !ADD_MODE_EXCLUSIONS.includes(action);
    const gv = GlobalVarsStoreApi.getState().actions;

    if (isAddMode) {
        gv.setDataChanged(true);
    } else {
        gv.setDataChanged(false);
        gv.setRatingDataChanged(false);
    }
}

/**
 * GAP 2: ShowNextOnEdit two-arm logic.
 *
 * VBS lines 224-280:
 *   ARM 1 (ShowNextOnEdit = "T"):  EDIT/RLVUPDATE/EDITTYPRAT → DISABLE dtaNEXT
 *   ARM 2 (ShowNextOnEdit = "F"):  EDIT/RLVUPDATE/EDITTYPRAT → HIDE dtaNEXT
 *
 * Both arms check session xmlDetail for "rlvupdateadd" / "chgtypratadd"
 * to detect re-add during RLVUPDATE/EDITTYPRAT — re-add keeps NEXT enabled.
 */
export function applyNextButtonRules(showNextOnEdit: string | undefined): void {
    // Only the two explicit VBS arms act — "T" or "F". A missing, blank, or
    // unexpected value leaves dtaNEXT untouched.
    const flag = showNextOnEdit?.trim().toUpperCase();
    if (flag !== 'T' && flag !== 'F') return;

    const session = SessionStoreApi.getState();
    const action = session.action.toUpperCase();
    const overrides = RuntimeOverrideStoreApi.getState().actions;

    const isReAdd = (): boolean => {
        if (action === 'RLVUPDATE') {
            return session.actions.getXmlDetailItem('rlvupdateadd') === 'yes';
        }
        if (action === 'EDITTYPRAT') {
            return session.actions.getXmlDetailItem('chgtypratadd') === 'yes';
        }
        return false;
    };

    const shouldRestrict =
        action === 'EDIT' ||
        ((action === 'RLVUPDATE' || action === 'EDITTYPRAT') && !isReAdd());

    if (!shouldRestrict) return;

    if (flag === 'T') {
        overrides.setOverride('dtaNEXT', { disabled: true });
    } else {
        overrides.setOverride('dtaNEXT', { visible: false });
    }
}
