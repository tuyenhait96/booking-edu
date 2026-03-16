"use client";

import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { Center } from '@/types';
import { cn } from '@/utils/cn';
import { formatPhone } from '@/utils/format';

interface CenterDetailDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    center: Center | null;
    onCreateClass: () => void;
}

export const CenterDetailDrawer: React.FC<CenterDetailDrawerProps> = ({
    isOpen,
    onClose,
    center,
    onCreateClass
}) => {
    if (!center) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className={cn(
                    "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div 
                className={cn(
                    "fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-slate-800",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Center Details</h2>
                            <p className="text-sm text-slate-500">{center.code}</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <Icon name="close" className="text-xl text-slate-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {/* Hero Section */}
                        <div className="flex flex-col items-center text-center gap-4 py-4">
                            <div className="size-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-4xl shadow-inner">
                                <Icon name="storefront" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{center.name}</h3>
                                <Badge variant={center.isActive ? 'success' : 'default'} className="mt-2">
                                    {center.isActive ? 'ACTIVE' : 'INACTIVE'}
                                </Badge>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Contact Information</h4>
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-4 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <div className="size-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
                                            <Icon name="phone" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">Phone Number</p>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatPhone(center.phone)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="size-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
                                            <Icon name="email" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">Email Address</p>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{center.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="size-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
                                            <Icon name="location_on" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">Address</p>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">{center.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Organization Info</h4>
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-4 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-slate-500">Organization ID</p>
                                        <p className="text-sm font-mono font-medium text-slate-700 dark:text-slate-300">{center.organizationId.substring(0, 8)}...</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-slate-500">Created At</p>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{new Date(center.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                        <Button 
                            className="w-full h-14 text-base font-bold shadow-lg shadow-primary/25 rounded-2xl flex items-center justify-center gap-2 group"
                            onClick={onCreateClass}
                        >
                            <Icon name="add" className="text-xl group-hover:rotate-90 transition-transform duration-300" />
                            <span>Create New Class</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
