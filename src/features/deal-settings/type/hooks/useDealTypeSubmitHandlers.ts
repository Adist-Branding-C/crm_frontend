import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { dealTypeService } from '../services/dealType.service';
import { useDrawerScroll } from '../../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../../../task-settings/call-reason/utils/parseApiError';
import { applyFieldErrors } from '../../../task-settings/call-reason/utils/applyFieldErrors';
import type { DealTypeFormData } from '../types/request';
import type { DealTypeItem } from '../types/interface';

interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: DealTypeItem | null;
  deletingItem: DealTypeItem | null;
}

interface FetchHandlers {
  setError: (msg: string) => void;
  refresh: () => void;
}

interface ToastHandlers {
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}

/**
 * Form submit + delete handlers for deal-settings/type.
 *
 * Mirrors useDealStatusSubmitHandlers: owns FormikHelpers, parseApiError, applyFieldErrors,
 * scrollAndFocusError, scrollToTop, and toast calls. No UI state leaks into this hook.
 */
export function useDealTypeSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: DealTypeFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<DealTypeFormData>,
  ) => {
    fetch.setError('');

    try {
      const response = await dealTypeService.createDealType(values);

      if (response.status) {
        fetch.refresh();
        resetForm();
        toast.showToastMessage('Deal type added successfully', 'success');
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
        fetch.setError(response.message || 'Failed to add deal type');
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
    values: DealTypeFormData,
    { setSubmitting, setFieldError }: FormikHelpers<DealTypeFormData>,
  ) => {
    if (!config.editingItem) return false;

    fetch.setError('');

    try {
      const response = await dealTypeService.updateDealType(config.editingItem.id, values);

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('Deal type updated successfully', 'success');
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
        fetch.setError(response.message || 'Failed to update deal type');
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
      const response = await dealTypeService.deleteDealType(config.deletingItem.id);

      if (response.status) {
        fetch.refresh();
        config.onDeleteSuccess();
      } else {
        toast.showToastMessage(response.message || 'Failed to delete deal type', 'error');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      toast.showToastMessage(parsed.message, 'error');
    }
  }, [fetch, config, toast]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}

export type { SubmitHandlerConfig, FetchHandlers, ToastHandlers };
