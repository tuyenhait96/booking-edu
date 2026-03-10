import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
    /** Override the inner content container max-width class */
    maxWidth?: string;
    /** Whether to render the Header */
    showHeader?: boolean;
    /** Whether to render the Footer */
    showFooter?: boolean;
}

export default function PageLayout({
    children,
    className,
    maxWidth = "max-w-7xl",
    showHeader = true,
    showFooter = true,
}: PageLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            {showHeader && <Header />}

            <main className={cn("flex-1", className)}>
                <div className={cn("mx-auto w-full px-4 py-8 sm:px-6 lg:px-8", maxWidth)}>
                    {children}
                </div>
            </main>

            {showFooter && <Footer />}
        </div>
    );
}
