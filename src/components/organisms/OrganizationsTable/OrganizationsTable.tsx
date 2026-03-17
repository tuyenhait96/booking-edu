"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/atoms/Icon';
import { DataTable, Column } from '@/components/molecules/Table';
import AddOrganizationModal from '@/components/organisms/AddOrganizationModal/AddOrganizationModal';
import { CreateOrganizationDto } from '@/services/organizationService';
import { DeleteOrganizationConfirmationModal } from '@/components/organisms/DeleteOrganizationConfirmationModal/DeleteOrganizationConfirmationModal';
import { useToastContext } from '@/providers/ToastProvider';
import { Organization } from '@/types';
import organizationService from '@/services/organizationService';
import Badge from '@/components/atoms/Badge';
import { formatPhone } from '@/utils/format';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/utils/permissions';

export const OrganizationsTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
    const [editFormData, setEditFormData] = useState<CreateOrganizationDto | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [organizationsData, setOrganizationsData] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToastContext();

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await organizationService.getOrganizations();
                setOrganizationsData(response.data || []);
            } catch (error) {
                console.error('Failed to fetch organizations:', error);
                setOrganizationsData([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrganizations();
    }, []);

    const itemsPerPage = 10;
    const totalItems = organizationsData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = organizationsData.slice(startIndex, startIndex + itemsPerPage);

    const handleEditClick = (organization: Organization) => {
        const formData: CreateOrganizationDto = {
            name: organization.name,
            phone: organization.phone,
            email: organization.email,
            address: organization.address,
            maxCenters: organization.maxCenters,
        };
        setSelectedOrganization(organization);
        setEditFormData(formData);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (data: CreateOrganizationDto) => {
        if (selectedOrganization) {
            try {
                await organizationService.updateOrganization(selectedOrganization.id, data);

                const updatedOrganizations = organizationsData.map(org => {
                    if (org.id === selectedOrganization.id) {
                        return {
                            ...org,
                            ...data
                        };
                    }
                    return org;
                });
                setOrganizationsData(updatedOrganizations);

                toast({
                    title: 'Success',
                    description: `Organization "${data.name}" updated successfully`,
                    variant: 'success',
                });
            } catch {
                toast({
                    title: 'Error',
                    description: 'Failed to update organization',
                    variant: 'error',
                });
            }
        }
        setIsEditModalOpen(false);
        setSelectedOrganization(null);
        setEditFormData(null);
    };

    const handleDeleteClick = (organization: Organization) => {
        setSelectedOrganization(organization);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedOrganization) return;

        setIsDeleting(true);

        try {
            await organizationService.deleteOrganization(selectedOrganization.id);

            const updatedOrganizations = organizationsData.filter(o => o.id !== selectedOrganization.id);
            setOrganizationsData(updatedOrganizations);

            toast({
                title: 'Success',
                description: `Organization "${selectedOrganization.name}" deleted successfully`,
                variant: 'success',
            });

            setIsDeleteModalOpen(false);
            setSelectedOrganization(null);
        } catch (error) {
            console.error('Failed to delete organization:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete organization. Please try again.',
                variant: 'error',
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: Column<Organization>[] = [
        {
            header: 'Organization Name',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden shrink-0 relative text-primary">
                        {item.image ? (
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        ) : (
                            <Icon name="corporate_fare" />
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Phone',
            render: (item) => <span className="text-sm text-slate-500 dark:text-slate-400">{formatPhone(item.phone)}</span>
        },
        {
            header: 'Max Centers',
            render: (item) => (
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-black text-xs">
                        {item.maxCenters || 0}
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Centers</span>
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
            header: 'Date Joined',
            render: (item) => <span className="text-sm text-slate-500 dark:text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</span>
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            render: (item) => (
                <div className="flex justify-end gap-2">
                    <PermissionGuard requiredPermission={PERMISSIONS.ORGANIZATION_UPDATE}>
                        <button
                            onClick={() => handleEditClick(item)}
                            className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                            title="Edit organization"
                        >
                            <Icon name="edit" />
                        </button>
                    </PermissionGuard>
                    <PermissionGuard requiredPermission={PERMISSIONS.ORGANIZATION_DELETE}>
                        <button
                            onClick={() => handleDeleteClick(item)}
                            className="text-slate-400 hover:text-red-600 transition-colors p-1"
                            title="Delete organization"
                        >
                            <Icon name="delete" />
                        </button>
                    </PermissionGuard>
                </div>
            )
        }
    ];

    return (
        <PermissionGuard requiredPermission={PERMISSIONS.ORGANIZATION_VIEW}>
            <DataTable
                data={paginatedData}
                columns={columns}
                isLoading={isLoading}
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: setCurrentPage,
                    totalItems,
                    itemsPerPage,
                    unit: 'organizations'
                }}
            />
            <AddOrganizationModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedOrganization(null);
                    setEditFormData(null);
                }}
                mode="edit"
                initialData={editFormData || undefined}
                onSubmit={handleEditSubmit}
            />
            <DeleteOrganizationConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedOrganization(null);
                }}
                onConfirm={handleDeleteConfirm}
                organizationName={selectedOrganization?.name || ''}
                isDeleting={isDeleting}
            />
        </PermissionGuard>
    );
};
