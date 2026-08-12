import axiosInstance from '../../../api/axiosInstance';
import { LEAD_IMPORT_API_ENDPOINTS } from '../constants/leadImportApiEndpoints';
import type {
  CreateLeadImportResponse,
  LeadImportHistoryResponse,
  LeadImportHistoryDetailResponse,
  LeadImportEntriesResponse,
} from '../types';

class LeadImportService {
  async uploadFile(file: File): Promise<CreateLeadImportResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axiosInstance.post<CreateLeadImportResponse>(
      LEAD_IMPORT_API_ENDPOINTS.CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async downloadSample(): Promise<{ data: Blob; headers: Record<string, string> }> {
    const response = await axiosInstance.get(LEAD_IMPORT_API_ENDPOINTS.SAMPLE, { responseType: 'blob' });
    return { data: response.data as Blob, headers: response.headers as unknown as Record<string, string> };
  }

  async getHistory(params: { pageNumber: number; limit: number; search?: string }): Promise<LeadImportHistoryResponse> {
    const response = await axiosInstance.get<LeadImportHistoryResponse>(LEAD_IMPORT_API_ENDPOINTS.HISTORY, { params });
    return response.data;
  }

  async getHistoryDetail(importId: string): Promise<LeadImportHistoryDetailResponse> {
    const response = await axiosInstance.get<LeadImportHistoryDetailResponse>(LEAD_IMPORT_API_ENDPOINTS.HISTORY_DETAIL(importId));
    return response.data;
  }

  async getHistoryEntries(importId: string, params: { pageNumber: number; limit: number; status?: string }): Promise<LeadImportEntriesResponse> {
    const response = await axiosInstance.get<LeadImportEntriesResponse>(LEAD_IMPORT_API_ENDPOINTS.HISTORY_ENTRIES(importId), { params });
    return response.data;
  }
}

export const leadImportService = new LeadImportService();
