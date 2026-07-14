import { useState, useMemo, useCallback } from 'react';
import type { DealItem, DealStatusFilters } from '../types';

const EMPTY_FILTERS: DealStatusFilters = { status: '', type: '', assignedTo: '' };

export function useDealFilters(dealList: DealItem[]) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<DealStatusFilters>(EMPTY_FILTERS);

  const filteredData = useMemo(() => {
    let data = dealList;
    if (filters.status) data = data.filter(item => item.status === filters.status);
    if (filters.type) data = data.filter(item => item.type === filters.type);
    if (filters.assignedTo) data = data.filter(item => item.agent === filters.assignedTo);
    return data;
  }, [dealList, filters]);

  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setShowFilters(false);
  }, []);

  return { showFilters, setShowFilters, filters, setFilters, filteredData, clearFilters };
}
