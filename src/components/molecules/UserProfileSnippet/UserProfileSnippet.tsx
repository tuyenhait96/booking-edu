import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import { cn } from '@/utils/cn';

type UserProfileSnippetProps = {
    name: string;
    role: string;
    avatarUrl: string;
    onLogout?: () => void;
};

export const UserProfileSnippet: React.FC<UserProfileSnippetProps> = ({
    name,
    role,
    avatarUrl,
    onLogout
}) => {
    return (
        <div className={cn("bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center gap-3")}>
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover" alt={`${name} profile picture`} src={avatarUrl} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{name}</p>
                <p className="text-xs text-slate-500 truncate">{role}</p>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="h-8 w-8 p-0 text-slate-400 hover:text-primary shrink-0"
            >
                <Icon name="logout" className="text-[20px]" />
            </Button>
        </div>
    );
};
