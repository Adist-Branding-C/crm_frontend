import { useState, useCallback } from 'react';
export function useWhatsappTemplateActions({ whatsappTemplate, drawer }) {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await whatsappTemplate.handleAddWhatsappTemplate(values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [whatsappTemplate.handleAddWhatsappTemplate, drawer.closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!drawer.editingItem)
            return;
        const item = drawer.editingItem;
        const original = {
            templateName: item.templateName || item.name || '',
            message: item.message || item.content || '',
            status: item.status || '',
        };
        if (JSON.stringify(values) === JSON.stringify(original)) {
            helpers.setSubmitting(false);
            return;
        }
        const success = await whatsappTemplate.handleUpdateWhatsappTemplate(item.id, values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [drawer.editingItem, whatsappTemplate.handleUpdateWhatsappTemplate, drawer.closeDrawer]);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const handleConfirmDelete = useCallback(async () => {
        if (!deletingItem)
            return;
        const success = await whatsappTemplate.handleDeleteWhatsappTemplate(deletingItem.id);
        if (success) {
            setDeletingItem(null);
        }
    }, [deletingItem, whatsappTemplate.handleDeleteWhatsappTemplate]);
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
//# sourceMappingURL=useWhatsappTemplateActions.js.map