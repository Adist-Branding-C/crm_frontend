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
      leadType: filters.leadTypeId,
      enquirySource: filters.enquirySource,
      enquiryPurpose: filters.enquiryPurpose,
      leadStatusId: filters.leadStatusId,
      assignedTo: filters.assignedTo,
      location: filters.location,
      notes: filters.remarks,
      startDate: filters.dateRange.start,
      endDate: filters.dateRange.end,
      dateFilterBy: filters.filterByDate,
    });
  }
}
