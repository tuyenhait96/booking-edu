"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { DataTable, Column } from '@/components/molecules/Table';
import { Center } from '@/types';
import centerService from '@/services/centerService';
import { useEffect } from 'react';

export default function CentersPage() {
    const [centers, setCenters] = useState<Center[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await centerService.getCenters();
                setCenters(response.data);
            } catch (error) {
                console.error('Failed to fetch centers:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCenters();
    }, []);

    const columns: Column<Center>[] = [
        {
            header: 'Center Name',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Icon name="storefront" className="text-xl" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.code}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Address',
            render: (item) => <span className="text-sm text-slate-600 dark:text-slate-400 max-w-[200px] truncate block">{item.address}</span>
        },
        {
            header: 'Contact',
            render: (item) => <span className="text-sm text-slate-600 dark:text-slate-400">{item.phone}</span>
        },
        {
            header: 'Status',
            render: (item) => (
                <Badge variant={item.isActive ? 'success' : 'default'}>
                    {item.isActive ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
            )
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            render: (item) => (
                <div className="flex justify-end gap-2">
                    <button className="text-slate-400 hover:text-blue-600 p-1">
                        <Icon name="edit" />
                    </button>
                    <button className="text-slate-400 hover:text-red-600 p-1">
                        <Icon name="delete" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="flex-1 flex flex-col gap-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Center Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base">
                        Manage all learning centers under your organization.
                    </p>
                </div>
                <Button className="flex items-center gap-2">
                    <Icon name="add" className="text-lg" />
                    <span>Create New Center</span>
                </Button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                <DataTable
                    data={centers}
                    columns={columns}
                    pagination={{
                        currentPage,
                        totalPages: Math.ceil(centers.length / itemsPerPage),
                        onPageChange: setCurrentPage,
                        totalItems: centers.length,
                        itemsPerPage,
                        unit: 'centers'
                    }}
                />
            </div>
        </div>
    );
}
