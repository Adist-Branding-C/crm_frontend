import type { ApiResponse } from '../../../../shared/types/common';
import type { CampaignTaskItem } from './entity';

export type CampaignTaskApiResponse = ApiResponse<CampaignTaskItem> & { errors?: Record<string, string[]>; field?: string };
