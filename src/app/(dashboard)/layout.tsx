import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { MaintenanceGuard } from '@/components/auth/MaintenanceGuard';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            <MaintenanceGuard>
                {children}
            </MaintenanceGuard>
        </DashboardLayout>
    );
}
