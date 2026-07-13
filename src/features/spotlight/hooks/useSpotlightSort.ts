import { useState, useCallback } from 'react';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';
import type { SortConfig } from '../../../shared/types/sort';

/**
 * Owns the Spotlight table's sort state and the sort-by dropdown's visibility.
 *
 * Used by:
 * - useSpotlightData.
 *
 * Notes:
 * - selectSort sets the sort config AND closes the dropdown in one action,
 *   since every dropdown option selection does both.
 */
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
