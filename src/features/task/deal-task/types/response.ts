import type { ApiResponse } from '../../../../shared/types/common';
import type { DealTaskItem } from './entity';

export type DealTaskApiResponse = ApiResponse<DealTaskItem> & { errors?: Record<string, string[]>; field?: string };
