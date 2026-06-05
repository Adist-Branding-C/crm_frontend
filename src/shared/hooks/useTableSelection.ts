import { useState, useCallback } from 'react';

export function useTableSelection<TId extends string | number = number>() {
  const [selectedIds, setSelectedIds] = useState<TId[]>([]);

  const handleSelectAll = useCallback((ids: TId[], checked: boolean) => {
    if (checked) setSelectedIds(ids);
    else setSelectedIds([]);
  }, []);

  const handleSelectRow = useCallback((id: TId) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const isSelected = useCallback((id: TId) => selectedIds.includes(id), [selectedIds]);

  return { selectedIds, handleSelectAll, handleSelectRow, isSelected, setSelectedIds };
}
