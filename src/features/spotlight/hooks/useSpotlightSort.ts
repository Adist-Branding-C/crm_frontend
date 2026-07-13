import { useState, useCallback } from 'react';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';
import type { SortConfig } from '../../../shared/types/sort';

export function useSpotlightSort() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: SortDirection.ASC,
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const toggleSortDropdown = useCallback(
    () => setShowSortDropdown((prev) => !prev),
    [],
  );

  const handleSort = useCallback((key: string) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC,
    }));
  }, []);

  const selectSort = useCallback((key: string, direction: SortDirection) => {
    setSortConfig({ key, direction });
    setShowSortDropdown(false);
  }, []);

  return {
    sortConfig,
    showSortDropdown,
    toggleSortDropdown,
    handleSort,
    selectSort,
  };
}
