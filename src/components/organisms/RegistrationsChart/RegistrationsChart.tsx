import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { ChartColumn } from '@/components/atoms/ChartColumn';
import { GrowthInsight } from '@/components/molecules/GrowthInsight';
import Button from '@/components/atoms/Button';
import { cn } from '@/utils/cn';

const CHART_DATA = [
    { month: 'Jan', percentage: 40 },
    { month: 'Feb', percentage: 60 },
    { month: 'Mar', percentage: 45 },
    { month: 'Apr', percentage: 85 },
    { month: 'May', percentage: 70 },
    { month: 'Jun', percentage: 100, isActive: true },
];

export const RegistrationsChart: React.FC = () => {
    return (
        <div className={cn("lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col")}>
            <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-lg">New Registrations</h4>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-primary hover:bg-primary/5">
                    <Icon name="more_horiz" />
                </Button>
            </div>
            <div className="flex items-end justify-between h-48 gap-2">
                {CHART_DATA.map((col) => (
                    <ChartColumn key={col.month} {...col} />
                ))}
            </div>
            <GrowthInsight
                title="GROWTH INSIGHT"
                description="Registration increased by 15% this month due to new regional campaigns."
            />
        </div>
    );
};
