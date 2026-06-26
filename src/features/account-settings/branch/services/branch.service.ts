import axiosInstance from '../../../../api/axiosInstance';
import { BRANCH_API_ENDPOINTS } from '../constants/branchApiEndpoints';
import type { BranchRequest, GetAllBranchesParams, GetAllBranchesResponse, BranchResponse, DeleteBranchResponse } from '../types/branch.types';

class BranchService {
  async getAllBranches(params: GetAllBranchesParams = {}): Promise<GetAllBranchesResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${BRANCH_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : BRANCH_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<GetAllBranchesResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createBranch(data: BranchRequest): Promise<BranchResponse> {
    const response = await axiosInstance.post<BranchResponse>(BRANCH_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async updateBranch(id: number, data: BranchRequest): Promise<BranchResponse> {
    const response = await axiosInstance.patch<BranchResponse>(BRANCH_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async deleteBranch(id: number): Promise<DeleteBranchResponse> {
    const response = await axiosInstance.delete<DeleteBranchResponse>(BRANCH_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const branchService = new BranchService();
