import React from 'react';
import { cn } from "@/utils/cn";
import { Icon } from "@/components/atoms/Icon";

interface DateNavigatorProps {
    dateRange: string;
    onPrev: () => void;
    onNext: () => void;
    onToday: () => void;
    className?: string;
}

export const DateNavigator: React.FC<DateNavigatorProps> = ({
    dateRange,
    onPrev,
    onNext,
    onToday,
    className
}) => {
    return (
        <div className={cn("flex items-center gap-4", className)}>
            <div className="flex items-center gap-2">
                <button
                    onClick={onPrev}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <Icon name="chevron_left" className="text-xl" />
                </button>
                <span className="text-sm font-bold min-w-32 text-center text-slate-900 dark:text-white">
                    {dateRange}
                </span>
                <button
                    onClick={onNext}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <Icon name="chevron_right" className="text-xl" />
                </button>
            </div>
            <button
                onClick={onToday}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
                Today
            </button>
        </div>
    );
};
