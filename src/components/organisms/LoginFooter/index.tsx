import Link from "next/link";
import { cn } from "@/utils/cn";

interface LoginFooterProps {
    className?: string;
}

export default function LoginFooter({ className }: LoginFooterProps) {
    return (
        <footer
            className={cn(
                "w-full p-6 text-center text-xs text-slate-400 dark:text-slate-600",
                className
            )}
        >
            <div className="flex justify-center gap-4 mb-2">
                <Link href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                    Help Center
                </Link>
            </div>
            <p>© {new Date().getFullYear()} EduCMS Platform. All rights reserved.</p>
        </footer>
    );
}
