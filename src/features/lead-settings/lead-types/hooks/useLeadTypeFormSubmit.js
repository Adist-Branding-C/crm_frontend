import { useCallback } from 'react';
import { mapItemToFormData } from '../mappers/leadType.mapper';
/**
 * Add/edit submit orchestration for the lead-types drawer: dispatches to create or update,
 * skips the update call when the form is unchanged, and closes the drawer on success.
 */
export function useLeadTypeFormSubmit({ editingItem, closeDrawer, handleCreateLeadType, handleUpdateLeadType }) {
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await handleCreateLeadType(values, helpers);
        if (success)
            closeDrawer();
    }, [handleCreateLeadType, closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!editingItem)
            return;
        const original = mapItemToFormData(editingItem);
        if (JSON.stringify(values) === JSON.stringify(original)) {
            helpers.setSubmitting(false);
            return;
        }
        const success = await handleUpdateLeadType(editingItem.id, values, helpers);
        if (success)
            closeDrawer();
    }, [editingItem, handleUpdateLeadType, closeDrawer]);
    return { handleSubmit, handleEditSubmit };
}
//# sourceMappingURL=useLeadTypeFormSubmit.js.map