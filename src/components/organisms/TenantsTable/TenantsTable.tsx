"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/atoms/Icon';
import { TenantTypeBadge } from '@/components/molecules/TenantTypeBadge';
import { TenantStatusBadge } from '@/components/molecules/TenantStatusBadge';
import { DataTable, Column } from '@/components/molecules/Table';
import AddTenantModal, { TenantFormData } from '@/components/organisms/AddTenantModal';
import { DeleteTenantConfirmationModal } from '@/components/organisms/DeleteTenantConfirmationModal';
import { useToastContext } from '@/providers/ToastProvider';

interface Tenant {
    id: string;
    name: string;
    domain: string;
    image: string;
    type: string;
    plan: string;
    status: 'active' | 'inactive' | 'pending';
    date: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}

const TENANTS_DATA: Tenant[] = [
    {
        id: '1',
        name: "Stanford Academy",
        domain: "stanford.educms.io",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3eVc1St3_Hj-dRbRi-Vc_KtvJCD453Sf7fVGQUDz263A0w6CDsvEleuFczo1OWzxa1rvXQbPffPdhzklZAv2_Cp423roXD1DiKIQG5gYNqU_aqsBL0VqwJIum_xoc0rcspJoV1eWsjrVnq3oSRoEY2b7PwARePmIaNK609NpZZziYSw80FK_TWOpFAJiRzXWlDdqTVHbuJe-0GkvwTldCzIlcoAYVbF9jBzNc46oaXHqLm01ckMMq4ez84gd4yTFiHx1z11kayyoV",
        type: 'Higher Ed',
        plan: 'Enterprise',
        status: 'active',
        date: 'Oct 12, 2023',
        contactName: 'John Doe',
        contactEmail: 'admin@stanford.edu',
        contactPhone: '+1-555-123-4567'
    },
    {
        id: '2',
        name: 'Maplewood High',
        domain: "maplewood.educms.io",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyaL_6jUZxs4V5XGeHeQ9s7YTYJO3abal0iUmLzihnGpnwqdXDer9OYnDGVytiixH6OeKj5e20qQMUpwhZ-E4qV56HLYo2DnJHelREgcne9gVLKL6axKnuwCxygVipZdjHuTWcWf97XHfeHhwCpYKz2xiCyfxmyMHF8UzCU8JTp44Ur0wnF5iwjnVWhIabsYfYYgih7FEkBDdmg02f1b52YGtNNG0DsbiOj74lwh4DqEjMaC4fb_GGgU3UlWhwQUPfCzqUezGLtvHJ",
        type: 'K-12',
        plan: 'Standard',
        status: 'active',
        date: 'Nov 05, 2023',
        contactName: 'Jane Smith',
        contactEmail: 'jane.smith@maplewood.edu',
        contactPhone: '+1-555-987-6543'
    },
    {
        id: '3',
        name: 'West Coast Tech',
        domain: "wctech.educms.io",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLAZqNceJtKNLozC6GkYiIr8HbYJ9tjH1yIZNkm6r5HMo65L8zwixErAS5dA2K5o_DYhrYdCkqvl075Q47wfjmE4RffEPyqplYXeuEm4rqQNJ-08k7_v-mOy5Fs0I6mC91ynpiAfYcAxDbHbFCBd4jT9krT8mXowtyXrAzGVLf9Gp-y0UxlCLGaIEXydWdWE9FR11yTzzPbO__nnlM8rAuLnY1necTAfnMOtzpMNI8b3spPH4aH5gdrOXMT3PQEX5-FJJep-_bEMGS",
        type: 'Higher Ed',
        plan: 'Basic',
        status: 'inactive',
        date: 'Dec 20, 2023',
        contactName: 'Robert Johnson',
        contactEmail: 'rjohnson@wctech.edu',
        contactPhone: '+1-555-456-7890'
    },
    {
        id: '4',
        name: 'Riverdale Elementary',
        domain: "riverdale.educms.io",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALMmVvA1M6F_9zKJWWG1cqZz8RBxRCmP6IYCPNuhYrLuaIoYlRSvoYHg8I7HrBdCshnV7XJ2xQAWMxqkLPMNoiUnIvol8yHNEBDlM5t9YLMzW22c2zEVNBfmCePE2RdIa3vEGQiCSZx545UEGl3EDdVS-Si2PLt_bjHA7ixnWsj2fFSMNC_3ZzaulbZSiWANF8aCcXalZb-y3zTTsP6j4cCxWa_A-bVmglG3B1zc4mBIlrSsj5PyK7yGYrYaBuCSuHqZj54ruvTc7A",
        type: 'K-12',
        plan: 'Standard',
        status: 'pending',
        date: 'Jan 14, 2024',
        contactName: 'Sarah Miller',
        contactEmail: 'sarah.miller@riverdale.edu',
        contactPhone: '+1-555-234-5678'
    },
];

