import { useState, useMemo, useCallback } from 'react';
export function useDealDrawer() {
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
            dealName: editingItem.dealName || '',
            lead: editingItem.lead || '',
            mobile: editingItem.mobile || '',
            amount: String(editingItem.amount || ''),
            status: editingItem.status || '',
            type: editingItem.type || '',
            stage: editingItem.stage || '',
            priority: editingItem.priority || '',
            assignedTo: editingItem.assignedTo || '',
            startDate: editingItem.startDate || '',
            endDate: editingItem.endDate || '',
            notes: '',
        }
        : {
            dealName: '',
            lead: '',
            mobile: '',
            amount: '',
            status: '',
            type: '',
            stage: '',
            priority: '',
            assignedTo: '',
            startDate: '',
            endDate: '',
            notes: '',
        }, [editingItem]);
    return {
        showDrawer,
        editingItem,
        openAddDrawer,
        openEditDrawer,
        closeDrawer,
        drawerInitialValues,
    };
}
//# sourceMappingURL=useDealDrawer.js.map