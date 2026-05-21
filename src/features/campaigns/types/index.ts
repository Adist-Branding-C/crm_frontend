export interface Campaign {
  id: number;
  slNo: number;
  name: string;
  type: string;
  totalTasks: number;
  completedTasks: number;
  completedPercent: number;
  createdBy: string;
  createdAt: string;
}

export interface CampaignFilters {
  type: string;
  createdBy: string;
  dateRange: { start: string; end: string };
}
