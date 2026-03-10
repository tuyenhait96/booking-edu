"use client";

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import AddTenantModal, { TenantFormData } from '@/components/organisms/AddTenantModal';
import tenantService from '@/services/tenantService';
import { useToastContext } from '@/providers/ToastProvider';

export const TenantsHeader: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const { toast } = useToastContext();

    const createTenantMutation = useMutation({
        mutationFn: tenantService.createTenant,
        onSuccess: () => {
            // Invalidate and refetch tenants list
            queryClient.invalidateQueries({ queryKey: ['tenants'] });
            toast({
                title: 'Success',
                description: 'Tenant created successfully',
                variant: 'success',
            });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to create tenant',
                variant: 'error',
            });
        },
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = (data: TenantFormData) => {
        createTenantMutation.mutate(data);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Tenants</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and monitor all educational tenants across the platform.</p>
                </div>
                <Button
                    className="font-bold px-6 py-2.5 shadow-sm"
                    onClick={handleOpenModal}
                >
                    <Icon name="add" />
                    New Tenant
                </Button>
            </div>
            <AddTenantModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                isSubmitting={createTenantMutation.isPending}
            />
        </>
    );
};