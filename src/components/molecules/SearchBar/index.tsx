"use client";

import Input from "@/components/atoms/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

interface SearchBarProps {
    onSearch: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
    className?: string;
    defaultValue?: string;
}

export default function SearchBar({
    onSearch,
    placeholder = "Search…",
    debounceMs = 400,
    className,
    defaultValue = "",
}: SearchBarProps) {
    const [value, setValue] = useState(defaultValue);
    const debounced = useDebounce(value, debounceMs);

    useEffect(() => {
        onSearch(debounced);
    }, [debounced, onSearch]);

    return (
        <div className={cn("relative w-full", className)}>
            <Input
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                leftIcon={
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                }
                rightIcon={
                    value ? (
                        <button
                            type="button"
                            onClick={() => setValue("")}
                            className="hover:text-gray-600"
                            aria-label="Clear search"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    ) : null
                }
            />
        </div>
    );
}
