import { useState, useCallback } from 'react';
export function useDeleteCallTaskDialog() {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);
    return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
//# sourceMappingURL=useDeleteCallTaskDialog.js.map