import { useState, useCallback } from 'react';

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

  return { selectedIds, handleSelectAll, handleSelectRow, isSelected, setSelectedIds };
}
