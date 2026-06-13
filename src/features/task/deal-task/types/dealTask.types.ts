export interface DealTaskItem {
  id: number;
  title: string;
  description: string;
  deal: string;
  dealId: string;
  amount: number;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface DealTaskFormData {
  title: string;
  description: string;
  deal: string;
  dealId: string;
  amount: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface DealOption {
  id: number;
  name: string;
  amount: number;
}
