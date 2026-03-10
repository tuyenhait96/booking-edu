import React from 'react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { TopHeader } from '@/components/organisms/TopHeader';

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex text-slate-900 dark:text-slate-100 font-display h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-light dark:bg-background-dark">
                <TopHeader />
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
