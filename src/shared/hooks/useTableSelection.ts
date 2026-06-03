import { useState, useCallback } from 'react';

export function useTableSelection() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = useCallback((ids: number[], checked: boolean) => {
    if (checked) setSelectedIds(ids);
    else setSelectedIds([]);
  }, []);

  const handleSelectRow = useCallback((id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const isSelected = useCallback((id: number) => selectedIds.includes(id), [selectedIds]);

  return { selectedIds, handleSelectAll, handleSelectRow, isSelected, setSelectedIds };
}
