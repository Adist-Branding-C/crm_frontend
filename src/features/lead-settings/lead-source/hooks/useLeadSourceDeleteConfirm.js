import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
/**
 * Delete-confirmation modal state for the lead-source page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadSourceDeleteConfirm({ handleDeleteLeadSource }) {
    const deleteLeadSource = useCallback((item) => handleDeleteLeadSource(item.id), [handleDeleteLeadSource]);
    return useDeleteConfirmation(deleteLeadSource);
}
//# sourceMappingURL=useLeadSourceDeleteConfirm.js.map