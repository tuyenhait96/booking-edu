"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePermission } from "@/hooks/usePermission";
import { Permission } from "@/utils/permissions";
import { Icon } from "@/components/atoms/Icon";

interface PermissionGuardProps {
    children: ReactNode;
    requiredPermission?: Permission | string;
    requiredPermissions?: (Permission | string)[];
    requireAll?: boolean;
    showMessage?: boolean;
    fallback?: ReactNode;
}

export default function PermissionGuard({
    children,
    requiredPermission,
    requiredPermissions,
    requireAll = true,
    showMessage = false,
    fallback = null,
}: PermissionGuardProps) {
    const [hasMounted, setHasMounted] = useState(false);
    const { hasPermission, hasAllPermissions, hasAnyPermission } = usePermission();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // During SSR and initial client render, show nothing or fallback to avoid hydration mismatch
    // This is because usePermission depends on authStore which is persisted in localStorage
    if (!hasMounted) {
        return null;
    }

    // If no permissions required, just show children
    if (!requiredPermission && (!requiredPermissions || requiredPermissions.length === 0)) {
        return <>{children}</>;
    }

    let isAllowed = false;

    if (requiredPermission) {
        isAllowed = hasPermission(requiredPermission);
    } else if (requiredPermissions && requiredPermissions.length > 0) {
        if (requireAll) {
            isAllowed = hasAllPermissions(requiredPermissions);
        } else {
            isAllowed = hasAnyPermission(requiredPermissions);
        }
    }

    if (!isAllowed) {
        if (showMessage) {
            return (
                <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
                    <div className="size-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mx-auto">
                        <Icon name="lock" className="text-2xl" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">Access Denied</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 px-4">
                            You don't have the required permissions to view this content.
                        </p>
                    </div>
                </div>
            );
        }
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
