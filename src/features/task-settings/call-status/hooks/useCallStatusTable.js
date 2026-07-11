import { useState, useCallback } from 'react';
export function useCallStatusTable() {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const toggleDropdown = useCallback((id) => setDropdownOpen(id), []);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
        setDropdownOpen(null);
    }, []);
    const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);
    return {
        dropdownOpen,
        toggleDropdown,
        deletingItem,
        handleDeleteClick,
        closeDeleteDialog,
    };
}
//# sourceMappingURL=useCallStatusTable.js.map