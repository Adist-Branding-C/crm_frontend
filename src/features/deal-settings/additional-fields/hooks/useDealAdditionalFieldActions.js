import { useState, useCallback } from 'react';
import { dealAdditionalFieldService } from '../services/dealAdditionalField.service';
export function useDealAdditionalFieldActions({ feature, drawer, refetch, }) {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (drawer.editingItem) {
            try {
                await dealAdditionalFieldService.updateDealAdditionalField(drawer.editingItem.id, {
                    fieldName: drawer.formData.fieldName,
                    fieldType: drawer.formData.fieldType,
                    isRequired: drawer.formData.required,
                    showInList: drawer.formData.inList,
                    showInFilter: drawer.formData.inFilter,
                });
            }
            catch {
                // API call failed
            }
            feature.setDealAdditionalFieldList(prev => prev.map(item => item.id === drawer.editingItem.id ? {
                ...item,
                field: drawer.formData.fieldName,
                type: drawer.formData.fieldType,
                inFilter: drawer.formData.inFilter,
                inList: drawer.formData.inList,
                required: drawer.formData.required,
            } : item));
        }
        else {
            try {
                await dealAdditionalFieldService.createDealAdditionalField({
                    fieldName: drawer.formData.fieldName,
                    fieldType: drawer.formData.fieldType,
                    inFilter: drawer.formData.inFilter,
                    inList: drawer.formData.inList,
                    required: drawer.formData.required,
                });
            }
            catch {
                // API call failed
            }
            refetch();
        }
        drawer.closeDrawer();
    }, [drawer.editingItem, drawer.formData, feature.setDealAdditionalFieldList, refetch, drawer.closeDrawer]);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const handleConfirmDelete = useCallback(async () => {
        if (!deletingItem)
            return;
        try {
            await dealAdditionalFieldService.deleteDealAdditionalField(deletingItem.id);
        }
        catch {
            // API call failed
        }
        feature.setDealAdditionalFieldList(prev => prev.filter(item => item.id !== deletingItem.id));
        setDeletingItem(null);
    }, [deletingItem, feature.setDealAdditionalFieldList]);
    return { deletingItem, setDeletingItem, handleSubmit, handleDeleteClick, handleConfirmDelete };
}
//# sourceMappingURL=useDealAdditionalFieldActions.js.map