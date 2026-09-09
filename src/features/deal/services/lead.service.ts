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

  async updateLead(leadId: string, data: { statusId: string }) {
    const response = await axiosInstance.patch(`/leads/${leadId}`, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  // Resolve a lead by its numeric primary key - the deal detail drawer only
  // carries deal.leadId (the FK), not the lead_id business key that
  // `GET /leads/:leadId` expects.
  async getLeadByPk(id: string | number) {
    const response = await axiosInstance.get(`/leads/by-id/${id}`);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }
}

export const leadService = new LeadService();
