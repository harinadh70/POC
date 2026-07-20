import { useState } from 'react';
import { Box, Button, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';

// VBS: Main_ISLLSYS #53 FillSelectList dual-list branch (lines 5172-5303)
// Coverage picker: available-vs-selected transfer list with an optional
// selection limit (legacy multiselect/covcode limits).

export interface DualListItem {
    value: string;
    label: string;
}

interface DualListProps {
    available: DualListItem[];
    selected: DualListItem[];
    onChange: (selected: DualListItem[]) => void;
    /** Max items allowed in selected (legacy multiselect limit). 0 = no limit. */
    maxSelected?: number;
    availableTitle?: string;
    selectedTitle?: string;
}

function DualList({
    available,
    selected,
    onChange,
    maxSelected = 0,
    availableTitle = 'Available',
    selectedTitle = 'Selected',
}: DualListProps) {
    const [highlightAvail, setHighlightAvail] = useState<string[]>([]);
    const [highlightSel, setHighlightSel] = useState<string[]>([]);

    const remaining = available.filter(
        (a) => !selected.some((s) => s.value === a.value),
    );

    const toggle = (list: string[], value: string): string[] =>
        list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

    const moveRight = () => {
        const toMove = remaining.filter((i) => highlightAvail.includes(i.value));
        let next = [...selected, ...toMove];
        if (maxSelected > 0 && next.length > maxSelected) {
            next = next.slice(0, maxSelected);
        }
        onChange(next);
        setHighlightAvail([]);
    };

    const moveLeft = () => {
        onChange(selected.filter((i) => !highlightSel.includes(i.value)));
        setHighlightSel([]);
    };

    const column = (
        title: string,
        items: DualListItem[],
        highlighted: string[],
        setHighlighted: (next: string[]) => void,
    ) => (
        <Paper variant="outlined" sx={{ width: 220, height: 260, overflow: 'auto' }}>
            <Typography variant="caption" sx={{ px: 1, fontWeight: 600 }}>
                {title}
            </Typography>
            <List dense disablePadding>
                {items.map((item) => (
                    <ListItemButton
                        key={item.value}
                        selected={highlighted.includes(item.value)}
                        onClick={() => setHighlighted(toggle(highlighted, item.value))}
                    >
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {column(availableTitle, remaining, highlightAvail, setHighlightAvail)}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button size="small" variant="outlined" onClick={moveRight} disabled={highlightAvail.length === 0}>
                    &gt;
                </Button>
                <Button size="small" variant="outlined" onClick={moveLeft} disabled={highlightSel.length === 0}>
                    &lt;
                </Button>
            </Box>
            {column(selectedTitle, selected, highlightSel, setHighlightSel)}
        </Box>
    );
}

export { DualList };
export default DualList;
