import { useState, useCallback } from 'react';
export function useEmailTemplateActions({ emailTemplate, drawer }) {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await emailTemplate.handleAddEmailTemplate(values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [emailTemplate.handleAddEmailTemplate, drawer.closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!drawer.editingItem)
            return;
        const item = drawer.editingItem;
        const original = {
            templateName: item.templateName || item.title || '',
            subject: item.subject || '',
            content: item.content || item.htmlContent || item.htmlCode || '',
            status: item.status || '',
        };
        if (JSON.stringify(values) === JSON.stringify(original)) {
            helpers.setSubmitting(false);
            return;
        }
        const success = await emailTemplate.handleUpdateEmailTemplate(item.id, values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [drawer.editingItem, emailTemplate.handleUpdateEmailTemplate, drawer.closeDrawer]);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const handleConfirmDelete = useCallback(async () => {
        if (!deletingItem)
            return;
        const success = await emailTemplate.handleDeleteEmailTemplate(deletingItem.id);
        if (success) {
            setDeletingItem(null);
        }
    }, [deletingItem, emailTemplate.handleDeleteEmailTemplate]);
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
//# sourceMappingURL=useEmailTemplateActions.js.map