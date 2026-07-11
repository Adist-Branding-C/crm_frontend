import { useState, useCallback } from 'react';
export function useDesignationActions({ designation, drawer }) {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await designation.handleAddDesignation(values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [designation.handleAddDesignation, drawer.closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!drawer.editingItem)
            return;
        const item = drawer.editingItem;
        const original = {
            designationName: item.designationName || item.name || '',
            description: item.description || '',
            status: item.status || '',
        };
        if (JSON.stringify(values) === JSON.stringify(original)) {
            helpers.setSubmitting(false);
            return;
        }
        const success = await designation.handleUpdateDesignation(item.id, values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [drawer.editingItem, designation.handleUpdateDesignation, drawer.closeDrawer]);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const handleConfirmDelete = useCallback(async () => {
        if (!deletingItem)
            return;
        const success = await designation.handleDeleteDesignation(deletingItem.id);
        if (success) {
            setDeletingItem(null);
        }
        else if (designation.dependencyError) {
            setDeletingItem(null);
        }
    }, [deletingItem, designation.handleDeleteDesignation, designation.dependencyError]);
    const closeDeleteModal = useCallback(() => {
        setDeletingItem(null);
    }, []);
    return {
        deletingItem,
        handleSubmit,
        handleEditSubmit,
        handleDeleteClick,
        handleConfirmDelete,
        closeDeleteModal,
    };
}
//# sourceMappingURL=useDesignationActions.js.map