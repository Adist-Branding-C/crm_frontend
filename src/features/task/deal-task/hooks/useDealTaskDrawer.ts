import { useMemo } from 'react';
import { useTaskDrawer } from '../../common/hooks/useTaskDrawer';
import { ADD_DEAL_TASK_INITIAL_VALUES } from '../constants/addDealTask.constants';
import { DealTaskMapper } from '../mapper/dealTaskMapper';
import type { UseDealTaskDrawerLookups } from '../types/hook.types';

/**
 * Add/edit drawer state for the Deal Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - DealTaskPage.
 */
export function useDealTaskDrawer({ loadStaff, loadLeads }: UseDealTaskDrawerLookups) {
  const loaders = useMemo(() => [loadStaff, loadLeads], [loadStaff, loadLeads]);

  return useTaskDrawer({
    mapItemToFormData: DealTaskMapper.toFormValues,
    emptyFormData: ADD_DEAL_TASK_INITIAL_VALUES,
    loaders,
  });
}
