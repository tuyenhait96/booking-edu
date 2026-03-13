import { Center } from "./index";

export interface DashboardSummary {
    activeClasses: number;
    ongoingClasses: number;
    completedClasses: number;
    activeTeachers: number;
    activeStudents: number;
    activeParents: number;
    todayBookings: number;
    pendingBookings: number;
    todaySessions: number;
    todayAbsences: number;
    reportsPendingApproval: number;
    activeAnnouncements: number;
    openFeedbacks: number;
}

export interface DashboardData {
    center: Center;
    summary: DashboardSummary;
}
