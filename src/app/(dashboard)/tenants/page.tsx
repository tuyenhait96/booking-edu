import React from 'react';
import { TenantsHeader } from '@/components/organisms/TenantsHeader';
import { TenantsFilterBar } from '@/components/organisms/TenantsFilterBar';
import { TenantsTable } from '@/components/organisms/TenantsTable/TenantsTable';

export default function TenantsPage() {
    return (
        <>
            <TenantsHeader />
            <TenantsFilterBar />
            <TenantsTable />
        </>
    );
}
