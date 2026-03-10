import axiosInstance from "@/lib/axios";
import type { ApiResponse, PaginatedResponse } from "@/types";

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  type: string;
  plan: string;
  status: "active" | "inactive" | "pending";
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantDto {
  name: string;
  domain: string;
  type: string;
  plan: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface UpdateTenantDto extends Partial<CreateTenantDto> {
  status?: "active" | "inactive" | "pending";
}

const tenantService = {
  // Get all tenants with pagination and filtering
  getTenants: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    type?: string;
  }): Promise<PaginatedResponse<Tenant>> => {
    const { data } = await axiosInstance.get<PaginatedResponse<Tenant>>(
      "/tenants",
      { params }
    );
    return data;
  },

  // Get a single tenant by ID
  getTenantById: async (id: string): Promise<ApiResponse<Tenant>> => {
    const { data } = await axiosInstance.get<ApiResponse<Tenant>>(
      `/tenants/${id}`
    );
    return data;
  },

  // Create a new tenant
  createTenant: async (
    payload: CreateTenantDto
  ): Promise<ApiResponse<Tenant>> => {
    const { data } = await axiosInstance.post<ApiResponse<Tenant>>(
      "/tenants",
      payload
    );
    return data;
  },

  // Update an existing tenant
  updateTenant: async (
    id: string,
    payload: UpdateTenantDto
  ): Promise<ApiResponse<Tenant>> => {
    const { data } = await axiosInstance.put<ApiResponse<Tenant>>(
      `/tenants/${id}`,
      payload
    );
    return data;
  },

  // Delete a tenant
  deleteTenant: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await axiosInstance.delete<ApiResponse<void>>(
      `/tenants/${id}`
    );
    return data;
  },

  // Update tenant status
  updateTenantStatus: async (
    id: string,
    status: "active" | "inactive" | "pending"
  ): Promise<ApiResponse<Tenant>> => {
    const { data } = await axiosInstance.patch<ApiResponse<Tenant>>(
      `/tenants/${id}/status`,
      { status }
    );
    return data;
  },
};

export default tenantService;