import React from 'react';
import { cn } from "@/utils/cn";

interface TimeSlotLabelProps {
    time: string;
    className?: string;
}

export const TimeSlotLabel: React.FC<TimeSlotLabelProps> = ({ time, className }) => {
    return (
        <div className={cn(
            "p-3 border-r border-slate-100 dark:border-slate-800 text-right",
            className
        )}>
            <span className="text-xs font-bold text-slate-400">
                {time}
            </span>
        </div>
    );
};
