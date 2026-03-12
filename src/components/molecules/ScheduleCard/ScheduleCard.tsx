import React from 'react';
import { cn } from "@/utils/cn";
import { Icon } from "@/components/atoms/Icon";

type ScheduleVariant = "primary" | "emerald" | "amber" | "indigo" | "rose" | "violet";

interface ScheduleCardProps {
    category: string;
    title: string;
    location: string;
    capacity?: {
        current: number;
        total: number;
    };
    variant?: ScheduleVariant;
    isActive?: boolean;
    className?: string;
}

const variantStyles: Record<ScheduleVariant, string> = {
    primary: "bg-primary/10 border-primary text-primary",
    emerald: "bg-emerald-50 border-emerald-500 text-emerald-600",
    amber: "bg-amber-50 border-amber-500 text-amber-600",
    indigo: "bg-indigo-50 border-indigo-500 text-indigo-600",
    rose: "bg-rose-50 border-rose-500 text-rose-600",
    violet: "bg-violet-50 border-violet-500 text-violet-600",
};

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
    category,
    title,
    location,
    capacity,
    variant = "primary",
    isActive = false,
    className
}) => {
    if (isActive) {
        return (
            <div className={cn(
                "h-full rounded-lg bg-primary border-l-4 border-primary/80 p-2 flex flex-col gap-1 text-white shadow-lg shadow-primary/20",
                className
            )}>
                <p className="text-xs font-bold opacity-80 uppercase">Active Session</p>
                <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold truncate">{title}</p>
                    {capacity && <span className="text-xs font-black bg-white/20 px-1 rounded">{capacity.current}/{capacity.total}</span>}
                </div>
                <div className="flex items-center gap-1 mt-auto">
                    <Icon name="location_on" className="text-[14px] text-white/80" />
                    <span className="text-xs font-medium opacity-80">{location}</span>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            "h-full rounded-lg border-l-4 p-2 flex flex-col gap-1 overflow-hidden",
            variantStyles[variant],
            className
        )}>
            <div className="flex justify-between items-start">
                <p className="text-xs font-bold uppercase truncate">{category}</p>
                {capacity && <span className={cn("text-xs font-black px-1 rounded", isActive ? "bg-white/20" : "bg-black/5")}>{capacity.current}/{capacity.total}</span>}
            </div>
            <p className="text-[11px] font-bold text-slate-800 dark:text-white truncate">{title}</p>
            <div className="flex items-center gap-1 mt-auto">
                <Icon name="location_on" className="text-[14px] text-slate-400" />
                <span className="text-xs font-medium text-slate-500">{location}</span>
            </div>
        </div>
    );
};
