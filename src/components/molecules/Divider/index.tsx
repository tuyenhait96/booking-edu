import { cn } from "@/utils/cn";

interface DividerProps {
    label?: string;
    className?: string;
}

export default function Divider({ label, className }: DividerProps) {
    return (
        <div className={cn("relative my-8", className)}>
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            {label && (
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                        {label}
                    </span>
                </div>
            )}
        </div>
    );
}
