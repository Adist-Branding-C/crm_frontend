import { fetchTaskCategoriesApi, createTaskCategoryApi, updateTaskCategoryApi, deleteTaskCategoryApi } from './taskCategory.api';
import type { TaskCategoryFormData, TaskCategoryResponse } from '../types/index';

class TaskCategoryService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<TaskCategoryResponse> {
    return fetchTaskCategoriesApi(params);
  }

  async create(data: TaskCategoryFormData): Promise<TaskCategoryResponse> {
    return createTaskCategoryApi(data);
  }

  async update(id: number, data: TaskCategoryFormData): Promise<TaskCategoryResponse> {
    return updateTaskCategoryApi(id, data);
  }

  async delete(id: number): Promise<Pick<TaskCategoryResponse, 'status' | 'message'>> {
    return deleteTaskCategoryApi(id);
  }
}

export const taskCategoryService = new TaskCategoryService();
