import axiosInstance from '../../../../api/axiosInstance';
import { MEETING_OUTCOME_API_ENDPOINTS } from '../constants/index';
import type { MeetingOutcomeResponse } from '../types/index';

export async function fetchMeetingOutcomesApi(params: Record<string, string | number | undefined> = {}): Promise<MeetingOutcomeResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const url = queryParams.toString()
    ? `${MEETING_OUTCOME_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
    : MEETING_OUTCOME_API_ENDPOINTS.GET_ALL;

  const response = await axiosInstance.get<MeetingOutcomeResponse>(url);
  return {
    status: response.data.status,
    message: response.data.message,
    data: response.data.data,
  };
}

export async function createMeetingOutcomeApi(data: { name: string; status: string }): Promise<MeetingOutcomeResponse> {
  const response = await axiosInstance.post<MeetingOutcomeResponse>(MEETING_OUTCOME_API_ENDPOINTS.CREATE, data);
  return {
    status: response.data.status,
    message: response.data.message,
    data: response.data.data,
    errors: response.data.errors,
    field: response.data.field,
  };
}

export async function updateMeetingOutcomeApi(id: number, data: { name: string; status: string }): Promise<MeetingOutcomeResponse> {
  const response = await axiosInstance.patch<MeetingOutcomeResponse>(MEETING_OUTCOME_API_ENDPOINTS.UPDATE(id), data);
  return {
    status: response.data.status,
    message: response.data.message,
    data: response.data.data,
    errors: response.data.errors,
    field: response.data.field,
  };
}

export async function deleteMeetingOutcomeApi(id: number): Promise<Pick<MeetingOutcomeResponse, 'status' | 'message'>> {
  const response = await axiosInstance.delete<MeetingOutcomeResponse>(MEETING_OUTCOME_API_ENDPOINTS.DELETE(id));
  return {
    status: response.data.status,
    message: response.data.message,
  };
}
