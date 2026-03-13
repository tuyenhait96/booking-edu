"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { DataTable, Column } from '@/components/molecules/Table';
import { Center } from '@/types';
import centerService from '@/services/centerService';
import { CentreModal } from '@/components/organisms/CentreModal/CentreModal';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/molecules/Toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteConfirmModal } from '@/components/molecules/DeleteConfirmModal/DeleteConfirmModal';
import { formatPhone } from '@/utils/format';
import { PERMISSIONS } from '@/utils/permissions';
import PermissionGuard from '@/components/auth/PermissionGuard';

export default function CentersPage() {
    const queryClient = useQueryClient();
    const { toast, toasts, removeToast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCenter, setEditingCenter] = useState<Center | null>(null);
    const [deletingCenter, setDeletingCenter] = useState<Center | null>(null);
    const itemsPerPage = 5;

    // Fetch centers
    const { data: centersData, isLoading } = useQuery({
        queryKey: ['centers'],
        queryFn: async () => {
            const response = await centerService.getCenters();
            // Handle both response.data or direct array
            return Array.isArray(response.data) ? response.data :
                (Array.isArray(response) ? response : []);
        }
    });

    const centers = centersData || [];

    // Create mutation
    const createMutation = useMutation({
        mutationFn: centerService.createCenter,
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Center created successfully',
                variant: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['centers'] });
            setIsCreateModalOpen(false);
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to create center',
                variant: 'error'
            });
        }
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Center> }) =>
            centerService.updateCenter(id, data),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Center updated successfully',
                variant: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['centers'] });
            setEditingCenter(null);
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to update center',
                variant: 'error'
            });
        }
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: centerService.deleteCenter,
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Center deleted successfully',
                variant: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['centers'] });
            setDeletingCenter(null);
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to delete center',
                variant: 'error'
            });
        }
    });

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
            header: 'Contact Info',
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{formatPhone(item.phone)}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.email}</span>
                </div>
            )
        },
        {
            header: 'Address',
            render: (item) => <span className="text-sm text-slate-600 dark:text-slate-400 max-w-[200px] truncate block">{item.address}</span>
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
                    <PermissionGuard requiredPermission={PERMISSIONS.CENTER_UPDATE}>
                        <button
                            onClick={() => setEditingCenter(item)}
                            className="text-slate-400 hover:text-blue-600 p-1"
                        >
                            <Icon name="edit" />
                        </button>
                    </PermissionGuard>
                    <PermissionGuard requiredPermission={PERMISSIONS.CENTER_DELETE}>
                        <button
                            onClick={() => setDeletingCenter(item)}
                            className="text-slate-400 hover:text-red-600 p-1"
                        >
                            <Icon name="delete" />
                        </button>
                    </PermissionGuard>
                </div>
            )
        }
    ];

    return (
        <PermissionGuard requiredPermission={PERMISSIONS.CENTER_VIEW} showMessage={true}>
            <div className="flex-1 flex flex-col gap-8 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Center Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Manage all learning centers under your organization.
                        </p>
                    </div>
                    <PermissionGuard requiredPermission={PERMISSIONS.CENTER_CREATE}>
                        <Button
                            className="flex items-center gap-2"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <Icon name="add" className="text-lg" />
                            <span>Create New Center</span>
                        </Button>
                    </PermissionGuard>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                    <DataTable
                        data={centers}
                        columns={columns}
                        isLoading={isLoading}
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

                {/* Create Modal */}
                <CentreModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={(data) => createMutation.mutate(data)}
                    mode="create"
                />

                {/* Edit Modal */}
                {editingCenter && (
                    <CentreModal
                        isOpen={!!editingCenter}
                        onClose={() => setEditingCenter(null)}
                        onSuccess={(data) => updateMutation.mutate({ id: editingCenter.id, data })}
                        initialData={editingCenter}
                        mode="edit"
                    />
                )}

                {/* Delete Modal */}
                {deletingCenter && (
                    <DeleteConfirmModal
                        isOpen={!!deletingCenter}
                        onClose={() => setDeletingCenter(null)}
                        onConfirm={async () => {
                            await deleteMutation.mutateAsync(deletingCenter.id);
                        }}
                        title="Delete Center"
                        description="Are you sure you want to delete the center"
                        itemName={deletingCenter.name}
                        warning="This will permanently remove the center and all associated class data."
                    />
                )}

                <ToastContainer toasts={toasts} removeToast={removeToast} />
            </div>
        </PermissionGuard>
    );
}
