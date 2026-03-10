import React from 'react';
import { cn } from "@/utils/cn";
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";

interface AddSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddSessionModal: React.FC<AddSessionModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add Session</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <Icon name="close" className="text-xl" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 py-6 space-y-5">
                    {/* Row 1: Course & Instructor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Course Name</label>
                            <Select
                                options={[
                                    { value: "adv_math", label: "Advanced Mathematics" },
                                    { value: "quantum", label: "Quantum Physics" },
                                    { value: "modern_hist", label: "Modern History" },
                                ]}
                                placeholder="Select Course"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Instructor</label>
                            <Select
                                options={[
                                    { value: "jenkins", label: "Dr. Sarah Jenkins" },
                                    { value: "turing", label: "Prof. Alan Turing" },
                                    { value: "blackwell", label: "Dr. Elizabeth Blackwell" },
                                ]}
                                placeholder="Select Instructor"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Row 2: Room & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Room Number</label>
                            <Select
                                options={[
                                    { value: "101", label: "Room 101 - Lab A" },
                                    { value: "204", label: "Room 204 - Lecture Hall" },
                                    { value: "305", label: "Room 305 - Seminar Room" },
                                ]}
                                placeholder="Select Room"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select Date</label>
                            <Input type="date" className="w-full" />
                        </div>
                    </div>

                    {/* Row 3: Day of the Week Toggle */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Day of the Week</label>
                        <div className="flex flex-wrap gap-2">
                            {days.map((day) => (
                                <button
                                    key={day}
                                    className={cn(
                                        "flex-1 min-w-[50px] h-10 rounded-lg border text-xs font-bold transition-all shadow-sm",
                                        day === "Mon"
                                            ? "border-primary bg-primary text-white"
                                            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-700"
                                    )}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Row 4: Start & End Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Start Time</label>
                            <Input type="time" className="w-full" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">End Time</label>
                            <Input type="time" className="w-full" />
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <Button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2"
                    >
                        <Icon name="add" className="text-sm text-white" />
                        Add Session
                    </Button>
                </div>
            </div>
        </div>
    );
};
