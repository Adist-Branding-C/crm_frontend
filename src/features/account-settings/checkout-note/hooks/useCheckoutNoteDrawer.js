import { useState, useMemo, useCallback } from 'react';
export function useCheckoutNoteDrawer() {
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
            title: editingItem.title || '',
            note: editingItem.note || '',
            status: editingItem.status || '',
        }
        : { title: '', note: '', status: '' }, [editingItem]);
    return {
        showDrawer,
        editingItem,
        openAddDrawer,
        openEditDrawer,
        closeDrawer,
        drawerInitialValues,
    };
}
//# sourceMappingURL=useCheckoutNoteDrawer.js.map