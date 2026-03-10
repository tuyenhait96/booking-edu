import { cn } from "@/utils/cn";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

interface SpinnerProps {
    size?: SpinnerSize;
    className?: string;
    label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
    xs: "h-3 w-3 border",
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-[3px]",
    xl: "h-12 w-12 border-4",
};

export default function Spinner({
    size = "md",
    className,
    label = "Loading…",
}: SpinnerProps) {
    return (
        <span role="status" aria-label={label} className="inline-flex items-center">
            <span
                className={cn(
                    "animate-spin rounded-full border-gray-300 border-t-primary-600",
                    sizeClasses[size],
                    className
                )}
            />
            <span className="sr-only">{label}</span>
        </span>
    );
}
