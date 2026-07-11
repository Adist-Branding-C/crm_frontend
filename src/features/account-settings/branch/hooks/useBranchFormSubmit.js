import { useCallback } from 'react';
import { mapBranchToFormData } from '../utils/mapBranchToFormData';
/**
 * Add/edit submit orchestration for the account-settings/branch drawer: dispatches to
 * add or update, skips the update call when the form is unchanged, and closes the drawer on success.
 */
export function useBranchFormSubmit({ editingItem, closeDrawer, handleAddBranch, handleUpdateBranch }) {
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await handleAddBranch(values, helpers);
        if (success) {
            closeDrawer();
        }
    }, [handleAddBranch, closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!editingItem)
            return;
        const original = mapBranchToFormData(editingItem);
        if (JSON.stringify(values) === JSON.stringify(original)) {
            helpers.setSubmitting(false);
            return;
        }
        const success = await handleUpdateBranch(editingItem.id, values, helpers);
        if (success) {
            closeDrawer();
        }
    }, [editingItem, handleUpdateBranch, closeDrawer]);
    return { handleSubmit, handleEditSubmit };
}
//# sourceMappingURL=useBranchFormSubmit.js.map