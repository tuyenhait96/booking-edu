import { cn } from "@/utils/cn";
import { forwardRef, InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, error, id, ...props }, ref) => {
        return (
            <div className="flex items-center gap-2">
                <input
                    ref={ref}
                    type="checkbox"
                    id={id}
                    className={cn(
                        "h-4 w-4 rounded border-slate-300 dark:border-slate-700",
                        "text-primary focus:ring-primary focus:ring-offset-0",
                        "bg-transparent checked:bg-primary",
                        "cursor-pointer transition-colors",
                        className
                    )}
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                    >
                        {label}
                    </label>
                )}
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
