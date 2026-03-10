import React from 'react';
import { cn } from '@/utils/cn';

type PermissionBadgeProps = {
    children: React.ReactNode;
    className?: string;
};

export const PermissionBadge: React.FC<PermissionBadgeProps> = ({ children, className }) => {
    return (
        <span className={cn(
            "px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase",
            className
        )}>
            {children}
        </span>
    );
};
