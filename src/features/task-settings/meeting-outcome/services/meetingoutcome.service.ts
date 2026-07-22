import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { MEETING_OUTCOME_API_ENDPOINTS } from '../constants/index';
import type { ApiResponse } from '../../../../shared/types/common';
import type { MeetingOutcomeItem } from '../types/interface';
import type { MeetingOutcomeFormData, FetchMeetingOutcomesParams } from '../types/request';
import type { MeetingOutcomeListResponse } from '../types/response';

/**
 * HTTP client for the Meeting Outcome API - communicates with the backend only.
 *
 * Used by:
 * - meetingOutcomeApiService singleton (services/index.ts), consumed by
 *   useFetchMeetingOutcomes (list) and useMeetingOutcomeCrud (create/update/delete).
 */
export class MeetingOutcomeApiService {
  async fetchAll(params: FetchMeetingOutcomesParams): Promise<ApiResponse<MeetingOutcomeListResponse>> {
    const response = await axiosInstance.get<ApiResponse<MeetingOutcomeListResponse>>(
      MEETING_OUTCOME_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async create(data: MeetingOutcomeFormData): Promise<ApiResponse<MeetingOutcomeItem>> {
    const response = await axiosInstance.post<ApiResponse<MeetingOutcomeItem>>(MEETING_OUTCOME_API_ENDPOINTS.CREATE, data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: number, data: MeetingOutcomeFormData): Promise<ApiResponse<MeetingOutcomeItem>> {
    const response = await axiosInstance.patch<ApiResponse<MeetingOutcomeItem>>(MEETING_OUTCOME_API_ENDPOINTS.UPDATE(id), data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(MEETING_OUTCOME_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}
