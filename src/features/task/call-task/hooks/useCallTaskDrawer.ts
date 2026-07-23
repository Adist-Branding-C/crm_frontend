import { useMemo } from 'react';
import { useTaskDrawer } from '../../common/hooks/useTaskDrawer';
import { ADD_CALL_TASK_INITIAL_VALUES } from '../constants/addCallTask.constants';
import { CallTaskMapper } from '../mapper/callTaskMapper';
import type { UseCallTaskDrawerLookups } from '../types/hook.types';

/**
 * Add/edit drawer state for the Call Task feature, composed with the lookup
 * loaders the form's dropdowns need.
 *
 * Used by:
 * - CallTaskPage.
 */
export function useCallTaskDrawer({ loadStaff, loadLeads }: UseCallTaskDrawerLookups) {
  const loaders = useMemo(() => [loadStaff, loadLeads], [loadStaff, loadLeads]);

  return useTaskDrawer({
    mapItemToFormData: CallTaskMapper.toFormValues,
    emptyFormData: ADD_CALL_TASK_INITIAL_VALUES,
    loaders,
  });
}
