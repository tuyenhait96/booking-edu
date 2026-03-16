"use client";

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import AddOrganizationModal from '@/components/organisms/AddOrganizationModal/AddOrganizationModal';
import { CreateOrganizationDto } from '@/services/organizationService';
import organizationService from '@/services/organizationService';
import { useToastContext } from '@/providers/ToastProvider';
import { PERMISSIONS } from '@/utils/permissions';
import PermissionGuard from '@/components/auth/PermissionGuard';

export const OrganizationsHeader: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const { toast } = useToastContext();

    const createOrganizationMutation = useMutation({
        mutationFn: organizationService.createOrganization,
        onSuccess: () => {
            // Invalidate and refetch organizations list
            queryClient.invalidateQueries({ queryKey: ['organizations'] });
            toast({
                title: 'Success',
                description: 'Organization created successfully',
                variant: 'success',
            });
            setIsModalOpen(false);
        },
        onError: (error: unknown) => {
            const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to create organization';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'error',
            });
        },
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = (data: CreateOrganizationDto) => {
        createOrganizationMutation.mutate(data);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Organizations</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and monitor all educational organizations across the platform.</p>
                </div>
                <PermissionGuard requiredPermission={PERMISSIONS.ORGANIZATION_CREATE}>
                    <Button
                        className="font-bold px-6 py-2.5 shadow-sm"
                        onClick={handleOpenModal}
                    >
                        <Icon name="add" />
                        New Organization
                    </Button>
                </PermissionGuard>
            </div>
            <AddOrganizationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                isSubmitting={createOrganizationMutation.isPending}
            />
        </>
    );
};