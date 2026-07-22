import { useState, useCallback } from 'react';
import { SortDirection } from '../../constants/enums/sortDirection';
import type { SortConfig } from '../../types/sort';

export function useTableSort(onSortChange?: () => void) {
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: SortDirection.ASC,
  });

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC,
    }));
    onSortChange?.();
  }, [onSortChange]);

  const handleSortDesc = useCallback((key: string) => {
    setSortConfig({ key, direction: SortDirection.DESC });
    onSortChange?.();
  }, [onSortChange]);

  const handleSortAsc = useCallback((key: string) => {
    setSortConfig({ key, direction: SortDirection.ASC });
    onSortChange?.();
  }, [onSortChange]);

  const resetSort = useCallback(() => {
    setSortConfig({ key: null, direction: SortDirection.ASC });
  }, []);

  return { sortConfig, handleSort, handleSortAsc, handleSortDesc, resetSort, setSortConfig };
}
