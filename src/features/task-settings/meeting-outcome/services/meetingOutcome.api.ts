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
  return response.data;
}

export async function createMeetingOutcomeApi(data: { name: string; status: string }): Promise<MeetingOutcomeResponse> {
  const response = await axiosInstance.post<MeetingOutcomeResponse>(MEETING_OUTCOME_API_ENDPOINTS.CREATE, data);
  return response.data;
}

export async function updateMeetingOutcomeApi(id: number, data: { name: string; status: string }): Promise<MeetingOutcomeResponse> {
  const response = await axiosInstance.patch<MeetingOutcomeResponse>(MEETING_OUTCOME_API_ENDPOINTS.UPDATE(id), data);
  return response.data;
}

export async function deleteMeetingOutcomeApi(id: number): Promise<MeetingOutcomeResponse> {
  const response = await axiosInstance.delete<MeetingOutcomeResponse>(MEETING_OUTCOME_API_ENDPOINTS.DELETE(id));
  return response.data;
}
