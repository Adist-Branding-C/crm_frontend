import { useState, useCallback } from 'react';
import { DEFAULT_FILTERS } from '../constants';
import type { Filters } from '../types';

/**
 * Owns the activity filter panel's staged (editable) and applied filter state.
 *
 * Used by:
 * - DailyActivityPage (applyFilters/resetFilters return the freshly-applied
 *   values so the caller can immediately trigger a fetch without waiting on a
 *   state update to commit).
 */
export function useActivityFilters() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [activityTypeFilter, setActivityTypeFilter] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [appliedActivityType, setAppliedActivityType] = useState('');

  const handleFilterChange = useCallback((field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedFilters(filters);
    setAppliedActivityType(activityTypeFilter);
    return { appliedFilters: filters, appliedActivityType: activityTypeFilter };
  }, [filters, activityTypeFilter]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setActivityTypeFilter('');
    setAppliedActivityType('');
    return { appliedFilters: DEFAULT_FILTERS, appliedActivityType: '' };
  }, []);

  return {
    filters,
    activityTypeFilter,
    appliedFilters,
    appliedActivityType,
    setActivityTypeFilter,
    setAppliedActivityType,
    handleFilterChange,
    applyFilters,
    resetFilters,
  };
}
