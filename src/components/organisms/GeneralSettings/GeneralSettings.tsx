"use client";

import React from 'react';
import { SettingsSection } from '@/components/molecules/SettingsSection';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { useCentreStore } from '@/store/useCentreStore';
import { cn } from '@/utils/cn';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/utils/permissions';

export const GeneralSettings: React.FC = () => {
    const { isMaintenanceMode, toggleMaintenanceMode } = useCentreStore();

    return (
        <SettingsSection
            title="General Settings"
            description="Basic identification for your LMS instance."
        >
            <div className="flex flex-col gap-2">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">Site Name</Label>
                <Input
                    defaultValue="EduCMS Learning Portal"
                    placeholder="Enter site name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">Platform Logo</Label>
                <div className="flex items-center gap-6 mt-1">
                    <div className="size-20 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
                        <Icon name="image" className="text-slate-400 text-3xl" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                            Upload New Logo
                        </Button>
                        <p className="text-xs text-slate-400">Recommended size: 512x512px. PNG, JPG or SVG.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">Default Language</Label>
                <Select
                    defaultValue={{ value: 'English (United States)', label: 'English (United States)' }}
                    options={[
                        { value: 'English (United States)', label: 'English (United States)' },
                        { value: 'Spanish', label: 'Spanish' },
                        { value: 'French', label: 'French' },
                        { value: 'German', label: 'German' },
                    ]}
                />
            </div>
            <PermissionGuard requiredPermission={PERMISSIONS.SYSTEM_MAINTENANCE_MANAGE}>
                <div className="flex flex-col gap-4 p-6 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                                <Icon name="construction" className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-rose-900 dark:text-rose-100">Maintenance Mode</p>
                                <p className="text-xs text-rose-600 dark:text-rose-400">Lock out non-admin users during system updates.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleMaintenanceMode(!isMaintenanceMode)}
                            className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                isMaintenanceMode ? "bg-rose-500" : "bg-slate-200 dark:bg-slate-700"
                            )}
                        >
                            <span className="sr-only">Toggle Maintenance Mode</span>
                            <span
                                className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    isMaintenanceMode ? "translate-x-6" : "translate-x-1"
                                )}
                            />
                        </button>
                    </div>
                </div>
            </PermissionGuard>
        </SettingsSection>
    );
};
