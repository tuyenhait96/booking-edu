export const PERMISSIONS = {
    // Auth
    AUTH_LOGIN: "auth.login",
    AUTH_PASSWORD_RESET: "auth.password.reset",

    // User Management
    USER_VIEW: "user.view",
    USER_CREATE: "user.create",
    USER_UPDATE: "user.update",
    USER_DELETE: "user.delete",
    USER_SEARCH: "user.search",

    // Profile
    PROFILE_VIEW: "profile.view",
    PROFILE_UPDATE: "profile.update",

    // Center & System
    CENTER_SWITCH: "center.switch",
    SYSTEM_SETTINGS_MANAGE: "system.settings.manage",
    SYSTEM_MAINTENANCE_MANAGE: "system.maintenance.manage",
    SYSTEM_BACKUP_MANAGE: "system.backup.manage",
    ORGANIZATION_MANAGE: "organization.manage",
    ORGANIZATION_VIEW: "organization.view",
    ORGANIZATION_CREATE: "organization.create",
    ORGANIZATION_UPDATE: "organization.update",
    ORGANIZATION_DELETE: "organization.delete",
    ORGANIZATION_SEARCH: "organization.search",
    CENTER_MANAGE: "center.manage",

    // Curriculum & Classroom
    CURRICULUM_VIEW: "curriculum.view",
    CURRICULUM_MANAGE: "curriculum.manage",
    CLASSROOM_MANAGE: "classroom.manage",
    CLASS_SPLIT_MANAGE: "class.split.manage",
    CLASS_ASSIGNMENT_MANAGE: "class.assignment.manage",

    // Attendance & Students
    ATTENDANCE_ABSENCE_MONITOR: "attendance.absence.monitor",
    STUDENT_PROMOTION_MANAGE: "student.promotion.manage",
    PARENT_CHILDREN_MANAGE: "parent.children.manage",

    // Booking
    BOOKING_VIEW: "booking.view",
    BOOKING_CREATE: "booking.create",
    BOOKING_UPDATE: "booking.update",
    BOOKING_CANCEL: "booking.cancel",
    BOOKING_RESTRICT_MANAGE: "booking.restrict.manage",
    BOOKING_RULES_MANAGE: "booking.rules.manage",
    BOOKING_CONFLICT_RESOLVE: "booking.conflict.resolve",

    // Calendar
    CALENDAR_VIEW: "calendar.view",
    CALENDAR_MANAGE: "calendar.manage",

    // Reports
    REPORT_VIEW: "report.view",
    REPORT_DRAFT: "report.draft",
    REPORT_APPROVE: "report.approve",
    REPORT_PUBLISH: "report.publish",

    // Announcements & Notifications
    ANNOUNCEMENT_VIEW: "announcement.view",
    ANNOUNCEMENT_MANAGE: "announcement.manage",
    NOTIFICATION_VIEW: "notification.view",
    NOTIFICATION_SEND: "notification.send",

    // FAQ
    FAQ_VIEW: "faq.view",
    FAQ_MANAGE: "faq.manage",

    // Benefits & Integration
    BENEFIT_VIEW: "benefit.view",
    BENEFIT_MANAGE: "benefit.manage",
    INTEGRATION_EXPORT_MANAGE: "integration.export.manage",

    // Dashboard
    DASHBOARD_VIEW: "dashboard.view",

    // Roles
    ROLE_VIEW: "role.view",
    ROLE_CREATE: "role.create",
    ROLE_UPDATE: "role.update",
    ROLE_DELETE: "role.delete",
    ROLE_SEARCH: "role.search",
    SUBJECT_HEAD_ASSIGN: "subject_head.assign",
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
    // {
    //     name: "Auth & Profile",
    //     permissions: [
    //         { key: PERMISSIONS.AUTH_LOGIN, label: "Login" },
    //         { key: PERMISSIONS.AUTH_PASSWORD_RESET, label: "Reset Password" },
    //         { key: PERMISSIONS.PROFILE_VIEW, label: "View Profile" },
    //         { key: PERMISSIONS.PROFILE_UPDATE, label: "Update Profile" },
    //     ]
    // },
    // {
    //     name: "User Management",
    //     permissions: [
    //         { key: PERMISSIONS.USER_VIEW, label: "View Users" },
    //         { key: PERMISSIONS.USER_CREATE, label: "Create Users" },
    //         { key: PERMISSIONS.USER_UPDATE, label: "Update Users" },
    //         { key: PERMISSIONS.USER_DELETE, label: "Delete Users" },
    //         { key: PERMISSIONS.USER_SEARCH, label: "Search Users" },
    //     ]
    // },
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
        name: "Role Management",
        permissions: [
            { key: PERMISSIONS.ROLE_VIEW, label: "View Roles" },
            { key: PERMISSIONS.ROLE_CREATE, label: "Create Roles" },
            { key: PERMISSIONS.ROLE_UPDATE, label: "Update Roles" },
            { key: PERMISSIONS.ROLE_DELETE, label: "Delete Roles" },
            { key: PERMISSIONS.ROLE_SEARCH, label: "Search Roles" },
        ]
    },
    // {
    //     name: "Center & System",
    //     permissions: [
    //         { key: PERMISSIONS.CENTER_SWITCH, label: "Switch Center" },
    //         { key: PERMISSIONS.SYSTEM_SETTINGS_MANAGE, label: "Manage System Settings" },
    //         { key: PERMISSIONS.SYSTEM_MAINTENANCE_MANAGE, label: "Manage Maintenance" },
    //         { key: PERMISSIONS.SYSTEM_BACKUP_MANAGE, label: "Manage Backups" },
    //         { key: PERMISSIONS.ORGANIZATION_MANAGE, label: "Manage Organizations" },
    //         { key: PERMISSIONS.CENTER_MANAGE, label: "Manage Centers" },
    //     ]
    // },
    // {
    //     name: "Curriculum & Classroom",
    //     permissions: [
    //         { key: PERMISSIONS.CURRICULUM_VIEW, label: "View Curriculum" },
    //         { key: PERMISSIONS.CURRICULUM_MANAGE, label: "Manage Curriculum" },
    //         { key: PERMISSIONS.CLASSROOM_MANAGE, label: "Manage Classrooms" },
    //         { key: PERMISSIONS.CLASS_SPLIT_MANAGE, label: "Manage Class Splits" },
    //         { key: PERMISSIONS.CLASS_ASSIGNMENT_MANAGE, label: "Manage Class Assignments" },
    //     ]
    // },
    // {
    //     name: "Students & Attendance",
    //     permissions: [
    //         { key: PERMISSIONS.ATTENDANCE_ABSENCE_MONITOR, label: "Monitor Absence" },
    //         { key: PERMISSIONS.STUDENT_PROMOTION_MANAGE, label: "Manage Student Promotion" },
    //         { key: PERMISSIONS.PARENT_CHILDREN_MANAGE, label: "Manage Parent-Child Link" },
    //     ]
    // },
    // {
    //     name: "Booking",
    //     permissions: [
    //         { key: PERMISSIONS.BOOKING_VIEW, label: "View Bookings" },
    //         { key: PERMISSIONS.BOOKING_CREATE, label: "Create Bookings" },
    //         { key: PERMISSIONS.BOOKING_UPDATE, label: "Update Bookings" },
    //         { key: PERMISSIONS.BOOKING_CANCEL, label: "Cancel Bookings" },
    //         { key: PERMISSIONS.BOOKING_RESTRICT_MANAGE, label: "Manage Booking Restrictions" },
    //         { key: PERMISSIONS.BOOKING_RULES_MANAGE, label: "Manage Booking Rules" },
    //         { key: PERMISSIONS.BOOKING_CONFLICT_RESOLVE, label: "Resolve Booking Conflicts" },
    //     ]
    // },
    // {
    //     name: "Calendar",
    //     permissions: [
    //         { key: PERMISSIONS.CALENDAR_VIEW, label: "View Calendar" },
    //         { key: PERMISSIONS.CALENDAR_MANAGE, label: "Manage Calendar" },
    //     ]
    // },
    // {
    //     name: "Reporting",
    //     permissions: [
    //         { key: PERMISSIONS.REPORT_VIEW, label: "View Reports" },
    //         { key: PERMISSIONS.REPORT_DRAFT, label: "Draft Reports" },
    //         { key: PERMISSIONS.REPORT_APPROVE, label: "Approve Reports" },
    //         { key: PERMISSIONS.REPORT_PUBLISH, label: "Publish Reports" },
    //     ]
    // },
    // {
    //     name: "Announcements & Notifications",
    //     permissions: [
    //         { key: PERMISSIONS.ANNOUNCEMENT_VIEW, label: "View Announcements" },
    //         { key: PERMISSIONS.ANNOUNCEMENT_MANAGE, label: "Manage Announcements" },
    //         { key: PERMISSIONS.NOTIFICATION_VIEW, label: "View Notifications" },
    //         { key: PERMISSIONS.NOTIFICATION_SEND, label: "Send Notifications" },
    //     ]
    // },
    // {
    //     name: "FAQ & Hub",
    //     permissions: [
    //         { key: PERMISSIONS.FAQ_VIEW, label: "View FAQ" },
    //         { key: PERMISSIONS.FAQ_MANAGE, label: "Manage FAQ" },
    //         { key: PERMISSIONS.SUBJECT_HEAD_ASSIGN, label: "Assign Subject Head" },
    //         { key: PERMISSIONS.BENEFIT_VIEW, label: "View Benefits" },
    //         { key: PERMISSIONS.BENEFIT_MANAGE, label: "Manage Benefits" },
    //         { key: PERMISSIONS.INTEGRATION_EXPORT_MANAGE, label: "Manage Export Integrations" },
    //     ]
    // },
    // {
    //     name: "Dashboard",
    //     permissions: [
    //         { key: PERMISSIONS.DASHBOARD_VIEW, label: "View Dashboard" },
    //     ]
    // }
];
