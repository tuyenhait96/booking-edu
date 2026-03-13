"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import { useCentreStore, CENTRES, Centre } from '@/store/useCentreStore';
import { cn } from '@/utils/cn';

export const CentreSwitcher: React.FC = () => {
    const { currentCentre, setCentre } = useCentreStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (centre: Centre) => {
        setCentre(centre);
        setIsOpen(false);
    };

    return (
        <div className="relative px-4 mb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 group",
                    isOpen 
                        ? "bg-white/20 border-white/20 shadow-lg" 
                        : "bg-white/10 border-white/10 hover:border-white/30"
                )}
            >
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "size-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                        isOpen ? "bg-white/20 text-white" : "bg-white/10 text-white"
                    )}>
                        <Icon name="location_on" className="text-lg" />
                    </div>
                    <div className="flex flex-col items-start min-w-0">
                        <span className={cn(
                            "text-xs font-black uppercase tracking-widest leading-none",
                            isOpen ? "text-white/60" : "text-white/40"
                        )}>
                            Current Centre
                        </span>
                        <span className={cn(
                            "text-sm font-bold truncate w-full",
                            "text-white"
                        )}>
                            {currentCentre.name}
                        </span>
                    </div>
                </div>
                <Icon 
                    name="expand_more" 
                    className={cn(
                        "text-lg transition-transform duration-300",
                        isOpen ? "text-white rotate-180" : "text-white/40 group-hover:text-white"
                    )} 
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-2 space-y-1">
                        {CENTRES.map((centre) => (
                            <button
                                key={centre.id}
                                onClick={() => handleSelect(centre)}
                                className={cn(
                                    "w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group",
                                    currentCentre.id === centre.id 
                                        ? "bg-primary/10 text-primary" 
                                        : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "size-6 rounded flex items-center justify-center text-[10px] font-black tracking-tighter",
                                        currentCentre.id === centre.id ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700"
                                    )}>
                                        {centre.code}
                                    </div>
                                    <span className="text-sm font-bold">{centre.name}</span>
                                </div>
                                {currentCentre.id === centre.id && (
                                    <Icon name="check" className="text-primary text-lg" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
