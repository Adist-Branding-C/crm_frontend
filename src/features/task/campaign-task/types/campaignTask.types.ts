export interface PopulatedField {
  id: number;
  name: string;
}

export interface CampaignTaskItem {
  id: number;
  title: string;
  description: string;
  campaignName: string;
  campaignType: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: PopulatedField;
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
