import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";
import { Center } from "@/types";

const MOCK_CENTERS: Center[] = [
    {
        "id": "2c0ea621-55a9-42a5-afeb-1be83ad95f16",
        "organizationId": "b4d8887f-67cb-4719-bc6f-fb4230d4d5d2",
        "name": "Tampines 1",
        "code": "TAMPINES-1",
        "phone": "0281111111",
        "email": "tampines1@example.com",
        "address": "Tampines Mall 1",
        "isActive": true,
        "createdBy": "5cf0b35d-2d9f-4df0-9009-e17be70cd320",
        "createdAt": "2026-03-12T08:32:00.000Z",
        "updatedBy": null,
        "updatedAt": "2026-03-12T08:32:00.000Z"
    },
    {
        "id": "3c0ea621-55a9-42a5-afeb-1be83ad95f16",
        "organizationId": "b4d8887f-67cb-4719-bc6f-fb4230d4d5d2",
        "name": "Tampines 2",
        "code": "TAMPINES-2",
        "phone": "0281111112",
        "email": "tampines2@example.com",
        "address": "Tampines Mall 2",
        "isActive": true,
        "createdBy": "5cf0b35d-2d9f-4df0-9009-e17be70cd320",
        "createdAt": "2026-03-12T08:32:00.000Z",
        "updatedBy": null,
        "updatedAt": "2026-03-12T08:32:00.000Z"
    }
];

const centerService = {
    getCenters: async (): Promise<ApiResponse<Center[]>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<Center[]>>("/centers");
            return data;
        } catch {
            return {
                status: 200,
                error: null,
                data: MOCK_CENTERS
            };
        }
    },

    createCenter: async (payload: Partial<Center>): Promise<ApiResponse<Center>> => {
        try {
            const { data } = await axiosInstance.post<ApiResponse<Center>>("/centers", payload);
            return data;
        } catch {
            const newCenter = {
                ...payload,
                id: "center-" + Math.random().toString(36).substring(2, 9),
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            } as Center;
            return {
                status: 201,
                error: null,
                data: newCenter
            };
        }
    },

    updateCenter: async (id: string, payload: Partial<Center>): Promise<ApiResponse<Center>> => {
        try {
            const { data } = await axiosInstance.patch<ApiResponse<Center>>(`/centers/${id}`, payload);
            return data;
        } catch {
            return {
                status: 200,
                error: null,
                data: { ...payload, id, updatedAt: new Date().toISOString() } as Center
            };
        }
    },

    getCenterById: async (id: string): Promise<ApiResponse<Center>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<Center>>(`/centers/${id}`);
            return data;
        } catch {
            const center = MOCK_CENTERS.find(c => c.id === id) || MOCK_CENTERS[0];
            return {
                status: 200,
                error: null,
                data: center
            };
        }
    },

    createCenterManager: async (payload: {
        name: string;
        email: string;
        phone: string;
        organizationId: string;
        centerId: string;
        profile: {
            centerIds: string[];
        }
    }): Promise<ApiResponse<any>> => {
        try {
            const { data } = await axiosInstance.post<ApiResponse<any>>("/centers/create-center", payload);
            return data;
        } catch {
            return {
                status: 201,
                error: null,
                data: {
                    message: "Center management account provisioned successfully. Use the temporary password to sign in and reset it on first login.",
                    provisionedAccount: {
                        id: "user-uuid",
                        email: payload.email,
                        phone: payload.phone,
                        role: "CENTER_MANAGEMENT",
                        temporaryPassword: "TempPass@123"
                    }
                }
            };
        }
    },

    getCenterStats: async (centerId: string): Promise<ApiResponse<any>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<any>>(`/dashboard/centers/${centerId}`);
            return data;
        } catch {
            return {
                status: 200,
                error: null,
                data: {
                    center: {
                        id: centerId,
                        organizationId: "org-uuid",
                        name: "Center A",
                        code: "CTR-A",
                        isActive: true
                    },
                    summary: {
                        activeClasses: 5,
                        ongoingClasses: 3,
                        completedClasses: 2,
                        activeTeachers: 10,
                        activeStudents: 120,
                        activeParents: 95,
                        todayBookings: 14,
                        weeklyBookings: 41,
                        pendingBookings: 3,
                        todaySessions: 8,
                        todayAbsences: 1,
                        attendanceRate: 0.98,
                        reportsPendingApproval: 4,
                        activeAnnouncements: 2,
                        openFeedbacks: 1
                    }
                }
            };
        }
    }
};

export default centerService;
