import axiosInstance from '../../../../api/axiosInstance';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { TASK_CATEGORY_API_ENDPOINTS } from '../constants/index';
import type { ApiResponse } from '../../../../shared/types/common';
import type { TaskCategoryItem } from '../types/interface';
import type { TaskCategoryFormData, FetchTaskCategoriesParams } from '../types/request';
import type { TaskCategoryListResponse } from '../types/response';

export class TaskCategoryApiService {
  async fetchAll(params: FetchTaskCategoriesParams): Promise<ApiResponse<TaskCategoryListResponse>> {
    const response = await axiosInstance.get<ApiResponse<TaskCategoryListResponse>>(
      TASK_CATEGORY_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) },
    );
    return response.data;
  }

  async create(data: TaskCategoryFormData): Promise<ApiResponse<TaskCategoryItem>> {
    const response = await axiosInstance.post<ApiResponse<TaskCategoryItem>>(TASK_CATEGORY_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: TaskCategoryFormData): Promise<ApiResponse<TaskCategoryItem>> {
    const response = await axiosInstance.patch<ApiResponse<TaskCategoryItem>>(TASK_CATEGORY_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(TASK_CATEGORY_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
