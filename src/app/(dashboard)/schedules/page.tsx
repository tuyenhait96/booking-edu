"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import { PERMISSIONS } from '@/utils/permissions';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { CreateScheduleModal } from '@/components/organisms/CreateScheduleModal/CreateScheduleModal';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/molecules/Toast';

const MOCK_SCHEDULES = [
    { id: "1", className: "Math Primary 1", teacher: "John Smith", startTime: "09:00", endTime: "10:30", days: ["Mon", "Wed", "Fri"] },
    { id: "2", className: "Math Primary 2", teacher: "Sarah Connor", startTime: "11:00", endTime: "12:30", days: ["Tue", "Thu"] }
];

export default function SchedulesPage() {
    const { toast, toasts, removeToast } = useToast();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <PermissionGuard requiredPermission={PERMISSIONS.SCHEDULE_MANAGE} showMessage={true}>
            <div className="flex-1 flex flex-col gap-8 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Schedule Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            View and manage class schedules and teacher availability.
                        </p>
                    </div>
                    <Button 
                        className="flex items-center gap-2"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Icon name="event" />
                        <span>Create Schedule</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_SCHEDULES.map((schedule) => (
                        <div key={schedule.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Icon name="calendar_today" className="text-2xl" />
                                </div>
                                <button className="text-slate-400 hover:text-slate-600">
                                    <Icon name="more_vert" />
                                </button>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{schedule.className}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                                <Icon name="person" className="text-base" />
                                {schedule.teacher}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {schedule.days.map(day => (
                                    <span key={day} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400">
                                        {day}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <Icon name="schedule" />
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <CreateScheduleModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={(data) => {
                        toast({ title: 'Success', description: 'Schedule created (Mock)', variant: 'success' });
                    }}
                />

                <ToastContainer toasts={toasts} removeToast={removeToast} />
            </div>
        </PermissionGuard>
    );
}
