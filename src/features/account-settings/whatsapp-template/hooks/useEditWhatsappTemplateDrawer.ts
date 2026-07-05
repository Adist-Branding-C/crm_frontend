import { useState, useMemo, useCallback } from 'react';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from '../types';
import { ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES } from '../constants';

export function useEditWhatsappTemplateDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<WhatsappTemplateItem | null>(null);

  const openEditDrawer = useCallback((item: WhatsappTemplateItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: WhatsappTemplateFormData = useMemo(
    () => editingItem
      ? {
          templateName: editingItem.templateName || editingItem.name || '',
          message: editingItem.message || editingItem.content || '',
          status: editingItem.status || '',
        }
      : ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES,
    [editingItem],
  );

  return {
    showEditDrawer,
    editingItem,
    openEditDrawer,
    closeEditDrawer,
    editInitialValues,
  };
}
