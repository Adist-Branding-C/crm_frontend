import { useState, useCallback } from 'react';
import type { EmailTemplateItem } from '../types';

export function useDeleteEmailTemplateDialog() {
  const [deletingItem, setDeletingItem] = useState<EmailTemplateItem | null>(null);

  const handleDeleteClick = useCallback((item: EmailTemplateItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
