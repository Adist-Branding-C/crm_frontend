import type { SortConfig } from '../../../shared/types/sort';
import type { DateRange } from '../../../shared/types/common';

export interface FollowupLead {
  id: number;
  name: string;
  phone: string;
  assignedTo: string;
  purpose: string;
  type: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUp: string;
}

export interface Filters {
  type: string;
  status: string;
  source: string;
  assignedTo: string;
  dateRange: DateRange;
}

export type { SortConfig };
