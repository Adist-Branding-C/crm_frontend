import type { SelectOption } from '../../../shared/types/common';

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

export type StaffOption = SelectOption;
export type ActivityTypeOption = { value: string; label: string };

export interface Filters {
  date: string;
  startTime: string;
  endTime: string;
  staff: number;
}

export interface ActivityItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  createdByType: string | null;
  updatedBy: string | null;
  updatedByType: string | null;
  deletedBy: string | null;
  companyId: string;
  actorId: string;
  actorType: string;
  entityType: string;
  entityId: string;
  activityType: string;
  description: string;
  actorName: string;
  name: string | null;
  phone: string | null;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ActivityResponseData {
  items: ActivityItem[];
  pagination: PaginationInfo;
}

export interface ActivityResponse {
  status: boolean;
  message: string;
  data: ActivityResponseData;
}

export interface ActivitySummaryCardProps {
  totalActivities: number;
}

export interface ActivityFiltersProps {
  filters: Filters;
  showStaffDropdown: boolean;
  localSearchQuery: string;
  selectedStaffName: string;
  staffList: StaffOption[];
  onFilterChange: (field: keyof Filters, value: string | number) => void;
  onApply: () => void;
  onReset: () => void;
  onShowStaffDropdownChange: (show: boolean) => void;
  onLocalSearchQueryChange: (query: string) => void;
}

export interface ActivityTypeFilterProps {
  activityTypeFilter: string;
  activityTypes: ActivityTypeOption[];
  onChange: (value: string) => void;
}

export interface ActivityTimelineProps {
  activities: Activity[];
}

export interface ActivityTimelineCardProps {
  activity: Activity;
}

export interface ActivityPaginationProps {
  currentPage: number;
  totalPages: number;
  totalActivities: number;
  onPageChange: (page: number) => void;
  getPageNumbers: () => number[];
}
