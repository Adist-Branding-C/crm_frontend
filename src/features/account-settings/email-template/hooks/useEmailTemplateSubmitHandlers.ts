import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useCreateEmailTemplate } from './useCreateEmailTemplate';
import { useUpdateEmailTemplate } from './useUpdateEmailTemplate';
import { useDeleteEmailTemplate } from './useDeleteEmailTemplate';
import { useDrawerScroll } from '../../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../utils/parseApiError';
import { applyFieldErrors } from '../utils/applyFieldErrors';
import type { EmailTemplateItem, EmailTemplateFormData, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';

export function useEmailTemplateSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const create = useCreateEmailTemplate();
  const update = useUpdateEmailTemplate();
  const removal = useDeleteEmailTemplate();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: EmailTemplateFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<EmailTemplateFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { templateName, subject, content, status } = values;
      const response = await create.create({ templateName: templateName.trim(), subject: subject.trim(), content: content.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.setPageNumber(1);
        fetch.setSearchQuery('');
        fetch.refresh();
        resetForm();
        toast.showToastMessage('Email template added successfully', 'success');
        config.onAddSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add email template');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to add email template'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to add email template');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: EmailTemplateFormData,
    { setSubmitting, setFieldError }: FormikHelpers<EmailTemplateFormData>,
  ) => {
    if (!config.editingItem) return;

    const item = config.editingItem;
    const original: EmailTemplateFormData = {
      templateName: item.templateName || '',
      subject: item.subject || '',
      content: item.content || '',
      status: item.status || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      setSubmitting(false);
      return;
    }

    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { templateName, subject, content, status } = values;
      const response = await update.update(config.editingItem.id, { templateName: templateName.trim(), subject: subject.trim(), content: content.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('Email template updated successfully', 'success');
        config.onEditSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update email template');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to update email template'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to update email template');
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
        fetch.setError(response?.message || 'Failed to delete email template');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      fetch.setError(parsed.message || 'Failed to delete email template');
    }
  }, [removal, fetch, config]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
