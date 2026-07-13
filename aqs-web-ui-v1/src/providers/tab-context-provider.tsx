import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface TabContextValue {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextValue | undefined>(undefined);

interface TabContextProviderProps {
    initialTab?: string;
    children: ReactNode;
}

export const TabContextProvider: React.FC<TabContextProviderProps> = ({
    initialTab = '',
    children,
}) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>
    );
};

export const useTabContext = (): TabContextValue => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabContext must be used within a TabContextProvider');
    }
    return context;
};
