import { useState, useMemo, useCallback } from 'react';
import { ADD_CALL_REASON_INITIAL_VALUES } from '../constants/index';
export function useEditCallReasonDrawer() {
    const [showEditDrawer, setShowEditDrawer] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const openEditDrawer = useCallback((item) => {
        setEditingItem(item);
        setShowEditDrawer(true);
    }, []);
    const closeEditDrawer = useCallback(() => {
        setShowEditDrawer(false);
        setEditingItem(null);
    }, []);
    const editInitialValues = useMemo(() => editingItem
        ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
        : ADD_CALL_REASON_INITIAL_VALUES, [editingItem]);
    return {
        showEditDrawer,
        editingItem,
        openEditDrawer,
        closeEditDrawer,
        editInitialValues,
    };
}
//# sourceMappingURL=useEditCallReasonDrawer.js.map