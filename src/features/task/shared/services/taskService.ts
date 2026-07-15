import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { TASK_API } from '../constants/taskApiEndpoints';
import type { TaskCategory, StaffMember, LeadMember } from '../types/lookupResponses';

export class TaskLookupService {
  async getTaskCategories(): Promise<ApiResponse<{ items: TaskCategory[] }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: TaskCategory[] }>>(
      TASK_API.CATEGORY,
      { params: { pageNumber: 1, limit: 10 } },
    );
    return response.data;
  }

  async getLeads(): Promise<ApiResponse<{ items: LeadMember[] }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: LeadMember[] }>>(
      TASK_API.LEAD,
      { params: { pageNumber: 1, limit: 100 } },
    );
    return response.data;
  }

  async getStaff(): Promise<ApiResponse<{ items: StaffMember[] }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: StaffMember[] }>>(
      TASK_API.STAFF,
      { params: { pageNumber: 1, limit: 100 } },
    );
    return response.data;
  }
}

export const taskService = new TaskLookupService();
