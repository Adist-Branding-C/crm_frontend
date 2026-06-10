export interface DealTaskItem {
  id: number;
  title: string;
  description: string;
  dealName: string;
  dealStage: string;
  amount: number;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  status: string;
}

export interface DealTaskFormData {
  title: string;
  description: string;
  dealName: string;
  dealStage: string;
  amount: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  status: string;
}

export interface DealTaskResponse {
  status: boolean;
  message: string;
  data?: unknown;
}
