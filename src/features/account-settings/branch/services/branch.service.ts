import axiosInstance from '../../../../api/axiosInstance';
import { BRANCH_API_ENDPOINTS } from '../constants/branchApiEndpoints';
import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import type { BranchRequest, GetAllBranchesParams, GetAllBranchesResponse, BranchListData, BranchResponse, BranchResponseData, DeleteBranchResponse } from '../types/branch.types';

class BranchService {
  async getAllBranches(params: GetAllBranchesParams = {}): Promise<GetAllBranchesResponse> {
    const { pageNumber, limit, search } = params;
    const queryString = buildQueryParams({ pageNumber, limit, search });
    const url = queryString ? `${BRANCH_API_ENDPOINTS.GET_ALL}?${queryString}` : BRANCH_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<GetAllBranchesResponse>(url);
    return response.data;
  }

  async createBranch(data: BranchRequest): Promise<BranchResponse> {
    const { name, description, status } = data;
    const payload = { name, description, status };
    const response = await axiosInstance.post<BranchResponse>(BRANCH_API_ENDPOINTS.CREATE, payload);
    return response.data;
  }

  async updateBranch(id: number, data: BranchRequest): Promise<BranchResponse> {
    const { name, description, status } = data;
    const payload = { name, description, status };
    const response = await axiosInstance.patch<BranchResponse>(BRANCH_API_ENDPOINTS.UPDATE(id), payload);
    return response.data;
  }

  async deleteBranch(id: number): Promise<DeleteBranchResponse> {
    const response = await axiosInstance.delete<DeleteBranchResponse>(BRANCH_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}

export const branchService = new BranchService();
