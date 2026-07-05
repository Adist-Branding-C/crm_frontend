import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { DEPARTMENT_API_ENDPOINTS } from '../constants';
import type { DepartmentItem, DepartmentFormData } from '../types';

export class DepartmentApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<{ items: DepartmentItem[]; pagination?: { total: number } }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: DepartmentItem[]; pagination?: { total: number } }>>(DEPARTMENT_API_ENDPOINTS.GET_ALL, { params });
    return response.data;
  }

  async create(data: DepartmentFormData): Promise<ApiResponse<DepartmentItem>> {
    const response = await axiosInstance.post<ApiResponse<DepartmentItem>>(DEPARTMENT_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: DepartmentFormData): Promise<ApiResponse<DepartmentItem>> {
    const response = await axiosInstance.patch<ApiResponse<DepartmentItem>>(DEPARTMENT_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(DEPARTMENT_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
