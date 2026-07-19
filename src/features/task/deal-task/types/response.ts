import type { ApiResponse } from '../../../../shared/types/common';
import type { DealTaskItem } from './interface';

export type DealTaskApiResponse = ApiResponse<DealTaskItem> & { errors?: Record<string, string[]>; field?: string };
