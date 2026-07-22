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
  agents?: string[];
} | {
  type: 'Data Pool';
  poolName: string;
  poolAgents?: string[];
};

export type UpdateCampaignPayload = {
  type: 'Lead Campaign';
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  agents?: string[];
} | {
  type: 'Data Pool';
  poolName?: string;
  poolAgents?: string[];
};
