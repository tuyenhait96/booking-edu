"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NavItem } from '@/components/molecules/NavItem';
import { UserProfileSnippet } from '@/components/molecules/UserProfileSnippet';
import { Icon } from '@/components/atoms/Icon';
import { useAuthStore } from '@/store/useAuthStore';
import { PERMISSIONS } from '@/utils/permissions';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { CentreSwitcher } from '@/components/molecules/CentreSwitcher/CentreSwitcher';

const NAV_ITEMS = [
    { href: '/dashboard', icon: 'dashboard', label: 'Dashboard', permission: PERMISSIONS.DASHBOARD_VIEW },
    { href: '/center-dashboard', icon: 'analytics', label: 'Center Overview', permission: PERMISSIONS.CENTER_MANAGE },
    { href: '/users', icon: 'group', label: 'Users', permission: PERMISSIONS.USER_VIEW },
    { href: '/organizations', icon: 'corporate_fare', label: 'Organizations', permission: PERMISSIONS.ORGANIZATION_MANAGE },
    { href: '/centers', icon: 'storefront', label: 'Centers', permission: PERMISSIONS.CENTER_MANAGE },
    { href: '/classes', icon: 'school', label: 'Classes', permission: PERMISSIONS.CURRICULUM_VIEW },
    { 
        label: 'Operations', 
        items: [
            { href: '/schedule', icon: 'calendar_month', label: 'Schedule', permission: PERMISSIONS.CALENDAR_VIEW },
            { href: '/booking-rules', icon: 'rule', label: 'Booking Rules', permission: PERMISSIONS.BOOKING_RULES_MANAGE },
            { href: '/curriculum', icon: 'auto_stories', label: 'Curriculum', permission: PERMISSIONS.CURRICULUM_VIEW },
            { href: '/resources', icon: 'meeting_room', label: 'Resources', permission: PERMISSIONS.CLASSROOM_MANAGE },
            { href: '/partners', icon: 'handshake', label: 'Partners', permission: PERMISSIONS.BENEFIT_VIEW },
        ]
    },
    {
        label: 'Global Content',
        items: [
            { href: '/faq', icon: 'quiz', label: 'FAQ System', permission: PERMISSIONS.FAQ_VIEW },
            { href: '/announcements', icon: 'campaign', label: 'Announcements', permission: PERMISSIONS.ANNOUNCEMENT_MANAGE },
        ]
    },
    {
        label: 'Evaluations',
        items: [
            { href: '/reports', icon: 'assessment', label: 'Reports', permission: PERMISSIONS.REPORT_VIEW },
            { href: '/approvals', icon: 'fact_check', label: 'Approvals', permission: PERMISSIONS.REPORT_APPROVE },
        ]
    },
    {
        label: 'Tools & Settings',
        items: [
            { href: '/roles', icon: 'admin_panel_settings', label: 'Roles', permission: PERMISSIONS.ROLE_VIEW },
            { href: '/centre-config', icon: 'hub', label: 'Location Config', permission: PERMISSIONS.SYSTEM_SETTINGS_MANAGE },
            { href: '/settings', icon: 'settings', label: 'Settings', permission: PERMISSIONS.SYSTEM_SETTINGS_MANAGE },
        ]
    }
];

export const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        document.cookie = "session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
        router.push("/login");
    };

    const filteredNavItems = user?.role === 'SUP_ADMIN' 
        ? NAV_ITEMS.filter(item => 
            item.label === 'Organizations' || 
            item.href === '/organizations' ||
            item.label === 'Tools & Settings'
        ).map(section => {
            if (section.label === 'Tools & Settings') {
                return {
                    ...section,
                    items: section.items?.filter(item => item.label === 'Roles')
                };
            }
            return section;
        })
        : NAV_ITEMS;

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                    <Icon name="school" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-base font-bold leading-none">EduCMS</h1>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                        {user?.role?.replace('_', ' ') || 'Super Admin'}
                    </p>
                </div>
            </div>

            <PermissionGuard requiredPermission={PERMISSIONS.CENTER_SWITCH}>
                <CentreSwitcher />
            </PermissionGuard>

            <nav className="flex-1 px-4 space-y-6 overflow-y-auto custom-scrollbar pt-2 pb-6">
                {filteredNavItems.map((section) => (
                    <div key={section.label} className="space-y-1">
                        {section.href ? (
                            <PermissionGuard requiredPermission={section.permission}>
                                <NavItem
                                    {...section as any}
                                    isActive={pathname === section.href || pathname.startsWith(section.href + '/')}
                                />
                            </PermissionGuard>
                        ) : (
                            <>
                                <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                                    {section.label}
                                </p>
                                <div className="space-y-1">
                                    {section.items?.map((item) => (
                                        <PermissionGuard key={item.label} requiredPermission={item.permission}>
                                            <NavItem
                                                {...item}
                                                isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
                                            />
                                        </PermissionGuard>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
                <UserProfileSnippet
                    name={user?.name || user?.email.split('@')[0] || 'User'}
                    role={user?.role?.replace('_', ' ') || 'Member'}
                    onLogout={handleLogout}
                    avatarUrl={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAMsTpcS2LmcZuXfEwxsmOIySQSw5Gn9IPArUNf8lcILwr-H6xwTVYlDFR7S5pOdSVoHKxjQCTZ20TkjN0pgfi_XsvitDPU4pLHUJn6kDVzY-8pf5Y_D5PB563sxsj8Msm24DXGPe6hog1E961jPNImWrIroSLxMnLC84TJHA5ImUwdjLZr5dwDCfbmMbp2EhiCoour-YdQHBwsgFZvJGpxtruXzZAUmIgY8_fpuEKx_FWcyflkomlZA93Da3IY8Ru6uyEkeL8WTn5r"}
                />
            </div>
        </aside>
    );
};