export const TenantsTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
    const [editFormData, setEditFormData] = useState<TenantFormData | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [tenantsData, setTenantsData] = useState<Tenant[]>(TENANTS_DATA);
    const { toast } = useToastContext();
    const itemsPerPage = 2;
    const totalItems = tenantsData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = tenantsData.slice(startIndex, startIndex + itemsPerPage);

    const handleEditClick = (tenant: Tenant) => {
        // Map the tenant data to match the form structure
        const formData: TenantFormData = {
            name: tenant.name,
            domain: tenant.domain,
            type: tenant.type === 'Higher Ed' ? 'higher-ed' : tenant.type === 'K-12' ? 'k12' : tenant.type,
            plan: tenant.plan.toLowerCase(),
            contactName: tenant.contactName,
            contactEmail: tenant.contactEmail,
            contactPhone: tenant.contactPhone
        };
        setSelectedTenant(tenant);
        setEditFormData(formData);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (data: TenantFormData) => {
        if (selectedTenant) {
            // Update the tenant in the local state
            const updatedTenants = tenantsData.map(tenant => {
                if (tenant.id === selectedTenant.id) {
                    return {
                        ...tenant,
                        name: data.name,
                        domain: data.domain,
                        type: data.type === 'higher-ed' ? 'Higher Ed' : data.type === 'k12' ? 'K-12' : data.type,
                        plan: data.plan.charAt(0).toUpperCase() + data.plan.slice(1),
                        contactName: data.contactName,
                        contactEmail: data.contactEmail,
                        contactPhone: data.contactPhone
                    };
                }
                return tenant;
            });
            setTenantsData(updatedTenants);
            console.log('Updated tenant:', selectedTenant.id, data);

            // Show success toast
            toast({
                title: 'Success',
                description: `Tenant "${data.name}" updated successfully`,
                variant: 'success',
            });
        }
        setIsEditModalOpen(false);
        setSelectedTenant(null);
        setEditFormData(null);
    };

    const handleDeleteClick = (tenant: Tenant) => {
        setSelectedTenant(tenant);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedTenant) return;

        setIsDeleting(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Remove the tenant from the local state
            const updatedTenants = tenantsData.filter(t => t.id !== selectedTenant.id);
            setTenantsData(updatedTenants);
            console.log('Deleted tenant:', selectedTenant.id);

            // Show success toast
            toast({
                title: 'Success',
                description: `Tenant "${selectedTenant.name}" deleted successfully`,
                variant: 'success',
            });

            // Close the modal
            setIsDeleteModalOpen(false);
            setSelectedTenant(null);
        } catch (error) {
            console.error('Failed to delete tenant:', error);

            // Show error toast
            toast({
                title: 'Error',
                description: 'Failed to delete tenant. Please try again.',
                variant: 'error',
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: Column<Tenant>[] = [
        {
            header: 'Tenant Name',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden shrink-0 relative">
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.domain}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Type',
            render: (item) => <TenantTypeBadge type={item.type} />
        },
        {
            header: 'Plan',
            render: (item) => <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.plan}</span>
        },
        {
            header: 'Status',
            render: (item) => <TenantStatusBadge status={item.status} />
        },
        {
            header: 'Date Joined',
            render: (item) => <span className="text-sm text-slate-500 dark:text-slate-400">{item.date}</span>
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            render: (item) => (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => handleEditClick(item)}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                        title="Edit tenant"
                    >
                        <Icon name="edit" />
                    </button>
                    <button
                        onClick={() => handleDeleteClick(item)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Delete tenant"
                    >
                        <Icon name="delete" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <>
            <DataTable
                data={paginatedData}
                columns={columns}
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: setCurrentPage,
                    totalItems,
                    itemsPerPage,
                    unit: 'tenants'
                }}
            />
            <AddTenantModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedTenant(null);
                    setEditFormData(null);
                }}
                mode="edit"
                initialData={editFormData || undefined}
                onSubmit={handleEditSubmit}
            />
            <DeleteTenantConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedTenant(null);
                }}
                onConfirm={handleDeleteConfirm}
                tenantName={selectedTenant?.name || ''}
                isDeleting={isDeleting}
            />
        </>
    );
};
