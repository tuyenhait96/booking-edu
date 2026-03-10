"use client";

import React from 'react';
import { cn } from '@/utils/cn';
import Checkbox from '@/components/atoms/Checkbox';

interface PermissionEntry {
    module: string;
    permissions: {
        view: boolean;
        create: boolean;
        edit: boolean;
        delete: boolean;
    };
}

interface PermissionMatrixProps {
    value: PermissionEntry[];
    onChange: (value: PermissionEntry[]) => void;
}

export const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ value, onChange }) => {
    const handleToggle = (moduleIndex: number, action: keyof PermissionEntry['permissions']) => {
        const newValue = [...value];
        newValue[moduleIndex].permissions[action] = !newValue[moduleIndex].permissions[action];
        onChange(newValue);
    };

    const actions: (keyof PermissionEntry['permissions'])[] = ['view', 'create', 'edit', 'delete'];

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                        <th className="py-4 px-6 text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Module</th>
                        {actions.map(action => (
                            <th key={action} className="py-4 px-6 text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider text-center border-l border-slate-200 dark:border-slate-800">
                                {action}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {value.map((entry, moduleIndex) => (
                        <tr key={entry.module} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-white">
                                {entry.module}
                            </td>
                            {actions.map(action => (
                                <td key={action} className="py-4 px-6 text-center border-l border-slate-200 dark:border-slate-800">
                                    <div className="flex justify-center">
                                        <Checkbox
                                            checked={entry.permissions[action]}
                                            onChange={() => handleToggle(moduleIndex, action)}
                                        />
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
