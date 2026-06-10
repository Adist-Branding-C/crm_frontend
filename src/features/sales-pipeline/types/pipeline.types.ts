export interface Lead {
  id: number;
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
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
  assignedTo: string;
  priority: string;
  status: string;
  type: string;
  amount: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Backend deal item returned within status groups
export interface PipelineDeal {
  id: number;
  dealName: string;
  amount: number;
  status: string;
  statusId: number;
  startDate: string;
  endDate: string;
  companyId: number;
  agent: string;
  // UI display fields (not yet provided by backend)
  company?: string;
  probability?: number;
  contact?: string;
}

// Backend status group wrapping deals for Kanban column
export interface PipelineStatusGroup {
  statusId: number;
  status: string;
  count: number;
  deals: PipelineDeal[];
}

// Wrapper for the grouped response data
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

// Backend status group wrapping leads for Kanban column
export interface LeadStatusGroup {
  statusId: number;
  status: string;
  count: number;
  leads: Lead[];
}

// Wrapper for the grouped lead response data
export interface PipelineLeadsResponseData {
  items: LeadStatusGroup[];
}

export interface LeadsGroupedResponse {
  status: boolean;
  message: string;
  data: PipelineLeadsResponseData;
}

export interface StatusLeadsResponseData {
  statusId: number;
  status: string;
  count: number;
  items: Lead[];
}

export interface StatusLeadsResponse {
  status: boolean;
  message: string;
  data: StatusLeadsResponseData;
}

// Backend status group wrapping tasks for Kanban column
export interface TaskStatusGroup {
  status: string;
  count: number;
  items: Task[];
}

// Wrapper for the grouped task response data
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
  id: number;
  name: string;
}

export interface DealType {
  id: number;
  name: string;
}

export interface DealCardProps {
  deal: PipelineDeal;
  onDragStart: (e: React.DragEvent, deal: PipelineDeal) => void;
  getAvatarColor: (name: string) => string;
}

export interface LeadCardProps {
  lead: Lead;
  getAvatarColor: (name: string) => string;
}

export type ActiveView = 'deals' | 'leads' | 'tasks';

export interface PipelineToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: ActiveView;
  loading: boolean;
  error: string | null;
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
  selectedAgent: number;
  setSelectedAgent: (agent: number) => void;
  selectedType: number;
  setSelectedType: (type: number) => void;
  filterRef: React.RefObject<HTMLDivElement | null>;
  clearFilters: () => void;
}

export interface DealPipelineBoardProps {
  filteredStatusGroups: PipelineStatusGroup[];
  loadingStatusId: number | null;
  loadMoreDeals: (statusId: number) => void;
  handleDragStart: (e: React.DragEvent, deal: PipelineDeal) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, statusId: number) => void;
  getAvatarColor: (name: string) => string;
}

export interface LeadPipelineBoardProps {
  filteredLeadGroups: LeadStatusGroup[];
  loadingLeadStatusId: number | null;
  loadMoreLeads: (statusId: number) => void;
  getAvatarColor: (name: string) => string;
}

export interface TaskPipelineBoardProps {
  filteredTaskGroups: TaskStatusGroup[];
  loadingTaskStatus: string | null;
  loadMoreTasks: (status: string) => void;
  getAvatarColor: (name: string) => string;
}