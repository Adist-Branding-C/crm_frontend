import { useState, useCallback } from 'react';
export function useCallStatusDrawer() {
    const [showAddDrawer, setShowAddDrawer] = useState(false);
    const [showEditDrawer, setShowEditDrawer] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const openAddDrawer = useCallback(() => setShowAddDrawer(true), []);
    const closeAddDrawer = useCallback(() => setShowAddDrawer(false), []);
    const openEditDrawer = useCallback((item) => {
        setEditingItem(item);
        setShowEditDrawer(true);
    }, []);
    const closeEditDrawer = useCallback(() => {
        setShowEditDrawer(false);
        setEditingItem(null);
    }, []);
    return {
        showAddDrawer,
        showEditDrawer,
        editingItem,
        openAddDrawer,
        closeAddDrawer,
        openEditDrawer,
        closeEditDrawer,
    };
}
//# sourceMappingURL=useCallStatusDrawer.js.map