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
  assignedBy?: {
    id: number;
    name: string;
  } | null;
  leadId?: {
    id: number;
    name: string;
  } | null;
  dealId?: {
    id: number;
    title: string;
  } | null;
  priority: string;
  status: string;
}
