import { useState, useMemo, useCallback } from 'react';
import { SortDirection } from '../constants/enums/sortDirection';
import type { SortConfig } from '../types/sort';

export type { SortConfig };

export function useTableSorting<T>(data: T[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: SortDirection.ASC });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof T];
      const bVal = b[sortConfig.key as keyof T];
      if (aVal < bVal) return sortConfig.direction === SortDirection.ASC ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === SortDirection.ASC ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
    }));
  }, []);

  const handleSortDirection = useCallback((key: string, direction: SortDirection) => {
    setSortConfig({ key, direction });
  }, []);

  return { sortedData, sortConfig, handleSort, handleSortDirection, setSortConfig };
}
