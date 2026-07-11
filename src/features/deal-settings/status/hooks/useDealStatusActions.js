import { useState, useCallback } from 'react';
import { dealStatusService } from '../services/dealStatus.service';
export function useDealStatusActions({ feature, drawer, refetch, }) {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleSave = useCallback(async () => {
        if (drawer.editingItem) {
            const response = await dealStatusService.updateDealStatus(drawer.editingItem.id, drawer.formData);
            if (response.status) {
                feature.setDealStatusList(prev => prev.map(item => item.id === drawer.editingItem.id ? { ...item, name: drawer.formData.name, status: drawer.formData.status } : item));
                drawer.closeDrawer();
            }
            else {
                feature.setError(response.message || 'Failed to update deal status');
            }
        }
        else {
            const response = await dealStatusService.createDealStatus(drawer.formData);
            if (response.status) {
                drawer.closeDrawer();
                refetch();
            }
            else {
                feature.setError(response.message || 'Failed to add deal status');
            }
        }
    }, [drawer.editingItem, drawer.formData, feature.setDealStatusList, drawer.closeDrawer, refetch, feature.setError]);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const handleConfirmDelete = useCallback(async () => {
        if (!deletingItem)
            return;
        const success = await dealStatusService.deleteDealStatus(deletingItem.id);
        if (success.status) {
            setDeletingItem(null);
            refetch();
        }
        else {
            feature.setError(success.message || 'Failed to delete deal status');
        }
    }, [deletingItem, refetch, feature.setError]);
    const closeDeleteModal = useCallback(() => {
        setDeletingItem(null);
    }, []);
    return { deletingItem, setDeletingItem, handleSave, handleDeleteClick, handleConfirmDelete, closeDeleteModal };
}
//# sourceMappingURL=useDealStatusActions.js.map