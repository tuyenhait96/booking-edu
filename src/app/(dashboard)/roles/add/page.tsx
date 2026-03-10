"use client";

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/atoms/Icon';
import { RoleForm } from '@/components/organisms/RoleForm';

export default function AddRolePage() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1 group">
                        <Link href="/roles" className="flex items-center gap-1 hover:underline">
                            <Icon name="arrow_back" className="text-lg group-hover:-translate-x-1 transition-transform" />
                            Back to Roles
                        </Link>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Add New Role</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                        Create a new security role by defining its name, description, and specific module permissions.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                <RoleForm />
            </div>
        </div>
    );
}
