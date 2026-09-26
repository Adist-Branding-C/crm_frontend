import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { LEAD_STATUS_API_ENDPOINTS } from '../constants/leadStatusApiEndpoints';
import type { LeadStatusListResponse } from '../types/response';

// Read-only now - the flat CRUD/reorder page this service used to back was
// replaced by the Lead Pipeline canvas builder and removed. getLeadStatuses
// stays because other features (Enquiries filters/forms, the automation
// rule builder) still read this flat list for their own dropdowns.
class LeadStatusService {
  async getLeadStatuses(page = 1, limit = 10, search?: string, sortOrder?: 'ASC' | 'DESC'): Promise<LeadStatusListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    if (sortOrder) params.sort_order = sortOrder;
    const response = await axiosInstance.get<LeadStatusListResponse>(LEAD_STATUS_API_ENDPOINTS.STATUSES, { params });
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const leadStatusService = new LeadStatusService();
