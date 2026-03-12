
"use client";

import React, { useEffect, useState } from 'react';
import { backupService, BackupSnapshot } from '@/services/backupService';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { format } from 'date-fns';
import { cn } from '@/utils/cn';

export const BackupSnapshotList: React.FC = () => {
    const [snapshots, setSnapshots] = useState<BackupSnapshot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isBackingUp, setIsBackingUp] = useState(false);

    useEffect(() => {
        loadSnapshots();
    }, []);

    const loadSnapshots = async () => {
        setIsLoading(true);
        const data = await backupService.getSnapshots();
        setSnapshots(data);
        setIsLoading(false);
    };

    const handleBackup = async () => {
        setIsBackingUp(true);
        await backupService.triggerBackup();
        // The service simulates progress, we'll just reload after a bit or poll
        setTimeout(() => {
            loadSnapshots();
            setIsBackingUp(false);
        }, 2200);
    };

    const handleRestore = async (id: string) => {
        if (confirm("Are you sure you want to restore this snapshot? This will overwrite the current database state.")) {
            const success = await backupService.restoreSnapshot(id);
            if (success) {
                alert("Database restored successfully!");
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Database Snapshots</h3>
                    <p className="text-sm text-slate-500">View and restore previous versions of your system data.</p>
                </div>
                <Button 
                    onClick={handleBackup} 
                    disabled={isBackingUp}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Icon name={isBackingUp ? "sync" : "backup"} className={cn("text-lg", isBackingUp && "animate-spin")} />
                    <span>{isBackingUp ? "Creating Backup..." : "Take Snapshot"}</span>
                </Button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Version</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Created At</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Size</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                    <Icon name="sync" className="text-2xl animate-spin mb-2" />
                                    <p className="font-medium">Loading snapshots...</p>
                                </td>
                            </tr>
                        ) : snapshots.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                    <Icon name="history_toggle_off" className="text-3xl mb-2" />
                                    <p className="font-medium">No snapshots found.</p>
                                </td>
                            </tr>
                        ) : snapshots.map((snap) => (
                            <tr key={snap.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{snap.version}</span>
                                        <span className="text-xs text-slate-400">ID: {snap.id}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        {format(new Date(snap.createdAt), 'MMM dd, yyyy • hh:mm a')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    {snap.size}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant={snap.status === 'completed' ? 'success' : snap.status === 'in_progress' ? 'info' : 'danger'}>
                                        {snap.status.replace('_', ' ')}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button 
                                        variant="ghost" 
                                        disabled={snap.status !== 'completed'}
                                        onClick={() => handleRestore(snap.id)}
                                        className="text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                                    >
                                        Restore
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl flex gap-4">
                <div className="size-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Icon name="warning" className="text-xl" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-amber-900 dark:text-amber-100 uppercase tracking-tight">System Notice</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1 leading-relaxed">
                        Restoration is a critical operation. It is highly recommended to take a <strong>manual snapshot</strong> of the current state before restoring any previous versions to prevent accidental data loss.
                    </p>
                </div>
            </div>
        </div>
    );
};
