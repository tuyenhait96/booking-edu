import { cn } from "@/utils/cn";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {leftIcon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "w-full rounded-lg border px-3 py-3 text-sm shadow-sm outline-none transition-colors duration-150",
                        "bg-background-light dark:bg-slate-800",
                        "border-slate-200 dark:border-slate-700",
                        "text-slate-900 dark:text-white",
                        "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                        "focus:border-primary focus:ring-2 focus:ring-primary/20",
                        "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:dark:bg-slate-900 disabled:text-slate-500",
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "",
                        className,
                        leftIcon && "pl-11",
                        rightIcon && "pr-11"
                    )}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                        {rightIcon}
                    </div>
                )}
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";
export default Input;
