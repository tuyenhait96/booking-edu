"use client";

import React from 'react';
import Input from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Icon } from '@/components/atoms/Icon';

export const UsersFilterBar: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                    <Input
                        placeholder="Search name or email..."
                        leftIcon={<Icon name="search" className="text-slate-400" />}
                        className="pl-10 h-10"
                    />
                </div>
                <Select
                    placeholder="User Type: All"
                    options={[
                        { value: 'teacher', label: 'Teacher' },
                        { value: 'parent', label: 'Parent' },
                        { value: 'student', label: 'Student' },
                    ]}
                />
                <Select
                    placeholder="Tenant: All"
                    options={[
                        { value: 'oakwood', label: 'Oakwood International' },
                        { value: 'pinehurst', label: 'Pinehurst Academy' },
                        { value: 'st-marys', label: 'St. Mary\'s Secondary' },
                    ]}
                />
                <Select
                    placeholder="Status: All"
                    options={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                        { value: 'pending', label: 'Pending Invitation' },
                    ]}
                />
            </div>
        </div>
    );
};
