import React from 'react';
import Avatar from '@/components/atoms/Avatar';
import { cn } from '@/utils/cn';

type UserNameBadgeProps = {
    name: string;
    email: string;
    avatarUrl?: string | null;
    className?: string;
};

export const UserNameBadge: React.FC<UserNameBadgeProps> = ({
    name,
    email,
    avatarUrl,
    className
}) => {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <Avatar
                src={avatarUrl}
                name={name}
                size="sm"
            />
            <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{name}</span>
                <span className="text-xs text-slate-500">{email}</span>
            </div>
        </div>
    );
};
