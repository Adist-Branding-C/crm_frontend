import { useState, useCallback } from 'react';
import type { CampaignTaskItem } from '../types/index';

export function useDeleteCampaignTaskDialog() {
  const [deletingItem, setDeletingItem] = useState<CampaignTaskItem | null>(null);

  const handleDeleteClick = useCallback((item: CampaignTaskItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
