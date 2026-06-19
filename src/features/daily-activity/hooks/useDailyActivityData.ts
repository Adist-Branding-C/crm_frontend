import { useState, useEffect, useCallback, useRef } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../../../shared/constants/pagination';
import { activityService } from '../services/ActivityService';
import { mapApiItemToUI } from '../utils/activityMapper';
import type { Filters, Activity, PaginationInfo } from '../types';
import {staffList, DEFAULT_FILTERS } from '../constants';

export const useDailyActivityData = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [activityTypeFilter, setActivityTypeFilter] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [appliedActivityType, setAppliedActivityType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const rowsPerPage = DEFAULT_ROWS_PER_PAGE;
  const requestSeqRef = useRef(0);

  const fetchActivities = useCallback(async (page: number, f: Filters, at: string) => {
    const requestSeq = ++requestSeqRef.current;
    try {
      const params: Record<string, string | number> = { page, limit: rowsPerPage };
      if (f.date) params.date = f.date;
      if (f.startTime) params.startTime = f.startTime;
      if (f.endTime) params.endTime = f.endTime;
      if (f.staff !== 1) params.actorId = f.staff;
      if (at) params.activityType = at;

      const response = await activityService.getActivities(params);
      if (requestSeq !== requestSeqRef.current) return;
      if (response.status) {
        setActivities(response.data.items.map(mapApiItemToUI));
        setPagination(response.data.pagination);
      } else {
        setActivities([]);
        setPagination(null);
      }
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setActivities([]);
      setPagination(null);
    }
  }, [rowsPerPage]);

  useEffect(() => {
    fetchActivities(1, DEFAULT_FILTERS, '');
  }, [fetchActivities]);

  const handleApply = useCallback(() => {
    const nextFilters = { ...filters };
    setAppliedFilters(nextFilters);
    setAppliedActivityType(activityTypeFilter);
    setCurrentPage(1);
    fetchActivities(1, nextFilters, activityTypeFilter);
  }, [filters, activityTypeFilter, fetchActivities]);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setActivityTypeFilter('');
    setAppliedActivityType('');
    setCurrentPage(1);
    fetchActivities(1, DEFAULT_FILTERS, '');
  }, [fetchActivities]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    fetchActivities(page, appliedFilters, appliedActivityType);
  }, [appliedFilters, appliedActivityType, fetchActivities]);

  const handleFilterChange = useCallback((field: keyof Filters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  const totalActivities = pagination?.total ?? 0;
  const totalPages = pagination?.total_pages ?? 1;

  const selectedStaffName =
    staffList.find((s) => s.id === filters.staff)?.name || 'All Staff';

  const getPageNumbers = useCallback(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }, [totalPages]);

  return {
    filters,
    activityTypeFilter,
    setActivityTypeFilter,
    currentPage,
    showStaffDropdown,
    setShowStaffDropdown,
    localSearchQuery,
    setLocalSearchQuery,
    totalActivities,
    totalPages,
    paginatedActivities: activities,
    selectedStaffName,
    handleFilterChange,
    handleApply,
    handleReset,
    handlePageChange,
    getPageNumbers,
  };
};
