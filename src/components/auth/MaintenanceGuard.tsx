"use client";

import React from 'react';
import { useCentreStore } from '@/store/useCentreStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';

interface MaintenanceGuardProps {
    children: React.ReactNode;
}

export const MaintenanceGuard: React.FC<MaintenanceGuardProps> = ({ children }) => {
    const { isMaintenanceMode } = useCentreStore();
    const { user } = useAuthStore();

    // If maintenance mode is active and user is NOT an admin/super_admin/platform_admin, show maintenance screen
    const canBypass =
        user?.role === 'admin' ||
        user?.role === 'super_admin' ||
        user?.role === 'platform_admin';

    const showMaintenance = isMaintenanceMode && !canBypass;

    if (showMaintenance) {
        return (
            <div className="fixed inset-0 z-[9999] bg-white dark:bg-slate-950 flex items-center justify-center p-6 animate-in fade-in duration-500">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="relative inline-block">
                        <div className="size-24 rounded-3xl bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/40 animate-bounce-slow">
                            <Icon name="construction" className="text-5xl" />
                        </div>
                        <div className="absolute -top-2 -right-2 size-8 rounded-full bg-amber-500 text-white flex items-center justify-center border-4 border-white dark:border-slate-950 animate-pulse">
                            <Icon name="warning" className="text-sm" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Under Maintenance</h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                            We&apos;re currently performing some essential updates to improve your experience. We&apos;ll be back shortly!
                        </p>
                    </div>

                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Estimated downtime: <span className="text-slate-900 dark:text-white font-bold">~15 minutes</span>
                        </p>
                    </div>

                    <Button
                        onClick={() => window.location.reload()}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Try Refreshing Page
                    </Button>

                    <p className="text-xs text-slate-400 uppercase tracking-widest font-black">
                        Admin? Please sign in to bypass
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
