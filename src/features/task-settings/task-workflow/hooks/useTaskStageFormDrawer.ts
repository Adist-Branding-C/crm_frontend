import { useCallback, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { useDrawer } from '../../../../shared/hooks/useDrawer';
import { taskWorkflowService } from '../services/taskworkflow.service';
import { parseApiError } from '../../call-reason/utils/parseApiError';
import type { TaskStageFormData } from '../types/request';
import type { TaskWorkflowStage } from '../types/interface';

/**
 * Owns the add/edit Stage drawer's open state and its create/update/delete
 * handlers for the workflow canvas page. Uses the shared useDrawer hook
 * (same pattern as Deal Pipeline's useStageFormDrawer).
 *
 * Used by:
 * - TaskWorkflowCanvasPage
 */
export function useTaskStageFormDrawer(
  workflowId: number,
  onChanged: () => void | Promise<void>,
) {
  const drawer = useDrawer<TaskWorkflowStage>();
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    async (values: TaskStageFormData, helpers: FormikHelpers<TaskStageFormData>) => {
      setError('');
      try {
        const response = drawer.item
          ? await taskWorkflowService.updateStage(
              workflowId,
              Number(drawer.item.id),
              values,
              drawer.item.sortOrder,
            )
          : await taskWorkflowService.createStage(workflowId, values);

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
    [drawer, onChanged, workflowId],
  );

  const requestDelete = useCallback(
    async (stage: TaskWorkflowStage) => {
      setError('');
      try {
        const response = await taskWorkflowService.deleteStage(workflowId, Number(stage.id));
        if (response.status) {
          await onChanged();
          drawer.close();
        } else {
          setError(response.message || 'Failed to delete stage');
        }
      } catch (err) {
        setError(parseApiError(err).message);
      }
    },
    [drawer, onChanged, workflowId],
  );

  return {
    drawer,
    error,
    handleSubmit,
    requestDelete,
  };
}
