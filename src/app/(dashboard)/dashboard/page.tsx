import { StatsGrid } from "@/components/organisms/StatsGrid";
import { RegistrationsChart } from "@/components/organisms/RegistrationsChart";
import { TenantsTable } from "@/components/organisms/TenantsTable";

export default function DashboardPage() {
    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h2>
                <p className="text-slate-500">Welcome back. Here&apos;s what&apos;s happening across the network today.</p>
            </div>

            <StatsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RegistrationsChart />
                <TenantsTable />
            </div>
        </>
    );
}
