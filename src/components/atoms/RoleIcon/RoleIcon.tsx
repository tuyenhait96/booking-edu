import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/utils/cn';

type RoleIconProps = {
    iconName: string;
    colorVariant: 'red' | 'blue' | 'emerald' | 'amber';
    className?: string;
};

const COLOR_VARIANTS = {
    red: "bg-red-100 dark:bg-red-900/30 text-red-600",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600",
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
};

export const RoleIcon: React.FC<RoleIconProps> = ({ iconName, colorVariant, className }) => {
    return (
        <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            COLOR_VARIANTS[colorVariant],
            className
        )}>
            <Icon name={iconName} />
        </div>
    );
};
