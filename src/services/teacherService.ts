import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";

export interface Teacher {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    specialization: string;
    bio: string;
    isActive: boolean;
    centerId?: string;
}

const MOCK_TEACHERS: Teacher[] = [
    {
        id: "1",
        fullName: "John Smith",
        email: "john.smith@edu.com",
        phone: "0123456789",
        specialization: "Mathematics",
        bio: "Expert in primary math education.",
        isActive: true,
        centerId: "2c0ea621-55a9-42a5-afeb-1be83ad95f16"
    },
    {
        id: "2",
        fullName: "Maria Garcia",
        email: "maria.garcia@edu.com",
        phone: "0987123456",
        specialization: "Physics",
        bio: "Passionate about making physics simple.",
        isActive: true,
        centerId: "2c0ea621-55a9-42a5-afeb-1be83ad95f16"
    },
    {
        id: "3",
        fullName: "David Chen",
        email: "david.chen@edu.com",
        phone: "0345678912",
        specialization: "Chemistry",
        bio: "Chemistry lead with 10 years experience.",
        isActive: true
    },
    {
        id: "4",
        fullName: "Emily Brown",
        email: "emily.brown@edu.com",
        phone: "0567891234",
        specialization: "English",
        bio: "Literature and language specialist.",
        isActive: true
    },
    {
        id: "5",
        fullName: "Robert Wilson",
        email: "robert.wilson@edu.com",
        phone: "0789123456",
        specialization: "Biology",
        bio: "Marine biology enthusiast and educator.",
        isActive: false
    }
];

const teacherService = {
    getTeachers: async (): Promise<ApiResponse<Teacher[]>> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    success: true,
                    data: MOCK_TEACHERS
                });
            }, 500);
        });
    },

    createTeacher: async (payload: Partial<Teacher>): Promise<ApiResponse<Teacher>> => {
        return new Promise((resolve) => {
            const newTeacher = {
                ...payload,
                id: Math.random().toString(36).substr(2, 9),
                isActive: true
            } as Teacher;
            setTimeout(() => {
                resolve({
                    status: 201,
                    success: true,
                    data: newTeacher
                });
            }, 500);
        });
    },

    assignToCenter: async (teacherId: string, centerId: string): Promise<ApiResponse<void>> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    success: true,
                    message: "Teacher assigned to center successfully",
                    data: undefined
                });
            }, 500);
        });
    }
};

export default teacherService;
