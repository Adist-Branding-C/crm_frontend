import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
/**
 * Delete-confirmation modal state for the lead-status page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadStatusDeleteConfirm({ handleDeleteLeadStatus }) {
    const deleteLeadStatus = useCallback((item) => handleDeleteLeadStatus(item.id), [handleDeleteLeadStatus]);
    return useDeleteConfirmation(deleteLeadStatus);
}
//# sourceMappingURL=useLeadStatusDeleteConfirm.js.map