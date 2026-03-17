"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { DataTable, Column } from '@/components/molecules/Table';
import { Center } from '@/types';
import centerService from '@/services/centerService';
import { CentreModal } from '@/components/organisms/CentreModal/CentreModal';
import { CenterDetailDrawer } from '@/components/organisms/CenterDetailDrawer/CenterDetailDrawer';
import { CreateClassModal } from '@/components/organisms/CreateClassModal/CreateClassModal';
import { CreateClassroomModal } from '@/components/organisms/CreateClassroomModal/CreateClassroomModal';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/molecules/Toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import classService from '@/services/classService';
import resourceService from '@/services/resourceService';
import { formatPhone } from '@/utils/format';
import { PERMISSIONS } from '@/utils/permissions';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { CreateCenterManagerModal } from '@/components/organisms/CreateCenterManagerModal/CreateCenterManagerModal';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function CentersPage() {
    const queryClient = useQueryClient();
    const { toast, toasts, removeToast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCenter, setEditingCenter] = useState<Center | null>(null);
    const [deletingCenter, setDeletingCenter] = useState<Center | null>(null);
    const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
    const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
    const [isCreateClassroomModalOpen, setIsCreateClassroomModalOpen] = useState(false);
    const [isCreateManagerModalOpen, setIsCreateManagerModalOpen] = useState(false);
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const itemsPerPage = 5;

    // ... (centers query)
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
        mutationFn: (data: any) =>
            centerService.createCenter({
                organizationId: user?.organizationId,
                name: data.name,
                code: data.code,
                phone: data.phone,
                email: data.email,
                address: data.address
            }),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Center created successfully',
                variant: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['centers'] });
            setIsCreateModalOpen(false);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to create center',
                variant: 'error'
            });
        }
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            centerService.updateCenter(id, {
                organizationId: user?.organizationId || editingCenter?.organizationId,
                name: data.name,
                code: data.code,
                phone: data.phone,
                email: data.email,
                address: data.address
            }),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Center updated successfully',
                variant: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['centers'] });
            setEditingCenter(null);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to update center',
                variant: 'error'
            });
        }
    });

    // Create Class mutation
    const createClassMutation = useMutation({
        mutationFn: classService.createClass,
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Class created successfully',
                variant: 'success'
            });
            setIsCreateClassModalOpen(false);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to create class',
                variant: 'error'
            });
        }
    });

    // Create Classroom mutation
    const createClassroomMutation = useMutation({
        mutationFn: resourceService.createClassroom,
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Classroom created successfully',
                variant: 'success'
            });
            setIsCreateClassroomModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ['classrooms'] });
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to create classroom',
                variant: 'error'
            });
        }
    });

    // Create Manager mutation
    const createManagerMutation = useMutation({
        mutationFn: (data: any) => centerService.createCenterManager({
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            organizationId: user?.organizationId || '',
            centerId: data.centerIds[0] || '', // Still send the first one as primary centerId if needed
            profile: {
                centerIds: data.centerIds
            }
        }),
        onSuccess: (response) => {
            toast({
                title: 'Success',
                description: response.data?.message || response.message || 'Center manager account created successfully',
                variant: 'success'
            });
            setIsCreateManagerModalOpen(false);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to create center manager account',
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
            render: (item: Center) => (
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
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditingCenter(item);
                            }}
                            className="text-slate-400 hover:text-blue-600 p-1"
                        >
                            <Icon name="edit" />
                        </button>
                    </PermissionGuard>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/centers/${item.id}/stats`);
                        }}
                        className="text-slate-400 hover:text-emerald-600 p-1"
                        title="Statistics"
                    >
                        <Icon name="trending_up" />
                    </button>
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
                    <div className="flex items-center gap-3">
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
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                    <DataTable
                        data={centers}
                        columns={columns}
                        isLoading={isLoading}
                        onRowClick={(item) => setSelectedCenter(item)}
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
                        initialData={{
                            name: editingCenter.name,
                            code: editingCenter.code,
                            phone: editingCenter.phone || '',
                            email: editingCenter.email || '',
                            address: editingCenter.address || ''
                        }}
                        mode="edit"
                    />
                )}

                {/* Center Detail Drawer */}
                <CenterDetailDrawer
                    isOpen={!!selectedCenter}
                    onClose={() => setSelectedCenter(null)}
                    center={selectedCenter}
                    onCreateManager={() => setIsCreateManagerModalOpen(true)}
                />

                {/* Create Class Modal */}
                {selectedCenter && (
                    <CreateClassModal
                        isOpen={isCreateClassModalOpen}
                        onClose={() => setIsCreateClassModalOpen(false)}
                        onSuccess={(data) => createClassMutation.mutate(data)}
                        centerId={selectedCenter.id}
                    />
                )}

                {/* Create Classroom Modal */}
                {selectedCenter && (
                    <CreateClassroomModal
                        isOpen={isCreateClassroomModalOpen}
                        onClose={() => setIsCreateClassroomModalOpen(false)}
                        onSuccess={(data) => createClassroomMutation.mutate(data)}
                        centerId={selectedCenter.id}
                    />
                )}

                {/* Create Center Manager Modal */}
                <CreateCenterManagerModal
                    isOpen={isCreateManagerModalOpen}
                    onClose={() => setIsCreateManagerModalOpen(false)}
                    centers={centers}
                    onSuccess={(data) => createManagerMutation.mutate(data)}
                    initialCenterId={selectedCenter?.id}
                />

                <ToastContainer toasts={toasts} removeToast={removeToast} />
            </div>
        </PermissionGuard>
    );
}
