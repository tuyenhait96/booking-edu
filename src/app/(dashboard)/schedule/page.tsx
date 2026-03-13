"use client";

import React, { useState } from 'react';
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import { FilterTabs } from "@/components/molecules/FilterTabs/FilterTabs";
import { DateNavigator } from "@/components/molecules/DateNavigator/DateNavigator";
import { ScheduleGrid } from "@/components/organisms/ScheduleGrid/ScheduleGrid";
import { AddSessionModal } from "@/components/organisms/AddSessionModal/AddSessionModal";
import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/utils/permissions';

export default function SchedulePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 16)); // Default to Oct 16, 2023 from design
    const [activeTab, setActiveTab] = useState<'Weekly' | 'Daily' | 'Monthly'>('Weekly');

    const getWeekRange = (date: Date) => {
        const start = new Date(date);
        // Find Monday of the current week
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1);
        start.setDate(diff);

        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        const startStr = start.toLocaleDateString('en-US', options);
        const endStr = end.toLocaleDateString('en-US', options);

        return `${startStr} - ${endStr}, ${end.getFullYear()}`;
    };

    const handlePrev = () => {
        const newDate = new Date(currentDate);
        if (activeTab === 'Weekly') newDate.setDate(newDate.getDate() - 7);
        else if (activeTab === 'Daily') newDate.setDate(newDate.getDate() - 1);
        else newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        if (activeTab === 'Weekly') newDate.setDate(newDate.getDate() + 7);
        else if (activeTab === 'Daily') newDate.setDate(newDate.getDate() + 1);
        else newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-fade-in">
            <div className="flex flex-col gap-6 mx-auto w-full">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Schedule</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Weekly timetable for Grade 10 - Section A • {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                            <PermissionGuard requiredPermission={PERMISSIONS.BOOKING_RULES_MANAGE}>
                                <Button variant="ghost" className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                                    Turn On Bookings
                                </Button>
                            </PermissionGuard>
                            <PermissionGuard requiredPermission={PERMISSIONS.BOOKING_RULES_MANAGE}>
                                <Button variant="ghost" className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-rose-500 transition-colors">
                                    Turn Off All
                                </Button>
                            </PermissionGuard>
                            <PermissionGuard requiredPermission={PERMISSIONS.BOOKING_RULES_MANAGE}>
                                <Button variant="ghost" className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
                                    Clear Students
                                </Button>
                            </PermissionGuard>
                        </div>
                        <PermissionGuard requiredPermission={PERMISSIONS.BOOKING_CREATE}>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
                            >
                                <Icon name="add" className="text-lg text-white" />
                                <span>Add Session</span>
                            </Button>
                        </PermissionGuard>
                    </div>
                </div>

                {/* Filter / Navigation Bar */}
                <div className="flex flex-col sm:flex-row justify-between bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 items-center gap-4">
                    <FilterTabs
                        tabs={[
                            { label: 'Weekly', value: 'Weekly' },
                            { label: 'Daily', value: 'Daily' },
                            { label: 'Monthly', value: 'Monthly' }
                        ]}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                    <DateNavigator
                        dateRange={activeTab === 'Weekly' ? getWeekRange(currentDate) : currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        onToday={handleToday}
                    />
                </div>

                {/* Timetable Grid */}
                <ScheduleGrid baseDate={currentDate} />
            </div>

            {/* Modal */}
            <AddSessionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
