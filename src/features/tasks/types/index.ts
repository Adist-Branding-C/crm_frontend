import type { DateRange } from '../../../shared/types/common';
import type { TabItem } from '../../../shared/types/layout';

export interface TaskItem {
  id: number;
  slNo: number;
  title: string;
  category: string;
  deal: string;
  dealId: string;
  amount: number;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface TaskFilters {
  deal: string;
  status: string;
  assignedBy: string;
  assignedTo: string;
  category: string;
  dateRange: DateRange;
}

export type TaskSubMenuItem = TabItem;
