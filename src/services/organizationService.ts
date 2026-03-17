import axiosInstance from "@/lib/axios";
import type { ApiResponse, PaginatedResponse } from "@/types";

import { Organization } from "@/types";

export interface CreateOrganizationDto {
  name: string;
  phone: string;
  email: string;
  address: string;
  maxCenters: number;
}

export type UpdateOrganizationDto = Partial<CreateOrganizationDto>;

const MOCK_ORGANIZATIONS: Organization[] = [
  {
    "id": "b4d8887f-67cb-4719-bc6f-fb4230d4d5d2",
    "name": "TEE Organization",
    "phone": "0289999999",
    "email": "tee-org@example.com",
    "address": "Singapore",
    "isActive": true,
    "maxCenters": 4,
    "createdBy": "5cf0b35d-2d9f-4df0-9009-e17be70cd320",
    "createdAt": "2026-03-12T08:31:00.000Z",
    "updatedBy": null,
    "updatedAt": "2026-03-12T08:31:00.000Z"
  }
];

const organizationService = {
  getOrganizations: async (params?: unknown): Promise<PaginatedResponse<Organization>> => {
    const useMock = true; // Set to true to use mock data
    if (useMock) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({
          data: MOCK_ORGANIZATIONS,
          meta: {
            page: 1,
            limit: 10,
            total: MOCK_ORGANIZATIONS.length,
            totalPages: 1
          },
          success: true,
          message: "Organizations retrieved successfully"
        }), 500);
      });
    }
    const { data } = await axiosInstance.get<PaginatedResponse<Organization>>("/organizations", { params });
    return data;
  },

  getOrganizationById: async (id: string): Promise<ApiResponse<Organization>> => {
    const useMock = true;
    if (useMock) {
      return new Promise((resolve) => {
        const organization = MOCK_ORGANIZATIONS.find(t => t.id === id) || MOCK_ORGANIZATIONS[0];
        setTimeout(() => resolve({
          data: organization,
          success: true,
          message: "Organization retrieved successfully"
        }), 500);
      });
    }
    const { data } = await axiosInstance.get<ApiResponse<Organization>>(`/organizations/${id}`);
    return data;
  },

  createOrganization: async (payload: CreateOrganizationDto): Promise<ApiResponse<Organization>> => {
    const useMock = false; // Changed from true to allow real API calls
    if (useMock) {
      return new Promise((resolve) => {
        const newOrganization = {
          ...payload,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: "system"
        } as Organization;
        setTimeout(() => resolve({
          data: newOrganization,
          success: true,
          message: "Organization created successfully"
        }), 500);
      });
    }
    const { data } = await axiosInstance.post<ApiResponse<Organization>>("/organizations", payload);
    return data;
  },

  // Update an existing organization
  updateOrganization: async (
    id: string,
    payload: UpdateOrganizationDto
  ): Promise<ApiResponse<Organization>> => {
    const { data } = await axiosInstance.patch<ApiResponse<Organization>>(
      `/organizations/${id}`,
      payload
    );
    return data;
  },

  // Delete an organization
  deleteOrganization: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await axiosInstance.delete<ApiResponse<void>>(
      `/organizations/${id}`
    );
    return data;
  },

  // Update organization status
  updateOrganizationStatus: async (
    id: string,
    status: boolean
  ): Promise<ApiResponse<Organization>> => {
    const { data } = await axiosInstance.patch<ApiResponse<Organization>>(
      `/organizations/${id}/status`,
      { isActive: status }
    );
    return data;
  },
};

export default organizationService;
