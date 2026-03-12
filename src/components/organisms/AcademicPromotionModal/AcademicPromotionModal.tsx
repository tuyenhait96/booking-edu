"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { cn } from '@/utils/cn';

interface AcademicPromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AcademicPromotionModal: React.FC<AcademicPromotionModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handlePromote = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-950 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 transition-transform hover:scale-110">
                                <Icon name="trending_up" className="text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Academic Promotion</h2>
                                <p className="text-sm text-slate-500 font-medium">Bulk advance students to the next grade.</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <Icon name="close" className="text-xl" />
                        </button>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-4 mt-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex-1 flex items-center gap-2">
                                <div className={cn(
                                    "size-8 rounded-lg flex items-center justify-center text-xs font-black transition-all",
                                    step >= i ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                                )}>
                                    {i}
                                </div>
                                <div className={cn(
                                    "flex-1 h-1 rounded-full",
                                    step > i ? "bg-primary" : "bg-slate-100 dark:bg-slate-800"
                                )}></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Select Cohort to Promote</label>
                                <Select 
                                    placeholder="Select grade level..."
                                    options={[
                                        { value: 'p4', label: 'Primary 4 (2023)' },
                                        { value: 'p5', label: 'Primary 5 (2023)' },
                                        { value: 's1', label: 'Secondary 1 (2023)' },
                                    ]}
                                />
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
                                <p className="text-2xl font-black text-slate-900 dark:text-white">124 Students</p>
                                <p className="text-xs text-slate-500 font-medium">will be promoted to the next academic level.</p>
                            </div>
                            <Button 
                                onClick={() => setStep(2)}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/20"
                            >
                                Continue to Review
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="p-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl flex gap-4">
                                <Icon name="warning" className="text-amber-500 text-2xl shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-amber-900 dark:text-amber-100">Careful! This action is permanent.</p>
                                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                                        All selected primary 4 students will be migrated to the primary 5 curriculum for the 2024 academic year.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                                            <Icon name="check" className="text-lg" />
                                        </div>
                                        <span className="text-sm font-bold">Transfer Booking History</span>
                                    </div>
                                    <Icon name="toggle_on" className="text-3xl text-primary" />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                                            <Icon name="check" className="text-lg" />
                                        </div>
                                        <span className="text-sm font-bold">Auto-Update Billing Grade</span>
                                    </div>
                                    <Icon name="toggle_on" className="text-3xl text-primary" />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button onClick={() => setStep(1)} variant="ghost" className="flex-1 py-4 border border-slate-200 dark:border-slate-800 rounded-xl font-bold">
                                    Back
                                </Button>
                                <Button 
                                    onClick={handlePromote}
                                    className="flex-[2] bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                                    disabled={isProcessing}
                                >
                                    {isProcessing && <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                    {isProcessing ? 'Processing...' : 'Confirm Promotion'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-500">
                            <div className="size-24 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40 animate-bounce-slow">
                                <Icon name="task_alt" className="text-5xl" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Success!</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">124 students have been successfully promoted.</p>
                            </div>
                            <Button 
                                onClick={onClose}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/20"
                            >
                                Back to Directory
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
