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
  // Sourced from the deal's column (stage), not the deal itself - a deal
  // has no probability of its own until the v1.1 per-deal override ships.
  probability?: number | undefined;
  // Opens the deal detail drawer. Optional - SalesPipelinePage renders the
  // board without a drawer, DealBoardPage wires it up.
  onDealClick?: ((deal: PipelineDeal) => void) | undefined;
  // Marks the card that's currently loading its full detail record.
  isOpening?: boolean | undefined;
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
  onDealClick?: ((deal: PipelineDeal) => void) | undefined;
  openingDealId?: number | null | undefined;
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
