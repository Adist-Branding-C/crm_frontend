import { useState, useMemo, useCallback } from 'react';
import type { EmailTemplateItem, EmailTemplateFormData } from '../types';
import { ADD_EMAIL_TEMPLATE_INITIAL_VALUES } from '../constants';

export function useEditEmailTemplateDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<EmailTemplateItem | null>(null);

  const openEditDrawer = useCallback((item: EmailTemplateItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: EmailTemplateFormData = useMemo(
    () => editingItem
      ? {
          templateName: editingItem.templateName || '',
          subject: editingItem.subject || '',
          content: editingItem.content || '',
          status: editingItem.status || '',
        }
      : ADD_EMAIL_TEMPLATE_INITIAL_VALUES,
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
