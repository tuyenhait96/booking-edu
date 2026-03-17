"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import centerService from '@/services/centerService';
import { Icon } from '@/components/atoms/Icon';
import { StatCard } from '@/components/molecules/StatCard/StatCard';
import Spinner from '@/components/atoms/Spinner';

export default function CenterStatsPage() {
    const params = useParams();
    const router = useRouter();
    const centerId = params.id as string;

    const { data: centerResponse } = useQuery({
        queryKey: ['center', centerId],
        queryFn: () => centerService.getCenterById(centerId)
    });

    const { data: statsResponse, isLoading } = useQuery({
        queryKey: ['center-stats', centerId],
        queryFn: () => centerService.getCenterStats(centerId)
    });

    const center = centerResponse?.data;
    const stats = statsResponse?.data;

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2 hover:text-primary transition-colors cursor-pointer" onClick={() => router.back()}>
                        <Icon name="chevron_left" />
                        <span className="text-sm font-medium">Back to Centers</span>
                    </div>
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
                        {center?.name} Statistics
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base">
                        Performance overview and key metrics for this center.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Students"
                    value={(stats?.totalStudents || 0).toString()}
                    icon="group"
                    trend="+12%"
                    trendType="positive"
                    iconBgColorClass="bg-blue-100 dark:bg-blue-900/30"
                    iconTextColorClass="text-blue-600 dark:text-blue-400"
                />
                <StatCard
                    title="Active Classes"
                    value={(stats?.activeClasses || 0).toString()}
                    icon="school"
                    trend="0%"
                    trendType="neutral"
                    iconBgColorClass="bg-purple-100 dark:bg-purple-900/30"
                    iconTextColorClass="text-purple-600 dark:text-purple-400"
                />
                <StatCard
                    title="Attendance Rate"
                    value={`${stats?.attendanceRate || 0}%`}
                    icon="fact_check"
                    trend="+2.4%"
                    trendType="positive"
                    iconBgColorClass="bg-emerald-100 dark:bg-emerald-900/30"
                    iconTextColorClass="text-emerald-600 dark:text-emerald-400"
                />
                <StatCard
                    title="Monthly Growth"
                    value={`${stats?.monthlyGrowth || 0}%`}
                    icon="trending_up"
                    trend="+0.5%"
                    trendType="positive"
                    iconBgColorClass="bg-rose-100 dark:bg-rose-900/30"
                    iconTextColorClass="text-rose-600 dark:text-rose-400"
                />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Icon name="assessment" className="text-2xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Detailed Overview</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">More detailed metrics will be available here soon.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Upcoming Sessions</h3>
                        <p className="text-4xl font-black text-primary">{stats?.upcomingSessions || 0}</p>
                        <p className="text-sm text-slate-500 mt-2">Scheduled for the next 24 hours</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Total Revenue</h3>
                        <p className="text-4xl font-black text-green-600">${(stats?.totalRevenue || 0).toLocaleString()}</p>
                        <p className="text-sm text-slate-500 mt-2">Gross revenue this quarter</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
