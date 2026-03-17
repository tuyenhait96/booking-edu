"use client";

import React, { useId } from 'react';
import ReactSelect, { Props as SelectProps, StylesConfig, GroupBase } from 'react-select';
import { cn } from '@/utils/cn';

export interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps extends SelectProps<Option, boolean, GroupBase<Option>> {
    className?: string;
    label?: string;
    error?: string;
}

export const Select: React.FC<CustomSelectProps> = ({
    className,
    label,
    error,
    instanceId,
    isMulti,
    ...props
}) => {
    const id = useId();
    // Custom styles for react-select to match the design system
    const customStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
        control: (base) => ({
            ...base,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderRadius: '0.5rem',
            minHeight: '2.5rem',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'transparent',
            },
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '0 0.75rem',
        }),
        input: (base) => ({
            ...base,
            color: 'inherit',
            margin: 0,
            padding: 0,
        }),
        placeholder: (base) => ({
            ...base,
            color: 'rgb(148, 163, 184)', // slate-400
        }),
        singleValue: (base) => ({
            ...base,
            color: 'inherit',
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: 'rgba(103, 111, 203, 0.1)',
            borderRadius: '0.375rem',
            margin: '2px',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: 'rgb(103, 111, 203)',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '2px 6px',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: 'rgb(103, 111, 203)',
            borderRadius: '0.375rem',
            '&:hover': {
                backgroundColor: 'rgb(103, 111, 203)',
                color: 'white',
            },
        }),
        indicatorsContainer: (base) => ({
            ...base,
            paddingRight: '0.25rem',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: 'rgb(148, 163, 184)',
            padding: '4px',
            '&:hover': {
                color: 'rgb(103, 111, 203)', // primary
            }
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: 'white',
            border: '1px solid rgb(226, 232, 240)', // border-slate-200
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
            overflow: 'hidden',
            zIndex: 50,
            '.dark &': {
                backgroundColor: 'rgb(15, 23, 42)', // slate-900
                borderColor: 'rgb(30, 41, 59)', // slate-800
            }
        }),
        menuList: (base) => ({
            ...base,
            padding: '0.5rem',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? 'rgb(103, 111, 203)'
                : state.isFocused
                    ? 'rgba(103, 111, 203, 0.1)'
                    : 'transparent',
            color: state.isSelected
                ? 'white'
                : 'inherit',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            padding: '0.5rem 0.75rem',
            transition: 'all 0.15s ease',
            '&:active': {
                backgroundColor: 'rgb(103, 111, 203)',
                color: 'white',
            }
        }),
    };

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {label && (
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}
            <div className={cn(
                "relative rounded-lg border transition-all duration-150",
                "bg-slate-50 dark:bg-slate-800",
                "border-slate-200 dark:border-slate-700",
                "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
                error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20"
            )}>
                <ReactSelect
                    instanceId={instanceId || id}
                    styles={customStyles}
                    unstyled
                    isMulti={isMulti}
                    isClearable={false}
                    classNames={{
                        control: () => "flex items-center",
                        container: () => "w-full",
                        input: () => "text-sm",
                        option: () => "text-sm",
                        placeholder: () => "text-sm",
                        singleValue: () => "text-sm font-medium text-slate-700 dark:text-slate-300",
                    }}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};
