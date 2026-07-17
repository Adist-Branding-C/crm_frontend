export interface CampaignTaskItem {
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
  leadId?: {
    id: number;
    name: string;
  } | null;
  priority: string;
  status: string;
}
