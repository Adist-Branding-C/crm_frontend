import axiosInstance from '../../../../api/axiosInstance';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { TASK_CATEGORY_API_ENDPOINTS } from '../constants/index';
import type { ApiResponse } from '../../../../shared/types/common';
import type { TaskCategoryFormData, FetchTaskCategoriesParams } from '../types/request';
import type { TaskCategoryApiResponse, TaskCategoryListResponse } from '../types/response';

type ListServiceResponse<T> = ApiResponse<T> & { errors?: Record<string, string[]>; field?: string };

/**
 * HTTP client for the Task Category API - communicates with the backend only.
 *
 * Used by:
 * - taskCategoryApiService singleton (services/index.ts), consumed by
 *   useFetchTaskCategories (list) and useTaskCategoryCrud (create/update/delete).
 *
 * Notes:
 * - Returns the full backend response (including `errors` and `field`) so that
 *   useSubmitErrorHandler can map per-field validation errors back to Formik.
 */
export class TaskCategoryApiService {
  async fetchAll(params: FetchTaskCategoriesParams): Promise<ListServiceResponse<TaskCategoryListResponse>> {
    const response = await axiosInstance.get<ListServiceResponse<TaskCategoryListResponse>>(
      TASK_CATEGORY_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) },
    );
    return response.data;
  }

  async create(data: TaskCategoryFormData): Promise<TaskCategoryApiResponse> {
    const response = await axiosInstance.post<TaskCategoryApiResponse>(TASK_CATEGORY_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: TaskCategoryFormData): Promise<TaskCategoryApiResponse> {
    const response = await axiosInstance.patch<TaskCategoryApiResponse>(TASK_CATEGORY_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<TaskCategoryApiResponse> {
    const response = await axiosInstance.delete<TaskCategoryApiResponse>(TASK_CATEGORY_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
