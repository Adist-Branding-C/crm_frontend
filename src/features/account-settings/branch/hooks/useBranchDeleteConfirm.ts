import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { BranchItem } from '../types/branch.types';
import type { UseBranchDeleteConfirmParams } from '../types/use-branch-delete-confirm.types';

/**
 * Delete-confirmation modal state for the account-settings/branch tab.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useBranchDeleteConfirm({ handleDeleteBranch }: UseBranchDeleteConfirmParams) {
  const deleteBranch = useCallback((item: BranchItem) => handleDeleteBranch(item.id), [handleDeleteBranch]);

  return useDeleteConfirmation<BranchItem>(deleteBranch);
}
