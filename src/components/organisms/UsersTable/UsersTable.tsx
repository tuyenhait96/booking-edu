"use client";

import React, { useState } from 'react';
import { DataTable, Column } from '@/components/molecules/Table';
import { UserStatus } from '@/components/molecules/UserStatus';
import { UserNameBadge } from '@/components/molecules/UserNameBadge';
import Badge from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import EditUserModal from '@/components/organisms/EditUserModal';
import DeleteUserModal from '@/components/organisms/DeleteUserModal';

interface UserData {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    role: 'Teacher' | 'Parent' | 'Student';
    tenant: string;
    status: 'active' | 'inactive' | 'pending';
    lastLogin: string;
}

const USERS_DATA: UserData[] = [
    {
        id: '1',
        name: 'Sarah Jenkins',
        email: 'sarah.j@oakwood.edu',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEbTPG08Xa5PqUWUf1ufjrJhx-kRXheHgstllORYesaE98aWGc4nveSDvUaUeDVAZBmuGG22kFkPgkkYL3Qw6bfq1oe8GOlaXNF--NU2nqs2pNBaxMbVJpglHp5kyjjiceD9GrukhopqC0_vuDZUD-rprVzooVGq4Xu5bM1X70CZtFAUP-YxFfTuitu6Dmq-0uarRMG7usB9diH4-On9bk21nuI2SEpqScFmJdn3a5h8GN546-yP6wdJdBpBJe6N60YQvx3n2-tCNc',
        role: 'Teacher',
        tenant: 'Oakwood International',
        status: 'active',
        lastLogin: '2 hours ago',
    },
    {
        id: '2',
        name: 'Robert Miller',
        email: 'r.miller@gmail.com',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_OWRRdCvsiWlj4GaugF5DB3o2QLUCHyWI-d-dQQ0hh0Bpljk7Py6WQl3hrmqqYJTXaEDlfTfmO-Keg1fCv3_eAAjk6RNWV8apHDFh_60ZcZkq-MZQg53ImHJsC_TBev4dDVHFLZJa80_YE7Kz6Ha82bT09iCp0RoGMiFSMIZ3AwZ3Bil1EicAQvCP3BptycTBD2vvlRzuzAW0F-Vf-4vCgAzvE76OP1Y883XT9STxnG60sMB91Sf8OjNF7AjZgPPjx4d2eDUbOBoy',
        role: 'Parent',
        tenant: 'Pinehurst Academy',
        status: 'active',
        lastLogin: 'Yesterday, 4:15 PM',
    },
    {
        id: '3',
        name: 'Elena Rodriguez',
        email: 'e.rodriguez@stmarys.org',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTG4V98w_ysl34c6wYKDnLfDF1P75xz3FgS3Ii-d0y4_JsdYttkyoRI8bcu7_nWJ7fmJ294_g2TXShHzvxt9nW4fAxTr8qVtPCQ9TpRYF8kT4juDQS7ttCww24TqkywtYPeg-wfbAkOjtHwLpqjlgzbs6fOHQk1mpH0Q2QduKBJHYuTRZ0fDBY1iLlBDSscEy1OLsgWSe_8CFKDNWp9XKPP_25TgcxbiaHK8PBWYQa4IlxTZyZMPWhVwNe-zvsQoO18i1Zt7iBB5hq',
        role: 'Teacher',
        tenant: "St. Mary's Secondary",
        status: 'inactive',
        lastLogin: 'Oct 12, 2023',
    },
    {
        id: '4',
        name: 'Michael Chen',
        email: 'mchen@outlook.com',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKHx11HZEoMuJduwZ2hkXqZRlwDmZJpe8cZtd9_TqUrm1RBcvjx6OHvV0yMb7Uu9S0o5KPa-oy7_2lx7EX7P6g4QHXD2QJ0Qw2o-p-f3Z89Eysf1_aOQ8c_O2_LRYx5AV2-8fMBmz0ZQOBe4WnPF97m52bte3jn74yZaNaAZwYmYAypJjI9MHSSw89CWKbKXbACsKCI3JUGViZL33_o8QASluefzHQ0zh5GoTkCV_igdystRtwuqqw-lkRlC7kkj91XoOFXw6UWg3j',
        role: 'Parent',
        tenant: 'Oakwood International',
        status: 'pending',
        lastLogin: 'Never',
    },
    {
        id: '5',
        name: 'James Wilson',
        email: 'j.wilson@oakwood.edu',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKHx11HZEoMuJduwZ2hkXqZRlwDmZJpe8cZtd9_TqUrm1RBcvjx6OHvV0yMb7Uu9S0o5KPa-oy7_2lx7EX7P6g4QHXD2QJ0Qw2o-p-f3Z89Eysf1_aOQ8c_O2_LRYx5AV2-8fMBmz0ZQOBe4WnPF97m52bte3jn74yZaNaAZwYmYAypJjI9MHSSw89CWKbKXbACsKCI3JUGViZL33_o8QASluefzHQ0zh5GoTkCV_igdystRtwuqqw-lkRlC7kkj91XoOFXw6UWg3j',
        role: 'Student',
        tenant: 'Oakwood International',
        status: 'active',
        lastLogin: '1 hour ago',
    },
    {
        id: '6',
        name: 'Emily Davis',
        email: 'e.davis@oakwood.edu',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKHx11HZEoMuJduwZ2hkXqZRlwDmZJpe8cZtd9_TqUrm1RBcvjx6OHvV0yMb7Uu9S0o5KPa-oy7_2lx7EX7P6g4QHXD2QJ0Qw2o-p-f3Z89Eysf1_aOQ8c_O2_LRYx5AV2-8fMBmz0ZQOBe4WnPF97m52bte3jn74yZaNaAZwYmYAypJjI9MHSSw89CWKbKXbACsKCI3JUGViZL33_o8QASluefzHQ0zh5GoTkCV_igdystRtwuqqw-lkRlC7kkj91XoOFXw6UWg3j',
        role: 'Student',
        tenant: 'Oakwood International',
        status: 'active',
        lastLogin: '30 mins ago',
    },
];

