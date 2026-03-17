"use client";

import LoginCard from "@/components/organisms/LoginCard";
import LoginFooter from "@/components/organisms/LoginFooter";
import LoginHeader from "@/components/organisms/LoginHeader";
import { FormEvent, useState } from "react";
import authService from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function EduCMSLoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const response = await authService.login({ email, password });

            if (response.data) {
                const { user, accessToken } = response.data;
                // Map the login response user to our store's User type
                login({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    permissions: user.permissions,
                    organizationId: user.organizationId,
                    name: user.email.split("@")[0], // Fallback name
                }, accessToken);

                // Store tokens in localStorage for the axios interceptor
                localStorage.setItem("access_token", accessToken);

                // Set cookie for middleware route protection
                // Set for 1 day (align with token expiry if possible)
                const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
                document.cookie = `session_token=${accessToken}; path=/; expires=${expires}; SameSite=Strict; Secure`;

                if (user.role === 'SUP_ADMIN') {
                    router.push("/organizations");
                } else {
                    router.push("/dashboard");
                }
            } else {
                setError(response.error || "Login failed");
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error && 'response' in err 
                ? (err as { response?: { data?: { message?: string } } }).response?.data?.message 
                : "An error occurred during login";
            setError(errorMessage ?? "An error occurred during login");
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            <LoginHeader />

            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <LoginCard onSubmit={handleLogin} />
                </div>
            </main>

            <LoginFooter />
        </div>
    );
}
