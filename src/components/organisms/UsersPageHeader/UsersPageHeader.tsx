"use client";

import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import AddUserModal from '@/components/organisms/AddUserModal';

export const UsersPageHeader: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Users Directory</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage and monitor teacher and parents accounts across tenants.</p>
            </div>
            <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all"
            >
                <Icon name="person_add" className="text-lg" />
                <span>Add New User</span>
            </Button>

            <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};
