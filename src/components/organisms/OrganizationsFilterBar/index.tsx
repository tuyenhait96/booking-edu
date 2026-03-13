"use client";

import React from 'react';
import Input from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon/Icon';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/utils/permissions';


export const OrganizationsFilterBar: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 shadow-sm">
            <PermissionGuard requiredPermission={PERMISSIONS.ORGANIZATION_SEARCH}>
                <div className="flex-1">
                    <Input
                        placeholder="Search by organization name, or ID..."
                        leftIcon={<Icon name="search" className="text-slate-400" />}
                        className="bg-slate-50 dark:bg-slate-800 border-none px-4 py-2"
                    />
                </div>
            </PermissionGuard>
        </div>
    );
};
