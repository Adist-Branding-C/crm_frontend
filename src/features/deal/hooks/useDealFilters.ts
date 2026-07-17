import { useState, useCallback, useRef } from 'react';
import { INITIAL_DEAL_FILTERS } from '../constants';
import { useDealAdditionalFieldDefs } from './useDealAdditionalFieldDefs';
import type { DealStatusFilters } from '../types/interface';
import type { UseDealFiltersReturn } from '../types/hook.types';

const DEAL_DATE_FILTER_BY_API_MAP: Record<string, string> = {
  created: 'createdAt',
  updated: 'updatedAt',
  start: 'startDate',
  end: 'endDate',
};

export function useDealFilters(
  onFetch: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  searchQueryRef: React.MutableRefObject<string>,
  rowsPerPageRef: React.MutableRefObject<number>,
): UseDealFiltersReturn {
  const [filters, setFilters] = useState<DealStatusFilters>(INITIAL_DEAL_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const activeFiltersRef = useRef<Record<string, string | number>>({});
  const { dealAdditionalFieldDefs } = useDealAdditionalFieldDefs();

  const handleApplyFilters = useCallback(() => {
    const params: Record<string, string | number> = {};
    if (filters.status) params.statusId = filters.status;
    if (filters.type) params.typeId = filters.type;
    if (filters.assignedTo) params.assignedTo = filters.assignedTo;
    if (filters.dateRange.start && filters.dateRange.end) {
      params.startDate = filters.dateRange.start;
      params.endDate = filters.dateRange.end;
    }
    if (filters.filterByDate) params.dateFilterBy = DEAL_DATE_FILTER_BY_API_MAP[filters.filterByDate] ?? filters.filterByDate;
    const additionalFieldFilters = Object.entries(filters.additionalFields)
      .filter(([, value]) => value)
      .map(([fieldId, value]) => ({
        fieldId,
        value,
        isDropdown: dealAdditionalFieldDefs.find((f) => f.fieldId === fieldId)?.fieldType.toLowerCase() === 'dropdown',
      }));
    if (additionalFieldFilters.length > 0) {
      params.additionalFieldFilters = JSON.stringify(additionalFieldFilters);
    }
    activeFiltersRef.current = params;
    setShowFilters(false);
    onFetch(1, rowsPerPageRef.current, searchQueryRef.current, params);
  }, [filters, onFetch, searchQueryRef, rowsPerPageRef, dealAdditionalFieldDefs]);

  return {
    filters,
    showFilters,
    activeFiltersRef,
    setFilters,
    setShowFilters,
    handleApplyFilters,
  };
}
