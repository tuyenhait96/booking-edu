import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { LoginFormValues, RegisterFormValues } from "@/validations/authSchema";

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    createdAt: string;
    permissions?: string[];
}

export interface LoginSuccess {
    accessToken: string;
    user: {
        id: string;
        email: string;
        role: string;
        permissions: string[];
        organizationId?: string;
    };
}

export interface LoginResponse {
    status: number;
    error: string | null;
    data: LoginSuccess;
}

const MOCK_ACCOUNTS: Record<string, LoginSuccess> = {
    "superadmin@edu.com": {
        accessToken: "mock-token-superadmin",
        user: {
            id: "sa-1",
            email: "superadmin@edu.com",
            role: "SUP_ADMIN",
            permissions: [
                "organization.view",
                "organization.create",
                "organization.update",
                "organization.delete",
                "organization.search",
                // "center.view",
                // "center.create",
                // "center.update",
                // "center.delete",
                // "center.search",
                // "center.manage",
                // "dashboard.view",
                // "classes.view",
                "role.view",
                "role.create",
                "role.update",
                "role.delete",
                "role.search",
            ]
        }
    },
    "orgadmin@edu.com": {
        accessToken: "mock-token-orgadmin",
        user: {
            id: "oa-1",
            email: "orgadmin@edu.com",
            role: "ORG_ADMIN",
            permissions: [
                "dashboard.view",
                "center.view",
                "center.create",
                "center.update",
                "center.delete",
                "center.search",
                "center.manage",
                "classes.view",
            ],
            organizationId: "org-uuid"
        }
    },
    "manager@edu.com": {
        accessToken: "mock-token-manager",
        user: {
            id: "cm-1",
            email: "manager@edu.com",
            role: "CENTER_MANAGER",
            permissions: [
                "calendar.view",
                "booking.view",
                "attendance.absence.monitor",
                "teacher.manage",
                "parent.manage",
                "schedule.manage",
                "benefit.manage",
                "faq.manage"
            ],
            organizationId: "org-uuid"
        }
    }
};

const DEFAULT_MOCK_LOGIN: LoginResponse = {
    status: 201,
    error: null,
    data: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzU0NmViZC05NTQ4LTQxYjItYjlkZC00ZWJhZGI4ZDViNzQiLCJlbWFpbCI6ImRlbW9AZXhhbXBsZS5jb20iLCJyb2xlIjoiUExBVEZPUk1fQURNSU4iLCJpYXQiOjE3NzMyMTgzNjksImV4cCI6MTc3MzMwNDc2OX0",
        user: {
            id: "d3546ebd-9548-41b2-b9dd-4ebadb8d5b74",
            email: "demo@example.com",
            role: "PLATFORM_ADMIN",
            permissions: ["*"] // All permissions
        }
    }
};

const authService = {
    login: async (payload: LoginFormValues): Promise<LoginResponse> => {
        const useMock = true;

        if (useMock) {
            return new Promise((resolve) => {
                const mockAccount = MOCK_ACCOUNTS[payload.email];
                if (mockAccount) {
                    setTimeout(() => resolve({
                        status: 201,
                        error: null,
                        data: mockAccount
                    }), 500);
                } else {
                    setTimeout(() => resolve(DEFAULT_MOCK_LOGIN), 500);
                }
            });
        }

        const { data } = await axiosInstance.post<LoginResponse>(
            "/auth/login",
            payload
        );
        return data;
    },

    register: async (
        payload: RegisterFormValues
    ): Promise<ApiResponse<UserProfile>> => {
        const { data } = await axiosInstance.post<ApiResponse<UserProfile>>(
            "/auth/register",
            payload
        );
        return data;
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post("/auth/logout");
    },

    getProfile: async (): Promise<ApiResponse<UserProfile>> => {
        const { data } = await axiosInstance.get<ApiResponse<UserProfile>>(
            "/auth/profile"
        );
        return data;
    },

    refreshToken: async (
        refreshToken: string
    ): Promise<ApiResponse<AuthTokens>> => {
        const { data } = await axiosInstance.post<ApiResponse<AuthTokens>>(
            "/auth/refresh",
            { refresh_token: refreshToken }
        );
        return data;
    },
};

export default authService;
