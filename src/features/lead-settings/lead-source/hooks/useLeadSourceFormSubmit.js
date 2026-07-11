import { useCallback } from 'react';
import { mapItemToFormData } from '../mappers/leadSource.mapper';
/**
 * Add/edit submit orchestration for the lead-source drawer: dispatches to create or update,
 * skips the update call when the form is unchanged, and closes the drawer on success.
 */
export function useLeadSourceFormSubmit({ editingItem, closeDrawer, handleCreateLeadSource, handleUpdateLeadSource }) {
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await handleCreateLeadSource(values, helpers);
        if (success)
            closeDrawer();
    }, [handleCreateLeadSource, closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!editingItem)
            return;
        const original = mapItemToFormData(editingItem);
        if (JSON.stringify(values) === JSON.stringify(original)) {
            helpers.setSubmitting(false);
            return;
        }
        const success = await handleUpdateLeadSource(editingItem.id, values, helpers);
        if (success)
            closeDrawer();
    }, [editingItem, handleUpdateLeadSource, closeDrawer]);
    return { handleSubmit, handleEditSubmit };
}
//# sourceMappingURL=useLeadSourceFormSubmit.js.map