import { useState, useMemo, useCallback } from 'react';
import { ADD_MEETING_OUTCOME_INITIAL_VALUES } from '../constants/index';
export function useMeetingOutcomeForm() {
    const [showAddDrawer, setShowAddDrawer] = useState(false);
    const [showEditDrawer, setShowEditDrawer] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const openAddDrawer = useCallback(() => {
        setShowAddDrawer(true);
    }, []);
    const closeAddDrawer = useCallback(() => {
        setShowAddDrawer(false);
    }, []);
    const openEditDrawer = useCallback((item) => {
        setEditingItem(item);
        setShowEditDrawer(true);
        setDropdownOpen(null);
    }, []);
    const closeEditDrawer = useCallback(() => {
        setShowEditDrawer(false);
        setEditingItem(null);
    }, []);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
        setDropdownOpen(null);
    }, []);
    const closeDeleteDialog = useCallback(() => {
        setDeletingItem(null);
    }, []);
    const toggleDropdown = useCallback((id) => {
        setDropdownOpen(id);
    }, []);
    const editInitialValues = useMemo(() => editingItem
        ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
        : ADD_MEETING_OUTCOME_INITIAL_VALUES, [editingItem]);
    return {
        showAddDrawer,
        showEditDrawer,
        editingItem,
        dropdownOpen,
        toggleDropdown,
        deletingItem,
        openAddDrawer,
        closeAddDrawer,
        openEditDrawer,
        closeEditDrawer,
        handleDeleteClick,
        closeDeleteDialog,
        editInitialValues,
    };
}
//# sourceMappingURL=useMeetingOutcomeForm.js.map