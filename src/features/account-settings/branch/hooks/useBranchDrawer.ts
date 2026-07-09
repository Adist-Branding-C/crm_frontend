import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { mapBranchToFormData } from '../utils/mapBranchToFormData';
import { ADD_BRANCH_INITIAL_VALUES } from '../constants/branch.constants';

/**
 * Add/edit drawer state for the account-settings/branch tab.
 *
 * Notes:
 * - Thin wrapper around the shared useEditDrawer, configured with the branch item->form mapper.
 */
export function useBranchDrawer() {
  return useEditDrawer({
    mapItemToFormData: mapBranchToFormData,
    emptyFormData: ADD_BRANCH_INITIAL_VALUES,
  });
}
