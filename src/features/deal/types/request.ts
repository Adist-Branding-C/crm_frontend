export interface GetDealsParams {
  pageNumber: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  leadId?: string | number;
  pipelineId?: string | number;
  statusId?: string;
  typeId?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  dateFilterBy?: string;
  additionalFieldFilters?: string;
}

/**
 * Params for the dedicated Deal export endpoint — the same filter/search/sort
 * fields as `GetDealsParams` minus `pageNumber`/`limit`, since export always
 * returns the full filtered dataset rather than a single page. `fileName`/
 * `columns` are both optional - omitted, the endpoint's
 * pre-existing behavior (every column, an auto-generated file name) is
 * unchanged.
 */
export type GetDealsExportParams = Omit<GetDealsParams, 'pageNumber' | 'limit'> & {
  fileName?: string;
  columns?: string;
  type?: string;
};

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
