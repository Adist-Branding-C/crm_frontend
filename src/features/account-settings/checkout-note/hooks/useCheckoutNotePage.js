import { useCallback, useMemo } from 'react';
import { useCheckoutNote, useCheckoutNoteDrawer, useCheckoutNoteDropdown, useCheckoutNoteFilters, useCheckoutNoteActions } from './index';
export function useCheckoutNotePage() {
    const checkoutNote = useCheckoutNote();
    const drawer = useCheckoutNoteDrawer();
    const dropdown = useCheckoutNoteDropdown();
    const filters = useCheckoutNoteFilters(checkoutNote.checkoutNoteList);
    const actions = useCheckoutNoteActions({ checkoutNote, drawer });
    const startIndex = (checkoutNote.pageNumber - 1) * checkoutNote.limit;
    const totalPages = useMemo(() => Math.ceil(checkoutNote.totalCount / checkoutNote.limit) || 1, [checkoutNote.totalCount, checkoutNote.limit]);
    const handleEditClick = useCallback((item) => {
        drawer.openEditDrawer(item);
        dropdown.closeDropdown();
    }, [drawer.openEditDrawer, dropdown.closeDropdown]);
    const handleDeleteClick = useCallback((item) => {
        actions.handleDeleteClick(item);
        dropdown.closeDropdown();
    }, [actions.handleDeleteClick, dropdown.closeDropdown]);
    const { handleRowsPerPageChange: setRowsPerPage } = checkoutNote;
    const handleRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
    }, [setRowsPerPage]);
    return {
        checkoutNote,
        searchQuery: checkoutNote.searchQuery,
        handleSearchChange: checkoutNote.handleSearchChange,
        rowsPerPage: checkoutNote.limit,
        handleRowsPerPageChange,
        pageNumber: checkoutNote.pageNumber,
        setPageNumber: checkoutNote.setPageNumber,
        totalCount: checkoutNote.totalCount,
        startIndex,
        totalPages,
        showDrawer: drawer.showDrawer,
        dropdownOpen: dropdown.dropdownOpen,
        onToggleDropdown: dropdown.toggleDropdown,
        editingItem: drawer.editingItem,
        deletingItem: actions.deletingItem,
        filteredData: filters.filteredData,
        drawerInitialValues: drawer.drawerInitialValues,
        handleAddClick: drawer.openAddDrawer,
        handleCloseDrawer: drawer.closeDrawer,
        handleEditClick,
        handleDeleteClick,
        handleConfirmDelete: actions.handleConfirmDelete,
        handleCloseDeleteModal: actions.closeDeleteModal,
        handleSubmit: actions.handleSubmit,
        handleEditSubmit: actions.handleEditSubmit,
    };
}
//# sourceMappingURL=useCheckoutNotePage.js.map