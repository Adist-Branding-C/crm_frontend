import axiosInstance from '../../../../api/axiosInstance';
import { CALL_STATUS_API_ENDPOINTS } from '../constants/index';
import type { CallStatusResponse } from '../types/index';

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
  return {
    status: response.data.status,
    message: response.data.message,
    data: response.data.data,
  };
}

export async function createCallStatusApi(data: { name: string; status: string }): Promise<CallStatusResponse> {
  const response = await axiosInstance.post<CallStatusResponse>(CALL_STATUS_API_ENDPOINTS.CREATE, data);
  return {
    status: response.data.status,
    message: response.data.message,
    data: response.data.data,
    errors: response.data.errors,
    field: response.data.field,
  };
}

export async function updateCallStatusApi(id: number, data: { name: string; status: string }): Promise<CallStatusResponse> {
  const response = await axiosInstance.patch<CallStatusResponse>(CALL_STATUS_API_ENDPOINTS.UPDATE(id), data);
  return {
    status: response.data.status,
    message: response.data.message,
    data: response.data.data,
    errors: response.data.errors,
    field: response.data.field,
  };
}

export async function deleteCallStatusApi(id: number): Promise<Pick<CallStatusResponse, 'status' | 'message'>> {
  const response = await axiosInstance.delete<CallStatusResponse>(CALL_STATUS_API_ENDPOINTS.DELETE(id));
  return {
    status: response.data.status,
    message: response.data.message,
  };
}
