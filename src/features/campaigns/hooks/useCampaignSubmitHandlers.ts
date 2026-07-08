import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useCreateCampaign } from './useCreateCampaign';
import { useUpdateCampaign } from './useUpdateCampaign';
import { useDeleteCampaign } from './useDeleteCampaign';
import { useDrawerScroll } from '../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import { applyFieldErrors } from '../../task-settings/call-reason/utils/applyFieldErrors';
import { buildCampaignPayload } from '../utils/campaign.utils';
import type { Campaign, CampaignFormData, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';
import type { CreateCampaignPayload, UpdateCampaignPayload } from '../types';

export function useCampaignSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const create = useCreateCampaign();
  const update = useUpdateCampaign();
  const removal = useDeleteCampaign();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: CampaignFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<CampaignFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const payload = buildCampaignPayload(values) as CreateCampaignPayload;
      const response = await create.create(payload);

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
  }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: CampaignFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CampaignFormData>,
  ) => {
    if (!config.editingItem) return;

    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const payload = buildCampaignPayload(values) as UpdateCampaignPayload;
      const response = await update.update(String(config.editingItem.id), payload);

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
  }, [update, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleConfirmDelete = useCallback(async () => {
    if (!config.deletingItem) return;

    fetch.setError('');

    try {
      const response = await removal.remove(String(config.deletingItem.id));

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
  }, [removal, fetch, config]);

  const handleExportCSV = useCallback(() => {
    const csvContent = [
      ['Sl No', 'Name', 'Type', 'Total Tasks', 'Completed Tasks', 'Completed %', 'Created By', 'Created At'].join(','),
      ...fetch.campaignList.map(c =>
        [c.slNo, `"${c.name}"`, c.type, c.totalTasks, c.completedTasks, c.completedPercent + '%', String(c.createdBy ?? ''), c.createdAt].join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'campaigns.csv';
    link.click();
  }, [fetch.campaignList]);

  const handleView = useCallback((_campaign: Campaign) => {
  }, []);

  const handleAssignClick = useCallback((_campaign: Campaign) => {
  }, []);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete, handleExportCSV, handleView, handleAssignClick };
}
