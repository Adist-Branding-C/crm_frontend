import axiosInstance from '../../../../api/axiosInstance';
import { DESIGNATION_API_ENDPOINTS } from '../constants/designation.constants';

class DesignationService {
  async getAllDesignations(params = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const url = queryParams.toString()
      ? `${DESIGNATION_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : DESIGNATION_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createDesignation(data) {
    const response = await axiosInstance.post(DESIGNATION_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateDesignation(id, data) {
    const response = await axiosInstance.patch(DESIGNATION_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteDesignation(id) {
    const response = await axiosInstance.delete(DESIGNATION_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const designationService = new DesignationService();
