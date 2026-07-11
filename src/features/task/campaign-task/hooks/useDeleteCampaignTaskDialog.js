import { useState, useCallback } from 'react';
export function useDeleteCampaignTaskDialog() {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);
    return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
//# sourceMappingURL=useDeleteCampaignTaskDialog.js.map