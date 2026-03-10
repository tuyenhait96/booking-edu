import React from 'react';
import { Icon } from '@/components/atoms/Icon';

type StatCardProps = {
    title: string;
    value: string;
    trend: string;
    trendType: 'positive' | 'neutral' | 'negative';
    icon: string;
    iconBgColorClass: string;
    iconTextColorClass: string;
};

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    trend,
    trendType,
    icon,
    iconBgColorClass,
    iconTextColorClass,
}) => {
    let trendClass = 'text-slate-500 bg-slate-100 dark:bg-slate-800';
    if (trendType === 'positive') trendClass = 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30';
    if (trendType === 'negative') trendClass = 'text-red-500 bg-red-100 dark:bg-red-900/30';

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${iconBgColorClass} ${iconTextColorClass}`}>
                    <Icon name={icon} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendClass}`}>
                    {trend}
                </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
    );
};
