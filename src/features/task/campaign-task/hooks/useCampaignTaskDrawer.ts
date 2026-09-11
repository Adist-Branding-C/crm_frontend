import { useCallback, useMemo } from 'react';
import { useTaskDrawer } from '../../common/hooks/useTaskDrawer';
import { ADD_CAMPAIGN_TASK_INITIAL_VALUES } from '../constants/addCampaignTask.constants';
import { CampaignTaskMapper } from '../mapper/campaignTaskMapper';
import { campaignTaskDataService } from '../services/campaignTaskDataService';
import type { UseCampaignTaskDrawerLookups } from '../types/hook.types';
import type { CampaignTaskItem } from '../types';

/**
 * Add/edit drawer state for the Campaign Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - CampaignTaskPage.
 *
 * Notes:
 * - Edit re-fetches the task detail (GET /tasks/:id) so the drawer always opens
 *   with the saved workflowId/stageId intact - the list/mapper path previously
 *   carried blank workflow fields and the form fell back to the default workflow.
 *   If the detail fetch fails the passed row item is used, so editing is never
 *   blocked by a network failure.
 */
export function useCampaignTaskDrawer({ loadStaff, loadCampaigns }: UseCampaignTaskDrawerLookups) {
  const loaders = useMemo(() => [loadStaff, loadCampaigns], [loadStaff, loadCampaigns]);

  const drawer = useTaskDrawer({
    mapItemToFormData: CampaignTaskMapper.toFormValues,
    emptyFormData: ADD_CAMPAIGN_TASK_INITIAL_VALUES,
    loaders,
  });

  const openEditDrawer = useCallback(async (item: CampaignTaskItem) => {
    try {
      const detail = await campaignTaskDataService.getById(item.id);
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
