import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/utils/cn';

type NavItemProps = {
    href: string;
    icon: string;
    label: string;
    isActive?: boolean;
};

export const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive = false }) => {
    const activeClass = isActive
        ? 'bg-primary/10 text-primary font-medium'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors';

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                activeClass
            )}
        >
            <Icon name={icon} />
            {label}
        </Link>
    );
};
