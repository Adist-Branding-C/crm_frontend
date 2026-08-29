import type { Activity, ActivityTypeOption, Filters, PageNumberEntry, StaffOption } from './interface';

export interface ActivitySummaryCardProps {
  totalActivities: number;
}

export interface ActivityFiltersProps {
  filters: Filters;
  staffList: StaffOption[];
  isLoading: boolean;
  onFilterChange: (field: keyof Filters, value: string) => void;
  onStaffSelect: (staffId: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export interface ActivityStaffDropdownItemProps {
  staff: StaffOption;
  isSelected: boolean;
  onSelect: () => void;
}

export interface ActivityTypeFilterProps {
  activityTypeFilter: string;
  activityTypes: ActivityTypeOption[];
  isLoading: boolean;
  onChange: (value: string) => void;
}

export interface ActivityTimelineProps {
  activities: Activity[];
  isLoading: boolean;
}

export interface ActivityTimelineCardProps {
  activity: Activity;
}

export interface ActivityPaginationProps {
  currentPage: number;
  totalPages: number;
  totalActivities: number;
  pageNumbers: PageNumberEntry[];
  isLoading: boolean;
  onPageChange: (page: number) => void;
}
