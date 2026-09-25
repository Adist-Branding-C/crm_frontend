import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { DeletedDealsData, DeletedDealsFilters } from '../types';

export function useDeletedDeals(filters: DeletedDealsFilters) {
  const { dateFrom, dateTo, dateFilterBy, statusId, type, deletedBy, agentId, sourceId, search, pageNumber, limit } = filters;

  return useReportQuery<DeletedDealsData>(
    () => dealAnalyticsService.getDeletedDeals({ dateFrom, dateTo, dateFilterBy, statusId, type, deletedBy, agentId, sourceId, search, pageNumber, limit }),
    [dateFrom, dateTo, dateFilterBy, statusId, type, deletedBy, agentId, sourceId, search, pageNumber, limit],
    { hookName: 'useDeletedDeals', fallbackMessage: "Failed to load deleted deals - you may not have permission to view this report" },
  );
}
