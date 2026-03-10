import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/utils/cn';

type IntegrationCardProps = {
    iconName: string;
    title: string;
    subtitle: string;
    onManage?: () => void;
    className?: string;
};

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
    iconName,
    title,
    subtitle,
    onManage,
    className
}) => {
    return (
        <div className={cn(
            "flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900",
            className
        )}>
            <div className="size-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Icon name={iconName} className="text-primary" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{title}</p>
                <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
            <button
                onClick={onManage}
                className="text-xs font-bold text-primary hover:underline"
            >
                Manage
            </button>
        </div>
    );
};
