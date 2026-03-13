"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, Column } from '@/components/molecules/Table';
import { RoleIcon } from '@/components/atoms/RoleIcon';
import { PermissionBadge } from '@/components/atoms/PermissionBadge';
import { Icon } from '@/components/atoms/Icon';
import { DeleteRoleConfirmation } from '@/components/organisms/DeleteRoleConfirmation';

interface RoleData {
    id: string;
    name: string;
    description: string;
    activeUsers: number;
    permissions: string[];
    icon: string;
    color: 'red' | 'blue' | 'emerald' | 'amber';
}

const ROLES_DATA: RoleData[] = [
    {
        id: '1',
        name: 'Super Admin',
        description: 'Master access to all system modules, configurations, and logs.',
        activeUsers: 2,
        permissions: [PERMISSIONS.ORGANIZATION_VIEW, PERMISSIONS.ORGANIZATION_CREATE, PERMISSIONS.ORGANIZATION_UPDATE, PERMISSIONS.ORGANIZATION_DELETE, PERMISSIONS.ORGANIZATION_SEARCH],
        icon: 'security',
        color: 'red',
    },
    {
        id: '2',
        name: 'Org Admin',
        description: 'Manage individual organization operations, centers, and student enrollments.',
        activeUsers: 12,
        permissions: [PERMISSIONS.DASHBOARD_VIEW, PERMISSIONS.CENTER_VIEW, PERMISSIONS.CENTER_CREATE, PERMISSIONS.CENTER_UPDATE, PERMISSIONS.CENTER_DELETE, PERMISSIONS.CENTER_SEARCH, PERMISSIONS.CLASSES_VIEW],
        icon: 'corporate_fare',
        color: 'blue',
    },
];

import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/utils/permissions';

export const RolesTable: React.FC = () => {
    const router = useRouter();
    const [roles, setRoles] = useState<RoleData[]>(ROLES_DATA);
    const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleEditClick = (role: RoleData) => {
        // Navigate to the edit page instead of opening a modal
        router.push(`/roles/edit/${role.id}`);
    };

    const handleDeleteClick = (role: RoleData) => {
        setSelectedRole(role);
        setIsDeleteModalOpen(true);
    };



    const handleDeleteRole = (roleId: string) => {
        setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
        // In a real app, you would make an API call here
        console.log('Role deleted:', roleId);
    };

    const columns: Column<RoleData>[] = [
        {
            header: 'Role Name',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <RoleIcon iconName={item.icon} colorVariant={item.color} />
                    <span className="font-bold text-slate-900 dark:text-white">{item.name}</span>
                </div>
            ),
        },
        {
            header: 'Description',
            className: "text-sm text-slate-500 dark:text-slate-400",
            render: (item) => item.description,
        },
        {
            header: 'Active Users',
            headerClassName: "text-center",
            className: "text-center",
            render: (item) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {item.activeUsers}
                </span>
            ),
        },
        {
            header: 'Key Permissions',
            render: (item) => (
                <div className="flex flex-wrap gap-1.5">
                    {item.permissions.map((perm, idx) => (
                        <PermissionBadge key={idx}>{perm}</PermissionBadge>
                    ))}
                </div>
            ),
        },
        {
            header: 'Actions',
            headerClassName: "text-right",
            className: "text-right",
            render: (item) => (
                <div className="flex justify-end gap-1">
                    <PermissionGuard requiredPermission={PERMISSIONS.ROLE_UPDATE}>
                        <button
                            className="p-2 text-slate-400 hover:text-primary transition-colors"
                            onClick={() => handleEditClick(item)}
                            aria-label={`Edit ${item.name}`}
                        >
                            <Icon name="edit" />
                        </button>
                    </PermissionGuard>

                    <PermissionGuard requiredPermission={PERMISSIONS.ROLE_DELETE}>
                        <button
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            onClick={() => handleDeleteClick(item)}
                            aria-label={`Delete ${item.name}`}
                        >
                            <Icon name="delete" />
                        </button>
                    </PermissionGuard>
                </div>
            ),
        },
    ];

    return (
        <PermissionGuard requiredPermission={PERMISSIONS.ROLE_VIEW} showMessage={true}>
            <DataTable
                data={roles}
                columns={columns}
            />

            <DeleteRoleConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                role={selectedRole}
                onDelete={handleDeleteRole}
            />
        </PermissionGuard>
    );
};
