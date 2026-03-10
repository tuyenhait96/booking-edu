import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps {
    label?: string;
    required?: boolean;
    error?: FieldError;
    hint?: string;
    className?: string;
    children?: ReactNode;
    // Shorthand for wrapping an Input atom directly
    inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
        leftIcon?: ReactNode;
        rightIcon?: ReactNode;
    };
    id: string;
}

export default function FormField({
    label,
    required,
    error,
    hint,
    className,
    children,
    inputProps,
    id,
}: FormFieldProps) {
    return (
        <div className={cn("flex flex-col gap-1", className)}>
            {label && (
                <Label htmlFor={id} required={required}>
                    {label}
                </Label>
            )}

            {children ?? (
                <Input
                    id={id}
                    error={error?.message}
                    {...inputProps}
                />
            )}

            {hint && !error && (
                <p className="text-xs text-gray-500">{hint}</p>
            )}
            {error && !inputProps && (
                <p className="text-xs text-red-500">{error.message}</p>
            )}
        </div>
    );
}
