import { useCallback } from 'react';
import { useDealStatus } from './useDealStatus';
import { useDealStatusDrawer } from './useDealStatusDrawer';
import { useDealStatusActions } from './useDealStatusActions';
import { useDealStatusDropdown } from './useDealStatusDropdown';
import { useDealStatusFilters } from './useDealStatusFilters';
export function useDealStatusPage() {
    const feature = useDealStatus();
    const drawer = useDealStatusDrawer();
    const dropdown = useDealStatusDropdown();
    const filters = useDealStatusFilters(feature.dealStatusList, feature.fetchDealStatuses);
    const actions = useDealStatusActions({ feature, drawer, refetch: filters.refetch });
    const handleEditClick = useCallback((item) => {
        drawer.openEditDrawer(item);
        dropdown.closeDropdown();
    }, [drawer, dropdown]);
    const handleDeleteClick = useCallback((item) => {
        actions.handleDeleteClick(item);
        dropdown.closeDropdown();
    }, [actions, dropdown]);
    return {
        searchQuery: filters.searchQuery,
        handleSearchChange: filters.handleSearchChange,
        handleAddClick: drawer.openAddDrawer,
        limit: filters.limit,
        handleLimitChange: filters.handleLimitChange,
        page: filters.page,
        meta: filters.meta,
        handlePageChange: filters.handlePageChange,
        filteredData: filters.filteredData,
        startIndex: filters.startIndex,
        dropdownOpen: dropdown.dropdownOpen,
        setDropdownOpen: dropdown.setDropdownOpen,
        handleEditClick,
        handleDeleteClick,
        showForm: drawer.showDrawer,
        formData: drawer.formData,
        handleFormChange: drawer.handleFormChange,
        handleCloseForm: drawer.closeDrawer,
        editingItem: drawer.editingItem,
        deletingItem: actions.deletingItem,
        setDeletingItem: actions.setDeletingItem,
        handleConfirmDelete: actions.handleConfirmDelete,
        handleSave: actions.handleSave,
    };
}
//# sourceMappingURL=useDealStatusPage.js.map