
"use client";

import React from 'react';
import { cn } from "@/utils/cn";
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";

const MOCK_ANNOUNCEMENTS = [
    { id: '1', title: 'New Term Registrations Open', date: '2 hours ago', target: 'All Parents', status: 'Sent', priority: 'High' },
    { id: '2', title: 'Holiday Closure Notice', date: 'Yesterday', target: 'All Staff', status: 'Draft', priority: 'Medium' },
    { id: '3', title: 'Tampines Centre Maintenance', date: 'Oct 10, 2023', target: 'Tampines Students', status: 'Scheduled', priority: 'Low' },
];

export default function AnnouncementsPage() {
    return (
        <div className="flex-1 flex flex-col gap-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight uppercase">Announcements Hub</h1>
                    <p className="text-slate-500 text-base font-medium">Create and manage mass communications for the entire network.</p>
                </div>
                <Button className="bg-primary text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center gap-2 group transform hover:scale-105 transition-all">
                    <Icon name="campaign" className="text-xl animate-pulse" />
                    NEW ANNOUNCEMENT
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Compose Area (Placeholder) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Quick Compose</h3>
                        <div className="space-y-4">
                            <Input placeholder="Announcement Title" className="bg-slate-50/50 dark:bg-slate-800/50 border-none font-bold placeholder:text-slate-400" />
                            <Select
                                options={[
                                    { value: 'all', label: 'All Users' },
                                    { value: 'parents', label: 'Parents Only' },
                                    { value: 'teachers', label: 'Teachers Only' }
                                ]}
                                placeholder="Select Target Audience"
                            />
                            <textarea
                                className="w-full min-h-[200px] p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 border-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="Write your message here..."
                            />
                            <div className="flex justify-between items-center pt-4">
                                <div className="flex gap-2">
                                    <Button variant="ghost" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                        <Icon name="attach_file" className="text-slate-500" />
                                    </Button>
                                    <Button variant="ghost" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                        <Icon name="image" className="text-slate-500" />
                                    </Button>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="ghost" className="font-bold text-slate-500 hover:text-slate-900">Save Draft</Button>
                                    <Button className="bg-primary text-white px-10 rounded-xl font-black shadow-lg">SEND NOW</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: History/Queue */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Recent Activity</h3>
                    <div className="space-y-4">
                        {MOCK_ANNOUNCEMENTS.map(ann => (
                            <div key={ann.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={cn(
                                        "text-[10px] font-black uppercase px-2 py-0.5 rounded-md",
                                        ann.status === 'Sent' ? "bg-emerald-500/10 text-emerald-600" :
                                            ann.status === 'Draft' ? "bg-slate-100 text-slate-500" : "bg-primary/10 text-primary"
                                    )}>
                                        {ann.status}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400">{ann.date}</span>
                                </div>
                                <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{ann.title}</h4>
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50 dark:border-slate-800">
                                    <Icon name="group" className="text-xs text-slate-400" />
                                    <span className="text-[11px] font-bold text-slate-500">{ann.target}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
