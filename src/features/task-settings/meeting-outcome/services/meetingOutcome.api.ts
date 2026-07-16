import axiosInstance from '../../../../api/axiosInstance';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { MEETING_OUTCOME_API_ENDPOINTS } from '../constants/index';
import type { ApiResponse } from '../../../../shared/types/common';
import type { MeetingOutcomeFormData, FetchMeetingOutcomesParams } from '../types/request';
import type { MeetingOutcomeApiResponse, MeetingOutcomeListResponse } from '../types/response';

type ListServiceResponse<T> = ApiResponse<T> & { errors?: Record<string, string[]>; field?: string };

/**
 * HTTP client for the Meeting Outcome API - communicates with the backend only.
 *
 * Used by:
 * - meetingOutcomeApiService singleton (services/index.ts), consumed by
 *   useFetchMeetingOutcomes (list) and useMeetingOutcomeCrud (create/update/delete).
 *
 * Notes:
 * - Returns the full backend response (including `errors` and `field`) so that
 *   useSubmitErrorHandler can map per-field validation errors back to Formik.
 */
export class MeetingOutcomeApiService {
  async fetchAll(params: FetchMeetingOutcomesParams): Promise<ListServiceResponse<MeetingOutcomeListResponse>> {
    const response = await axiosInstance.get<ListServiceResponse<MeetingOutcomeListResponse>>(
      MEETING_OUTCOME_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) },
    );
    return response.data;
  }

  async create(data: MeetingOutcomeFormData): Promise<MeetingOutcomeApiResponse> {
    const response = await axiosInstance.post<MeetingOutcomeApiResponse>(MEETING_OUTCOME_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: MeetingOutcomeFormData): Promise<MeetingOutcomeApiResponse> {
    const response = await axiosInstance.patch<MeetingOutcomeApiResponse>(MEETING_OUTCOME_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<MeetingOutcomeApiResponse> {
    const response = await axiosInstance.delete<MeetingOutcomeApiResponse>(MEETING_OUTCOME_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
