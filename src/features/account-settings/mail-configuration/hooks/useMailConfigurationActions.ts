import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { MailConfigItem, MailConfigFormData } from '../types';
import type { UseMailConfigurationActionsParams } from '../types/use-mail-configuration-actions.types';

export function useMailConfigurationActions({ mailConfig, drawer }: UseMailConfigurationActionsParams) {
  const [deletingItem, setDeletingItem] = useState<MailConfigItem | null>(null);

  const handleSubmit = useCallback(async (
    values: MailConfigFormData,
    helpers: FormikHelpers<MailConfigFormData>,
  ) => {
    const success = await mailConfig.handleAddMailConfig(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [mailConfig.handleAddMailConfig, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: MailConfigFormData,
    helpers: FormikHelpers<MailConfigFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const item = drawer.editingItem;
    const original: MailConfigFormData = {
      driver: item.driver || '',
      host: item.host || '',
      port: String(item.port || ''),
      encryption: item.encryption || '',
      username: item.username || '',
      password: item.password || '',
      fromEmail: item.fromEmail || '',
      fromName: item.fromName || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await mailConfig.handleUpdateMailConfig(item.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, mailConfig.handleUpdateMailConfig, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: MailConfigItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await mailConfig.handleDeleteMailConfig(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, mailConfig.handleDeleteMailConfig]);

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
