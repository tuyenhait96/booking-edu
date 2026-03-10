"use client";

import { cn } from "@/utils/cn";
import { Icon } from "@/components/atoms/Icon";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
    className,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const visiblePages = (): (number | "…")[] => {
        if (totalPages <= 7) return pages;
        if (page <= 4) return [...pages.slice(0, 5), "…", totalPages];
        if (page >= totalPages - 3)
            return [1, "…", ...pages.slice(totalPages - 5)];
        return [1, "…", page - 1, page, page + 1, "…", totalPages];
    };

    const btnBase =
        "inline-flex h-8 min-w-8 items-center justify-center rounded text-sm font-bold transition-colors";
    const btnActive = "bg-primary text-white";
    const btnInactive =
        "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800";
    const btnDisabled = "opacity-50 pointer-events-none";

    return (
        <nav aria-label="Pagination" className={cn("flex items-center gap-2", className)}>
            {/* Prev */}
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={cn(btnBase, btnInactive, page === 1 && btnDisabled, "p-1")}
                aria-label="Previous page"
            >
                <Icon name="chevron_left" className="text-sm" />
            </button>

            {/* Page numbers */}
            {visiblePages().map((p, i) =>
                p === "…" ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-slate-400">
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPageChange(p as number)}
                        className={cn(btnBase, p === page ? btnActive : btnInactive, p === page ? "" : "px-3")}
                        aria-current={p === page ? "page" : undefined}
                    >
                        {p}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className={cn(btnBase, btnInactive, page === totalPages && btnDisabled, "p-1")}
                aria-label="Next page"
            >
                <Icon name="chevron_right" className="text-sm" />
            </button>
        </nav>
    );
}
