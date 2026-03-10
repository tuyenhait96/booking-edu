"use client";

import React from 'react';
import { SettingsSection } from '@/components/molecules/SettingsSection';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';

export const GeneralSettings: React.FC = () => {
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
        </SettingsSection>
    );
};
