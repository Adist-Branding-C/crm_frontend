import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
export function useLeadDeleteConfirm(deleteLead) {
    const handleDelete = useCallback((lead) => deleteLead(lead.leadId), [deleteLead]);
    return useDeleteConfirmation(handleDelete);
}
//# sourceMappingURL=useLeadDeleteConfirm.js.map