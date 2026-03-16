"use client";

import React, { useState } from 'react';
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/utils/permissions';
import { ClosedDateModal } from '@/components/organisms/ClosedDateModal/ClosedDateModal';
import { DeleteConfirmModal } from '@/components/molecules/DeleteConfirmModal/DeleteConfirmModal';

interface ClosedDate {
    date: string;
    label: string;
}

export default function BookingRulesPage() {
    const [bookingWindow, setBookingWindow] = useState(8); // weeks
    const [closedDates, setClosedDates] = useState<ClosedDate[]>([
        { date: '2024-01-01', label: 'New Year\'s Day' },
        { date: '2024-02-10', label: 'Chinese New Year' },
        { date: '2024-02-11', label: 'Chinese New Year' },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<ClosedDate | null>(null);

    const handleAddDate = (data: ClosedDate) => {
        console.log('Adding date:', data);
        setClosedDates([...closedDates, data]);
    };

    const handleDeleteDate = async () => {
        setClosedDates(closedDates.filter(d => d.date !== selectedDate?.date));
        await new Promise(resolve => setTimeout(resolve, 800));
    };

    const openDeleteModal = (item: ClosedDate) => {
        setSelectedDate(item);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col animate-fade-in">
            <div className="flex flex-col gap-8 mx-auto w-full">
                <div className="flex flex-col gap-1">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Booking Rules</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base">
                        Global constraints and center availability settings.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Icon name="timer" className="text-xl" />
                                </div>
                                <h2 className="text-xl font-bold">Global Constraints</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                        Max Booking Window (Weeks)
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="1"
                                            max="24"
                                            value={bookingWindow}
                                            onChange={(e) => setBookingWindow(parseInt(e.target.value))}
                                            className="flex-1 accent-primary"
                                        />
                                        <span className="text-lg font-black text-primary w-12 text-center">
                                            {bookingWindow}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Students can book sessions up to {bookingWindow} weeks in advance.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/20">
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Cancellation Cut-off</p>
                                        <p className="text-sm font-bold">24 Hours Before</p>
                                    </div>
                                    <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/20">
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Waitlist Timeout</p>
                                        <p className="text-sm font-bold">2 Hours</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                    <Icon name="verified_user" className="text-xl" />
                                </div>
                                <h2 className="text-xl font-bold">Booking Policies</h2>
                            </div>
                            <div className="space-y-3">
                                {[
                                    'Require admin approval for makeup classes',
                                    'Allow recurring bookings for term students',
                                    'Enable SMS notifications for confirmations',
                                    'Auto-release unconfirmed slots 48h prior'
                                ].map((policy, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{policy}</span>
                                        <div className="w-10 h-5 bg-primary rounded-full relative">
                                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                                        <Icon name="event_busy" className="text-xl" />
                                    </div>
                                    <h2 className="text-xl font-bold">Closed Dates</h2>
                                </div>
                                <PermissionGuard requiredPermission={PERMISSIONS.BOOKING_RULES_MANAGE}>
                                    <Button 
                                        onClick={() => setIsAddModalOpen(true)}
                                        variant="ghost" 
                                        className="text-primary text-sm font-bold hover:underline"
                                    >
                                        + Add Date
                                    </Button>
                                </PermissionGuard>
                            </div>

                            <div className="space-y-4">
                                {closedDates.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all group">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0">
                                            <span className="text-xs font-bold text-slate-400 uppercase leading-none">{new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                            <span className="text-lg font-black leading-none">{new Date(item.date).getDate()}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</p>
                                            <p className="text-xs text-slate-500">{new Date(item.date).getFullYear()}</p>
                                        </div>
                                        <PermissionGuard requiredPermission={PERMISSIONS.BOOKING_RULES_MANAGE}>
                                            <button 
                                                onClick={() => openDeleteModal(item)}
                                                className="p-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all"
                                            >
                                                <Icon name="delete" />
                                            </button>
                                        </PermissionGuard>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10 border-dashed text-center">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    No sessions can be booked or scheduled on these dates.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="flex justify-end gap-3 sticky bottom-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md p-4 -mx-4 border-t border-slate-200 dark:border-slate-800">
                    <Button className="px-6 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-bold hover:bg-slate-50">
                        Discard Changes
                    </Button>
                    <PermissionGuard requiredPermission={PERMISSIONS.BOOKING_RULES_MANAGE}>
                        <Button className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                            Save Configuration
                        </Button>
                    </PermissionGuard>
                </div>
            </div>

            <ClosedDateModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddDate}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteDate}
                title="Remove Closed Date"
                description="Are you sure you want to remove the closed date for"
                itemName={selectedDate?.label}
            />
        </div>
    );
}
