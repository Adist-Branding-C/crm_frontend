import { useState, useCallback } from 'react';
export function useDealActions({ deal, drawer }) {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await deal.handleAddDeal(values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [deal.handleAddDeal, drawer.closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!drawer.editingItem || !drawer.editingItem.dealId)
            return;
        const success = await deal.handleUpdateDeal(drawer.editingItem.dealId, values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [drawer.editingItem, deal.handleUpdateDeal, drawer.closeDrawer]);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const handleConfirmDelete = useCallback(async () => {
        if (!deletingItem || !deletingItem.dealId)
            return;
        const success = await deal.handleDeleteDeal(deletingItem.dealId);
        if (success) {
            setDeletingItem(null);
        }
    }, [deletingItem, deal.handleDeleteDeal]);
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
//# sourceMappingURL=useDealActions.js.map