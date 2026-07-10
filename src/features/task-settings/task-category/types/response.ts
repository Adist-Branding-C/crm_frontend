import type { ApiResponse } from '../../../../shared/types/common';
import type { TaskCategoryItem } from './interface';

export type TaskCategoryApiResponse = ApiResponse<TaskCategoryItem> & { errors?: Record<string, string[]>; field?: string };

/**
 * Raw shape of a task-category item as the backend may send it: the category field
 * has historically appeared under either `category` or `taskCategory`.
 */
export interface TaskCategoryRawItem {
  id: number;
  category?: string;
  taskCategory?: string;
  action?: string;
}

export interface TaskCategoryListResponse {
  items: TaskCategoryRawItem[];
  pagination?: { total: number };
}
