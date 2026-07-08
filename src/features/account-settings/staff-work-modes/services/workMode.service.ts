import axiosInstance from '../../../../api/axiosInstance';
import { WORK_MODE_API_ENDPOINTS } from '../constants/workModeApiEndpoints';
import { WorkModeMapper } from '../mappers/workMode.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import type { WorkModeFormData, WorkModeResponse, DeleteWorkModeResponse } from '../types/workMode.types';

class WorkModeService {
  async getAllWorkModes(params: Record<string, string | number | undefined> = {}): Promise<WorkModeResponse> {
    const queryString = WorkModeMapper.toQueryParams(params);
    const url = queryString ? `${WORK_MODE_API_ENDPOINTS.GET_ALL}?${queryString}` : WORK_MODE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<WorkModeResponse>(url);
    return ServiceResponseUtil.normalize(response.data);
  }

  async createWorkMode(data: WorkModeFormData): Promise<WorkModeResponse> {
    const { workModeName, description, status } = data;
    const payload = { workModeName, description, status };
    const response = await axiosInstance.post<WorkModeResponse>(WORK_MODE_API_ENDPOINTS.CREATE, payload);
    return ServiceResponseUtil.normalize(response.data);
  }

  async updateWorkMode(id: number, data: WorkModeFormData): Promise<WorkModeResponse> {
    const { workModeName, description, status } = data;
    const payload = { workModeName, description, status };
    const response = await axiosInstance.patch<WorkModeResponse>(WORK_MODE_API_ENDPOINTS.UPDATE(id), payload);
    return ServiceResponseUtil.normalize(response.data);
  }

  async deleteWorkMode(id: number): Promise<DeleteWorkModeResponse> {
    const response = await axiosInstance.delete<DeleteWorkModeResponse>(WORK_MODE_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.normalize(response.data);
  }
}

export const workModeService = new WorkModeService();
