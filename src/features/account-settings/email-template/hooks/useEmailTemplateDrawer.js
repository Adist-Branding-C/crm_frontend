import { useState, useMemo, useCallback } from 'react';
export function useEmailTemplateDrawer() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const openAddDrawer = useCallback(() => {
        setEditingItem(null);
        setShowDrawer(true);
    }, []);
    const openEditDrawer = useCallback((item) => {
        setEditingItem(item);
        setShowDrawer(true);
    }, []);
    const closeDrawer = useCallback(() => {
        setShowDrawer(false);
        setEditingItem(null);
    }, []);
    const drawerInitialValues = useMemo(() => editingItem
        ? {
            templateName: editingItem.templateName || editingItem.title || '',
            subject: editingItem.subject || '',
            content: editingItem.content || editingItem.htmlCode || editingItem.htmlContent || '',
            status: editingItem.status || '',
        }
        : { templateName: '', subject: '', content: '', status: '' }, [editingItem]);
    return {
        showDrawer,
        editingItem,
        openAddDrawer,
        openEditDrawer,
        closeDrawer,
        drawerInitialValues,
    };
}
//# sourceMappingURL=useEmailTemplateDrawer.js.map