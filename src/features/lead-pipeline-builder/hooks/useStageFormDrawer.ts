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
  const [stageToDelete, setStageToDelete] = useState<LeadStageItem | null>(null);

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
        showToast?.(response.message || 'Failed to save stage', 'error');
        return false;
      } catch (err) {
        const errorMsg = parseApiError(err).message;
        showToast?.(errorMsg, 'error');
        return false;
      } finally {
        helpers.setSubmitting(false);
      }
    },
    [drawer, onChanged, pipelineId, showToast],
  );

  const requestDelete = useCallback(
    (stage: LeadStageItem) => {
      setStageToDelete(stage);
    },
    [],
  );

  const confirmDelete = useCallback(
    async () => {
      if (!stageToDelete) return;
      const stage = stageToDelete;
      setError('');
      try {
        const response = await leadPipelineService.deleteStage(pipelineId, stage.id);
        if (response.status) {
          await onChanged();
          setStageToDelete(null);
          drawer.close();
          showToast?.('Lead Stage deleted successfully', 'success');
        } else {
          showToast?.(response.message || 'Failed to delete stage', 'error');
        }
      } catch (err) {
        const axiosErr = err as AxiosError<StageInUseError>;
        if (axiosErr.response?.status === 409) {
          setStageToDelete(null);
          setReassignPrompt({
            stage,
            leadCount: axiosErr.response.data?.data?.leadCount ?? 0,
          });
        } else {
          const errorMsg = parseApiError(err).message;
          showToast?.(errorMsg, 'error');
        }
      }
    },
    [stageToDelete, drawer, onChanged, pipelineId, showToast],
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
          showToast?.(response.message || 'Failed to delete stage', 'error');
        }
      } catch (err) {
        const errorMsg = parseApiError(err).message;
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
    stageToDelete,
    cancelDelete: () => setStageToDelete(null),
    confirmDelete,
    reassignPrompt,
    cancelReassignPrompt: () => setReassignPrompt(null),
    confirmReassignAndDelete,
  };
}
