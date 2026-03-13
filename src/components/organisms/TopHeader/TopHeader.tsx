import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/utils/cn';

export const TopHeader: React.FC = () => {
    return (
        <header className={cn(
            "h-16",
            "backdrop-blur-md px-8",
            "flex items-center justify-between sticky top-0 z-10 shrink-0"
        )}>
            <div className="flex-1 max-w-xl" />
            <div className="flex items-center gap-4">
                <button className={cn("relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors")}>
                    <Icon name="notifications" />
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
                </button>
                <button className={cn("p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors")}>
                    <Icon name="help" />
                </button>
            </div>
        </header>
    );
};
