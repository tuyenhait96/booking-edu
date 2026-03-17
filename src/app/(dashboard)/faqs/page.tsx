"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { DataTable, Column } from '@/components/molecules/Table';
import { useQuery } from '@tanstack/react-query';
import resourceService from '@/services/resourceService';
import { PERMISSIONS } from '@/utils/permissions';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateFAQModal } from '@/components/organisms/CreateFAQModal/CreateFAQModal';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/molecules/Toast';

export default function FAQsPage() {
    const queryClient = useQueryClient();
    const { toast, toasts, removeToast } = useToast();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data: response, isLoading } = useQuery({
        queryKey: ['faqs'],
        queryFn: resourceService.getFAQs
    });

    const createMutation = useMutation({
        mutationFn: resourceService.createFAQ,
        onSuccess: () => {
            toast({ title: 'Success', description: 'FAQ created', variant: 'success' });
            queryClient.invalidateQueries({ queryKey: ['faqs'] });
        }
    });

    const faqs = response?.data || [];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const columns: Column<any>[] = [
        {
            header: 'Question',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 shrink-0">
                        <Icon name="faq" className="text-xl" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.question}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-sm">{item.answer}</p>
                    </div>
                </div>
            )
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
        <PermissionGuard requiredPermission={PERMISSIONS.FAQ_MANAGE} showMessage={true}>
            <div className="flex-1 flex flex-col gap-8 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">FAQs</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Manage frequently asked questions for parents and students.
                        </p>
                    </div>
                    <Button 
                        className="flex items-center gap-2"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Icon name="add" />
                        <span>Create FAQ</span>
                    </Button>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                    <DataTable
                        data={faqs}
                        columns={columns}
                        isLoading={isLoading}
                        pagination={{
                            currentPage,
                            totalPages: Math.ceil(faqs.length / itemsPerPage) || 1,
                            onPageChange: setCurrentPage,
                            totalItems: faqs.length,
                            itemsPerPage,
                            unit: 'FAQs'
                        }}
                    />
                </div>

                <CreateFAQModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={(data) => createMutation.mutate(data)}
                />

                <ToastContainer toasts={toasts} removeToast={removeToast} />
            </div>
        </PermissionGuard>
    );
}
