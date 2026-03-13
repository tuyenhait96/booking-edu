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
        <div className={cn("bg-white/5 rounded-xl p-4 flex items-center gap-3")}>
            <div className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover" alt={`${name} profile picture`} src={avatarUrl} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-white">{name}</p>
                <p className="text-xs text-white/50 truncate">{role}</p>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="hover:bg-white/10 transition-colors h-8 w-8 p-0 text-white/40 hover:text-white shrink-0"
            >
                <Icon name="logout" className="text-[20px]" />
            </Button>
        </div>
    );
};
