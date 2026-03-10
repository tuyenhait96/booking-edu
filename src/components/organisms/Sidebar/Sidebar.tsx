"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/components/molecules/NavItem';
import { UserProfileSnippet } from '@/components/molecules/UserProfileSnippet';
import { Icon } from '@/components/atoms/Icon';

const NAV_ITEMS = [
    { href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { href: '/tenants', icon: 'corporate_fare', label: 'Tenants' },
    { href: '/schedule', icon: 'calendar_month', label: 'Schedule' },
    { href: '/roles', icon: 'admin_panel_settings', label: 'Roles' },
    { href: '/users', icon: 'group', label: 'Users' },
    { href: '/settings', icon: 'settings', label: 'Settings' },
];

export const Sidebar: React.FC = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                    <Icon name="school" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-base font-bold leading-none">EduCMS</h1>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Super Admin</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                    <NavItem
                        key={item.label}
                        {...item}
                        isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
                    />
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
                <UserProfileSnippet
                    name="Alex Rivers"
                    role="System Master"
                    avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAMsTpcS2LmcZuXfEwxsmOIySQSw5Gn9IPArUNf8lcILwr-H6xwTVYlDFR7S5pOdSVoHKxjQCTZ20TkjN0pgfi_XsvitDPU4pLHUJn6kDVzY-8pf5Y_D5PB563sxsj8Msm24DXGPe6hog1E961jPNImWrIroSLxMnLC84TJHA5ImUwdjLZr5dwDCfbmMbp2EhiCoour-YdQHBwsgFZvJGpxtruXzZAUmIgY8_fpuEKx_FWcyflkomlZA93Da3IY8Ru6uyEkeL8WTn5r"
                />
            </div>
        </aside>
    );
};
