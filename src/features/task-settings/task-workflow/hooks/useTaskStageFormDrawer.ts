import { useCallback, useState } from 'react';
import type { FormikHelpers } from 'formik';
import type { AxiosError } from 'axios';
import { useDrawer } from '../../../../shared/hooks/useDrawer';
import { taskWorkflowService } from '../services/taskworkflow.service';
import { parseApiError } from '../../call-reason/utils/parseApiError';
import type { TaskStageFormData } from '../types/request';
import type { TaskWorkflowStage } from '../types/interface';

interface StageInUseError {
  status: false;
  message: string;
  data?: { taskCount?: number };
}

/**
 * Owns the add/edit Stage drawer's open state and its create/update/delete
 * handlers for the workflow canvas page. Uses the shared useDrawer hook
 * (same pattern as Deal Pipeline's useStageFormDrawer).
 *
 * Used by:
 * - TaskWorkflowCanvasPage
 *
 * Notes:
 * - Deleting a stage never calls the API immediately. `taskCounts` (from the
 *   kanban endpoint) picks the prompt: a stage with tasks opens the reassign
 *   dialog, an empty stage opens the plain confirm-delete modal, and only user
 *   confirmation performs the DELETE. A 409 raced in during an empty-stage
 *   confirm still falls back to the reassign dialog with the backend's count.
 */
export function useTaskStageFormDrawer(
  workflowId: number,
  onChanged: () => void | Promise<void>,
  taskCounts: Record<string, number>,
) {
  const drawer = useDrawer<TaskWorkflowStage>();
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<TaskWorkflowStage | null>(null);
  const [reassignPrompt, setReassignPrompt] = useState<{ stage: TaskWorkflowStage; taskCount: number } | null>(null);

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
    (stage: TaskWorkflowStage) => {
      setError('');
      const taskCount = taskCounts[stage.id] ?? 0;
      if (taskCount > 0) {
        setReassignPrompt({ stage, taskCount });
      } else {
        setDeleteConfirm(stage);
      }
    },
    [taskCounts],
  );

  const confirmDelete = useCallback(async () => {
    if (!deleteConfirm) return;
    setError('');
    setIsDeleting(true);
    try {
      const response = await taskWorkflowService.deleteStage(workflowId, Number(deleteConfirm.id));
      if (response.status) {
        await onChanged();
        setDeleteConfirm(null);
        drawer.close();
      } else {
        setError(response.message || 'Failed to delete stage');
      }
    } catch (err) {
      const axiosErr = err as AxiosError<StageInUseError>;
      if (axiosErr.response?.status === 409) {
        setReassignPrompt({
          stage: deleteConfirm,
          taskCount: axiosErr.response.data?.data?.taskCount ?? 0,
        });
        setDeleteConfirm(null);
      } else {
        setError(parseApiError(err).message);
      }
    } finally {
      setIsDeleting(false);
    }
  }, [workflowId, deleteConfirm, onChanged, drawer]);

  const cancelDeleteConfirm = useCallback(() => setDeleteConfirm(null), []);

  const confirmReassignAndDelete = useCallback(
    async (reassignToStageId: number) => {
      if (!reassignPrompt) return;
      setError('');
      setIsDeleting(true);
      try {
        const response = await taskWorkflowService.deleteStage(
          workflowId,
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
      } finally {
        setIsDeleting(false);
      }
    },
    [workflowId, reassignPrompt, onChanged, drawer],
  );

  const cancelReassignPrompt = useCallback(() => setReassignPrompt(null), []);

  return {
    drawer,
    error,
    isDeleting,
    deleteConfirm,
    reassignPrompt,
    handleSubmit,
    requestDelete,
    confirmDelete,
    cancelDeleteConfirm,
    confirmReassignAndDelete,
    cancelReassignPrompt,
  };
}
