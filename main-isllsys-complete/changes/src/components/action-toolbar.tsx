import { Box, Button } from '@mui/material';

import { useRuntimeOverride } from '@/stores/runtime-override-store';

// VBS: Main_ISLLSYS #25 UpdateToolBar          (lines 1997-2020)
//    + #41 UpdateActionMenuItems (lines 3114-3131, N/A imperative half)
// Legacy told the toolbar frame to re-evaluate button states after every
// navigation. In React the toolbar is REACTIVE: each button subscribes to
// the runtime-override store (which the security resolver and required
// gate write into), so there is nothing to "update" imperatively.

export interface ToolbarItem {
    /** Override key — matches security resolver / gate writes. */
    id: string;
    label: string;
    action: string;
}

interface ActionToolbarProps {
    items: ToolbarItem[];
    onAction: (action: string, id: string) => void;
}

function ToolbarButton({ item, onAction }: { item: ToolbarItem; onAction: ActionToolbarProps['onAction'] }) {
    const override = useRuntimeOverride(item.id);
    if (override?.visible === false) return null;

    return (
        <Button
            size="small"
            variant="outlined"
            disabled={override?.disabled === true}
            onClick={() => onAction(item.action, item.id)}
        >
            {item.label}
        </Button>
    );
}

function ActionToolbar({ items, onAction }: ActionToolbarProps) {
    return (
        <Box sx={{ display: 'flex', gap: 1, px: 1, py: 0.5 }}>
            {items.map((item) => (
                <ToolbarButton key={item.id} item={item} onAction={onAction} />
            ))}
        </Box>
    );
}

export { ActionToolbar };
export default ActionToolbar;
