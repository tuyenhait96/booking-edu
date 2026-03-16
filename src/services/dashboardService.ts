import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";
import { DashboardData } from "@/types/dashboard";

const MOCK_DASHBOARD_DATA: DashboardData = {
    "center": {
        "id": "2c0ea621-55a9-42a5-afeb-1be83ad95f16",
        "organizationId": "b4d8887f-67cb-4719-bc6f-fb4230d4d5d2",
        "name": "Tampines",
        "code": "TAMPINES",
        "isActive": true,
        "createdBy": "5cf0b35d-2d9f-4df0-9009-e17be70cd320",
        "createdAt": "2026-03-12T08:32:00.000Z",
        "updatedBy": null,
        "updatedAt": "2026-03-12T08:32:00.000Z"
    },
    "summary": {
        "activeClasses": 2,
        "ongoingClasses": 1,
        "completedClasses": 1,
        "activeTeachers": 1,
        "activeStudents": 1,
        "activeParents": 1,
        "todayBookings": 1,
        "pendingBookings": 1,
        "todaySessions": 0,
        "todayAbsences": 0,
        "reportsPendingApproval": 1,
        "activeAnnouncements": 1,
        "openFeedbacks": 1
    }
};

const dashboardService = {
    getDashboardData: async (): Promise<ApiResponse<DashboardData>> => {
        try {
            const { data } = await axiosInstance.get<ApiResponse<DashboardData>>("/dashboard");
            return data;
        } catch {
            // console.error('API Error (getDashboardData), falling back to mock data:', error);
            return {
                status: 200,
                error: null,
                data: MOCK_DASHBOARD_DATA
            };
        }
    }
};

export default dashboardService;
