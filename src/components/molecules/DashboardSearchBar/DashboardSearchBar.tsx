import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { cn } from '@/utils/cn';

type DashboardSearchBarProps = {
    placeholder?: string;
    className?: string;
};

export const DashboardSearchBar: React.FC<DashboardSearchBarProps> = ({
    placeholder = "Search tenants, or users...",
    className
}) => {
    return (
        <div className={cn("relative group w-full max-w-xl", className)}>
            <Input
                type="text"
                placeholder={placeholder}
                leftIcon={
                    <Icon
                        name="search"
                        className="text-slate-400 group-focus-within:text-primary transition-colors"
                    />
                }
                className="bg-slate-100 dark:bg-slate-800 border-transparent focus:border-transparent py-2 pl-10 h-10 shadow-none border"
            />
        </div>
    );
};
