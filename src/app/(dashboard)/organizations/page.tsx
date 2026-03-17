import React from 'react';
import { OrganizationsHeader } from '@/components/organisms/OrganizationsHeader';
// import { OrganizationsFilterBar } from '@/components/organisms/OrganizationsFilterBar';
import { OrganizationsTable } from '@/components/organisms/OrganizationsTable/OrganizationsTable';

export default function OrganizationsPage() {
    return (
        <>
            <OrganizationsHeader />
            {/* <OrganizationsFilterBar /> */}
            <OrganizationsTable />
        </>
    );
}
