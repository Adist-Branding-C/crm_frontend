import axiosInstance from '../../../../api/axiosInstance';
import { TASK_API } from '../constants/taskApiEndpoints';

export interface TaskApiResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

const buildQueryString = (params: Record<string, string | number | undefined>): string => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });
  return queryParams.toString();
};

export const taskService = {
  getTasks(params: Record<string, string | number | undefined> = {}): Promise<TaskApiResponse> {
    const queryString = buildQueryString(params);
    const url = queryString ? `${TASK_API.BASE}?${queryString}` : TASK_API.BASE;
    return axiosInstance.get<TaskApiResponse>(url).then(r => r.data);
  },

  createTask(data: Record<string, any>): Promise<TaskApiResponse> {
    return axiosInstance.post<TaskApiResponse>(TASK_API.BASE, data).then(r => r.data);
  },

  updateTask(id: number, data: Record<string, any>): Promise<TaskApiResponse> {
    return axiosInstance.patch<TaskApiResponse>(`${TASK_API.BASE}/${id}`, data).then(r => r.data);
  },

  deleteTask(id: number): Promise<Pick<TaskApiResponse, 'status' | 'message'>> {
    return axiosInstance.delete<TaskApiResponse>(`${TASK_API.BASE}/${id}`).then(r => ({ status: r.data.status, message: r.data.message }));
  },
};
