import { useState, useMemo, useCallback } from 'react';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from '../types/whatsapp-template.types';

export function useWhatsappTemplateDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<WhatsappTemplateItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: WhatsappTemplateItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues: WhatsappTemplateFormData = useMemo(
    () => editingItem
      ? {
          templateName: editingItem.templateName || editingItem.name || '',
          message: editingItem.message || editingItem.content || '',
          status: editingItem.status || '',
        }
      : { templateName: '', message: '', status: '' },
    [editingItem]
  );

  return {
    showDrawer,
    editingItem,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    drawerInitialValues,
  };
}
