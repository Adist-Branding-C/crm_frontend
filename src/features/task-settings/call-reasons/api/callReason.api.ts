import axiosInstance from '../../../../api/axiosInstance';
import { CALL_REASON_API_ENDPOINTS } from '../constants/callReason.constants';
import type { CallReasonResponse } from '../types/callReason.types';

export async function fetchCallReasonsApi(params: Record<string, string | number | undefined> = {}): Promise<CallReasonResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const url = queryParams.toString()
    ? `${CALL_REASON_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
    : CALL_REASON_API_ENDPOINTS.GET_ALL;

  const response = await axiosInstance.get<CallReasonResponse>(url);
  return response.data;
}

export async function createCallReasonApi(data: { name: string; status: string }): Promise<CallReasonResponse> {
  const response = await axiosInstance.post<CallReasonResponse>(CALL_REASON_API_ENDPOINTS.CREATE, data);
  return response.data;
}

export async function updateCallReasonApi(id: number, data: { name: string; status: string }): Promise<CallReasonResponse> {
  const response = await axiosInstance.patch<CallReasonResponse>(CALL_REASON_API_ENDPOINTS.UPDATE(id), data);
  return response.data;
}

export async function deleteCallReasonApi(id: number): Promise<CallReasonResponse> {
  const response = await axiosInstance.delete<CallReasonResponse>(CALL_REASON_API_ENDPOINTS.DELETE(id));
  return response.data;
}
