import { useCallback, useState } from 'react';


export function useFilterState<T>(initialFilters: T) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<T>(initialFilters);

  const applyFilters = useCallback(() => {
    setAppliedFilters(filters);
  }, [filters]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  }, [initialFilters]);

  return { filters, setFilters, appliedFilters, applyFilters, resetFilters };
}
