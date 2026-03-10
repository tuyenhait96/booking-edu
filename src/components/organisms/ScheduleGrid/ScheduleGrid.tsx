import React from 'react';
import { cn } from "@/utils/cn";
import { DayHeader } from "@/components/atoms/DayHeader/DayHeader";
import { TimeSlotLabel } from "@/components/atoms/TimeSlotLabel/TimeSlotLabel";
import { ScheduleCard } from "@/components/molecules/ScheduleCard/ScheduleCard";

interface ScheduleGridProps {
    className?: string;
    baseDate?: Date;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({ className, baseDate }) => {
    const getDaysOfWeek = (date: Date) => {
        const start = new Date(date);
        // Find Monday of the week containing the date
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1);
        start.setDate(diff);

        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return {
                day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                date: d.getDate(),
                isActive: d.toDateString() === new Date().toDateString(),
                isWeekend: d.getDay() === 0 || d.getDay() === 6
            };
        });
    };

    const days = getDaysOfWeek(baseDate || new Date());

    const timeSlots = [
        "08:00 AM",
        "09:30 AM",
        "11:00 AM",
        "11:30 AM",
        "01:00 PM",
    ];

    return (
        <div className={cn(
            "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm",
            className
        )}>
            {/* Header Row */}
            <div className="grid grid-cols-8 border-b border-slate-100 dark:border-slate-800">
                <div className="p-4 border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"></div>
                {days.map((d, i) => (
                    <DayHeader
                        key={i}
                        day={d.day}
                        date={d.date}
                        isActive={d.isActive}
                    />
                ))}
            </div>

            {/* Grid Body */}
            <div className="flex flex-col">
                {/* 08:00 AM Slot */}
                <div className="grid grid-cols-8 h-28 border-b border-slate-50 dark:border-slate-800 relative">
                    <TimeSlotLabel time="08:00 AM" />
                    <div className="relative p-1 border-r border-slate-100 dark:border-slate-800">
                        <ScheduleCard
                            category="MATHEMATICS"
                            title="Calculus Basics"
                            location="Room 204"
                            variant="primary"
                        />
                    </div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800 bg-primary/5"></div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800">
                        <ScheduleCard
                            category="ENGLISH LIT"
                            title="Shakespeare"
                            location="Auditorium"
                            variant="emerald"
                        />
                    </div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800"></div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800">
                        <ScheduleCard
                            category="CHEMISTRY"
                            title="Organic Bases"
                            location="Lab 4"
                            variant="amber"
                        />
                    </div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800"></div>
                    <div className="p-1"></div>
                </div>

                {/* 09:30 AM Slot */}
                <div className="grid grid-cols-8 h-28 border-b border-slate-50 dark:border-slate-800">
                    <TimeSlotLabel time="09:30 AM" />
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800"></div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800 bg-primary/5">
                        <ScheduleCard
                            category="PHYSICS"
                            title="Physics Lab"
                            location="Science Hall"
                            isActive={true}
                        />
                    </div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800">
                        <ScheduleCard
                            category="HISTORY"
                            title="Modern Era"
                            location="Room 102"
                            variant="indigo"
                        />
                    </div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800">
                        <ScheduleCard
                            category="MATHEMATICS"
                            title="Trigonometry"
                            location="Room 204"
                            variant="primary"
                        />
                    </div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800"></div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800"></div>
                    <div className="p-1"></div>
                </div>

                {/* 11:00 AM Slot (Break) */}
                <div className="grid grid-cols-8 h-12 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="p-2 border-r border-slate-100 dark:border-slate-800 text-right">
                        <span className="text-[10px] font-bold text-slate-400">11:00 AM</span>
                    </div>
                    <div className="col-span-7 flex items-center justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-600">
                            Recess / Short Break
                        </span>
                    </div>
                </div>

                {/* 11:30 AM Slot */}
                <div className="grid grid-cols-8 h-28 border-b border-slate-50 dark:border-slate-800">
                    <TimeSlotLabel time="11:30 AM" />
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800">
                        <ScheduleCard
                            category="PHYSICAL ED"
                            title="Team Sports"
                            location="Main Court"
                            variant="rose"
                        />
                    </div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800 bg-primary/5"></div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800"></div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800">
                        <ScheduleCard
                            category="ENGLISH LIT"
                            title="Creative Writing"
                            location="Room 301"
                            variant="emerald"
                        />
                    </div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800">
                        <ScheduleCard
                            category="COMPUTER SCI"
                            title="Algorithms"
                            location="Comp Lab 2"
                            variant="violet"
                        />
                    </div>
                    <div className="p-1 border-r border-slate-100 dark:border-slate-800"></div>
                    <div className="p-1"></div>
                </div>
            </div>
        </div>
    );
};
