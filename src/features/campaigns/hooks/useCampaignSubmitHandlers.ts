import { useCallback, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { useCampaignApi } from './useCampaignApi';
import { useDrawerScroll } from '../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import { applyFieldErrors } from '../../task-settings/call-reason/utils/applyFieldErrors';
import { CampaignMapper } from '../mappers/campaign.mapper';
import type { CampaignFormData, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';
import type { CreateCampaignPayload, UpdateCampaignPayload } from '../types';

export function useCampaignSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const api = useCampaignApi();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleAddSubmit = useCallback(async (
    values: CampaignFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<CampaignFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const payload = CampaignMapper.toRequest(values) as CreateCampaignPayload;
      const response = await api.create(payload);

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.setPageNumber(1);
        fetch.setSearchQuery('');
        fetch.refresh();
        resetForm();
        toast.showToastMessage('Campaign added successfully', 'success');
        config.onAddSuccess();
        return true;
      }

      const errorField = applyFieldErrors(
        (response as Record<string, unknown>).errors as Record<string, string[]> | undefined,
        response.message,
        (response as Record<string, unknown>).field as string | undefined,
        setFieldError,
      );
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add campaign');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) {
          scrollAndFocusError();
        } else {
          fetch.setError(parsed.message);
          scrollToTop();
        }
      } else {
        fetch.setError(parsed.message);
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [api, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: CampaignFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CampaignFormData>,
  ) => {
    if (!config.editingItem) return;

    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const payload = CampaignMapper.toRequest(values) as UpdateCampaignPayload;
      const response = await api.update(String(config.editingItem.id), payload);

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('Campaign updated successfully', 'success');
        config.onEditSuccess();
        return true;
      }

      const errorField = applyFieldErrors(
        (response as Record<string, unknown>).errors as Record<string, string[]> | undefined,
        response.message,
        (response as Record<string, unknown>).field as string | undefined,
        setFieldError,
      );
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update campaign');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) {
          scrollAndFocusError();
        } else {
          fetch.setError(parsed.message);
          scrollToTop();
        }
      } else {
        fetch.setError(parsed.message);
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [api, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleConfirmDelete = useCallback(async () => {
    if (!config.deletingItem) return;

    setDeleteError(null);
    setIsDeleting(true);

    try {
      const response = await api.remove(String(config.deletingItem.id));

      if (response?.status) {
        fetch.refresh();
        config.onDeleteSuccess();
      } else {
        setDeleteError(response?.message || 'Failed to delete campaign');
      }
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'message' in err
        ? (err as { message: string }).message
        : 'Failed to delete campaign';
      setDeleteError(msg);
    } finally {
      setIsDeleting(false);
    }
  }, [api, fetch, config]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete, isDeleting, deleteError };
}
