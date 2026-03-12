"use client";

import Input from "@/components/atoms/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@/components/atoms/Icon";
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
                leftIcon={<Icon name="search" className="h-4 w-4" />}
                rightIcon={
                    value ? (
                        <button
                            type="button"
                            onClick={() => setValue("")}
                            className="hover:text-gray-600"
                            aria-label="Clear search"
                        >
                            <Icon name="close" className="h-4 w-4" />
                        </button>
                    ) : null
                }
            />
        </div>
    );
}
