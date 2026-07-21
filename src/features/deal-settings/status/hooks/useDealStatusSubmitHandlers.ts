import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { dealStatusService } from '../services/dealStatus.service';
import { useDrawerScroll } from '../../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../../../task-settings/call-reason/utils/parseApiError';
import { applyFieldErrors } from '../../../task-settings/call-reason/utils/applyFieldErrors';
import type { DealStatusFormData } from '../types/request';
import type { DealStatusItem } from '../types/interface';

interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: DealStatusItem | null;
  deletingItem: DealStatusItem | null;
}

interface FetchHandlers {
  setError: (msg: string) => void;
  refresh: () => void;
}

interface ToastHandlers {
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}

/**
 * Form submit + delete handlers for deal-settings/status.
 *
 * Mirrors useCampaignSubmitHandlers: owns FormikHelpers, parseApiError, applyFieldErrors,
 * scrollAndFocusError, scrollToTop, and toast calls. No UI state leaks into this hook.
 */
export function useDealStatusSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: DealStatusFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<DealStatusFormData>,
  ) => {
    fetch.setError('');

    try {
      const response = await dealStatusService.createDealStatus(values);

      if (response.status) {
        fetch.refresh();
        resetForm();
        toast.showToastMessage('Deal status added successfully', 'success');
        config.onAddSuccess();
        return true;
      }

      const resp = response as unknown as Record<string, unknown>;
      const errorField = applyFieldErrors(
        resp.errors as Record<string, string[]> | undefined,
        response.message,
        resp.field as string | undefined,
        setFieldError,
      );
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add deal status');
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
      setSubmitting(false);
    }
  }, [fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: DealStatusFormData,
    { setSubmitting, setFieldError }: FormikHelpers<DealStatusFormData>,
  ) => {
    if (!config.editingItem) return false;

    fetch.setError('');

    try {
      const response = await dealStatusService.updateDealStatus(config.editingItem.id, values);

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('Deal status updated successfully', 'success');
        config.onEditSuccess();
        return true;
      }

      const resp = response as unknown as Record<string, unknown>;
      const errorField = applyFieldErrors(
        resp.errors as Record<string, string[]> | undefined,
        response.message,
        resp.field as string | undefined,
        setFieldError,
      );
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update deal status');
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
      setSubmitting(false);
    }
  }, [fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleConfirmDelete = useCallback(async () => {
    if (!config.deletingItem) return;

    try {
      const response = await dealStatusService.deleteDealStatus(config.deletingItem.id);

      if (response.status) {
        fetch.refresh();
        config.onDeleteSuccess();
      } else {
        toast.showToastMessage(response.message || 'Failed to delete deal status', 'error');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      toast.showToastMessage(parsed.message, 'error');
    }
  }, [fetch, config, toast]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}

export type { SubmitHandlerConfig, FetchHandlers, ToastHandlers };
