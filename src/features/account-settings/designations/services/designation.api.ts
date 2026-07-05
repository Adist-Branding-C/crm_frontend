import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { DESIGNATION_API_ENDPOINTS } from '../constants';
import type { DesignationItem, DesignationFormData } from '../types';

export class DesignationApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<{ items: DesignationItem[]; total?: number }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: DesignationItem[]; total?: number }>>(DESIGNATION_API_ENDPOINTS.GET_ALL, { params });
    return response.data;
  }

  async create(data: DesignationFormData): Promise<ApiResponse<DesignationItem>> {
    const response = await axiosInstance.post<ApiResponse<DesignationItem>>(DESIGNATION_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: DesignationFormData): Promise<ApiResponse<DesignationItem>> {
    const response = await axiosInstance.patch<ApiResponse<DesignationItem>>(DESIGNATION_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(DESIGNATION_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
