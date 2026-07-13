import { useState, useCallback, useRef } from 'react';
import { INITIAL_FILTERS } from '../constants';
import { useLeadFilterOptions } from './useLeadFilterOptions';
import type { Filters } from '../types';
import type { UseLeadFiltersReturn } from '../types/hook.types';

/**
 * Maps the "Filter by Date" dropdown's values (shared with other features via
 * DATE_FILTER_OPTIONS) to the date field names the leads API's dateFilterBy
 * enum actually accepts.
 */
const DATE_FILTER_BY_API_MAP: Record<string, string> = {
  created: 'createdAt',
  updated: 'updatedAt',
  followup: 'nextFollowUpDate',
};

export function useLeadFilters(
  onFetch: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  searchQueryRef: React.MutableRefObject<string>,
  rowsPerPageRef: React.MutableRefObject<number>,
): UseLeadFiltersReturn {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const activeFiltersRef = useRef<Record<string, string | number>>({});
  const { additionalFields } = useLeadFilterOptions();

  const handleApplyFilters = useCallback(() => {
    const params: Record<string, string | number> = {};
    if (filters.leadType) params.leadType = filters.leadType;
    if (filters.leadStatus) params.leadStatusId = filters.leadStatus;
    if (filters.enquirySource) params.enquirySource = filters.enquirySource;
    if (filters.enquiryPurpose) params.enquiryPurpose = filters.enquiryPurpose;
    if (filters.assignedTo) params.assignedTo = filters.assignedTo;
    if (filters.location) params.location = filters.location;
    if (filters.dateRange.start && filters.dateRange.end) {
      params.startDate = filters.dateRange.start;
      params.endDate = filters.dateRange.end;
    }
    if (filters.filterByDate) params.dateFilterBy = DATE_FILTER_BY_API_MAP[filters.filterByDate] ?? filters.filterByDate;
    if (filters.followupAdded) params.followUpAdded = filters.followupAdded;
    const additionalFieldFilters = Object.entries(filters.additionalFields)
      .filter(([, value]) => value)
      .map(([fieldId, value]) => ({
        fieldId,
        value,
        isDropdown: additionalFields.find((f) => f.fieldId === fieldId)?.fieldType.toLowerCase() === 'dropdown',
      }));
    if (additionalFieldFilters.length > 0) {
      params.additionalFieldFilters = JSON.stringify(additionalFieldFilters);
    }
    activeFiltersRef.current = params;
    setShowFilters(false);
    onFetch(1, rowsPerPageRef.current, searchQueryRef.current, params);
  }, [filters, onFetch, searchQueryRef, rowsPerPageRef, additionalFields]);

  return {
    filters,
    showFilters,
    activeFiltersRef,
    setFilters,
    setShowFilters,
    handleApplyFilters,
  };
}
