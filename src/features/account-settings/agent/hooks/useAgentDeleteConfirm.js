import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
/**
 * Delete-confirmation modal state for the account-settings/agent ("Staff") tab.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by staff_id.
 */
export function useAgentDeleteConfirm({ handleDeleteAgent }) {
    const deleteAgent = useCallback((item) => {
        if (!item.staff_id)
            return Promise.resolve(false);
        return handleDeleteAgent(item.staff_id);
    }, [handleDeleteAgent]);
    return useDeleteConfirmation(deleteAgent);
}
//# sourceMappingURL=useAgentDeleteConfirm.js.map