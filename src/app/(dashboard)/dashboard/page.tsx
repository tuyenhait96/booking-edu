"use client";

import { StatsGrid } from "@/components/organisms/StatsGrid";
import { RegistrationsChart } from "@/components/organisms/RegistrationsChart";
import { TenantsTable } from "@/components/organisms/TenantsTable";
import { StrategicOverview } from "@/components/organisms/StrategicOverview";
import { useAuthStore } from "@/store/useAuthStore";
import { Icon } from "@/components/atoms/Icon";

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);

    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h2>
                <p className="text-slate-500">Welcome back. Here&apos;s what&apos;s happening across the network today.</p>
            </div>

            <StrategicOverview />

            <StatsGrid />

            {/* RBAC Demonstration: Permissions Overview */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Icon name="verified_user" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Permissions</h3>
                        <p className="text-sm text-slate-500">Your account currently has the following system-wide capabilities.</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {user?.permissions?.map((permission) => (
                        <span 
                            key={permission} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                            {permission}
                        </span>
                    ))}
                    {(!user?.permissions || user.permissions.length === 0) && (
                        <p className="text-sm text-slate-400 italic">No specific permissions assigned.</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RegistrationsChart />
                <TenantsTable />
            </div>
        </>
    );
}
