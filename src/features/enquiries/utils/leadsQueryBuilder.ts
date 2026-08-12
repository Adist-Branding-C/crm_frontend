import type { Filters } from '../types';
import type { SortConfig } from '../../../shared/types/sort';

export const DEBOUNCE_MS = 400;
export const DEFAULT_ROWS_PER_PAGE = 5;

const SORT_BY_MAP: Record<string, string | undefined> = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  name: 'name',
  agentId: undefined,
  purpose: undefined,
  type: undefined,
  status: undefined,
  source: undefined,
  phone: undefined,
  location: undefined,
  nextFollowUpDate: undefined,
};

export function buildQueryParams(
  filters: Filters,
  sortConfig: SortConfig,
  currentPage: number,
  rowsPerPage: number,
  searchQuery: string,
): Record<string, unknown> {
  const params: Record<string, unknown> = {
    pageNumber: currentPage,
    limit: rowsPerPage,
  };

  const sortBy = sortConfig.key ? SORT_BY_MAP[sortConfig.key] : undefined;
  if (sortBy) {
    params.sort_by = sortBy;
    params.sort_order = sortConfig.direction.toLowerCase();
  }

  const mappings: [string, string | undefined][] = [
    ['search', searchQuery || undefined],
    ['dateFrom', filters.dateRange.start || undefined],
    ['dateTo', filters.dateRange.end || undefined],
    ['dateFilterBy', filters.filterByDate || undefined],
    ['sourceId', filters.sourceId || undefined],
    ['purposeId', filters.purposeId || undefined],
    ['statusId', filters.leadStatus || undefined],
    ['followUpAdded', filters.followupAdded || undefined],
    ['createdBy', filters.createdBy || undefined],
    ['assignedTo', filters.assignedTo || undefined],
    ['typeId', filters.typeId || undefined],
    ['location', filters.location || undefined],
    ['remark', filters.remarks || undefined],
    ['type', filters.type || undefined],
    ['date', filters.date || undefined],
  ];

  mappings.forEach(([key, value]) => {
    if (value) params[key] = value;
  });

  return params;
}
