"use client";

import React from 'react';
import { Select, Option } from '@/components/atoms/Select';
import { cn } from '@/utils/cn';

interface FilterSelectProps {
    options: Option[];
    defaultValue?: Option;
    placeholder?: string;
    className?: string;
    onChange?: (option: Option | null) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
    options,
    defaultValue,
    placeholder,
    className,
    onChange
}) => {
    return (
        <Select
            options={options}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={(newValue) => onChange?.(newValue as Option | null)}
            className={cn("min-w-[140px]", className)}
            isSearchable={false}
        />
    );
};
