import React from 'react';
import { StatCard } from '@/components/molecules/StatCard';

const STATS_DATA = [
    {
        title: 'Total Tenants',
        value: '1,248',
        trend: '+12%',
        trendType: 'positive' as const,
        icon: 'corporate_fare',
        iconBgColorClass: 'bg-blue-100 dark:bg-blue-900/30',
        iconTextColorClass: 'text-blue-600 dark:text-blue-400',
    },
    {
        title: 'Active Teachers',
        value: '42,890',
        trend: '+5.2%',
        trendType: 'positive' as const,
        icon: 'person_outline',
        iconBgColorClass: 'bg-purple-100 dark:bg-purple-900/30',
        iconTextColorClass: 'text-purple-600 dark:text-purple-400',
    },
    {
        title: 'Total Students',
        value: '158,204',
        trend: '+18%',
        trendType: 'positive' as const,
        icon: 'group',
        iconBgColorClass: 'bg-orange-100 dark:bg-orange-900/30',
        iconTextColorClass: 'text-orange-600 dark:text-orange-400',
    },
    {
        title: 'Monthly Revenue',
        value: '$2.48M',
        trend: 'Stable',
        trendType: 'neutral' as const,
        icon: 'payments',
        iconBgColorClass: 'bg-emerald-100 dark:bg-emerald-900/30',
        iconTextColorClass: 'text-emerald-600 dark:text-emerald-400',
    },
];

export const StatsGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((stat) => (
                <StatCard key={stat.title} {...stat} />
            ))}
        </div>
    );
};
