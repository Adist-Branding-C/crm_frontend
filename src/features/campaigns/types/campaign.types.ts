export interface Campaign {
  id: number;
  slNo: number;
  name: string;
  type: string;
  totalTasks: number;
  completedTasks: number;
  completedPercent: number;
  createdBy: string;
  createdByName?: string;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  poolName?: string;
  poolAgents?: string[];
  filterBy?: string;
  sortBy?: string;
}

export interface Agent {
  id: string;
  name: string;
}

export interface CampaignFormData {
  type: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  poolName: string;
  poolAgents: string[];
  filterBy: string;
  sortBy: string;
}

export type CampaignMode = 'add' | 'edit';

export interface GetCampaignsParams {
  pageNumber: number;
  limit: number;
  search?: string | undefined;
  type?: string | undefined;
  createdBy?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: 'asc' | 'desc' | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
}

export type CreateCampaignPayload = {
  type: 'Lead Campaign';
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
} | {
  type: 'Data Pool';
  poolName: string;
  poolAgents?: string[];
  filterBy?: string;
  sortBy?: string;
};

export type UpdateCampaignPayload = {
  type: 'Lead Campaign';
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
} | {
  type: 'Data Pool';
  poolName?: string;
  poolAgents?: string[];
  filterBy?: string;
  sortBy?: string;
};
