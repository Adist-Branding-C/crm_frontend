import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { EmailTemplateItem, EmailTemplateFormData } from '../types/emailTemplate.types';
import type { UseEmailTemplateActionsParams } from '../types/use-email-template-actions.types';

export function useEmailTemplateActions({ emailTemplate, drawer }: UseEmailTemplateActionsParams) {
  const [deletingItem, setDeletingItem] = useState<EmailTemplateItem | null>(null);

  const handleSubmit = useCallback(async (
    values: EmailTemplateFormData,
    helpers: FormikHelpers<EmailTemplateFormData>,
  ) => {
    const success = await emailTemplate.handleAddEmailTemplate(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [emailTemplate.handleAddEmailTemplate, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: EmailTemplateFormData,
    helpers: FormikHelpers<EmailTemplateFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const success = await emailTemplate.handleUpdateEmailTemplate(drawer.editingItem.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, emailTemplate.handleUpdateEmailTemplate, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: EmailTemplateItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await emailTemplate.handleDeleteEmailTemplate(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, emailTemplate.handleDeleteEmailTemplate]);

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
