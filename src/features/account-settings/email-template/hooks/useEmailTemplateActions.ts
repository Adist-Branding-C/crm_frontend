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
    const item = drawer.editingItem;
    const original: EmailTemplateFormData = {
      templateName: item.templateName || item.title || '',
      subject: item.subject || '',
      content: item.content || item.htmlContent || item.htmlCode || '',
      status: item.status || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await emailTemplate.handleUpdateEmailTemplate(item.id, values, helpers);
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
