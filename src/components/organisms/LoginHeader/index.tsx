import Link from "next/link";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/atoms/Icon";

interface LoginHeaderProps {
    className?: string;
}

export default function LoginHeader({ className }: LoginHeaderProps) {
    return (
        <header
            className={cn(
                "w-full px-6 py-4 flex items-center justify-between",
                "bg-white dark:bg-slate-900",
                "border-b border-slate-200 dark:border-slate-800",
                className
            )}
        >
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                    <Icon name="school" className="text-xl" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    EduCMS
                </span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                    Need help?
                </span>
                <Link
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                >
                    Contact Support
                </Link>
            </div>
        </header>
    );
}
