// lib/grid-normalize.ts

import type { GridResponse, LobItem } from "../types/grid-response";

export type LobRow = {
    id: string;
    lob: string;
    name: string;
    units: number;
    premium: number;
    exists: boolean;
    converted: boolean;
    sequencer: number;
    nodekey: string;
};

export type NormalizedResult = {
    rows: LobRow[];
    totalUnits: number;
    totalPremium: number;
};

const toNumber = (value: string | number | null | undefined) => {
    const n = Number(value ?? 0);
    return Number.isFinite(n) ? n : 0;
};

const normalizeItem = (item: LobItem, idx: number): LobRow => ({
    id: item.nodekey || `${item["@lob"]}-${item.sequencer}-${idx}`,
    lob: item["@lob"],
    name: item.text,
    units: toNumber(item.units),
    premium: toNumber(item.premium),
    exists: item["@exists"] === "T",
    converted: item["@converted"] === "T",
    sequencer: toNumber(item.sequencer ?? idx),
    nodekey: item.nodekey,
});

export const normalizeGridResponse = (data: GridResponse): NormalizedResult => {
    const raw = data?.Page?.LOB;
    const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const rows = items.map(normalizeItem);

    return {
        rows,
        totalUnits: toNumber(data?.Page?.["@totalunits"]),
        totalPremium: toNumber(data?.Page?.["@totalpremium"]),
    };
};
