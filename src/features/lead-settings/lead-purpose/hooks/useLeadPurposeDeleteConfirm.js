import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
/**
 * Delete-confirmation modal state for the lead-purpose page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadPurposeDeleteConfirm({ handleDeleteLeadPurpose }) {
    const deleteLeadPurpose = useCallback((item) => handleDeleteLeadPurpose(item.id), [handleDeleteLeadPurpose]);
    return useDeleteConfirmation(deleteLeadPurpose);
}
//# sourceMappingURL=useLeadPurposeDeleteConfirm.js.map