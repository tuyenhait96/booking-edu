import React from 'react';
import { StatusDot } from '@/components/atoms/StatusDot';
import { cn } from '@/utils/cn';

type Status = 'active' | 'inactive' | 'pending';

type UserStatusProps = {
    status: Status;
    className?: string;
};

const STATUS_LABELS: Record<Status, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
};

const STATUS_COLORS: Record<Status, string> = {
    active: 'text-emerald-600 dark:text-emerald-400',
    inactive: 'text-slate-400 dark:text-slate-500',
    pending: 'text-amber-500 dark:text-amber-400',
};

export const UserStatus: React.FC<UserStatusProps> = ({ status, className }) => {
    return (
        <div className={cn("flex items-center gap-1.5", STATUS_COLORS[status], className)}>
            <StatusDot status={status} />
            <span className="text-xs font-bold uppercase">{STATUS_LABELS[status]}</span>
        </div>
    );
};
