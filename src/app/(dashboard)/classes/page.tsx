"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import { DataTable, Column } from '@/components/molecules/Table';
import { FilterTabs } from '@/components/molecules/FilterTabs/FilterTabs';
import { Class } from '@/types';
import classService from '@/services/classService';
import { useQuery } from '@tanstack/react-query';
import { PERMISSIONS } from '@/utils/permissions';
import PermissionGuard from '@/components/auth/PermissionGuard';

export default function ClassesPage() {
    const [activeTab, setActiveTab] = useState<'All' | 'Ongoing' | 'Completed'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data: response, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['classes', activeTab],
        queryFn: async () => {
            if (activeTab === 'All') return await classService.getClasses();
            if (activeTab === 'Ongoing') return await classService.getOngoingClasses();
            return await classService.getCompletedClasses();
        }
    });

    const classes = response?.data || [];
    const filteredClasses = classes;

    const columns: Column<Class>[] = [
        {
            header: 'Class Name',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 shrink-0">
                        <Icon name="school" className="text-xl" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">ID: {item.id}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Start Date',
            render: (item) => <span className="text-sm text-slate-600 dark:text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</span>
        },
        {
            header: 'Students',
            render: (item) => (
                <div className="flex items-center gap-2">
                    <Icon name="group" className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.classSize}</span>
                </div>
            )
        },
    ];

    return (
        <PermissionGuard requiredPermission={PERMISSIONS.CLASSES_VIEW} showMessage={true}>
            <div className="flex-1 flex flex-col gap-8 animate-fade-in">
                <div className="flex flex-col gap-1">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Classes Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base">
                        View and manage classes, ongoing and completed.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 w-fit">
                        <FilterTabs
                            tabs={[
                                { label: 'All', value: 'All' },
                                { label: 'On going', value: 'Ongoing' },
                                { label: 'Completed', value: 'Completed' }
                            ]}
                            activeTab={activeTab}
                            onTabChange={(tab) => {
                                setActiveTab(tab);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    {isError ? (
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4">
                            <div className="size-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                                <Icon name="error" className="text-3xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Failed to load classes</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                                    {(error as any)?.message || "Something went wrong while fetching the class list. Please try again."}
                                </p>
                            </div>
                            <button
                                onClick={() => refetch()}
                                className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2"
                            >
                                <Icon name="refresh" />
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm relative">
                            {isLoading && (
                                <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-[2px] z-10 rounded-3xl flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading classes...</p>
                                    </div>
                                </div>
                            )}
                            <DataTable
                                data={filteredClasses}
                                columns={columns}
                                pagination={{
                                    currentPage,
                                    totalPages: Math.ceil(filteredClasses.length / itemsPerPage) || 1,
                                    onPageChange: setCurrentPage,
                                    totalItems: filteredClasses.length,
                                    itemsPerPage,
                                    unit: 'classes'
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </PermissionGuard>
    );
}
