import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
/**
 * Delete-confirmation modal state for the lead-additional page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadAdditionalDeleteConfirm({ handleDeleteAdditionalField }) {
    const deleteAdditionalField = useCallback((item) => handleDeleteAdditionalField(item.id), [handleDeleteAdditionalField]);
    return useDeleteConfirmation(deleteAdditionalField);
}
//# sourceMappingURL=useLeadAdditionalDeleteConfirm.js.map