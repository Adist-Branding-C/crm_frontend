import axiosInstance from '../../../../api/axiosInstance';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { MEETING_OUTCOME_API_ENDPOINTS } from '../constants/index';
import type { ApiResponse } from '../../../../shared/types/common';
import type { MeetingOutcomeItem } from '../types/interface';
import type { MeetingOutcomeFormData, FetchMeetingOutcomesParams } from '../types/request';
import type { MeetingOutcomeListResponse } from '../types/response';

export class MeetingOutcomeApiService {
  async fetchAll(params: FetchMeetingOutcomesParams): Promise<ApiResponse<MeetingOutcomeListResponse>> {
    const response = await axiosInstance.get<ApiResponse<MeetingOutcomeListResponse>>(
      MEETING_OUTCOME_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) },
    );
    return response.data;
  }

  async create(data: MeetingOutcomeFormData): Promise<ApiResponse<MeetingOutcomeItem>> {
    const response = await axiosInstance.post<ApiResponse<MeetingOutcomeItem>>(MEETING_OUTCOME_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: MeetingOutcomeFormData): Promise<ApiResponse<MeetingOutcomeItem>> {
    const response = await axiosInstance.patch<ApiResponse<MeetingOutcomeItem>>(MEETING_OUTCOME_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(MEETING_OUTCOME_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
