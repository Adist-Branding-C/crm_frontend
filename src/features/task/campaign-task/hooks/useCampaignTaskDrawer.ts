import { useCallback } from 'react';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { ADD_CAMPAIGN_TASK_INITIAL_VALUES } from '../constants/index';
import { CampaignTaskMapper } from '../mappers/campaignTask.mapper';
import type { CampaignTaskItem } from '../types/index';
import type { UseCampaignTaskDrawerLookups } from '../types/useCampaignTaskDrawer.types';

/**
 * Add/edit drawer state for the Campaign Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - CampaignTaskPage.
 *
 * Notes:
 * - Wraps the shared useEditDrawer's open actions so opening the drawer (add or
 *   edit) always triggers the staff/lead option loads it needs - the page just
 *   calls openAddDrawer/openEditDrawer directly, without composing them.
 */
export function useCampaignTaskDrawer({ loadStaff, loadLeads }: UseCampaignTaskDrawerLookups) {
  const drawer = useEditDrawer({
    mapItemToFormData: CampaignTaskMapper.toFormValues,
    emptyFormData: ADD_CAMPAIGN_TASK_INITIAL_VALUES,
  });

  const openAddDrawer = useCallback(() => {
    loadStaff();
    loadLeads();
    drawer.openAddDrawer();
  }, [loadStaff, loadLeads, drawer.openAddDrawer]);

  const openEditDrawer = useCallback((item: CampaignTaskItem) => {
    loadStaff();
    loadLeads();
    drawer.openEditDrawer(item);
  }, [loadStaff, loadLeads, drawer.openEditDrawer]);

  return { ...drawer, openAddDrawer, openEditDrawer };
}
