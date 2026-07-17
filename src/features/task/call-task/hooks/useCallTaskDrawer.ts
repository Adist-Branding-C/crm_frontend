import { useCallback } from 'react';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { ADD_CALL_TASK_INITIAL_VALUES } from '../constants/index';
import { CallTaskMapper } from '../mappers/callTask.mapper';
import type { CallTaskItem } from '../types/index';
import type { UseCallTaskDrawerLookups } from '../types/useCallTaskDrawer.types';

/**
 * Add/edit drawer state for the Call Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - CallTaskPage.
 *
 * Notes:
 * - Wraps the shared useEditDrawer's open actions so opening the drawer (add or
 *   edit) always triggers the staff/lead option loads it needs - the page just
 *   calls openAddDrawer/openEditDrawer directly, without composing them.
 */
export function useCallTaskDrawer({ loadStaff, loadLeads }: UseCallTaskDrawerLookups) {
  const drawer = useEditDrawer({
    mapItemToFormData: CallTaskMapper.toFormValues,
    emptyFormData: ADD_CALL_TASK_INITIAL_VALUES,
  });

  const openAddDrawer = useCallback(() => {
    loadStaff();
    loadLeads();
    drawer.openAddDrawer();
  }, [loadStaff, loadLeads, drawer.openAddDrawer]);

  const openEditDrawer = useCallback((item: CallTaskItem) => {
    loadStaff();
    loadLeads();
    drawer.openEditDrawer(item);
  }, [loadStaff, loadLeads, drawer.openEditDrawer]);

  return { ...drawer, openAddDrawer, openEditDrawer };
}
