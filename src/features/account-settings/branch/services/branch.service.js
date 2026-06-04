import axiosInstance from '../../../../api/axiosInstance';
import { BRANCH_API_ENDPOINTS } from '../constants/branch.constants';

class BranchService {
  async getAllBranches(params = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const url = queryParams.toString()
      ? `${BRANCH_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : BRANCH_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createBranch(data) {
    const response = await axiosInstance.post(BRANCH_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateBranch(id, data) {
    const response = await axiosInstance.patch(BRANCH_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteBranch(id) {
    const response = await axiosInstance.delete(BRANCH_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const branchService = new BranchService();
