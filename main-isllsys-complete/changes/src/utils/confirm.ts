// VBS: Main_ISLLSYS #42 ShowUserMessage confirm mode (lines 3134-3145)
// One awaitable confirm used by the dirty guard, delete action, and grid
// delete flow.
//
// Baseline implementation uses window.confirm so it works on any branch.
// TODO (one-line swap at integration): route through the client repo's
// modal-store DISPLAY_QUESTION dialog for styled confirms.

export function confirmDialog(message: string, _title?: string): Promise<boolean> {
    return Promise.resolve(window.confirm(message));
}

export default confirmDialog;
