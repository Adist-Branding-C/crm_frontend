import axiosInstance from '../../../api/axiosInstance';
import { LEAD_EXPORT_API_ENDPOINTS } from '../constants/leadExportApiEndpoints';
import type { CreateLeadExportPayload, CreateLeadExportResponse, LeadExportHistoryResponse } from '../types';

class LeadExportService {
  async createExport(payload: CreateLeadExportPayload): Promise<CreateLeadExportResponse> {
    const response = await axiosInstance.post<CreateLeadExportResponse>(LEAD_EXPORT_API_ENDPOINTS.CREATE, payload);
    return {
      status: response.data.status,
      message: response.data.message,
      ...(response.data.data !== undefined ? { data: response.data.data } : {}),
    };
  }

  async getHistory(params: { pageNumber: number; limit: number; search?: string }): Promise<LeadExportHistoryResponse> {
    const response = await axiosInstance.get<LeadExportHistoryResponse>(LEAD_EXPORT_API_ENDPOINTS.HISTORY, { params });
    return {
      status: response.data.status,
      message: response.data.message,
      ...(response.data.data !== undefined ? { data: response.data.data } : {}),
    };
  }

  async downloadExport(exportId: string): Promise<{ data: Blob; headers: Record<string, string> }> {
    const response = await axiosInstance.get(LEAD_EXPORT_API_ENDPOINTS.DOWNLOAD(exportId), { responseType: 'blob' });
    return { data: response.data as Blob, headers: response.headers as unknown as Record<string, string> };
  }
}

export const leadExportService = new LeadExportService();
