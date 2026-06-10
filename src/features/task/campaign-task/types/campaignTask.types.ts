export interface CampaignTaskItem {
  id: number;
  title: string;
  description: string;
  campaignName: string;
  campaignType: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  status: string;
}

export interface CampaignTaskFormData {
  title: string;
  description: string;
  campaignName: string;
  campaignType: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  status: string;
}

export interface CampaignTaskResponse {
  status: boolean;
  message: string;
  data?: unknown;
}
