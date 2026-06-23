import axiosInstance from '../../../api/axiosInstance';

class LeadService {
  async getLeads(search?: string) {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await axiosInstance.get(`/leads${params}`);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }
}

export const leadService = new LeadService();
