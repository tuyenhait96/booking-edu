"use client";

import React from 'react';
import Input from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon/Icon';
import { FilterSelect } from '@/components/molecules/FilterSelect';

const TYPE_OPTIONS = [
    { value: 'all', label: 'All Types' },
    { value: 'higher-ed', label: 'Higher Ed' },
    { value: 'k-12', label: 'K-12' },
];

const STATUS_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active Only' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
];

export const TenantsFilterBar: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 shadow-sm">
            <div className="flex-1">
                <Input
                    placeholder="Search by tenant name, ID, or domain..."
                    leftIcon={<Icon name="search" className="text-slate-400" />}
                    className="bg-slate-50 dark:bg-slate-800 border-none px-4 py-2"
                />
            </div>
            <div className="flex flex-wrap gap-2">
                <FilterSelect
                    options={TYPE_OPTIONS}
                    defaultValue={TYPE_OPTIONS[0]}
                />
                <FilterSelect
                    options={STATUS_OPTIONS}
                    defaultValue={STATUS_OPTIONS[0]}
                />
            </div>
        </div>
    );
};
