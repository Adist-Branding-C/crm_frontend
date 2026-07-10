import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useCampaignApi } from './useCampaignApi';
import { useDrawerScroll } from '../../../shared/hooks/useDrawerScroll';
import { parseApiError } from '../utils/parseApiError';
import { applyFieldErrors } from '../utils/applyFieldErrors';
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

    fetch.setError('');

    try {
      const response = await api.remove(String(config.deletingItem.id));

      if (response?.status) {
        fetch.refresh();
        config.onDeleteSuccess();
      } else {
        fetch.setError(response?.message || 'Failed to delete campaign');
      }
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'message' in err
        ? (err as { message: string }).message
        : 'Failed to delete campaign';
      fetch.setError(msg);
    }
  }, [api, fetch, config]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
