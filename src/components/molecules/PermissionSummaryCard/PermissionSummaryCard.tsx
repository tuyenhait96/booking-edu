import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/utils/cn';

type PermissionSummaryCardProps = {
    iconName: string;
    title: string;
    description: string;
    className?: string;
};

export const PermissionSummaryCard: React.FC<PermissionSummaryCardProps> = ({
    iconName,
    title,
    description,
    className
}) => {
    return (
        <div className={cn(
            "p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4",
            className
        )}>
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon name={iconName} />
            </div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
                <p className="text-sm text-slate-500 mt-1">{description}</p>
            </div>
        </div>
    );
};
