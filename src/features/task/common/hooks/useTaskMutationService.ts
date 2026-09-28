import { useMemo } from 'react';
import { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } from '../services/taskApi';
import type { TaskCrudDataService } from './useTaskCrud';
import type { UnifiedTaskFormValues } from '../types/unifiedTask.types';

/**
 * Gives useTaskCrud the create/update/delete functions it expects, backed by
 * the taskApi mutations.
 *
 * Used by:
 * - TaskPage (passed to useTaskCrud as `dataService`)
 *
 * Notes:
 * - `.unwrap()` returns the server response on success and throws the error on
 *   failure, so useTaskCrud's existing try/catch and toasts work unchanged.
 */
export function useTaskMutationService(): TaskCrudDataService<UnifiedTaskFormValues> {
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  return useMemo(() => ({
    create: (values) => createTask(values).unwrap(),
    update: (id, values) => updateTask({ id, values }).unwrap(),
    delete: (id) => deleteTask(id).unwrap(),
  }), [createTask, updateTask, deleteTask]);
}
