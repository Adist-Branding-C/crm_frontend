import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { TASK_API } from '../constants/taskApiEndpoints';

export interface TaskCategory {
  id: string;
  taskCategory: string;
}

export interface StaffMember {
  id: number;
  name: string;
  staff_id: string;
}

export interface LeadMember {
  id: number;
  name: string;
}

export interface LeadTaskApiItem {
  id: number;
  title: string;
  description: string;
  category: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface LeadTaskPayload {
  title: string;
  description?: string;
  category?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  assignedTo?: string;
  priority?: string;
  status: string;
  leadId?: string | number;
}

export const taskService = {
  getTaskCategories(): Promise<ApiResponse<{ items: TaskCategory[] }>> {
    return axiosInstance.get<ApiResponse<{ items: TaskCategory[] }>>(
      TASK_API.CATEGORY,
      { params: { pageNumber: 1, limit: 10 } }
    ).then(r => r.data);
  },

  getLeads(): Promise<ApiResponse<{ items: LeadMember[] }>> {
    return axiosInstance.get<ApiResponse<{ items: LeadMember[] }>>(
      TASK_API.LEAD,
      { params: { pageNumber: 1, limit: 100 } }
    ).then(r => r.data);
  },

  getStaff(): Promise<ApiResponse<{ items: StaffMember[] }>> {
    return axiosInstance.get<ApiResponse<{ items: StaffMember[] }>>(
      TASK_API.STAFF,
      { params: { pageNumber: 1, limit: 100 } }
    ).then(r => r.data);
  },

  getTasks(params: { leadId?: string | number }): Promise<ApiResponse<{ items: LeadTaskApiItem[] }>> {
    return axiosInstance.get<ApiResponse<{ items: LeadTaskApiItem[] }>>(
      TASK_API.BASE,
      { params: { pageNumber: 1, limit: 100, ...params } }
    ).then(r => r.data);
  },

  createTask(data: LeadTaskPayload): Promise<ApiResponse<{ id: number }>> {
    return axiosInstance.post<ApiResponse<{ id: number }>>(TASK_API.BASE, data).then(r => r.data);
  },

  updateTask(id: number, data: LeadTaskPayload): Promise<ApiResponse<null>> {
    return axiosInstance.patch<ApiResponse<null>>(`${TASK_API.BASE}/${id}`, data).then(r => r.data);
  },

  deleteTask(id: number): Promise<ApiResponse<null>> {
    return axiosInstance.delete<ApiResponse<null>>(`${TASK_API.BASE}/${id}`).then(r => r.data);
  },

  updateTask(taskId: string, data: { status: string }): Promise<ApiResponse<unknown>> {
    return axiosInstance.patch<ApiResponse<unknown>>(
      `${TASK_API.BASE}/${taskId}`,
      data,
    ).then(r => r.data);
  },
};
