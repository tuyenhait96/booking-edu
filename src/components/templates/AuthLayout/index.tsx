import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import Link from "next/link";

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    className?: string;
}

export default function AuthLayout({
    children,
    title,
    subtitle,
    className,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 p-4">
            <div className={cn("w-full max-w-md", className)}>
                {/* Logo */}
                <Link href="/" className="mb-8 flex justify-center">
                    <span className="text-2xl font-bold text-primary-600">BookingEdu</span>
                </Link>

                {/* Card */}
                <div className="rounded-2xl bg-white p-8 shadow-xl">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
