import React from 'react';
import { cn } from '@/utils/cn';

type SettingsSectionProps = {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
};

export const SettingsSection: React.FC<SettingsSectionProps> = ({
    title,
    description,
    children,
    className
}) => {
    return (
        <section className={cn("grid grid-cols-1 gap-6", className)}>
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
            <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                {children}
            </div>
        </section>
    );
};
