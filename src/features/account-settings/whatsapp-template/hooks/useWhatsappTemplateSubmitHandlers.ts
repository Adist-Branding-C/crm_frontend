import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useCreateWhatsappTemplate } from './useCreateWhatsappTemplate';
import { useUpdateWhatsappTemplate } from './useUpdateWhatsappTemplate';
import { useDeleteWhatsappTemplate } from './useDeleteWhatsappTemplate';
import { useDrawerScroll } from '../../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../utils/parseApiError';
import { applyFieldErrors } from '../utils/applyFieldErrors';
import type { WhatsappTemplateItem, WhatsappTemplateFormData, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';

export function useWhatsappTemplateSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const create = useCreateWhatsappTemplate();
  const update = useUpdateWhatsappTemplate();
  const removal = useDeleteWhatsappTemplate();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: WhatsappTemplateFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const response = await create.create({ templateName: templateName.trim(), message: message.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.setPageNumber(1);
        fetch.setSearchQuery('');
        fetch.refresh();
        resetForm();
        toast.showToastMessage('WhatsApp template added successfully', 'success');
        config.onAddSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add WhatsApp template');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to add WhatsApp template'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to add WhatsApp template');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: WhatsappTemplateFormData,
    { setSubmitting, setFieldError }: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    if (!config.editingItem) return;

    const item = config.editingItem;
    const original: WhatsappTemplateFormData = {
      templateName: item.templateName || item.name || '',
      message: item.message || item.content || '',
      status: item.status || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      setSubmitting(false);
      return;
    }

    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const response = await update.update(config.editingItem.id, { templateName: templateName.trim(), message: message.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('WhatsApp template updated successfully', 'success');
        config.onEditSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update WhatsApp template');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to update WhatsApp template'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to update WhatsApp template');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [update, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleConfirmDelete = useCallback(async () => {
    if (!config.deletingItem) return;

    fetch.setError('');

    try {
      const response = await removal.remove(config.deletingItem.id);

      if (response?.status) {
        fetch.refresh();
        config.onDeleteSuccess();
      } else {
        fetch.setError(response?.message || 'Failed to delete WhatsApp template');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      fetch.setError(parsed.message || 'Failed to delete WhatsApp template');
    }
  }, [removal, fetch, config]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
