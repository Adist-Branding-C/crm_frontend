export interface SpotlightRequestParams {
  pageNumber?: number | undefined;
  limit?: number | undefined;
  search?: string | undefined;
  sort_by?: string | undefined;
  sort_order?: string | undefined;
  statusId?: string | undefined;
  typeId?: string | undefined;
  location?: string | undefined;
  sourceId?: string | undefined;
  purposeId?: string | undefined;
  assignedTo?: string | undefined;
  notes?: string | undefined;
  dateFrom?: string | undefined;
  dateTo?: string | undefined;
  dateFilterBy?: string | undefined;
}
