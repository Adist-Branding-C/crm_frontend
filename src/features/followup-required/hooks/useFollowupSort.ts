import { useState } from 'react';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';
import type { SortConfig } from '../types';

/**
 * Owns the sort-by dropdown's state and the click-a-column-header /
 * click-a-sort-option toggle logic (same key clicked twice flips direction).
 *
 * Used by:
 * - FollowupRequiredPage (composed alongside fetch/filters/pagination).
 */
export function useFollowupSort() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: SortDirection.ASC,
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Note: doesn't close showSortDropdown itself - the toolbar's sort-option
  // click wraps this to also close the dropdown; a table-header click reuses
  // the same handler without that side effect.
  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC,
    }));
  };

  return { sortConfig, showSortDropdown, setShowSortDropdown, handleSort };
}
