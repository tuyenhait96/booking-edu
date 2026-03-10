import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ── Request Interceptor ─────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Attach access token from localStorage if present
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// ── Response Interceptor ────────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // Handle 401 – token expired: attempt refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                    { refresh_token: refreshToken }
                );

                localStorage.setItem("access_token", data.access_token);
                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return axiosInstance(originalRequest);
            } catch {
                // Refresh failed – clear tokens and redirect to login
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
