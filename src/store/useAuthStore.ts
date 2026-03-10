import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;

    // Actions
    setUser: (user: User) => void;
    setAccessToken: (token: string) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,

            setUser: (user) => set({ user, isAuthenticated: true }),

            setAccessToken: (accessToken) => set({ accessToken }),

            login: (user, accessToken) =>
                set({ user, accessToken, isAuthenticated: true }),

            logout: () =>
                set({ user: null, accessToken: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
