"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { DataTable, Column } from '@/components/molecules/Table';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import parentService, { Parent } from '@/services/parentService';
import { PERMISSIONS } from '@/utils/permissions';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/molecules/Toast';
import { CreateParentModal } from '@/components/organisms/CreateParentModal/CreateParentModal';

export default function ParentsPage() {
    const queryClient = useQueryClient();
    const { toast, toasts, removeToast } = useToast();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data: response, isLoading } = useQuery({
        queryKey: ['parents'],
        queryFn: parentService.getParents
    });

    const createMutation = useMutation({
        mutationFn: parentService.createParent,
        onSuccess: () => {
            toast({ title: 'Success', description: 'Parent account created', variant: 'success' });
            queryClient.invalidateQueries({ queryKey: ['parents'] });
        }
    });

    const parents = response?.data || [];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const columns: Column<Parent>[] = [
        {
            header: 'Parent Name',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 shrink-0">
                        <Icon name="parent" className="text-xl" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.fullName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Contact',
            render: (item) => <span className="text-sm font-medium">{item.phone}</span>
        },
        {
            header: 'Students',
            render: (item) => <span className="text-sm">{item.studentCount} active students</span>
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
                    <button className="text-slate-400 hover:text-blue-600 p-1" title="Edit">
                        <Icon name="edit" />
                    </button>
                    <button className="text-slate-400 hover:text-red-600 p-1" title="Delete">
                        <Icon name="delete" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <PermissionGuard requiredPermission={PERMISSIONS.PARENT_MANAGE} showMessage={true}>
            <div className="flex-1 flex flex-col gap-8 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Parent Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Manage parent accounts and student relationships.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            className="flex items-center gap-2"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <Icon name="add" className="text-lg" />
                            <span>Create Parent Account</span>
                        </Button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                    <DataTable
                        data={parents}
                        columns={columns}
                        isLoading={isLoading}
                        pagination={{
                            currentPage,
                            totalPages: Math.ceil(parents.length / itemsPerPage) || 1,
                            onPageChange: setCurrentPage,
                            totalItems: parents.length,
                            itemsPerPage,
                            unit: 'parents'
                        }}
                    />
                </div>
                <CreateParentModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={(data) => createMutation.mutate(data)}
                />

                <ToastContainer toasts={toasts} removeToast={removeToast} />
            </div>
        </PermissionGuard>
    );
}
