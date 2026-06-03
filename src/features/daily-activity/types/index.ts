export interface Activity {
  id: number;
  type: string;
  user: string;
  relatedLead: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  badge: string;
}

import type { SelectOption } from '../../../shared/types/common';

export type StaffOption = SelectOption;
export type ActivityTypeOption = SelectOption;

export interface Filters {
  date: string;
  startTime: string;
  endTime: string;
  staff: number;
  type: number;
}
