export const PERMISSIONS = {
    // Auth & Center
    AUTH_LOGIN: "auth.login",
    AUTH_PASSWORD_RESET: "auth.password.reset",
    CENTER_SWITCH: "center.switch",

    // User Management
    USER_VIEW: "user.view",
    USER_CREATE: "user.create",
    USER_UPDATE: "user.update",
    USER_DELETE: "user.delete",
    USER_SEARCH: "user.search",

    // Organization Management
    ORGANIZATION_VIEW: "organization.view",
    ORGANIZATION_CREATE: "organization.create",
    ORGANIZATION_UPDATE: "organization.update",
    ORGANIZATION_DELETE: "organization.delete",
    ORGANIZATION_SEARCH: "organization.search",

    // Center Permissions
    CENTER_VIEW: "center.view",
    CENTER_CREATE: "center.create",
    CENTER_UPDATE: "center.update",
    CENTER_DELETE: "center.delete",
    CENTER_SEARCH: "center.search",
    CENTER_MANAGE: "center.manage",

    // Classes & Curriculum
    CLASSES_VIEW: "classes.view",
    CURRICULUM_MANAGE: "curriculum.manage",
    CURRICULUM_VIEW: "curriculum.view",
    CLASSROOM_MANAGE: "classroom.manage",

    // Dashboard
    DASHBOARD_VIEW: "dashboard.view",

    // Roles
    ROLE_VIEW: "role.view",
    ROLE_CREATE: "role.create",
    ROLE_UPDATE: "role.update",
    ROLE_DELETE: "role.delete",
    ROLE_SEARCH: "role.search",
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export interface PermissionGroup {
    name: string;
    permissions: {
        key: Permission;
        label: string;
    }[];
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
    {
        name: "Organization Management",
        permissions: [
            { key: PERMISSIONS.ORGANIZATION_VIEW, label: "View Organizations" },
            { key: PERMISSIONS.ORGANIZATION_CREATE, label: "Create Organizations" },
            { key: PERMISSIONS.ORGANIZATION_UPDATE, label: "Update Organizations" },
            { key: PERMISSIONS.ORGANIZATION_DELETE, label: "Delete Organizations" },
            { key: PERMISSIONS.ORGANIZATION_SEARCH, label: "Search Organizations" },
        ]
    },
    {
        name: "Dashboard",
        permissions: [
            { key: PERMISSIONS.DASHBOARD_VIEW, label: "View Dashboard" },
        ]
    },
    {
        name: "Center Management",
        permissions: [
            { key: PERMISSIONS.CENTER_VIEW, label: "View Centers" },
            { key: PERMISSIONS.CENTER_CREATE, label: "Create Centers" },
            { key: PERMISSIONS.CENTER_UPDATE, label: "Update Centers" },
            { key: PERMISSIONS.CENTER_DELETE, label: "Delete Centers" },
            { key: PERMISSIONS.CENTER_SEARCH, label: "Search Centers" },
        ]
    },
    {
        name: "Classes Management",
        permissions: [
            { key: PERMISSIONS.CLASSES_VIEW, label: "View Classes" },
        ]
    },
    {
        name: "Role Management",
        permissions: [
            { key: PERMISSIONS.ROLE_VIEW, label: "View Roles" },
            { key: PERMISSIONS.ROLE_CREATE, label: "Create Roles" },
            { key: PERMISSIONS.ROLE_UPDATE, label: "Update Roles" },
            { key: PERMISSIONS.ROLE_DELETE, label: "Delete Roles" },
            { key: PERMISSIONS.ROLE_SEARCH, label: "Search Roles" },
        ]
    },
];
