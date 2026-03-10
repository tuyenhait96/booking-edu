import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface CardProps {
    className?: string;
    children: ReactNode;
    padding?: "none" | "sm" | "md" | "lg";
    shadow?: "none" | "sm" | "md" | "lg";
    hover?: boolean;
}

const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
};

const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
};

function Card({
    className,
    children,
    padding = "md",
    shadow = "sm",
    hover = false,
}: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-gray-200 bg-white",
                paddingClasses[padding],
                shadowClasses[shadow],
                hover && "transition-shadow hover:shadow-md",
                className
            )}
        >
            {children}
        </div>
    );
}

function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div className={cn("mb-4 border-b border-gray-100 pb-4", className)}>
            {children}
        </div>
    );
}

function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <h3 className={cn("text-base font-semibold text-gray-900", className)}>
            {children}
        </h3>
    );
}

function CardBody({ className, children }: { className?: string; children: ReactNode }) {
    return <div className={cn("", className)}>{children}</div>;
}

function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div className={cn("mt-4 border-t border-gray-100 pt-4", className)}>
            {children}
        </div>
    );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
