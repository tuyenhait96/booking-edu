import React from 'react';
import { cn } from "@/utils/cn";

interface Tab<T> {
    label: string;
    value: T;
}

interface FilterTabsProps<T extends string> {
    tabs: Tab<T>[];
    activeTab: T;
    onTabChange: (tab: T) => void;
    className?: string;
}

export const FilterTabs = <T extends string>({ 
    tabs, 
    activeTab, 
    onTabChange, 
    className 
}: FilterTabsProps<T>) => {
    return (
        <div className={cn(
            "flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg",
            className
        )}>
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onTabChange(tab.value)}
                    className={cn(
                        "px-4 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap",
                        activeTab === tab.value
                            ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};
