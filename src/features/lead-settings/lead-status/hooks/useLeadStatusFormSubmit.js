import { useCallback } from 'react';
import { mapItemToFormData } from '../mappers/leadStatus.mapper';
/**
 * Add/edit submit orchestration for the lead-status drawer: dispatches to create or update,
 * skips the update call when the form is unchanged, and closes the drawer on success.
 */
export function useLeadStatusFormSubmit({ editingItem, closeDrawer, handleCreateLeadStatus, handleUpdateLeadStatus }) {
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await handleCreateLeadStatus(values, helpers);
        if (success)
            closeDrawer();
    }, [handleCreateLeadStatus, closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!editingItem)
            return;
        const original = mapItemToFormData(editingItem);
        if (JSON.stringify(values) === JSON.stringify(original)) {
            helpers.setSubmitting(false);
            return;
        }
        const success = await handleUpdateLeadStatus(editingItem.id, values, helpers);
        if (success)
            closeDrawer();
    }, [editingItem, handleUpdateLeadStatus, closeDrawer]);
    return { handleSubmit, handleEditSubmit };
}
//# sourceMappingURL=useLeadStatusFormSubmit.js.map