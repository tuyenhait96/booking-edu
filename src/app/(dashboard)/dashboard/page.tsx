"use client";

import React from 'react';
import { StatsGrid } from "@/components/organisms/StatsGrid";
import { StrategicOverview } from "@/components/organisms/StrategicOverview";
import dashboardService from "@/services/dashboardService";
import { useQuery } from '@tanstack/react-query';

import { CenterOverview } from "@/components/organisms/CenterOverview";
import { PERMISSIONS } from "@/utils/permissions";
import PermissionGuard from "@/components/auth/PermissionGuard";

export default function DashboardPage() {
    const { data: dashboardResponse } = useQuery({
        queryKey: ['dashboard'],
        queryFn: () => dashboardService.getDashboardData(),
    });

    const dashboardData = dashboardResponse?.data;

    return (
        <PermissionGuard requiredPermission={PERMISSIONS.DASHBOARD_VIEW} showMessage={true}>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h2>
                    <p className="text-slate-500">Welcome back. Here&apos;s what&apos;s happening across the network today.</p>
                </div>

                <CenterOverview center={dashboardData?.center} />

                <StrategicOverview summary={dashboardData?.summary} />

                <StatsGrid summary={dashboardData?.summary} />
            </div>
        </PermissionGuard>
    );
}
