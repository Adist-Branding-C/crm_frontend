import { useCallback } from 'react';
import { mapAgentToFormData } from '../utils/mapAgentToFormData';
/**
 * Add/edit submit orchestration for the account-settings/agent ("Staff") drawer: dispatches to
 * add or update, skips the update call when the form is unchanged, and closes the drawer on success.
 */
export function useAgentFormSubmit({ editingItem, closeDrawer, handleAddAgent, handleUpdateAgent }) {
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await handleAddAgent(values, helpers);
        if (success) {
            closeDrawer();
        }
    }, [handleAddAgent, closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!editingItem || !editingItem.staff_id)
            return;
        const original = mapAgentToFormData(editingItem);
        if (JSON.stringify(values) === JSON.stringify(original)) {
            helpers.setSubmitting(false);
            return;
        }
        const success = await handleUpdateAgent(editingItem.staff_id, values, helpers);
        if (success) {
            closeDrawer();
        }
    }, [editingItem, handleUpdateAgent, closeDrawer]);
    return { handleSubmit, handleEditSubmit };
}
//# sourceMappingURL=useAgentFormSubmit.js.map