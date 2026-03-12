"use client";

import React from 'react';
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const APPROVAL_WORKFLOW = [
    { step: 1, label: 'Teacher Drafts', icon: 'edit_note', color: 'bg-slate-100 text-slate-500' },
    { step: 2, label: 'Pending Admin', icon: 'history_edu', color: 'bg-amber-500/10 text-amber-500' },
    { step: 3, label: 'Approved', icon: 'task_alt', color: 'bg-emerald-500/10 text-emerald-500' },
    { step: 4, label: 'Published', icon: 'send', color: 'bg-primary/10 text-primary' },
];

const MOCK_APPROVALS = [
    { id: '1', title: 'Science Term 3 - P5 Group A', author: 'Dr. Sarah Chen', date: '2023-11-12', status: 'Pending Admin', priority: 'High' },
    { id: '2', title: 'Math Trial Report - Bob Lim', author: 'James Lim', date: '2023-11-14', status: 'Teacher Drafts', priority: 'Normal' },
    { id: '3', title: 'English Term 3 - S4 Express', author: 'Emily Rose', date: '2023-11-10', status: 'Approved', priority: 'Urgent' },
];

export default function ApprovalsPage() {
    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-fade-in">
            <div className="flex flex-col gap-8 mx-auto w-full">
                <div className="flex flex-col gap-1">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Status-Driven Approvals</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base">
                        Rigid workflow for report approval and publishing.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
                        <div className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-[2px] bg-slate-100 dark:bg-slate-800 -z-10" />

                        {APPROVAL_WORKFLOW.map((step) => (
                            <div key={step.step} className="flex flex-col items-center gap-3 bg-white dark:bg-slate-900 px-4">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white dark:border-slate-800", step.color)}>
                                    <Icon name={step.icon} className="text-xl" />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">Step {step.step}</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{step.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-lg font-black text-slate-900 dark:text-white">Active Queue (3)</h2>
                        <div className="flex gap-2">
                            <Button variant="ghost" className="text-xs font-bold text-slate-500 hover:text-primary">Filter By Step</Button>
                            <Button variant="ghost" className="text-xs font-bold text-slate-500 hover:text-primary">Bulk Approve</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {MOCK_APPROVALS.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/50 transition-all shadow-sm">
                                <div className="flex items-center gap-6 flex-1">
                                    <div className={cn(
                                        "w-1 h-12 rounded-full",
                                        item.priority === 'Urgent' ? "bg-rose-500" : item.priority === 'High' ? "bg-amber-500" : "bg-slate-200"
                                    )} />
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                                            <Badge variant={item.priority === 'Urgent' ? 'danger' : item.priority === 'High' ? 'warning' : 'default'} className="text-[9px] scale-90">{item.priority}</Badge>
                                        </div>
                                        <p className="text-xs text-slate-500 flex items-center gap-4">
                                            <span className="flex items-center gap-1"><Icon name="person" className="text-sm" /> {item.author}</span>
                                            <span className="flex items-center gap-1"><Icon name="schedule" className="text-sm" /> {item.date}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 w-full md:w-auto">
                                    <div className="flex flex-col items-end gap-1">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Status</p>
                                        <Badge variant={item.status === 'Approved' ? 'success' : 'warning'} className="text-xs font-black">{item.status}</Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-500 text-slate-600 dark:text-slate-400 text-sm font-bold rounded-xl transition-all">
                                            Approve
                                        </Button>
                                        <Button className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-rose-500/10 hover:text-rose-500 text-slate-600 dark:text-slate-400 text-sm font-bold rounded-xl transition-all">
                                            Decline
                                        </Button>
                                        <button className="p-2 text-slate-300 hover:text-primary transition-all">
                                            <Icon name="more_vert" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
