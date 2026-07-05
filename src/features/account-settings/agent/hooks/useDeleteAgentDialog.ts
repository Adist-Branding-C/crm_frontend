import { useState, useCallback } from 'react';
import type { AgentItem } from '../types';

export function useDeleteAgentDialog() {
  const [deletingItem, setDeletingItem] = useState<AgentItem | null>(null);

  const handleDeleteClick = useCallback((item: AgentItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
