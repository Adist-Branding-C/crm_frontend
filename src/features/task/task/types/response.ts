import type { ApiResponse } from '../../../../shared/types/common';
import type { TaskItem } from './interface';

export type TaskApiResponse = ApiResponse<TaskItem> & { errors?: Record<string, string[]>; field?: string };
