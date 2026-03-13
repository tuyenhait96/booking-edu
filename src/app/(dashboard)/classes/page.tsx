"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import Badge from '@/components/atoms/Badge';
import { DataTable, Column } from '@/components/molecules/Table';
import { FilterTabs } from '@/components/molecules/FilterTabs/FilterTabs';
import { Class } from '@/types';
import classService from '@/services/classService';
import { useEffect } from 'react';

export default function ClassesPage() {
    const [activeTab, setActiveTab] = useState<'All' | 'Ongoing' | 'Completed'>('All');
    const [classes, setClasses] = useState<Class[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchClasses = async () => {
            setIsLoading(true);
            try {
                let response;
                if (activeTab === 'All') response = await classService.getClasses();
                else if (activeTab === 'Ongoing') response = await classService.getOngoingClasses();
                else response = await classService.getCompletedClasses();
                setClasses(response.data);
            } catch (error) {
                console.error('Failed to fetch classes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchClasses();
    }, [activeTab]);

    const filteredClasses = classes; // Already filtered by service

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
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.studentCount || item.classSize}</span>
                </div>
            )
        },
        {
            header: 'Status',
            render: (item) => (
                <Badge variant={item.status === 'ongoing' ? 'success' : item.status === 'completed' ? 'default' : 'warning'}>
                    {(item.status || 'unknown').toUpperCase()}
                </Badge>
            )
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            render: (item) => (
                <div className="flex justify-end gap-2">
                    <button className="text-slate-400 hover:text-primary p-1">
                        <Icon name="visibility" />
                    </button>
                    <button className="text-slate-400 hover:text-blue-600 p-1">
                        <Icon name="edit" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="flex-1 flex flex-col gap-8 animate-fade-in">
            <div className="flex flex-col gap-1">
                <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Class Management</h1>
                <p className="text-slate-500 dark:text-slate-400 text-base">
                    View and manage ongoing, completed, and upcoming classes.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 w-fit">
                    <FilterTabs
                        activeTab={activeTab as any}
                        onTabChange={(tab) => {
                            setActiveTab(tab as any);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                    <DataTable
                        data={filteredClasses}
                        columns={columns}
                        pagination={{
                            currentPage,
                            totalPages: Math.ceil(filteredClasses.length / itemsPerPage),
                            onPageChange: setCurrentPage,
                            totalItems: filteredClasses.length,
                            itemsPerPage,
                            unit: 'classes'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
