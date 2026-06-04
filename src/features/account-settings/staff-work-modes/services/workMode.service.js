import axiosInstance from '../../../../api/axiosInstance';
import { WORK_MODE_API_ENDPOINTS } from '../constants/workMode.constants';

class WorkModeService {
  async getAllWorkModes(params = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const url = queryParams.toString()
      ? `${WORK_MODE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : WORK_MODE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createWorkMode(data) {
    const response = await axiosInstance.post(WORK_MODE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateWorkMode(id, data) {
    const response = await axiosInstance.patch(WORK_MODE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteWorkMode(id) {
    const response = await axiosInstance.delete(WORK_MODE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const workModeService = new WorkModeService();
