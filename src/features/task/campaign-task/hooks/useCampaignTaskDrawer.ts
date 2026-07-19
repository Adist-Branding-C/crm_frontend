import { useMemo } from 'react';
import { useTaskDrawer } from '../../common/hooks/useTaskDrawer';
import { ADD_CAMPAIGN_TASK_INITIAL_VALUES } from '../constants/addCampaignTask.constants';
import { CampaignTaskMapper } from '../mapper/campaignTaskMapper';
import type { UseCampaignTaskDrawerLookups } from '../types/hook.types';

/**
 * Add/edit drawer state for the Campaign Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - CampaignTaskPage.
 */
export function useCampaignTaskDrawer({ loadStaff, loadLeads }: UseCampaignTaskDrawerLookups) {
  const loaders = useMemo(() => [loadStaff, loadLeads], [loadStaff, loadLeads]);

  return useTaskDrawer({
    mapItemToFormData: CampaignTaskMapper.toFormValues,
    emptyFormData: ADD_CAMPAIGN_TASK_INITIAL_VALUES,
    loaders,
  });
}
