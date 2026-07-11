import { useState, useCallback } from 'react';
import { dealTypeService } from '../services/dealType.service';
export function useDealTypeActions({ feature, drawer, refetch, }) {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleSave = useCallback(async () => {
        if (drawer.editingItem) {
            const response = await dealTypeService.updateDealType(drawer.editingItem.id, drawer.formData);
            if (response.status) {
                feature.setDealTypeList(prev => prev.map(item => item.id === drawer.editingItem.id ? { ...item, name: drawer.formData.name, status: drawer.formData.status } : item));
                drawer.closeDrawer();
            }
            else {
                feature.setError(response.message || 'Failed to update deal type');
            }
        }
        else {
            const response = await dealTypeService.createDealType(drawer.formData);
            if (response.status) {
                drawer.closeDrawer();
                refetch();
            }
            else {
                feature.setError(response.message || 'Failed to add deal type');
            }
        }
    }, [drawer.editingItem, drawer.formData, feature.setDealTypeList, drawer.closeDrawer, refetch, feature.setError]);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const handleConfirmDelete = useCallback(async () => {
        if (!deletingItem)
            return;
        const success = await dealTypeService.deleteDealType(deletingItem.id);
        if (success.status) {
            setDeletingItem(null);
            refetch();
        }
        else {
            feature.setError(success.message || 'Failed to delete deal type');
        }
    }, [deletingItem, refetch, feature.setError]);
    const closeDeleteModal = useCallback(() => {
        setDeletingItem(null);
    }, []);
    return { deletingItem, setDeletingItem, handleSave, handleDeleteClick, handleConfirmDelete, closeDeleteModal };
}
//# sourceMappingURL=useDealTypeActions.js.map