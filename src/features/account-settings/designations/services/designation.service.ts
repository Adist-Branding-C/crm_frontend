import axiosInstance from '../../../../api/axiosInstance';
import { DESIGNATION_API_ENDPOINTS } from '../constants/designationApiEndpoints';
import type { DesignationFormData, DesignationResponse, DeleteDesignationResponse } from '../types/designation.types';

class DesignationService {
  async getAllDesignations(params: Record<string, string | number | undefined> = {}): Promise<DesignationResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${DESIGNATION_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : DESIGNATION_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<DesignationResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createDesignation(data: DesignationFormData): Promise<DesignationResponse> {
    const response = await axiosInstance.post<DesignationResponse>(DESIGNATION_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async updateDesignation(id: number, data: DesignationFormData): Promise<DesignationResponse> {
    const response = await axiosInstance.patch<DesignationResponse>(DESIGNATION_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async deleteDesignation(id: number): Promise<DeleteDesignationResponse> {
    const response = await axiosInstance.delete<DesignationResponse>(DESIGNATION_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const designationService = new DesignationService();
