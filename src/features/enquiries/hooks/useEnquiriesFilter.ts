import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { INITIAL_FILTERS } from '../constants';
import { DEBOUNCE_MS } from '../utils/leadsQueryBuilder';
import type { Filters } from '../types';

export interface UseEnquiriesFilterResult {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  debouncedSearch: string;
  clearFilters: () => void;
}

export function useEnquiriesFilter(resetPage: () => void): UseEnquiriesFilterResult {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const debouncedSearch = useDebounce(searchQuery, DEBOUNCE_MS);

  useEffect(() => {
    resetPage();
  }, [debouncedSearch, filters, resetPage]);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    resetPage();
  }, [resetPage]);

  return { searchQuery, setSearchQuery, filters, setFilters, debouncedSearch, clearFilters };
}
