import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from '../types';
import type { UseWhatsappTemplateActionsParams } from '../types';

export function useWhatsappTemplateActions({ whatsappTemplate, drawer }: UseWhatsappTemplateActionsParams) {
  const [deletingItem, setDeletingItem] = useState<WhatsappTemplateItem | null>(null);

  const handleSubmit = useCallback(async (
    values: WhatsappTemplateFormData,
    helpers: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    const success = await whatsappTemplate.handleAddWhatsappTemplate(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [whatsappTemplate.handleAddWhatsappTemplate, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: WhatsappTemplateFormData,
    helpers: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const item = drawer.editingItem;
    const original: WhatsappTemplateFormData = {
      templateName: item.templateName || item.name || '',
      message: item.message || item.content || '',
      status: item.status || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await whatsappTemplate.handleUpdateWhatsappTemplate(item.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, whatsappTemplate.handleUpdateWhatsappTemplate, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: WhatsappTemplateItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await whatsappTemplate.handleDeleteWhatsappTemplate(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, whatsappTemplate.handleDeleteWhatsappTemplate]);

  const closeDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  return {
    deletingItem,
    handleSubmit,
    handleEditSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    closeDeleteModal,
  };
}
