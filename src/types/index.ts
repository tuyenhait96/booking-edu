// ── Shared API Response Wrapper ─────────────────────────────────────────────
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success?: boolean;
    status?: number;
    error?: string | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    message: string;
    success: boolean;
}

// ── Common Enums ────────────────────────────────────────────────────────────
export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest",
    SUP_ADMIN = "super_admin",
    ORG_ADMIN = "org_admin",
    CENTER_MANAGER = "center_manager",
}

export enum Status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
}

// ── Pagination & Filter Params ───────────────────────────────────────────────
export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

// ── Component Variant Helpers ───────────────────────────────────────────────
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant =
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "ghost"
    | "outline";
export type ColorScheme =
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "gray";

// ── Domain Specific Types ──────────────────────────────────────────────────
export interface Organization {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    isActive: boolean;
    maxCenters: number;
    createdBy: string;
    createdAt: string;
    updatedBy: string | null;
    updatedAt: string;
    domain?: string; // Kept for backward compatibility if needed in UI
    image?: string;
    type?: string;
    plan?: string;
}

export interface Center {
    id: string;
    organizationId: string;
    name: string;
    code: string;
    phone?: string;
    email?: string;
    address?: string;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedBy: string | null;
    updatedAt: string;
}

export interface Class {
    id: string;
    centerId: string;
    subjectId: string;
    levelId: string;
    classroomId: string;
    topicId: string;
    packageId: string | null;
    academicTermId: string | null;
    name: string;
    classType: string;
    classSize: number;
    splitThreshold: number;
    attributes: unknown | null;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedBy: string | null;
    updatedAt: string;
}
