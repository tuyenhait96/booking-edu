"use client";

import React, { useState } from 'react';
import { RolesPageHeader } from '@/components/organisms/RolesPageHeader';
import { RolesTable } from '@/components/organisms/RolesTable';

export default function RolesPage() {
    return (
        <div>
            <div className="space-y-8 animate-fade-in">
                <RolesPageHeader />

                {/* Roles Table */}
                <RolesTable />
            </div>
        </div>
    );
}
