import { useCallback, useMemo } from 'react';
import { useTaskDrawer } from '../../common/hooks/useTaskDrawer';
import { ADD_DEAL_TASK_INITIAL_VALUES } from '../constants/addDealTask.constants';
import { DealTaskMapper } from '../mapper/dealTaskMapper';
import { dealTaskDataService } from '../services/dealTaskDataService';
import type { UseDealTaskDrawerLookups } from '../types/hook.types';
import type { DealTaskItem } from '../types';

/**
 * Add/edit drawer state for the Deal Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - DealTaskPage.
 *
 * Notes:
 * - Edit re-fetches the task detail (GET /tasks/:id) so the drawer always opens
 *   with the saved workflowId/stageId intact - the list/mapper path previously
 *   carried blank workflow fields and the form fell back to the default workflow.
 *   If the detail fetch fails the passed row item is used, so editing is never
 *   blocked by a network failure.
 */
export function useDealTaskDrawer({ loadStaff, loadDeals }: UseDealTaskDrawerLookups) {
  const loaders = useMemo(() => [loadStaff, loadDeals], [loadStaff, loadDeals]);

  const drawer = useTaskDrawer({
    mapItemToFormData: DealTaskMapper.toFormValues,
    emptyFormData: ADD_DEAL_TASK_INITIAL_VALUES,
    loaders,
  });

  const openEditDrawer = useCallback(async (item: DealTaskItem) => {
    try {
      const detail = await dealTaskDataService.getById(item.id);
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
