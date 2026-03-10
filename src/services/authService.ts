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
}

const authService = {
    login: async (payload: LoginFormValues): Promise<ApiResponse<AuthTokens>> => {
        const { data } = await axiosInstance.post<ApiResponse<AuthTokens>>(
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
