import type { LeadExportFilters, CreateLeadExportPayload } from '../types';

// UI filter-by-date values ('created'/'updated'/'followup', from DATE_FILTER_OPTIONS)
// to the backend's actual column-name values.
const DATE_FILTER_BY_API_MAP: Record<string, string> = {
  created: 'createdAt',
  updated: 'updatedAt',
  followup: 'nextFollowUpDate',
};

export function buildLeadExportPayload(filters: LeadExportFilters, selectedFields: string[]): CreateLeadExportPayload {
  const payload: CreateLeadExportPayload = { columns: selectedFields };

  if (filters.sourceId) payload.sourceId = filters.sourceId;
  if (filters.purposeId) payload.purposeId = filters.purposeId;
  if (filters.statusId) payload.statusId = filters.statusId;
  if (filters.followUpAdded) payload.followUpAdded = filters.followUpAdded;
  if (filters.assignedTo) payload.assignedTo = filters.assignedTo;
  if (filters.typeId) payload.typeId = filters.typeId;
  if (filters.location) payload.location = filters.location;

  if (filters.dateRange.start && filters.dateRange.end) {
    payload.dateFrom = filters.dateRange.start;
    payload.dateTo = filters.dateRange.end;
  }
  if (filters.filterByDate) {
    payload.dateFilterBy = DATE_FILTER_BY_API_MAP[filters.filterByDate] ?? filters.filterByDate;
  }

  return payload;
}
