import { useCallback, useState } from 'react';
import type { FormikHelpers } from 'formik';
import type { AxiosError } from 'axios';
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
 * handlers for the workflow detail page.
 *
 * Notes:
 * - Delete flow mirrors useTaskStageFormDrawer: taskCounts decides between a
 *   plain confirm-delete modal (empty stage) and the reassign modal (stage
 *   with tasks). The API is only called after user confirmation.
 */
export function useStageFormDrawer(
  workflowId: number,
  onChanged: () => void | Promise<void>,
  taskCounts: Record<string, number>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TaskWorkflowStage | null>(null);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<TaskWorkflowStage | null>(null);
  const [reassignPrompt, setReassignPrompt] = useState<{ stage: TaskWorkflowStage; taskCount: number } | null>(null);

  const openAdd = useCallback(() => {
    setEditingItem(null);
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((stage: TaskWorkflowStage) => {
    setEditingItem(stage);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditingItem(null);
    setError('');
  }, []);

  const handleSubmit = useCallback(
    async (values: TaskStageFormData, helpers: FormikHelpers<TaskStageFormData>) => {
      setError('');
      try {
        const response = editingItem
          ? await taskWorkflowService.updateStage(
              workflowId,
              Number(editingItem.id),
              values,
              editingItem.sortOrder,
            )
          : await taskWorkflowService.createStage(workflowId, values);

        if (response.status) {
          await onChanged();
          close();
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
    [editingItem, onChanged, workflowId, close],
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
        close();
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
  }, [workflowId, deleteConfirm, onChanged, close]);

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
          close();
        } else {
          setError(response.message || 'Failed to delete stage');
        }
      } catch (err) {
        setError(parseApiError(err).message);
      } finally {
        setIsDeleting(false);
      }
    },
    [workflowId, reassignPrompt, onChanged, close],
  );

  const cancelReassignPrompt = useCallback(() => setReassignPrompt(null), []);

  return {
    isOpen,
    editingItem,
    error,
    isDeleting,
    deleteConfirm,
    reassignPrompt,
    openAdd,
    openEdit,
    close,
    handleSubmit,
    requestDelete,
    confirmDelete,
    cancelDeleteConfirm,
    confirmReassignAndDelete,
    cancelReassignPrompt,
  };
}
