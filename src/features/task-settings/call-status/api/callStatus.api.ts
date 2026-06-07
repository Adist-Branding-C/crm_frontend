import axiosInstance from '../../../../api/axiosInstance';
import { CALL_STATUS_API_ENDPOINTS } from '../constants/callStatus.constants';
import type { CallStatusResponse } from '../types/callStatus.types';

export async function fetchCallStatusesApi(params: Record<string, string | number | undefined> = {}): Promise<CallStatusResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const url = queryParams.toString()
    ? `${CALL_STATUS_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
    : CALL_STATUS_API_ENDPOINTS.GET_ALL;

  const response = await axiosInstance.get<CallStatusResponse>(url);
  return response.data;
}

export async function createCallStatusApi(data: { name: string; status: string }): Promise<CallStatusResponse> {
  const response = await axiosInstance.post<CallStatusResponse>(CALL_STATUS_API_ENDPOINTS.CREATE, data);
  return response.data;
}

export async function updateCallStatusApi(id: number, data: { name: string; status: string }): Promise<CallStatusResponse> {
  const response = await axiosInstance.patch<CallStatusResponse>(CALL_STATUS_API_ENDPOINTS.UPDATE(id), data);
  return response.data;
}

export async function deleteCallStatusApi(id: number): Promise<CallStatusResponse> {
  const response = await axiosInstance.delete<CallStatusResponse>(CALL_STATUS_API_ENDPOINTS.DELETE(id));
  return response.data;
}
