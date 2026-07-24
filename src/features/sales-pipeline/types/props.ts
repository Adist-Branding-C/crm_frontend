import type { RefObject } from 'react';
import type {
  Task,
  PipelineDeal,
  Lead,
  PipelineStatusGroup,
  LeadStatusGroup,
  TaskStatusGroup,
  Agent,
  ActiveView,
} from './interface';

export interface TaskCardProps {
  task: Task;
}

export interface DealCardProps {
  deal: PipelineDeal;
  statusId: number;
}

export interface LeadCardProps {
  lead: Lead;
  fromStatusId: string;
}

export interface PipelineToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: ActiveView;
  loading: boolean;
  onViewLeads: () => void;
  onViewDeals: () => void;
  onViewTasks: () => void;
}

export interface PipelineFiltersProps {
  activeView?: ActiveView;
  showDateFilter: boolean;
  setShowDateFilter: (show: boolean) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
  selectedAgent: string;
  setSelectedAgent: (agent: string) => void;
  staffOptions: Agent[];
  filterRef: RefObject<HTMLDivElement | null>;
  onClearFilters: () => void;
}

export interface DealPipelineBoardProps {
  filteredStatusGroups: PipelineStatusGroup[];
  loadingStatusId: number | null;
  loadMoreDeals: (statusId: number) => void;
}

export interface LeadPipelineBoardProps {
  filteredLeadGroups: LeadStatusGroup[];
  loadingLeadStatusId: string | null;
  loadMoreLeads: (statusId: string) => void;
}

export interface TaskPipelineBoardProps {
  filteredTaskGroups: TaskStatusGroup[];
  loadingTaskStatus: string | null;
  loadMoreTasks: (status: string) => void;
}

export interface DroppableColumnProps {
  id: string;
  data?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
}

export interface PipelineColumnEmptyStateProps {
  message: string;
}
