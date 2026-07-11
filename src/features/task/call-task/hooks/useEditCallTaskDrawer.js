import { useState, useMemo, useCallback } from 'react';
export function useEditCallTaskDrawer(onOpen) {
    const [showEditDrawer, setShowEditDrawer] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const openEditDrawer = useCallback((item) => {
        onOpen?.();
        setEditingItem(item);
        setShowEditDrawer(true);
    }, [onOpen]);
    const closeEditDrawer = useCallback(() => {
        setShowEditDrawer(false);
        setEditingItem(null);
    }, []);
    const editInitialValues = useMemo(() => editingItem
        ? {
            title: editingItem.title || '',
            description: editingItem.description || '',
            scheduledDate: editingItem.scheduledDate || '',
            scheduledTime: editingItem.scheduledTime || '',
            assignedTo: editingItem.assignedTo || '',
            leadId: editingItem.leadId || '',
            priority: editingItem.priority || '',
            status: editingItem.status || '',
        }
        : {
            title: '',
            description: '',
            scheduledDate: '',
            scheduledTime: '',
            assignedTo: '',
            leadId: '',
            priority: '',
            status: '',
        }, [editingItem]);
    return {
        showEditDrawer,
        editingItem,
        openEditDrawer,
        closeEditDrawer,
        editInitialValues,
    };
}
//# sourceMappingURL=useEditCallTaskDrawer.js.map