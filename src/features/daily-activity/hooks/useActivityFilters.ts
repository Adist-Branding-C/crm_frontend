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
  const [appliedFilters, setAppliedFilters] = useState<Filters>(DEFAULT_FILTERS);

  const handleFilterChange = useCallback((field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedFilters(filters);
    return { appliedFilters: filters };
  }, [filters]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    return { appliedFilters: DEFAULT_FILTERS };
  }, []);

  return {
    filters,
    appliedFilters,
    handleFilterChange,
    applyFilters,
    resetFilters,
  };
}
