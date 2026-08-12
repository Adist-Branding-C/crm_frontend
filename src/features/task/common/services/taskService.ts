import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { TASK_API } from '../constants/taskApiEndpoints';
import type { TaskCategory, StaffMember, LeadMember, DealMember, CampaignMember } from '../types/lookupResponses';

export class TaskLookupService {
  async getTaskCategories(): Promise<ApiResponse<TaskCategory[]>> {
    const response = await axiosInstance.get<ApiResponse<TaskCategory[]>>(
      TASK_API.CATEGORY_DROPDOWN,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getLeads(): Promise<ApiResponse<{ items: LeadMember[] }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: LeadMember[] }>>(
      TASK_API.LEAD,
      { params: { pageNumber: 1, limit: 100 } },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getStaff(): Promise<ApiResponse<{ items: StaffMember[] }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: StaffMember[] }>>(
      TASK_API.STAFF,
      { params: { pageNumber: 1, limit: 100 } },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getDeals(): Promise<ApiResponse<{ items: DealMember[] }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: DealMember[] }>>(
      TASK_API.DEAL,
      { params: { pageNumber: 1, limit: 10 } },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getCampaigns(): Promise<ApiResponse<{ items: CampaignMember[] }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: CampaignMember[] }>>(
      TASK_API.CAMPAIGN,
      { params: { pageNumber: 1, limit: 10 } },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const taskService = new TaskLookupService();
