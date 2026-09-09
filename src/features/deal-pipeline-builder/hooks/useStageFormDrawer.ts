import { useCallback, useState } from 'react';
import type { AxiosError } from 'axios';
import type { FormikHelpers } from 'formik';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { dealPipelineService } from '../services/dealPipeline.service';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import type { DealStageFormData } from '../types/request';
import type { DealStageItem } from '../types/interface';

interface StageInUseError {
  status: false;
  message: string;
  data?: { dealCount?: number };
}

/**
 * Owns the add/edit Stage drawer's open state and its create/update/delete
 * handlers, including the delete-with-reassignment flow: a stage that still
 * has deals on it comes back as a 409 from the API, which surfaces here as
 * `reassignPrompt` for the page to render a "move N deals to ___ first"
 * confirmation before retrying the delete with a target stage.
 *
 * Used by:
 * - DealPipelineCanvasPage
 */
export function useStageFormDrawer(
  pipelineId: number,
  onChanged: () => void | Promise<void>,
) {
  const drawer = useDrawer<DealStageItem>();
  const [error, setError] = useState('');
  const [reassignPrompt, setReassignPrompt] = useState<{
    stage: DealStageItem;
    dealCount: number;
  } | null>(null);

  const handleSubmit = useCallback(
    async (values: DealStageFormData, helpers: FormikHelpers<DealStageFormData>) => {
      setError('');
      try {
        const response = drawer.item
          ? await dealPipelineService.updateStage(pipelineId, Number(drawer.item.id), values)
          : await dealPipelineService.createStage(pipelineId, values);

        if (response.status) {
          await onChanged();
          drawer.close();
          return true;
        }
        setError(response.message || 'Failed to save stage');
        return false;
      } catch (err) {
        setError(parseApiError(err).message);
        return false;
      } finally {
        helpers.setSubmitting(false);
      }
    },
    [drawer, onChanged, pipelineId],
  );

  const requestDelete = useCallback(
    async (stage: DealStageItem) => {
      setError('');
      try {
        const response = await dealPipelineService.deleteStage(pipelineId, Number(stage.id));
        if (response.status) {
          await onChanged();
          drawer.close();
        }
      } catch (err) {
        const axiosErr = err as AxiosError<StageInUseError>;
        if (axiosErr.response?.status === 409) {
          setReassignPrompt({
            stage,
            dealCount: axiosErr.response.data?.data?.dealCount ?? 0,
          });
        } else {
          setError(parseApiError(err).message);
        }
      }
    },
    [drawer, onChanged, pipelineId],
  );

  const confirmReassignAndDelete = useCallback(
    async (reassignToStageId: number) => {
      if (!reassignPrompt) return;
      setError('');
      try {
        const response = await dealPipelineService.deleteStage(
          pipelineId,
          Number(reassignPrompt.stage.id),
          reassignToStageId,
        );
        if (response.status) {
          await onChanged();
          setReassignPrompt(null);
          drawer.close();
        } else {
          setError(response.message || 'Failed to delete stage');
        }
      } catch (err) {
        setError(parseApiError(err).message);
      }
    },
    [drawer, onChanged, pipelineId, reassignPrompt],
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
