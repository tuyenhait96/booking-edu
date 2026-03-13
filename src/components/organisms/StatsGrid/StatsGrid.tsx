import React from 'react';
import { StatCard } from '@/components/molecules/StatCard';
import { DashboardSummary } from '@/types/dashboard';

interface StatsGridProps {
    summary?: DashboardSummary;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ summary }) => {
    const stats = [
        {
            title: 'Active Classes',
            value: summary?.activeClasses?.toLocaleString() ?? '0',
            trend: 'Live',
            trendType: 'positive' as const,
            icon: 'school',
            iconBgColorClass: 'bg-blue-100 dark:bg-blue-900/30',
            iconTextColorClass: 'text-blue-600 dark:text-blue-400',
        },
        {
            title: 'Active Teachers',
            value: summary?.activeTeachers?.toLocaleString() ?? '0',
            trend: 'Verified',
            trendType: 'positive' as const,
            icon: 'person_outline',
            iconBgColorClass: 'bg-purple-100 dark:bg-purple-900/30',
            iconTextColorClass: 'text-purple-600 dark:text-purple-400',
        },
        {
            title: 'Active Students',
            value: summary?.activeStudents?.toLocaleString() ?? '0',
            trend: 'Enrolled',
            trendType: 'positive' as const,
            icon: 'group',
            iconBgColorClass: 'bg-orange-100 dark:bg-orange-900/30',
            iconTextColorClass: 'text-orange-600 dark:text-orange-400',
        },
        {
            title: 'Active Parents',
            value: summary?.activeParents?.toLocaleString() ?? '0',
            trend: 'Engaged',
            trendType: 'positive' as const,
            icon: 'family_restroom',
            iconBgColorClass: 'bg-emerald-100 dark:bg-emerald-900/30',
            iconTextColorClass: 'text-emerald-600 dark:text-emerald-400',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
            ))}
        </div>
    );
};
