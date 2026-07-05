import { useState, useCallback } from 'react';
import type { WhatsappTemplateItem } from '../types';

export function useDeleteWhatsappTemplateDialog() {
  const [deletingItem, setDeletingItem] = useState<WhatsappTemplateItem | null>(null);

  const handleDeleteClick = useCallback((item: WhatsappTemplateItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
