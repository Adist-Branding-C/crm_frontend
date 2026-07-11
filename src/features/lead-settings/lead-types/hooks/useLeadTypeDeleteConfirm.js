import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
/**
 * Delete-confirmation modal state for the lead-types page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadTypeDeleteConfirm({ handleDeleteLeadType }) {
    const deleteLeadType = useCallback((item) => handleDeleteLeadType(item.id), [handleDeleteLeadType]);
    return useDeleteConfirmation(deleteLeadType);
}
//# sourceMappingURL=useLeadTypeDeleteConfirm.js.map