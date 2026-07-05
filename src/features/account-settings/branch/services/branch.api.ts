import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { BRANCH_API_ENDPOINTS } from '../constants';
import type { BranchItem, BranchFormData } from '../types';

export class BranchApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<{ items: BranchItem[]; total?: number }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: BranchItem[]; total?: number }>>(BRANCH_API_ENDPOINTS.GET_ALL, { params });
    return response.data;
  }

  async create(data: BranchFormData): Promise<ApiResponse<BranchItem>> {
    const response = await axiosInstance.post<ApiResponse<BranchItem>>(BRANCH_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: BranchFormData): Promise<ApiResponse<BranchItem>> {
    const response = await axiosInstance.patch<ApiResponse<BranchItem>>(BRANCH_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(BRANCH_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
