import { useCallback } from 'react';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { ADD_TASK_INITIAL_VALUES } from '../constants';
import { TaskMapper } from '../mappers/task.mapper';
import type { TaskItem } from '../types';
import type { UseTaskDrawerLookups } from '../types';

/**
 * Add/edit drawer state for the Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - TaskPage.
 *
 * Notes:
 * - Wraps the shared useEditDrawer's open actions so opening the drawer (add or
 *   edit) always triggers the staff/category/lead option loads it needs - the page just
 *   calls openAddDrawer/openEditDrawer directly, without composing them.
 */
export function useTaskDrawer({ loadStaff, loadCategories, loadLeads }: UseTaskDrawerLookups) {
  const drawer = useEditDrawer({
    mapItemToFormData: TaskMapper.toFormValues,
    emptyFormData: ADD_TASK_INITIAL_VALUES,
  });

  const openAddDrawer = useCallback(() => {
    loadStaff();
    loadCategories();
    loadLeads();
    drawer.openAddDrawer();
  }, [loadStaff, loadCategories, loadLeads, drawer.openAddDrawer]);

  const openEditDrawer = useCallback((item: TaskItem) => {
    loadStaff();
    loadCategories();
    loadLeads();
    drawer.openEditDrawer(item);
  }, [loadStaff, loadCategories, loadLeads, drawer.openEditDrawer]);

  return { ...drawer, openAddDrawer, openEditDrawer };
}
