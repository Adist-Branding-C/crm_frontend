import { useCallback, useMemo } from 'react';
import { useTaskDrawer } from '../../common/hooks/useTaskDrawer';
import { ADD_CALL_TASK_INITIAL_VALUES } from '../constants/addCallTask.constants';
import { CallTaskMapper } from '../mapper/callTaskMapper';
import { callTaskDataService } from '../services/callTaskDataService';
import type { UseCallTaskDrawerLookups } from '../types/hook.types';
import type { CallTaskItem } from '../types';

/**
 * Add/edit drawer state for the Call Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - CallTaskPage.
 *
 * Notes:
 * - Edit re-fetches the task detail (GET /tasks/:id) so the drawer always opens
 *   with the saved workflowId/stageId intact - the list/mapper path previously
 *   carried blank workflow fields and the form fell back to the default workflow.
 *   If the detail fetch fails the passed row item is used, so editing is never
 *   blocked by a network failure.
 */
export function useCallTaskDrawer({ loadStaff, loadLeads }: UseCallTaskDrawerLookups) {
  const loaders = useMemo(() => [loadStaff, loadLeads], [loadStaff, loadLeads]);

  const drawer = useTaskDrawer({
    mapItemToFormData: CallTaskMapper.toFormValues,
    emptyFormData: ADD_CALL_TASK_INITIAL_VALUES,
    loaders,
  });

  const openEditDrawer = useCallback(async (item: CallTaskItem) => {
    try {
      const detail = await callTaskDataService.getById(item.id);
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
