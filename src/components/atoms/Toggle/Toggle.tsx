import React from 'react';
import { cn } from '@/utils/cn';

type ToggleProps = {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    className?: string;
};

export const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, className }) => {
    return (
        <button
            onClick={() => onChange(!enabled)}
            className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
                enabled ? "bg-primary" : "bg-slate-200 dark:bg-slate-700",
                className
            )}
        >
            <span
                className={cn(
                    "inline-block h-4 w-4 rounded-full bg-white transition-transform",
                    enabled ? "translate-x-6" : "translate-x-1"
                )}
            />
        </button>
    );
};
