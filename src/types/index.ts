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

export enum ClassType {
    REGULAR = 'REGULAR',
    EXCLUSIVE = 'EXCLUSIVE',
    TRIAL = 'TRIAL',
    MAKEUP = 'MAKEUP',
    WORKSHOP = 'WORKSHOP',
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

export interface Subject {
    id: string;
    code: string;
    name: string;
    description: string;
    isActive: boolean;
    createdBy: string | null;
    createdAt: string;
    updatedBy: string | null;
    updatedAt: string;
}

export interface AcademicLevel {
    id: string;
    code: string;
    name: string;
    rankOrder: number;
    isActive: boolean;
    createdBy: string | null;
    createdAt: string;
    updatedBy: string | null;
    updatedAt: string;
}

export interface Classroom {
    id: string;
    centerId: string;
    name: string;
    code: string;
    capacity: number;
    description: string;
    isActive: boolean;
    createdBy: string | null;
    createdAt: string;
    updatedBy: string | null;
    updatedAt: string;
}

export interface Topic {
    id: string;
    subjectId: string;
    levelId: string;
    title: string;
    description: string;
    isActive: boolean;
    createdBy: string | null;
    createdAt: string;
    updatedBy: string | null;
    updatedAt: string;
}

export interface Package {
    id: string;
    code: string;
    name: string;
    packageType: string;
    description: string;
    maxConcurrentBooking: number;
    exclusiveClassAccess: boolean;
    defaultMaxClassCapacity: number;
    isActive: boolean;
    createdBy: string | null;
    createdAt: string;
    updatedBy: string | null;
    updatedAt: string;
}

export interface AcademicTerm {
    id: string;
    code: string;
    name: string;
    academicYear: number;
    startsOn: string;
    endsOn: string;
    isActive: boolean;
    createdBy?: string | null;
    createdAt?: string;
    updatedBy?: string | null;
    updatedAt?: string;
}

