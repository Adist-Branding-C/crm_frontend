export interface TaskItem {
  id: number;
  title: string;
  description: string;
  category?: {
    id: number;
    name: string;
  } | null;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
  assignedTo?: {
    id: number;
    name: string;
  } | null;
  leadId?: {
    id: number;
    name: string;
  } | null;
  priority: string;
  status: string;
}
