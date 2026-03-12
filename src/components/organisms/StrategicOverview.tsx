
"use client";

import React from 'react';
import { cn } from '@/utils/cn';
import { 
    HiOutlineCalendarDays, 
    HiOutlineClipboardDocumentCheck, 
    HiOutlineShieldCheck, 
    HiOutlineBanknotes,
    HiArrowTrendingUp,
    HiArrowTrendingDown
} from "react-icons/hi2";

interface MetricProps {
    label: string;
    value: string | number;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    icon: React.ReactNode;
    color: string;
}

const Metric: React.FC<MetricProps> = ({ label, value, trend, icon, color }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className={cn("size-12 rounded-2xl flex items-center justify-center text-white shadow-lg text-2xl", color)}>
                {icon}
            </div>
            {trend && (
                <div className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1",
                    trend.isPositive ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                )}>
                    {trend.isPositive ? <HiArrowTrendingUp className="text-sm" /> : <HiArrowTrendingDown className="text-sm" />}
                    {trend.value}
                </div>
            )}
        </div>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</h4>
        <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</div>
    </div>
);

export const StrategicOverview: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Metric 
                label="Active Bookings (Weekly)"
                value="1,248"
                trend={{ value: "+12.5%", isPositive: true }}
                icon={<HiOutlineCalendarDays />}
                color="bg-primary"
            />
            <Metric 
                label="Global Attendance"
                value="94.2%"
                trend={{ value: "+2.1%", isPositive: true }}
                icon={<HiOutlineClipboardDocumentCheck />}
                color="bg-emerald-500"
            />
            <Metric 
                label="Unresolved Conflicts"
                value="0"
                icon={<HiOutlineShieldCheck />}
                color="bg-amber-500"
            />
            <Metric 
                label="Revenue (Current Term)"
                value="$42,850"
                trend={{ value: "+8.4%", isPositive: true }}
                icon={<HiOutlineBanknotes />}
                color="bg-violet-600"
            />
        </div>
    );
};
