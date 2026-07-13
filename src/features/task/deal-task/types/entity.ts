export interface DealTaskItem {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  category?: {
    id: number;
    name: string;
  } | null;
  assignedTo?: {
    id: number;
    name: string;
  } | null;
  lead?: {
    id: number;
    name: string;
  } | null;
  priority: string;
  status: string;
}
