export interface Lead {
  id: number;
  leadId: string | null;
  name: string;
  phone: string;
  countryCode?: string;
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

export interface LeadStatusGroup {
  statusId: string;
  status: string;
  color: string;
  count: number;
  leads: Lead[];
}

export interface TaskStatusGroup {
  status: string;
  count: number;
  items: Task[];
}

export interface Agent {
  id: string;
  name: string;
}

export type ActiveView = 'deals' | 'leads' | 'tasks';

export type DragPayload =
  | { type: 'deal'; deal: PipelineDeal }
  | { type: 'lead'; lead: Lead; fromStatusId: string }
  | { type: 'task'; task: Task };
