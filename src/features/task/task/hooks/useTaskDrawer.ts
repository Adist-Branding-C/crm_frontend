import { useMemo } from 'react';
import { useTaskDrawer as useTaskDrawerCore } from '../../common/hooks/useTaskDrawer';
import { ADD_TASK_INITIAL_VALUES } from '../constants/addTask.constants';
import { TaskMapper } from '../mapper/taskMapper';
import type { UseTaskDrawerLookups } from '../types/hook.types';

/**
 * Add/edit drawer state for the Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - TaskPage.
 *
 * Notes:
 * - Task is the only sub-module that also loads categories (it's the only one
 *   with a category field), so it passes a three-loader list where Call/Campaign/
 *   Deal Task pass two.
 */
export function useTaskDrawer({ loadStaff, loadCategories, loadLeads }: UseTaskDrawerLookups) {
  const loaders = useMemo(() => [loadStaff, loadCategories, loadLeads], [loadStaff, loadCategories, loadLeads]);

  return useTaskDrawerCore({
    mapItemToFormData: TaskMapper.toFormValues,
    emptyFormData: ADD_TASK_INITIAL_VALUES,
    loaders,
  });
}
