import { useAuthStore } from "@/store/useAuthStore";
import { Permission } from "@/utils/permissions";

export const usePermission = () => {
    const user = useAuthStore((state) => state.user);
    const permissions = user?.permissions || [];

    const hasPermission = (permission: Permission | string): boolean => {
        return permissions.includes(permission);
    };

    const hasAllPermissions = (requiredPermissions: (Permission | string)[]): boolean => {
        return requiredPermissions.every((p) => permissions.includes(p));
    };

    const hasAnyPermission = (requiredPermissions: (Permission | string)[]): boolean => {
        return requiredPermissions.some((p) => permissions.includes(p));
    };

    return {
        hasPermission,
        hasAllPermissions,
        hasAnyPermission,
        permissions,
        role: user?.role,
    };
};
