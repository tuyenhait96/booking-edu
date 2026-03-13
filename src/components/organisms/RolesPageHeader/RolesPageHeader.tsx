import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import Link from 'next/link';
import Button from '@/components/atoms/Button';

import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/utils/permissions';

export const RolesPageHeader: React.FC = () => {
    return (
        <div className="flex items-end justify-between">
            <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Roles</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                    Configure and manage system-wide access levels, functional permissions, and security roles for all users.
                </p>
            </div>

            <PermissionGuard requiredPermission={PERMISSIONS.ROLE_CREATE}>
                <Link href="/roles/add">
                    <Button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md">
                        <Icon name="add" className="text-xl" />
                        <span>Add New Role</span>
                    </Button>
                </Link>
            </PermissionGuard>
        </div>
    );
};
