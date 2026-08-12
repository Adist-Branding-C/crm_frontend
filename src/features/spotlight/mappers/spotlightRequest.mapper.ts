import { QueryMapper } from '../../../shared/mappers/query.mapper';
import type { SortConfig } from '../../../shared/types/sort';
import type { SpotlightFilters, SpotlightRequestParams } from '../types';

export class SpotlightRequestMapper {
  static toParams(
    page: number,
    limit: number,
    search: string,
    sortConfig: SortConfig,
    filters: SpotlightFilters,
  ): Partial<SpotlightRequestParams> {
    return QueryMapper.toQuery<SpotlightRequestParams>({
      pageNumber: page,
      limit,
      ...SpotlightRequestMapper.toExportParams(search, sortConfig, filters),
    });
  }

  static toExportParams(
    search: string,
    sortConfig: SortConfig,
    filters: SpotlightFilters,
  ): Partial<SpotlightRequestParams> {
    return QueryMapper.toQuery<SpotlightRequestParams>({
      search,
      sort_by: sortConfig.key ?? undefined,
      sort_order: sortConfig.key
        ? sortConfig.direction.toUpperCase()
        : undefined,
      typeId: filters.leadTypeId,
      sourceId: filters.sourceId,
      purposeId: filters.purposeId,
      statusId: filters.statusId,
      assignedTo: filters.assignedTo,
      location: filters.location,
      notes: filters.remarks,
      dateFrom: filters.dateRange.start,
      dateTo: filters.dateRange.end,
      dateFilterBy: filters.filterByDate,
    });
  }
}
