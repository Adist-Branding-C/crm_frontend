import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { MEETING_OUTCOME_API_ENDPOINTS } from '../constants/index';
import type { MeetingOutcomeItem } from '../types/index';

export class MeetingOutcomeApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<MeetingOutcomeItem[]>> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const url = queryParams.toString()
      ? `${MEETING_OUTCOME_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : MEETING_OUTCOME_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<ApiResponse<MeetingOutcomeItem[]>>(url);
    return response.data;
  }

  async create(data: { name: string; status: string }): Promise<ApiResponse<MeetingOutcomeItem>> {
    const response = await axiosInstance.post<ApiResponse<MeetingOutcomeItem>>(MEETING_OUTCOME_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: { name: string; status: string }): Promise<ApiResponse<MeetingOutcomeItem>> {
    const response = await axiosInstance.patch<ApiResponse<MeetingOutcomeItem>>(MEETING_OUTCOME_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(MEETING_OUTCOME_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
