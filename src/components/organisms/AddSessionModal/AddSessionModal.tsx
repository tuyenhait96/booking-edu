import React from 'react';
import { cn } from "@/utils/cn";
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { useCentreStore } from "@/store/useCentreStore";
import { useAuthStore } from "@/store/useAuthStore";

interface AddSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddSessionModal: React.FC<AddSessionModalProps> = ({ isOpen, onClose }) => {
    const { currentCentre } = useCentreStore();
    const { user } = useAuthStore();
    const [capacity, setCapacity] = React.useState(0);
    const [hasConflict, setHasConflict] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    if (!isOpen) return null;

    const threshold = currentCentre.name === 'Tampines' ? 14 : 12;
    const shouldSplit = capacity >= threshold;

    const handleAddSession = () => {
        // Mock restriction check
        if (user?.role === 'Parent' && capacity > 1) { // Simplified for demo
             setError("Your account is restricted to booking only 1 class at a time.");
             return;
        }

        // Mock conflict check
        if (hasConflict) {
            setError("Scheduling overlap detected! Please resolve before proceeding.");
            return;
        }

        onClose();
    };

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
                            <Input type="time" className="w-full" onChange={() => setHasConflict(Math.random() > 0.8)} />
                        </div>
                    </div>

                    {/* Conflict & Split Warnings */}
                    <div className="space-y-3">
                        {hasConflict && (
                            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-600 animate-pulse">
                                <Icon name="warning" className="text-lg" />
                                <span className="text-xs font-bold">Conflict detected: Instructor is busy at this time.</span>
                            </div>
                        )}
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Projected Capacity</label>
                            <Input 
                                type="number" 
                                value={capacity} 
                                onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
                                className={cn("w-full", shouldSplit && "border-amber-500")}
                            />
                        </div>

                        {shouldSplit && (
                            <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl flex gap-3">
                                <div className="size-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                                    <Icon name="call_split" className="text-lg" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-amber-900 dark:text-amber-100 uppercase tracking-tight">Capacity Threshold Hit</h4>
                                    <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5 leading-relaxed">
                                        This class exceeds {threshold} students for {currentCentre.name}. 
                                        <strong> Automatic split is recommended.</strong>
                                    </p>
                                    <Button variant="ghost" className="mt-2 text-[10px] font-black uppercase text-amber-600 hover:bg-amber-100 p-0 h-auto">
                                        Split into 2 Classes
                                    </Button>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="p-3 bg-rose-500 text-white rounded-xl flex items-center gap-3 shadow-lg shadow-rose-500/20">
                                <Icon name="error" className="text-lg" />
                                <span className="text-xs font-bold">{error}</span>
                            </div>
                        )}
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
                        onClick={handleAddSession}
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
