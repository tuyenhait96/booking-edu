import { cn } from "@/utils/cn";
import Image from "next/image";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
    src?: string | null;
    alt?: string;
    name?: string;
    size?: AvatarSize;
    className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
};

const sizeMap: Record<AvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
};

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export default function Avatar({
    src,
    alt = "Avatar",
    name,
    size = "md",
    className,
}: AvatarProps) {
    const px = sizeMap[size];

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-full bg-primary-100 flex items-center justify-center shrink-0",
                sizeClasses[size],
                className
            )}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    width={px}
                    height={px}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span className="font-medium text-primary-600">
                    {name ? getInitials(name) : "?"}
                </span>
            )}
        </div>
    );
}
