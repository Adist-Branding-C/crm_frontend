import { useState, useCallback } from 'react';
export function useWorkModeActions({ workMode, drawer }) {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await workMode.handleAddWorkMode(values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [workMode.handleAddWorkMode, drawer.closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!drawer.editingItem)
            return;
        const success = await workMode.handleUpdateWorkMode(drawer.editingItem.id, values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [drawer.editingItem, workMode.handleUpdateWorkMode, drawer.closeDrawer]);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const handleConfirmDelete = useCallback(async () => {
        if (!deletingItem)
            return;
        const success = await workMode.handleDeleteWorkMode(deletingItem.id);
        if (success) {
            setDeletingItem(null);
        }
    }, [deletingItem, workMode.handleDeleteWorkMode]);
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
//# sourceMappingURL=useWorkModeActions.js.map