import React from 'react';
import { cn } from "@/utils/cn";

interface FilterTabsProps {
    activeTab: 'Weekly' | 'Daily' | 'Monthly';
    onTabChange: (tab: 'Weekly' | 'Daily' | 'Monthly') => void;
    className?: string;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, onTabChange, className }) => {
    const tabs: ('Weekly' | 'Daily' | 'Monthly')[] = ['Weekly', 'Daily', 'Monthly'];

    return (
        <div className={cn(
            "flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg",
            className
        )}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={cn(
                        "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                        activeTab === tab
                            ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};
