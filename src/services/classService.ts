import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";
import { Class } from "@/types";

const MOCK_CLASSES: Class[] = [
    {
        "id": "8d9dcb22-07ee-44cb-8d56-7d359ce8d2aa",
        "centerId": "2c0ea621-55a9-42a5-afeb-1be83ad95f16",
        "subjectId": "fd92ab17-b7c3-45a3-9f7c-6f7101f0e69a",
        "levelId": "263cc7f5-c218-4a4f-8ec7-1c4f39a65f20",
        "classroomId": "1d581d19-8dff-4902-b0e0-8d6cdd2a17da",
        "topicId": "ea0ff68b-28d3-4ed7-a35a-f56c3cfdf6c1",
        "packageId": null,
        "academicTermId": null,
        "name": "Math Primary 1 - Mon/Wed/Fri",
        "classType": "REGULAR",
        "classSize": 8,
        "splitThreshold": 12,
        "attributes": null,
        "isActive": true,
        "createdBy": "5cf0b35d-2d9f-4df0-9009-e17be70cd320",
        "createdAt": "2026-03-12T08:33:00.000Z",
        "updatedBy": null,
        "updatedAt": "2026-03-12T08:33:00.000Z"
    }
];

const MOCK_CLASSES_ONGOING: Class[] = [
    {
        "id": "8d9dcb22-07ee-44cb-8d56-7d359ce8d2aa",
        "centerId": "2c0ea621-55a9-42a5-afeb-1be83ad95f16",
        "subjectId": "fd92ab17-b7c3-45a3-9f7c-6f7101f0e69a",
        "levelId": "263cc7f5-c218-4a4f-8ec7-1c4f39a65f20",
        "classroomId": "1d581d19-8dff-4902-b0e0-8d6cdd2a17da",
        "topicId": "ea0ff68b-28d3-4ed7-a35a-f56c3cfdf6c1",
        "packageId": null,
        "academicTermId": null,
        "name": "Math Primary 1 - Mon/Wed/Fri",
        "classType": "REGULAR",
        "classSize": 8,
        "splitThreshold": 12,
        "attributes": null,
        "isActive": true,
        "createdBy": "5cf0b35d-2d9f-4df0-9009-e17be70cd320",
        "createdAt": "2026-03-12T08:33:00.000Z",
        "updatedBy": null,
        "updatedAt": "2026-03-12T08:33:00.000Z"
    }
];

const MOCK_CLASSES_COMPLETED: Class[] = [
    {
        "id": "4d3942c4-39c5-463f-a978-4e7c7729d78d",
        "centerId": "2c0ea621-55a9-42a5-afeb-1be83ad95f16",
        "subjectId": "fd92ab17-b7c3-45a3-9f7c-6f7101f0e69a",
        "levelId": "263cc7f5-c218-4a4f-8ec7-1c4f39a65f20",
        "classroomId": "1d581d19-8dff-4902-b0e0-8d6cdd2a17da",
        "topicId": "ea0ff68b-28d3-4ed7-a35a-f56c3cfdf6c1",
        "packageId": null,
        "academicTermId": null,
        "name": "Math Primary 1 - Completed Batch",
        "classType": "REGULAR",
        "classSize": 8,
        "splitThreshold": 12,
        "attributes": null,
        "isActive": true,
        "createdBy": "5cf0b35d-2d9f-4df0-9009-e17be70cd320",
        "createdAt": "2026-03-10T08:33:00.000Z",
        "updatedBy": null,
        "updatedAt": "2026-03-10T08:33:00.000Z"
    }
];

const SIMULATE_ERROR = false;

const classService = {
    getClasses: async (): Promise<ApiResponse<Class[]>> => {
        const useMock = true;
        if (useMock) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (SIMULATE_ERROR) {
                        reject(new Error("Failed to fetch classes (Simulated Error)"));
                    } else {
                        resolve({
                            status: 200,
                            error: null,
                            data: MOCK_CLASSES
                        });
                    }
                }, 500);
            });
        }
        const { data } = await axiosInstance.get<ApiResponse<Class[]>>("/classes");
        return data;
    },

    getOngoingClasses: async (): Promise<ApiResponse<Class[]>> => {
        const useMock = true;
        if (useMock) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (SIMULATE_ERROR) {
                        reject(new Error("Failed to fetch ongoing classes (Simulated Error)"));
                    } else {
                        resolve({
                            status: 200,
                            error: null,
                            data: MOCK_CLASSES_ONGOING
                        });
                    }
                }, 500);
            });
        }
        const { data } = await axiosInstance.get<ApiResponse<Class[]>>("/classes/status/ongoing");
        return data;
    },

    getCompletedClasses: async (): Promise<ApiResponse<Class[]>> => {
        const useMock = true;
        if (useMock) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (SIMULATE_ERROR) {
                        reject(new Error("Failed to fetch completed classes (Simulated Error)"));
                    } else {
                        resolve({
                            status: 200,
                            error: null,
                            data: MOCK_CLASSES_COMPLETED
                        });
                    }
                }, 500);
            });
        }
        const { data } = await axiosInstance.get<ApiResponse<Class[]>>("/classes/status/completed");
        return data;
    },

    createClass: async (payload: Partial<Class>): Promise<ApiResponse<Class>> => {
        const useMock = true;
        if (useMock) {
            return new Promise((resolve, reject) => {
                const newClass = {
                    ...payload,
                    id: Math.random().toString(36).substr(2, 9),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                } as Class;
                setTimeout(() => {
                    if (SIMULATE_ERROR) {
                        reject(new Error("Failed to create class (Simulated Error)"));
                    } else {
                        resolve({
                            status: 201,
                            error: null,
                            data: newClass
                        });
                    }
                }, 500);
            });
        }
        const { data } = await axiosInstance.post<ApiResponse<Class>>("/classes", payload);
        return data;
    }
};

export default classService;
