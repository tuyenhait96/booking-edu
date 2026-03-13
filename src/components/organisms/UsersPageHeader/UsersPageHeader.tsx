"use client";

import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/utils/permissions';
import AddUserModal from '@/components/organisms/AddUserModal';
import { AcademicPromotionModal } from '@/components/organisms/AcademicPromotionModal/AcademicPromotionModal';

export const UsersPageHeader: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Users Directory</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage and monitor teacher and parents accounts across organizations.</p>
            </div>
            
            <div className="flex items-center gap-3">
                <PermissionGuard requiredPermission={PERMISSIONS.STUDENT_PROMOTION_MANAGE}>
                    <Button
                        onClick={() => setIsPromotionModalOpen(true)}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all"
                    >
                        <Icon name="trending_up" className="text-lg" />
                        <span>Bulk Promotion</span>
                    </Button>
                </PermissionGuard>

                <PermissionGuard requiredPermission={PERMISSIONS.USER_CREATE}>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                    >
                        <Icon name="person_add" className="text-lg" />
                        <span>Add New User</span>
                    </Button>
                </PermissionGuard>
            </div>

            <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <AcademicPromotionModal isOpen={isPromotionModalOpen} onClose={() => setIsPromotionModalOpen(false)} />
        </div>
    );
};
