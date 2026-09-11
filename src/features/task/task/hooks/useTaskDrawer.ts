import { useCallback, useMemo } from 'react';
import { useTaskDrawer as useTaskDrawerCore } from '../../common/hooks/useTaskDrawer';
import { ADD_TASK_INITIAL_VALUES } from '../constants/addTask.constants';
import { TaskMapper } from '../mapper/taskMapper';
import { taskDataService } from '../services/taskDataService';
import type { UseTaskDrawerLookups } from '../types/hook.types';
import type { TaskItem } from '../types';

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
 * - Edit re-fetches the task detail (GET /tasks/:id) so the drawer always opens
 *   with the saved workflowId/stageId intact - the list/mapper path previously
 *   carried blank workflow fields and the form fell back to the default workflow.
 *   If the detail fetch fails the passed row item is used, so editing is never
 *   blocked by a network failure.
 */
export function useTaskDrawer({ loadStaff, loadCategories, loadLeads }: UseTaskDrawerLookups) {
  const loaders = useMemo(() => [loadStaff, loadCategories, loadLeads], [loadStaff, loadCategories, loadLeads]);

  const drawer = useTaskDrawerCore({
    mapItemToFormData: TaskMapper.toFormValues,
    emptyFormData: ADD_TASK_INITIAL_VALUES,
    loaders,
  });

  const openEditDrawer = useCallback(async (item: TaskItem) => {
    try {
      const detail = await taskDataService.getById(item.id);
      if (detail.status && detail.data) {
        drawer.openEditDrawer(detail.data);
        return;
      }
    } catch {
      // Fall through to the row item below - a detail-fetch failure must not block editing.
    }
    drawer.openEditDrawer(item);
  }, [drawer.openEditDrawer]);

  return { ...drawer, openEditDrawer };
}