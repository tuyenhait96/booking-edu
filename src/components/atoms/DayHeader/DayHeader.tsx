import React from 'react';
import { cn } from "@/utils/cn";

interface DayHeaderProps {
    day: string;
    date: string | number;
    isActive?: boolean;
}

export const DayHeader: React.FC<DayHeaderProps> = ({ day, date, isActive = false }) => {
    return (
        <div className={cn(
            "p-4 border-r border-slate-100 dark:border-slate-800 text-center",
            isActive && "bg-primary/5"
        )}>
            <p className={cn(
                "text-xs font-bold uppercase",
                isActive ? "text-primary" : "text-slate-400"
            )}>
                {day}
            </p>
            <p className={cn(
                "text-lg font-black",
                isActive ? "text-primary" : "text-slate-900 dark:text-white"
            )}>
                {date}
            </p>
        </div>
    );
};
