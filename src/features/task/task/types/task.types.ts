export interface TaskItem {
  id: number;
  title: string;
  description: string;
  category: string;
  deal: string;
  dealId: string;
  amount: number;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: string;
  deal: string;
  dealId: string;
  amount: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface TaskResponse {
  status: boolean;
  message: string;
  data?: unknown;
}
