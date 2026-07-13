import { useState, useCallback } from 'react';

/**
 * Generic checkbox-selection state for any list of ids - tracks which ids are selected and
 * whether "select all" should read as checked, independent of any one feature's row/entity
 * shape.
 */
export function useTableSelection<T = number>() {
  const [selectedIds, setSelectedIds] = useState<T[]>([]);

  const handleSelectAll = useCallback((ids: T[], checked: boolean) => {
    if (checked) setSelectedIds(ids);
    else setSelectedIds([]);
  }, []);

  const handleSelectRow = useCallback((id: T) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const isSelected = useCallback((id: T) => selectedIds.includes(id), [selectedIds]);

  const isAllSelected = useCallback((visibleCount: number) => selectedIds.length === visibleCount && visibleCount > 0, [selectedIds]);

  return { selectedIds, handleSelectAll, handleSelectRow, isSelected, isAllSelected, setSelectedIds };
}
