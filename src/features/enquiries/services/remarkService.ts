import axiosInstance from '../../../api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/common';
import type { Remark } from '../types/interface';
import type { RemarkListData } from '../types/response';
import type { CreateRemarkPayload, UpdateRemarkPayload } from '../types/request';

class RemarkService {
  async getRemarks(params: { referenceId: string; entityType: string }): Promise<ApiResponse<RemarkListData>> {
    const response = await axiosInstance.get<ApiResponse<RemarkListData>>('/remarks', { params });
    return response.data;
  }

  async createRemark(payload: CreateRemarkPayload): Promise<ApiResponse<Remark>> {
    const response = await axiosInstance.post<ApiResponse<Remark>>('/remarks', payload);
    return response.data;
  }

  async updateRemark(id: number, payload: UpdateRemarkPayload): Promise<ApiResponse<Remark>> {
    const response = await axiosInstance.patch<ApiResponse<Remark>>(`/remarks/${id}`, payload);
    return response.data;
  }

  async deleteRemark(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(`/remarks/${id}`);
    return response.data;
  }
}

export const remarkService = new RemarkService();
