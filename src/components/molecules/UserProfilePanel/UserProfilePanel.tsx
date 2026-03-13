"use client";

import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import Badge from '@/components/atoms/Badge';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import { cn } from '@/utils/cn';

interface UserProfilePanelProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
        role: string;
        organization: string;
        status: string;
        lastLogin: string;
        absences?: number;
        linkedChildren?: { id: string; name: string; avatarUrl?: string }[];
    } | null;
}

export const UserProfilePanel: React.FC<UserProfilePanelProps> = ({ isOpen, onClose, user }) => {
    if (!user) return null;

    return (
        <div className={cn(
            "fixed inset-y-0 right-0 w-full max-w-2xl bg-white dark:bg-slate-950 shadow-2xl z-[100] transform transition-transform duration-500 ease-out border-l border-slate-200 dark:border-slate-800",
            isOpen ? "translate-x-0" : "translate-x-full"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <Icon name="arrow_forward" className="text-xl rotate-180" />
                    </button>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">User Profile</h2>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="text-slate-500 hover:text-primary p-2">
                        <Icon name="edit" className="text-xl" />
                    </Button>
                    <Button variant="ghost" className="text-slate-500 hover:text-rose-500 p-2">
                        <Icon name="delete" className="text-xl" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="h-full overflow-y-auto custom-scrollbar pb-32">
                {/* Profile Hero */}
                <div className="p-8 flex flex-col items-center text-center space-y-4 border-b border-slate-50 dark:border-slate-900">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:blur-3xl transition-all opacity-50"></div>
                        <Avatar 
                            name={user.name} 
                            src={user.avatarUrl} 
                            size="xl" 
                            className="relative border-4 border-white dark:border-slate-800 shadow-2xl"
                        />
                        <div className="absolute bottom-2 right-2 size-6 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-full shadow-lg"></div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">{user.name}</h3>
                        <p className="text-slate-500 font-medium mt-2">{user.email}</p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant={user.role === 'Teacher' ? 'info' : user.role === 'Student' ? 'success' : 'orange'} className="px-4 py-1.5 text-xs font-black uppercase">
                            {user.role}
                        </Badge>
                        <Badge variant="default" className="px-4 py-1.5 text-xs font-black uppercase bg-slate-100 dark:bg-slate-800">
                            ID: #{user.id}
                        </Badge>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="space-y-6">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Contact Information</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                                        <Icon name="alternate_email" className="text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Primary Email</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                                        <Icon name="call" className="text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Phone Number</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">+65 9123 4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                                {user.role === 'Parent' ? 'Linked Children' : 'Linked Family'}
                            </h4>
                            <div className="space-y-3">
                                {user.linkedChildren && user.linkedChildren.length > 0 ? (
                                    user.linkedChildren.map((child) => (
                                        <div key={child.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                            <Avatar name={child.name} src={child.avatarUrl} size="sm" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{child.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">Student</p>
                                            </div>
                                            <Icon name="chevron_right" className="text-slate-300 group-hover:text-primary transition-colors" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                        <p className="text-xs text-slate-400 italic">No linked family members found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">System Details</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 flex items-center justify-center">
                                        <Icon name="corporate_fare" className="text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Main Centre</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user.organization}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 flex items-center justify-center">
                                        <Icon name="lock_clock" className="text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Last Activity</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user.lastLogin}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Performance & Attendance</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                                    <p className="text-2xl font-black text-primary leading-none">98%</p>
                                    <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mt-2">Attendance</p>
                                </div>
                                <div className={cn(
                                    "p-4 rounded-2xl border text-center relative overflow-hidden",
                                    (user.absences ?? 0) >= 6 ? "bg-rose-500/10 border-rose-500/20" : 
                                    (user.absences ?? 0) >= 3 ? "bg-amber-500/10 border-amber-500/20" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800"
                                )}>
                                    <p className={cn(
                                        "text-2xl font-black leading-none",
                                        (user.absences ?? 0) >= 6 ? "text-rose-600" : 
                                        (user.absences ?? 0) >= 3 ? "text-amber-600" : "text-slate-900 dark:text-white"
                                    )}>
                                        {user.absences ?? 0}
                                    </p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 text-center">Absences</p>
                                    {(user.absences ?? 0) >= 3 && (
                                        <div className="absolute top-0 right-0 p-1">
                                            <Icon name="warning" className={cn(
                                                "text-sm",
                                                (user.absences ?? 0) >= 6 ? "text-rose-500" : "text-amber-500"
                                            )} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Booking History Table Placeholder */}
                <div className="px-8 mt-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Recent Booking History</h4>
                    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest text-[10px]">Date</th>
                                    <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest text-[10px]">Subject</th>
                                    <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest text-[10px]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {[1, 2, 3].map((i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">1{i} Oct 2023</td>
                                        <td className="px-4 py-3 text-slate-500">Mathematics P4</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex size-2 rounded-full bg-emerald-500 mr-2"></span>
                                            <span className="text-xs font-bold text-emerald-600">Completed</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Sticky Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex gap-4 backdrop-blur-md bg-white/80 dark:bg-slate-950/80">
                <Button className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20">
                    Send Notification
                </Button>
                <Button variant="ghost" className="px-4 py-4 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <Icon name="more_horiz" className="text-xl" />
                </Button>
            </div>
        </div>
    );
};
