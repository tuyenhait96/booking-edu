import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";

export interface Parent {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    studentCount: number;
    isActive: boolean;
}

const MOCK_PARENTS: Parent[] = [
    {
        id: "1",
        fullName: "Sarah Connor",
        email: "sarah.connor@gmail.com",
        phone: "0987654321",
        address: "123 Main St, Singapore",
        studentCount: 2,
        isActive: true
    },
    {
        id: "2",
        fullName: "Bruce Wayne",
        email: "b.wayne@waynecorp.com",
        phone: "0112233445",
        address: "Wayne Manor, Gotham",
        studentCount: 1,
        isActive: true
    },
    {
        id: "3",
        fullName: "Diana Prince",
        email: "diana@themyscira.com",
        phone: "0778899001",
        address: "700 Gateway Blvd, DC",
        studentCount: 3,
        isActive: true
    },
    {
        id: "4",
        fullName: "Peter Parker",
        email: "pparker@dailybugle.com",
        phone: "0123987456",
        address: "20 Ingram St, Queens",
        studentCount: 1,
        isActive: false
    },
    {
        id: "5",
        fullName: "Clark Kent",
        email: "ckent@dailyplanet.com",
        phone: "0998877665",
        address: "344 Clinton St, Metropolis",
        studentCount: 2,
        isActive: true
    }
];

const parentService = {
    getParents: async (): Promise<ApiResponse<Parent[]>> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    success: true,
                    data: MOCK_PARENTS
                });
            }, 500);
        });
    },

    createParent: async (payload: Partial<Parent>): Promise<ApiResponse<Parent>> => {
        return new Promise((resolve) => {
            const newParent = {
                ...payload,
                id: Math.random().toString(36).substr(2, 9),
                isActive: true
            } as Parent;
            setTimeout(() => {
                resolve({
                    status: 201,
                    success: true,
                    data: newParent
                });
            }, 500);
        });
    }
};

export default parentService;
