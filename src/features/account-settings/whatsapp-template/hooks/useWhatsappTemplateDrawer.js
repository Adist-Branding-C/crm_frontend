import { useState, useMemo, useCallback } from 'react';
export function useWhatsappTemplateDrawer() {
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
            templateName: editingItem.templateName || editingItem.name || '',
            message: editingItem.message || editingItem.content || '',
            status: editingItem.status || '',
        }
        : { templateName: '', message: '', status: '' }, [editingItem]);
    return {
        showDrawer,
        editingItem,
        openAddDrawer,
        openEditDrawer,
        closeDrawer,
        drawerInitialValues,
    };
}
//# sourceMappingURL=useWhatsappTemplateDrawer.js.map