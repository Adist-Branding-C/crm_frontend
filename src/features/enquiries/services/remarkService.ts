import axiosInstance from '../../../api/axiosInstance';
import type { RemarkListResponse, CreateRemarkPayload, UpdateRemarkPayload, RemarkApiResponse } from '../types/remark.types';

class RemarkService {
  async getRemarks(params: { referenceId: string; entityType: string }): Promise<RemarkListResponse> {
    const response = await axiosInstance.get<RemarkListResponse>('/remarks', { params });
    return response.data;
  }

  async createRemark(payload: CreateRemarkPayload): Promise<RemarkApiResponse> {
    const response = await axiosInstance.post<RemarkApiResponse>('/remarks', payload);
    return response.data;
  }

  async updateRemark(id: number, payload: UpdateRemarkPayload): Promise<RemarkApiResponse> {
    const response = await axiosInstance.patch<RemarkApiResponse>(`/remarks/${id}`, payload);
    return response.data;
  }

  async deleteRemark(id: number): Promise<RemarkApiResponse> {
    const response = await axiosInstance.delete<RemarkApiResponse>(`/remarks/${id}`);
    return response.data;
  }
}

export const remarkService = new RemarkService();
