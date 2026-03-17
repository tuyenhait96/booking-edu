import axiosInstance from "@/lib/axios";
import type { ApiResponse, Subject, AcademicLevel, Classroom, Topic, Package, AcademicTerm } from "@/types";

const resourceService = {
    getSubjects: async (): Promise<ApiResponse<Subject[]>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<Subject[]>>("/subjects");
            return data;
        } catch {
            return {
                status: 200,
                error: null,
                data: [
                    {
                        "id": "f1d21db8-701e-47c8-aafe-a5827ee8a2eb",
                        "code": "CORE_SUBJECT_1773239000001",
                        "name": "Mathematics Primary",
                        "description": "Core math subject for primary students",
                        "isActive": true,
                        "createdBy": null,
                        "createdAt": "2026-03-12T09:00:00.000Z",
                        "updatedBy": null,
                        "updatedAt": "2026-03-12T09:00:00.000Z"
                    }
                ]
            };
        }
    },

    getAcademicLevels: async (): Promise<ApiResponse<AcademicLevel[]>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<AcademicLevel[]>>("/academic-levels");
            return data;
        } catch {
            return {
                status: 200,
                error: null,
                data: [
                    {
                        "id": "24d16cc4-c822-4f61-9941-c3a668cf9969",
                        "code": "P4",
                        "name": "Primary 4",
                        "rankOrder": 4,
                        "isActive": true,
                        "createdBy": null,
                        "createdAt": "2026-03-12T09:01:00.000Z",
                        "updatedBy": null,
                        "updatedAt": "2026-03-12T09:01:00.000Z"
                    }
                ]
            };
        }
    },

    getClassrooms: async (): Promise<ApiResponse<Classroom[]>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<Classroom[]>>("/classrooms");
            return data;
        } catch {
            return {
                status: 200,
                error: null,
                data: [
                    {
                        "id": "6ef22486-f7b6-4140-b5d2-f6d7dcd4c8d4",
                        "centerId": "07f57c33-8e41-4841-bf18-2d3348586fe1",
                        "name": "Room A1",
                        "code": "ROOM_A1",
                        "capacity": 12,
                        "description": "Main classroom for primary math",
                        "isActive": true,
                        "createdBy": null,
                        "createdAt": "2026-03-12T09:02:00.000Z",
                        "updatedBy": null,
                        "updatedAt": "2026-03-12T09:02:00.000Z"
                    }
                ]
            };
        }
    },

    getTopics: async (): Promise<ApiResponse<Topic[]>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<Topic[]>>("/topics");
            return data;
        } catch {
            return {
                status: 200,
                error: null,
                data: [
                    {
                        "id": "e3846669-1330-489c-b3da-582940fc5898",
                        "subjectId": "f1d21db8-701e-47c8-aafe-a5827ee8a2eb",
                        "levelId": "24d16cc4-c822-4f61-9941-c3a668cf9969",
                        "title": "Fractions and Decimals",
                        "description": "Introduction to fractions and decimals",
                        "isActive": true,
                        "createdBy": null,
                        "createdAt": "2026-03-12T09:03:00.000Z",
                        "updatedBy": null,
                        "updatedAt": "2026-03-12T09:03:00.000Z"
                    }
                ]
            };
        }
    },

    getPackages: async (): Promise<ApiResponse<Package[]>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<Package[]>>("/packages");
            return data;
        } catch {
            return {
                status: 200,
                error: null,
                data: [
                    {
                        "id": "65390c60-3ae8-408b-9f69-d9f74bec9a4f",
                        "code": "STD_PRIMARY",
                        "name": "Standard Primary Package",
                        "packageType": "STANDARD",
                        "description": "Standard learning package for primary students",
                        "maxConcurrentBooking": 1,
                        "exclusiveClassAccess": false,
                        "defaultMaxClassCapacity": 12,
                        "isActive": true,
                        "createdBy": null,
                        "createdAt": "2026-03-12T09:04:00.000Z",
                        "updatedBy": null,
                        "updatedAt": "2026-03-12T09:04:00.000Z"
                    }
                ]
            };
        }
    },

    getAcademicTerms: async (): Promise<ApiResponse<AcademicTerm[]>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<AcademicTerm[]>>("/academic-terms");
            return data;
        } catch {
            return {
                status: 200,
                error: null,
                data: [
                    {
                        "id": "term-1",
                        "code": "TERM_2026_Q1",
                        "name": "Term 1 2026",
                        "academicYear": 2026,
                        "startsOn": "2026-01-01",
                        "endsOn": "2026-06-30",
                        "isActive": true
                    }
                ]
            };
        }
    },

    async createClassroom(classroom: Partial<Classroom>): Promise<ApiResponse<Classroom>> {
        const { data } = await axiosInstance.post<ApiResponse<Classroom>>("/classrooms", classroom);
        return data;
    },

    getBenefits: async (): Promise<ApiResponse<any[]>> => {
        return {
            status: 200,
            error: null,
            data: [
                { id: "1", title: "Free Trial", description: "First session is free for new students.", isActive: true },
                { id: "2", title: "Sibling Discount", description: "10% off for the second child.", isActive: true },
                { id: "3", title: "Early Bird", description: "5% discount for payments 1 month in advance.", isActive: true },
                { id: "4", title: "Referral Bonus", description: "$20 credit for each successful referral.", isActive: true },
                { id: "5", title: "Summer Special", description: "Bundle 10 classes and get 2 free.", isActive: false }
            ]
        };
    },

    createBenefit: async (payload: any): Promise<ApiResponse<any>> => {
        return {
            status: 201,
            success: true,
            data: { ...payload, id: Math.random().toString(36).substr(2, 9), isActive: true }
        };
    },

    getFAQs: async (): Promise<ApiResponse<any[]>> => {
        return {
            status: 200,
            error: null,
            data: [
                { id: "1", question: "What is the fee structure?", answer: "Fees vary by subject and level. Contact us for details.", isActive: true },
                { id: "2", question: "Where are the centers located?", answer: "We have centers in Jurong, Tampines, and Bishan.", isActive: true },
                { id: "3", question: "Are parents allowed in class?", answer: "We allow observing for the first 15 minutes of trial sessions.", isActive: true },
                { id: "4", question: "What is the refund policy?", answer: "Cancellations must be made 24 hours in advance for a credit.", isActive: true },
                { id: "5", question: "Do you offer online classes?", answer: "Yes, hybrid and fully online options are available.", isActive: true }
            ]
        };
    },

    createFAQ: async (payload: any): Promise<ApiResponse<any>> => {
        return {
            status: 201,
            success: true,
            data: { ...payload, id: Math.random().toString(36).substr(2, 9), isActive: true }
        };
    }
};

export default resourceService;
