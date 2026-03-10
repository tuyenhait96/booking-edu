"use client";

import React from 'react';
import { UsersPageHeader } from '@/components/organisms/UsersPageHeader';
import { UsersFilterBar } from '@/components/organisms/UsersFilterBar';
import { UsersTable } from '@/components/organisms/UsersTable';

export default function UsersPage() {
    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            {/* Title Section */}
            <UsersPageHeader />

            {/* Filters Section */}
            <UsersFilterBar />

            {/* Table Section */}
            <UsersTable />
        </div>
    );
}
