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
    };
}

export interface LoginResponse {
    status: number;
    error: string | null;
    data: LoginSuccess;
}

const MOCK_LOGIN_DATA: LoginResponse = {
    "status": 201,
    "error": null,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzU0NmViZC05NTQ4LTQxYjItYjlkZC00ZWJhZGI4ZDViNzQiLCJlbWFpbCI6ImRlbW9AZXhhbXBsZS5jb20iLCJyb2xlIjoiUExBVEZPUk1fQURNSU4iLCJpYXQiOjE3NzMyMTgzNjksImV4cCI6MTc3MzMwNDc2OX0.t-k41vpfSG7Ai6fq9KhJa0AVwf-TVADiX3hRYJMMacQ",
        "user": {
            "id": "d3546ebd-9548-41b2-b9dd-4ebadb8d5b74",
            "email": "demo@example.com",
            "role": "PLATFORM_ADMIN",
            "permissions": [
                "auth.login",
                "center.switch",
                "curriculum.view",
                "attendance.absence.monitor",
                "user.search",
                "announcement.manage",
                "user.create",
                "booking.restrict.manage",
                "faq.view",
                "report.approve",
                "classroom.manage",
                "user.delete",
                "profile.view",
                "system.maintenance.manage",
                "faq.manage",
                "notification.send",
                "profile.update",
                "benefit.manage",
                "user.update",
                "booking.cancel",
                "parent.children.manage",
                "booking.create",
                "calendar.manage",
                "booking.conflict.resolve",
                "integration.export.manage",
                "benefit.view",
                "system.settings.manage",
                "class.split.manage",
                "booking.update",
                "subject_head.assign",
                "report.draft",
                "announcement.view",
                "curriculum.manage",
                "system.backup.manage",
                "calendar.view",
                "dashboard.view",
                "booking.rules.manage",
                "auth.password.reset",
                "student.promotion.manage",
                "class.assignment.manage",
                "booking.view",
                "report.view",
                "report.publish",
                "notification.view",
                "user.view"
            ]
        }
    }
};

const authService = {
    login: async (payload: LoginFormValues): Promise<LoginResponse> => {
        // Toggle this to use mock data
        const useMock = true;

        if (useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_LOGIN_DATA), 500);
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
