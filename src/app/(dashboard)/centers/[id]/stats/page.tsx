"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import centerService from '@/services/centerService';
import { Icon } from '@/components/atoms/Icon';
import { StatCard } from '@/components/molecules/StatCard/StatCard';
import Spinner from '@/components/atoms/Spinner';
import { formatPhone } from '@/utils/format';
import Badge from '@/components/atoms/Badge';

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

    const centerFromStats = statsResponse?.data?.center;
    const center = centerResponse?.data || centerFromStats;
    const stats = statsResponse?.data?.summary;

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

            {/* Center Information Card */}
            {center && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="size-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-4xl shadow-inner shrink-0">
                        <Icon name="storefront" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Phone</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Icon name="phone" className="text-slate-400 text-base" />
                                {formatPhone(center.phone)}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Icon name="mail" className="text-slate-400 text-base" />
                                {center.email}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Icon name="location_on" className="text-slate-400 text-base" />
                                {center.address}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</p>
                            <div className="flex items-center gap-2">
                                <Badge variant={center.isActive ? 'success' : 'default'} className="font-bold">
                                    {center.isActive ? 'ACTIVE' : 'INACTIVE'}
                                </Badge>
                                <span className="text-xs text-slate-500 font-mono">#{center.code}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Students"
                    value={(stats?.activeStudents || 0).toString()}
                    icon="group"
                    trend=""
                    trendType="neutral"
                    iconBgColorClass="bg-blue-100 dark:bg-blue-900/30"
                    iconTextColorClass="text-blue-600 dark:text-blue-400"
                />
                <StatCard
                    title="Active Classes"
                    value={(stats?.activeClasses || 0).toString()}
                    icon="school"
                    trend=""
                    trendType="neutral"
                    iconBgColorClass="bg-purple-100 dark:bg-purple-900/30"
                    iconTextColorClass="text-purple-600 dark:text-purple-400"
                />
                <StatCard
                    title="Today Sessions"
                    value={(stats?.todaySessions || 0).toString()}
                    icon="event_note"
                    trend=""
                    trendType="neutral"
                    iconBgColorClass="bg-emerald-100 dark:bg-emerald-900/30"
                    iconTextColorClass="text-emerald-600 dark:text-emerald-400"
                />
                <StatCard
                    title="Attendance Rate"
                    value={`${Math.round((stats?.attendanceRate || 0) * 100)}%`}
                    icon="fact_check"
                    trend=""
                    trendType="neutral"
                    iconBgColorClass="bg-rose-100 dark:bg-rose-900/30"
                    iconTextColorClass="text-rose-600 dark:text-rose-400"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bookings & Activity */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Icon name="calendar_today" className="text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Weekly Activity</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Booking and scheduling metrics</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Today Bookings</p>
                            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats?.todayBookings || 0}</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Weekly Total</p>
                            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats?.weeklyBookings || 0}</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                            <p className="text-xs font-bold text-primary/60 uppercase tracking-wider mb-2">Pending</p>
                            <p className="text-3xl font-black text-primary">{stats?.pendingBookings || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Operations & Alerts */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                            <Icon name="notification_important" className="text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Operations</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Action items and updates</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <Icon name="description" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Pending Approvals</span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 text-xs font-bold">
                                {stats?.reportsPendingApproval || 0} Reports
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <Icon name="chat_bubble" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Open Feedbacks</span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-bold">
                                {stats?.openFeedbacks || 0} Pending
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <Icon name="campaign" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Active Announcements</span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-xs font-bold">
                                {stats?.activeAnnouncements || 0} Live
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stakeholders Breakdown */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                            <Icon name="groups" className="text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stakeholders</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Participants overview</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="text-center space-y-2">
                            <div className="size-14 mx-auto rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                <Icon name="person" className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{stats?.activeTeachers || 0}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase">Teachers</p>
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="size-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Icon name="school" className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{stats?.activeStudents || 0}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase">Students</p>
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="size-14 mx-auto rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                <Icon name="family_restroom" className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{stats?.activeParents || 0}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase">Parents</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Status */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                            <Icon name="auto_graph" className="text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Class Progression</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Total active: {stats?.activeClasses || 0}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-bold text-slate-600 dark:text-slate-400">Ongoing Classes</span>
                                <span className="font-black text-slate-900 dark:text-white">{stats?.ongoingClasses || 0}</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${(stats?.ongoingClasses / stats?.activeClasses) * 100 || 0}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-bold text-slate-600 dark:text-slate-400">Completed Classes</span>
                                <span className="font-black text-slate-900 dark:text-white">{stats?.completedClasses || 0}</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-emerald-500 rounded-full" 
                                    style={{ width: `${(stats?.completedClasses / stats?.activeClasses) * 100 || 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
