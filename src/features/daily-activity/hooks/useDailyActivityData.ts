import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '../../../shared/hooks/useToast';
import { useSearchFilter } from '../../../shared/hooks/useSearchFilter';
import { useStaffOptions } from './useStaffOptions';
import { useStaffDropdown } from './useStaffDropdown';
import { useActivityFilters } from './useActivityFilters';
import { useActivitiesFetch } from './useActivitiesFetch';
import { computePageNumbers } from '../utils/activityHelpers';
import { PAGE_WINDOW, DEFAULT_FILTERS } from '../constants';
import type { StaffOption } from '../types';

const STAFF_SEARCH_FIELDS: (keyof StaffOption)[] = ['name'];

/**
 * Composes the Daily Activity page's underlying single-responsibility hooks
 * (staff options, staff dropdown, filters, activities fetch) into the one set
 * of state/actions the page needs, and owns the coordination between them
 * (e.g. applying filters resets the page and refetches; selecting a staff
 * option updates the filter and closes the dropdown in one action).
 *
 * Used by:
 * - DailyActivityPage.
 */
export const useDailyActivityData = () => {
  const toast = useToast();
  const onError = useCallback(
    (message: string) => toast.showToastMessage(message, 'error'),
    [toast.showToastMessage],
  );

  const { staffOptions } = useStaffOptions(onError);
  const staffSearch = useSearchFilter(staffOptions, STAFF_SEARCH_FIELDS);
  const staffDropdown = useStaffDropdown();
  const activityFilters = useActivityFilters();
  const { activities, pagination, fetchActivities } = useActivitiesFetch(onError);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchActivities(1, DEFAULT_FILTERS, '');
  }, [fetchActivities]);

  const handleApply = useCallback(() => {
    const { appliedFilters, appliedActivityType } = activityFilters.applyFilters();
    setCurrentPage(1);
    fetchActivities(1, appliedFilters, appliedActivityType);
  }, [activityFilters, fetchActivities]);

  const handleReset = useCallback(() => {
    const { appliedFilters, appliedActivityType } = activityFilters.resetFilters();
    setCurrentPage(1);
    fetchActivities(1, appliedFilters, appliedActivityType);
  }, [activityFilters, fetchActivities]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    fetchActivities(page, activityFilters.appliedFilters, activityFilters.appliedActivityType);
  }, [activityFilters.appliedFilters, activityFilters.appliedActivityType, fetchActivities]);

  const handleStaffSelect = useCallback((staffId: string) => {
    activityFilters.handleFilterChange('staff', staffId);
    staffDropdown.setIsOpen(false);
  }, [activityFilters.handleFilterChange, staffDropdown.setIsOpen]);

  const totalActivities = pagination?.total ?? 0;
  const totalPages = pagination?.total_pages ?? 1;

  const selectedStaffName = useMemo(
    () => staffOptions.find((s) => s.id === activityFilters.filters.staff)?.name || 'All Staff',
    [staffOptions, activityFilters.filters.staff],
  );

  const pageNumbers = useMemo(
    () => computePageNumbers(currentPage, totalPages, PAGE_WINDOW),
    [currentPage, totalPages],
  );

  return {
    filters: activityFilters.filters,
    activityTypeFilter: activityFilters.activityTypeFilter,
    setActivityTypeFilter: activityFilters.setActivityTypeFilter,
    currentPage,
    showStaffDropdown: staffDropdown.isOpen,
    setShowStaffDropdown: staffDropdown.setIsOpen,
    staffSearchQuery: staffSearch.query,
    setStaffSearchQuery: staffSearch.setQuery,
    totalActivities,
    totalPages,
    paginatedActivities: activities,
    selectedStaffName,
    staffOptions: staffSearch.filteredData,
    pageNumbers,
    handleFilterChange: activityFilters.handleFilterChange,
    handleStaffSelect,
    handleApply,
    handleReset,
    handlePageChange,
    toast,
  };
};
