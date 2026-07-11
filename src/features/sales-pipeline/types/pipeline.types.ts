export interface Lead {
  id: number;
  leadId: string | null;
  name: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

export interface Task {
  id: number;
  title: string;
  category: string;
  description: string;
  referenceId: string;
  leadId: string;
  scheduledDate: string | null;
  scheduledTime: string;
  assignedBy: string;
  assignedTo: string;
  assignedToName: string | null;
  priority: string;
  status: string;
  type: string;
  amount: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PipelineDeal {
  id: number;
  dealName: string;
  amount: number;
  status: string;
  statusId: number;
  startDate: string | null;
  endDate: string | null;
  companyId: number;
  agent: string;
  createdAt?: string;
  company?: string;
  probability?: number;
  contact?: string;
}

export interface PipelineStatusGroup {
  statusId: number;
  status: string;
  count: number;
  deals: PipelineDeal[];
}

export interface PipelineDealsResponseData {
  items: PipelineStatusGroup[];
}

export interface DealsResponse {
  status: boolean;
  message: string;
  data: PipelineDealsResponseData;
}

export interface StatusDealsResponseData {
  statusId: number;
  status: string;
  count: number;
  items: PipelineDeal[];
}

export interface StatusDealsResponse {
  status: boolean;
  message: string;
  data: StatusDealsResponseData;
}

export interface LeadStatusGroup {
  statusId: string;
  status: string;
  color: string;
  count: number;
  leads: Lead[];
}

export interface PipelineLeadsResponseData {
  items: LeadStatusGroup[];
}

export interface LeadsGroupedResponse {
  status: boolean;
  message: string;
  data: PipelineLeadsResponseData;
}

export interface StatusLeadsResponseData {
  statusId: string;
  status: string;
  count: number;
  items: Lead[];
}

export interface StatusLeadsResponse {
  status: boolean;
  message: string;
  data: StatusLeadsResponseData;
}

export interface TaskStatusGroup {
  status: string;
  count: number;
  items: Task[];
}

export interface TasksResponseData {
  items: TaskStatusGroup[];
}

export interface TasksResponse {
  status: boolean;
  message: string;
  data: TasksResponseData;
}

export interface StatusTasksResponseData {
  statusId: string;
  status: string;
  count: number;
  items: Task[];
}

export interface StatusTasksResponse {
  status: boolean;
  message: string;
  data: StatusTasksResponseData;
}

export interface TaskCardProps {
  task: Task;
  getAvatarColor: (name: string) => string;
}

export interface Agent {
  id: string;
  name: string;
}

export interface DealCardProps {
  deal: PipelineDeal;
  statusId: number;
  getAvatarColor: (name: string) => string;
}

export interface LeadCardProps {
  lead: Lead;
  fromStatusId: string;
  getAvatarColor: (name: string) => string;
}

export type ActiveView = 'deals' | 'leads' | 'tasks';

export interface PipelineToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: ActiveView;
  loading: boolean;
  fetchLeads: () => void;
  fetchDeals: () => void;
  fetchTasks: () => void;
}

export interface PipelineFiltersProps {
  showDateFilter: boolean;
  setShowDateFilter: (show: boolean) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
  selectedAgent: string;
  setSelectedAgent: (agent: string) => void;
  staffOptions: Agent[];
  filterRef: React.RefObject<HTMLDivElement | null>;
  clearFilters: () => void;
}

export interface DealPipelineBoardProps {
  filteredStatusGroups: PipelineStatusGroup[];
  loadingStatusId: number | null;
  loadMoreDeals: (statusId: number) => void;
  getAvatarColor: (name: string) => string;
}

export interface LeadPipelineBoardProps {
  filteredLeadGroups: LeadStatusGroup[];
  loadingLeadStatusId: string | null;
  loadMoreLeads: (statusId: string) => void;
  getAvatarColor: (name: string) => string;
}

export interface TaskPipelineBoardProps {
  filteredTaskGroups: TaskStatusGroup[];
  loadingTaskStatus: string | null;
  loadMoreTasks: (status: string) => void;
  getAvatarColor: (name: string) => string;
}

export interface DroppableColumnProps {
  id: string;
  data?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
}