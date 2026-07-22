export interface SpotlightRequestParams {
  pageNumber?: number | undefined;
  limit?: number | undefined;
  search?: string | undefined;
  sort_by?: string | undefined;
  sort_order?: string | undefined;
  leadStatusId?: string | undefined;
  leadType?: string | undefined;
  location?: string | undefined;
  enquirySource?: string | undefined;
  enquiryPurpose?: string | undefined;
  assignedTo?: string | undefined;
  notes?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  dateFilterBy?: string | undefined;
}
