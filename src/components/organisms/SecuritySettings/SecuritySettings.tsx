"use client";

import React, { useState } from 'react';
import { SettingsSection } from '@/components/molecules/SettingsSection';
import { Toggle } from '@/components/atoms/Toggle';
import Checkbox from '@/components/atoms/Checkbox';
import Label from '@/components/atoms/Label';

export const SecuritySettings: React.FC = () => {
    const [is2faEnabled, setIs2faEnabled] = useState(true);

    return (
        <SettingsSection
            title="Security & Privacy"
            description="Configure authentication and password requirements."
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Require all administrative users to use 2FA.</p>
                </div>
                <Toggle enabled={is2faEnabled} onChange={setIs2faEnabled} />
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 block">Password Complexity</Label>
                <div className="space-y-3">
                    <Checkbox label="Minimum 12 characters" defaultChecked />
                    <Checkbox label="Require numbers and special characters" defaultChecked />
                    <Checkbox label="Force password change every 90 days" />
                </div>
            </div>
        </SettingsSection>
    );
};
