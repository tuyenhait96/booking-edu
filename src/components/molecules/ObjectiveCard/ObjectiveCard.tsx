import React from 'react';
import { cn } from "@/utils/cn";
import { Icon } from "@/components/atoms/Icon";

interface ObjectiveCardProps {
    icon: string;
    title: string;
    description: string;
    iconBgColor?: string;
    iconTextColor?: string;
    className?: string;
}

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
    icon,
    title,
    description,
    iconBgColor = "bg-primary/10",
    iconTextColor = "text-primary",
    className
}) => {
    return (
        <div className={cn(
            "flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg",
            className
        )}>
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                iconBgColor,
                iconTextColor
            )}>
                <Icon name={icon} className="text-xl" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{title}</p>
                <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                    {description}
                </p>
            </div>
        </div>
    );
};
