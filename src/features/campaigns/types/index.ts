export interface Campaign {
  id: number;
  slNo: number;
  name: string;
  type: string;
  totalTasks: number;
  completedTasks: number;
  completedPercent: number;
  createdBy: string;
  createdAt: string;
}

import type { Column } from '../../../shared/types/table';
import type { DateRange } from '../../../shared/types/common';

export type CampaignColumn = Column;

export interface CampaignFilters {
  type: string;
  createdBy: string;
  dateRange: DateRange;
}
