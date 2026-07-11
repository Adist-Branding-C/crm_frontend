import { useState, useMemo, useCallback } from 'react';
export function useWorkModeDrawer() {
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
            workModeName: editingItem.workModeName || editingItem.name || '',
            description: editingItem.description || '',
            status: editingItem.status || '',
        }
        : { workModeName: '', description: '', status: '' }, [editingItem]);
    return {
        showDrawer,
        editingItem,
        openAddDrawer,
        openEditDrawer,
        closeDrawer,
        drawerInitialValues,
    };
}
//# sourceMappingURL=useWorkModeDrawer.js.map