import type { SortConfig } from '../../../shared/types/sort';
import type { DateRange, LabelValuePair } from '../../../shared/types/common';
import type { Column } from '../../../shared/types/table';
import type { PaginationProps } from '../../../shared/types/pagination';

export interface FollowupLead {
  id: number;
  leadId: string;
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

export interface FollowupLeadApiItem {
  id: number;
  leadId: string;
  name: string;
  phone: string;
  agent: string | null;
  purpose: string | null;
  type: string | null;
  status: string | null;
  source: string | null;
  createdAt: string;
  updatedAt: string;
  nextFollowUpDate: string | null;
}

export interface FollowupPaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface FollowupLeadsData {
  items: FollowupLeadApiItem[];
  pagination: FollowupPaginationMeta;
}

export type FollowupBucket = 'overdue' | 'due_today' | 'upcoming';

export interface GetFollowupLeadsParams {
  pageNumber: number;
  limit: number;
  search?: string;
  leadType?: string;
  leadStatusId?: string;
  enquirySource?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  bucket?: FollowupBucket;
  sort_by?: 'name' | 'createdAt' | 'nextFollowUp';
  sort_order?: 'ASC' | 'DESC';
}


export interface FollowupStatistics {
  total: number;
  overdue: number;
  dueToday: number;
  upcoming: number;
}

export interface FollowupStatCardsProps {
  statistics: FollowupStatistics | null;
  isLoading: boolean;
  activeBucket: FollowupBucket | null;
  onBucketClick: (bucket: FollowupBucket | null) => void;
}

export interface FollowupFiltersProps {
  filters: Filters;
  typeOptions: LabelValuePair[];
  statusOptions: LabelValuePair[];
  sourceOptions: LabelValuePair[];
  staffOptions: LabelValuePair[];
  isLoadingFilterOptions: boolean;
  filterOptionsError: string | null;
  onFilterChange: (filters: Filters) => void;
  onApply: () => void;
  onClear: () => void;
}

export interface FollowupTableProps {
  data: FollowupLead[];
  columns: Column[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onViewLead: (lead: FollowupLead) => void;
}

export interface FollowupPaginationProps extends PaginationProps { }
