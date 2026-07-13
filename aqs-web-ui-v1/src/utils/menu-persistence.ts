const MENU_STORAGE_KEY = 'aqs_menu_data';

export interface PersistedMenuInfo {
    menus: unknown[];
    queryString: string;
}

export interface PersistedMenuData {
    menuInfo: PersistedMenuInfo;
    timestamp: number;
    userId: string;
    compLoc: string;
}

type MenuStorageShape = Record<string, PersistedMenuData>;

function createStorageEntryKey(userId: string, compLoc: string): string {
    return `${userId}::${compLoc}`;
}

function readStorage(): MenuStorageShape {
    try {
        const raw = localStorage.getItem(MENU_STORAGE_KEY);
        if (!raw) {
            return {};
        }

        const parsed = JSON.parse(raw) as unknown;
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
            return {};
        }

        return parsed as MenuStorageShape;
    } catch (error) {
        console.error('[menu-persistence] Failed reading menu storage', error);
        return {};
    }
}

function writeStorage(data: MenuStorageShape): void {
    try {
        localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('[menu-persistence] Failed writing menu storage', error);
    }
}

export function setMenuData(userId: string, compLoc: string, menuInfo: PersistedMenuInfo): void {
    if (!userId || !compLoc) {
        return;
    }

    const storage = readStorage();
    const entryKey = createStorageEntryKey(userId, compLoc);

    storage[entryKey] = {
        menuInfo,
        timestamp: Date.now(),
        userId,
        compLoc,
    };

    writeStorage(storage);
}

export function getMenuData(userId: string, compLoc: string): PersistedMenuData | null {
    if (!userId || !compLoc) {
        return null;
    }

    const storage = readStorage();
    const entryKey = createStorageEntryKey(userId, compLoc);

    return storage[entryKey] ?? null;
}

export function clearMenuData(userId?: string, compLoc?: string): void {
    if (!userId || !compLoc) {
        localStorage.removeItem(MENU_STORAGE_KEY);
        return;
    }

    const storage = readStorage();
    const entryKey = createStorageEntryKey(userId, compLoc);

    if (storage[entryKey]) {
        delete storage[entryKey];
        writeStorage(storage);
    }
}
