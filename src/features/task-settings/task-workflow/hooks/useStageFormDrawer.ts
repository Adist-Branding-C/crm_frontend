import { useCallback, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { taskWorkflowService } from '../services/taskworkflow.service';
import { parseApiError } from '../../call-reason/utils/parseApiError';
import type { TaskStageFormData } from '../types/request';
import type { TaskWorkflowStage } from '../types/interface';

/**
 * Owns the add/edit Stage drawer's open state and its create/update/delete
 * handlers for the workflow detail page.
 */
export function useStageFormDrawer(
  workflowId: number,
  onChanged: () => void | Promise<void>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TaskWorkflowStage | null>(null);
  const [error, setError] = useState('');

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
    async (stage: TaskWorkflowStage) => {
      setError('');
      try {
        const response = await taskWorkflowService.deleteStage(workflowId, Number(stage.id));
        if (response.status) {
          await onChanged();
          close();
        } else {
          setError(response.message || 'Failed to delete stage');
        }
      } catch (err) {
        setError(parseApiError(err).message);
      }
    },
    [workflowId, onChanged, close],
  );

  return {
    isOpen,
    editingItem,
    error,
    openAdd,
    openEdit,
    close,
    handleSubmit,
    requestDelete,
  };
}
