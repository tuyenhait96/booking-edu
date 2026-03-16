import { cn } from "@/utils/cn";
import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <textarea
                    ref={ref}
                    className={cn(
                        "w-full rounded-lg border px-3 py-3 text-sm shadow-sm outline-none transition-colors duration-150",
                        "bg-background-light dark:bg-slate-800",
                        "border-slate-200 dark:border-slate-700",
                        "text-slate-900 dark:text-white",
                        "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                        "focus:border-primary focus:ring-2 focus:ring-primary/20",
                        "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:dark:bg-slate-900 disabled:text-slate-500",
                        "min-h-[100px] resize-y",
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "",
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
export default Textarea;
