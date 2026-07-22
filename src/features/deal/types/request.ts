export interface GetDealsParams {
  pageNumber: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  statusId?: string;
  typeId?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  dateFilterBy?: string;
  additionalFieldFilters?: string;
}

export interface CreateDealPayload {
  dealName: string;
  leadId: string | number;
  agentId?: string;
  assignedTo?: string;
  statusId?: string;
  typeId?: string;
  mobile?: string;
  amount?: string;
  startDate?: string;
  endDate?: string;
  additionalFields?: Array<{ fieldId: string; value: string }>;
}

export interface UpdateDealPayload {
  dealName?: string;
  leadId?: string | number;
  agentId?: string;
  assignedTo?: string;
  statusId?: string;
  typeId?: string;
  mobile?: string;
  amount?: string;
  startDate?: string;
  endDate?: string;
  additionalFields?: Array<{ fieldId: string; value: string }>;
}
