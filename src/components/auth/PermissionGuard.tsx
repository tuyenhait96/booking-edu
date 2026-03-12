"use client";

import { ReactNode } from "react";
import { usePermission } from "@/hooks/usePermission";
import { Permission } from "@/utils/permissions";

interface PermissionGuardProps {
    children: ReactNode;
    requiredPermission?: Permission | string;
    requiredPermissions?: (Permission | string)[];
    requireAll?: boolean;
    fallback?: ReactNode;
}

export default function PermissionGuard({
    children,
    requiredPermission,
    requiredPermissions,
    requireAll = true,
    fallback = null,
}: PermissionGuardProps) {
    const { hasPermission, hasAllPermissions, hasAnyPermission } = usePermission();

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
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
