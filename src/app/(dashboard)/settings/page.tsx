"use client";

import React, { useState } from 'react';
import { GeneralSettings } from '@/components/organisms/GeneralSettings';
import { SecuritySettings } from '@/components/organisms/SecuritySettings';
import { IntegrationsList } from '@/components/organisms/IntegrationsList';
import Button from '@/components/atoms/Button';

const TABS = ['General', 'Security', 'API & Integrations'];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('General');

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Title Section */}
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Settings</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your platform configuration, security policies, and integrations.</p>
            </div>

            {/* Settings Content */}
            <div className="grid grid-cols-1 gap-10">
                {activeTab === 'General' && <GeneralSettings />}
                {activeTab === 'Security' && <SecuritySettings />}
                {activeTab === 'API & Integrations' && <IntegrationsList />}

                {/* Save Button Area */}
                <div className="flex justify-end gap-4 border-t border-slate-200 dark:border-slate-800 pt-8 pb-12">
                    <Button
                        variant="ghost"
                        className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Discard Changes
                    </Button>
                    <Button
                        className="px-8 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                    >
                        Save All Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}
