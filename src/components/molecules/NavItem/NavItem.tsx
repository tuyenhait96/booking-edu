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
        ? 'bg-[#484848] text-[#f1f5f9] font-semibold'
        : 'text-white/70 hover:bg-white/10 transition-colors';

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
