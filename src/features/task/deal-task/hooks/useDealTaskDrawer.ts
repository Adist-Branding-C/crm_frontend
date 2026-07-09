import { useCallback } from 'react';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { ADD_DEAL_TASK_INITIAL_VALUES } from '../constants/index';
import { DealTaskMapper } from '../mappers/dealTask.mapper';
import type { DealTaskItem } from '../types/index';
import type { UseDealTaskDrawerLookups } from '../types/useDealTaskDrawer.types';

/**
 * Add/edit drawer state for the Deal Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - DealTaskPage.
 *
 * Notes:
 * - Wraps the shared useEditDrawer's open actions so opening the drawer (add or
 *   edit) always triggers the staff/lead option loads it needs - the page just
 *   calls openAddDrawer/openEditDrawer directly, without composing them.
 */
export function useDealTaskDrawer({ loadStaff, loadLeads }: UseDealTaskDrawerLookups) {
  const drawer = useEditDrawer({
    mapItemToFormData: DealTaskMapper.toFormValues,
    emptyFormData: ADD_DEAL_TASK_INITIAL_VALUES,
  });

  const openAddDrawer = useCallback(() => {
    loadStaff();
    loadLeads();
    drawer.openAddDrawer();
  }, [loadStaff, loadLeads, drawer.openAddDrawer]);

  const openEditDrawer = useCallback((item: DealTaskItem) => {
    loadStaff();
    loadLeads();
    drawer.openEditDrawer(item);
  }, [loadStaff, loadLeads, drawer.openEditDrawer]);

  return { ...drawer, openAddDrawer, openEditDrawer };
}