export const UsersTable: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const handleEditClick = (user: UserData) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (user: UserData) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const handleConfirmDelete = () => {
        // Here you would typically make an API call to delete the user
        console.log("User deleted:", selectedUser);
        // You might want to update the USERS_DATA array or refetch data
    };

    const columns: Column<UserData>[] = [
        {
            header: 'Name',
            render: (item) => (
                <UserNameBadge
                    name={item.name}
                    email={item.email}
                    avatarUrl={item.avatarUrl}
                />
            ),
        },
        {
            header: 'Role',
            render: (item) => (
                <Badge variant={item.role === 'Teacher' ? 'info' : item.role === 'Student' ? 'success' : 'orange'}>
                    {item.role}
                </Badge>
            ),
        },
        {
            header: 'Tenant',
            className: "text-sm",
            render: (item) => item.tenant,
        },
        {
            header: 'Status',
            render: (item) => <UserStatus status={item.status} />,
        },
        {
            header: 'Last Login',
            className: "text-sm text-slate-500",
            render: (item) => item.lastLogin,
        },
        {
            header: 'Actions',
            headerClassName: "text-right",
            className: "text-right",
            render: (item) => (
                <div className="flex justify-end gap-2">
                    {/* Only show edit button for Student and Teacher roles */}
                    {(item.role === 'Student' || item.role === 'Teacher') && (
                        <button
                            onClick={() => handleEditClick(item)}
                            className="text-slate-400 hover:text-primary transition-colors p-1"
                            title="Edit user"
                        >
                            <Icon name="edit" className="text-lg" />
                        </button>
                    )}
                    <button
                        onClick={() => handleDeleteClick(item)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Delete user"
                    >
                        <Icon name="delete" className="text-lg" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={USERS_DATA}
                columns={columns}
                pagination={{
                    currentPage: 1,
                    totalPages: 32,
                    totalItems: 1248,
                    itemsPerPage: 4,
                    unit: 'users',
                    onPageChange: (page) => console.log(`Page: ${page}`),
                }}
            />

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                user={selectedUser}
            />

            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                user={selectedUser}
            />
        </>
    );
};
