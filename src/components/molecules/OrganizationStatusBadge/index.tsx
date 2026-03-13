import React from 'react';
import { StatusDot } from '@/components/atoms/StatusDot/StatusDot';
import { cn } from '@/utils/cn';

type OrganizationStatus = 'active' | 'inactive' | 'pending';

interface OrganizationStatusBadgeProps {
    status: OrganizationStatus;
    className?: string;
}

export const OrganizationStatusBadge: React.FC<OrganizationStatusBadgeProps> = ({ status, className }) => {
    const statusConfig = {
        active: {
            text: 'Active',
            textColor: 'text-emerald-600 dark:text-emerald-400',
        },
        inactive: {
            text: 'Inactive',
            textColor: 'text-slate-400 dark:text-slate-500',
        },
        pending: {
            text: 'Pending',
            textColor: 'text-amber-600 dark:text-amber-400',
        },
    };

    const config = statusConfig[status] || statusConfig.inactive;

    return (
        <div className={cn("flex items-center gap-1.5 text-sm font-bold", config.textColor, className)}>
            <StatusDot status={status} />
            {config.text}
        </div>
    );
};
