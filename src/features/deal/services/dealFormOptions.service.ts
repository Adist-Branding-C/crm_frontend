import axiosInstance from '../../../api/axiosInstance';

class DealFormOptionsService {
  async getLeads(pageNumber = 1, limit = 100) {
    const response = await axiosInstance.get(`/leads?pageNumber=${pageNumber}&limit=${limit}`);
    return response.data;
  }

  async getStaff(pageNumber = 1, limit = 100) {
    const response = await axiosInstance.get(`/staff?pageNumber=${pageNumber}&limit=${limit}`);
    return response.data;
  }

  async getStatuses(pageNumber = 1, limit = 10) {
    const response = await axiosInstance.get(`/deal-settings/status?pageNumber=${pageNumber}&limit=${limit}`);
    return response.data;
  }

  async getTypes(pageNumber = 1, limit = 10) {
    const response = await axiosInstance.get(`/deal-settings/types?pageNumber=${pageNumber}&limit=${limit}`);
    return response.data;
  }
}

export const dealFormOptionsService = new DealFormOptionsService();
