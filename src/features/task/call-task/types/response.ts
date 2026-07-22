import type { ApiResponse } from '../../../../shared/types/common';
import type { CallTaskItem } from './entity';

export type CallTaskApiResponse = ApiResponse<CallTaskItem> & { errors?: Record<string, string[]>; field?: string };
