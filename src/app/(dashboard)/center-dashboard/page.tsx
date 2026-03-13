"use client";

import React from 'react';
import { StrategicOverview } from '@/components/organisms/StrategicOverview';
import { Icon } from '@/components/atoms/Icon';
import { RegistrationsChart } from '@/components/organisms/RegistrationsChart/RegistrationsChart';

export default function CenterDashboardPage() {
    return (
        <div className="flex-1 flex flex-col gap-8 animate-fade-in">
            <div className="flex flex-col gap-1">
                <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Center Overview</h1>
                <p className="text-slate-500 dark:text-slate-400 text-base">
                    Strategic dashboard for all centers under your organization.
                </p>
            </div>

            {/* Metrics Overview */}
            <StrategicOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Stats Section */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">Center Performance</h3>
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400">
                            <Icon name="more_horiz" />
                        </div>
                    </div>
                    <RegistrationsChart />
                </div>

                {/* Quick Actions / Activity */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Recent Activities</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Icon name={i % 2 === 0 ? "add_circle" : "check_circle"} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {i % 2 === 0 ? "New center added: Tampines Mall" : "Class completed: Math Grade 10"}
                                    </p>
                                    <p className="text-xs text-slate-500">2 hours ago • By Admin</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
