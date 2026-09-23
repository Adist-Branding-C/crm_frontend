import { useCallback, useState } from 'react';
import type { AxiosError } from 'axios';
import type { FormikHelpers } from 'formik';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { leadPipelineService } from '../services/leadPipeline.service';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import type { LeadStageFormData } from '../types/request';
import type { LeadStageItem } from '../types/interface';

interface StageInUseError {
  status: false;
  message: string;
  data?: { leadCount?: number };
}

/** 
 * Used by:
 * - LeadPipelineCanvasPage
 */
export function useStageFormDrawer(
  pipelineId: number,
  onChanged: () => void | Promise<void>,
  showToast?: (message: string, type: 'success' | 'error') => void
) {
  const drawer = useDrawer<LeadStageItem>();
  const [error, setError] = useState('');
  const [reassignPrompt, setReassignPrompt] = useState<{
    stage: LeadStageItem;
    leadCount: number;
  } | null>(null);

  const handleSubmit = useCallback(
    async (values: LeadStageFormData, helpers: FormikHelpers<LeadStageFormData>) => {
      setError('');
      try {
        const response = drawer.item
          ? await leadPipelineService.updateStage(pipelineId, drawer.item.id, values)
          : await leadPipelineService.createStage(pipelineId, values);

        if (response.status) {
          await onChanged();
          drawer.close();
          showToast?.(`Lead Stage ${drawer.item ? 'updated' : 'created'} successfully`, 'success');
          return true;
        }
        setError(response.message || 'Failed to save stage');
        showToast?.(response.message || 'Failed to save stage', 'error');
        return false;
      } catch (err) {
        const errorMsg = parseApiError(err).message;
        setError(errorMsg);
        showToast?.(errorMsg, 'error');
        return false;
      } finally {
        helpers.setSubmitting(false);
      }
    },
    [drawer, onChanged, pipelineId, showToast],
  );

  const requestDelete = useCallback(
    async (stage: LeadStageItem) => {
      setError('');
      try {
        const response = await leadPipelineService.deleteStage(pipelineId, stage.id);
        if (response.status) {
          await onChanged();
          drawer.close();
          showToast?.('Lead Stage deleted successfully', 'success');
        } else {
          showToast?.(response.message || 'Failed to delete stage', 'error');
        }
      } catch (err) {
        const axiosErr = err as AxiosError<StageInUseError>;
        if (axiosErr.response?.status === 409) {
          setReassignPrompt({
            stage,
            leadCount: axiosErr.response.data?.data?.leadCount ?? 0,
          });
        } else {
          const errorMsg = parseApiError(err).message;
          setError(errorMsg);
          showToast?.(errorMsg, 'error');
        }
      }
    },
    [drawer, onChanged, pipelineId, showToast],
  );

  const confirmReassignAndDelete = useCallback(
    async (reassignToStatusId: string) => {
      if (!reassignPrompt) return;
      setError('');
      try {
        const response = await leadPipelineService.deleteStage(
          pipelineId,
          reassignPrompt.stage.id,
          reassignToStatusId,
        );
        if (response.status) {
          await onChanged();
          setReassignPrompt(null);
          drawer.close();
          showToast?.('Lead Stage deleted successfully', 'success');
        } else {
          setError(response.message || 'Failed to delete stage');
          showToast?.(response.message || 'Failed to delete stage', 'error');
        }
      } catch (err) {
        const errorMsg = parseApiError(err).message;
        setError(errorMsg);
        showToast?.(errorMsg, 'error');
      }
    },
    [drawer, onChanged, pipelineId, reassignPrompt, showToast],
  );

  return {
    drawer,
    error,
    handleSubmit,
    requestDelete,
    reassignPrompt,
    cancelReassignPrompt: () => setReassignPrompt(null),
    confirmReassignAndDelete,
  };
}
