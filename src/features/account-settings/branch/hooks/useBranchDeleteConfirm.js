import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
/**
 * Delete-confirmation modal state for the account-settings/branch tab.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useBranchDeleteConfirm({ handleDeleteBranch }) {
    const deleteBranch = useCallback((item) => handleDeleteBranch(item.id), [handleDeleteBranch]);
    return useDeleteConfirmation(deleteBranch);
}
//# sourceMappingURL=useBranchDeleteConfirm.js.map