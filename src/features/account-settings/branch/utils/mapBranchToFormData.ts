import type { BranchItem, BranchFormData } from '../types/branch.types';

/**
 * Maps a fetched BranchItem to the Formik shape used by the Add/Edit Branch drawer.
 *
 * Used by:
 * - useBranchDrawer (derives the drawer's initial values in edit mode)
 * - useBranchFormSubmit (derives the "original" values for the edit dirty-check)
 *
 * Notes:
 * - Single source of truth for this mapping so both call sites can't drift apart.
 */
export function mapBranchToFormData(item: BranchItem): BranchFormData {
  return {
    name: item.name || item.branchName || '',
    description: item.description || '',
    status: item.status || '',
  };
}
