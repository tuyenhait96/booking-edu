import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";
import { Center } from "@/types";

const MOCK_CENTERS: Center[] = [
    {
        "id": "2c0ea621-55a9-42a5-afeb-1be83ad95f16",
        "organizationId": "b4d8887f-67cb-4719-bc6f-fb4230d4d5d2",
        "name": "Tampines",
        "code": "TAMPINES",
        "phone": "0281111111",
        "email": "tampines@example.com",
        "address": "Tampines Mall",
        "isActive": true,
        "createdBy": "5cf0b35d-2d9f-4df0-9009-e17be70cd320",
        "createdAt": "2026-03-12T08:32:00.000Z",
        "updatedBy": null,
        "updatedAt": "2026-03-12T08:32:00.000Z"
    }
];

const centerService = {
    getCenters: async (): Promise<ApiResponse<Center[]>> => {
        const useMock = true;
        if (useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve({
                    status: 200,
                    error: null,
                    data: MOCK_CENTERS
                } as any), 500);
            });
        }
        const { data } = await axiosInstance.get<ApiResponse<Center[]>>("/centers");
        return data;
    },

    createCenter: async (payload: Partial<Center>): Promise<ApiResponse<Center>> => {
        const useMock = true;
        if (useMock) {
            return new Promise((resolve) => {
                const newCenter = {
                    ...payload,
                    id: Math.random().toString(36).substr(2, 9),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                } as Center;
                setTimeout(() => resolve({
                    status: 201,
                    error: null,
                    data: newCenter
                } as any), 500);
            });
        }
        const { data } = await axiosInstance.post<ApiResponse<Center>>("/centers", payload);
        return data;
    }
};

export default centerService;
