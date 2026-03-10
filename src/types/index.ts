// ── Shared API Response Wrapper ─────────────────────────────────────────────
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
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
