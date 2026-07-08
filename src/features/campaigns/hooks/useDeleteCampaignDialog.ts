import { useState, useCallback } from 'react';
import type { Campaign } from '../types';

export function useDeleteCampaignDialog() {
  const [deletingItem, setDeletingItem] = useState<Campaign | null>(null);

  const handleDeleteClick = useCallback((item: Campaign) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
