import { useCallback } from 'react';
import { useDealAdditionalField } from './useDealAdditionalField';
import { useDealAdditionalFieldDrawer } from './useDealAdditionalFieldDrawer';
import { useDealAdditionalFieldActions } from './useDealAdditionalFieldActions';
import { useDealAdditionalFieldDropdown } from './useDealAdditionalFieldDropdown';
import { useDealAdditionalFieldFilters } from './useDealAdditionalFieldFilters';
export function useDealAdditionalFieldPage() {
    const feature = useDealAdditionalField();
    const drawer = useDealAdditionalFieldDrawer();
    const dropdown = useDealAdditionalFieldDropdown();
    const filters = useDealAdditionalFieldFilters(feature.dealAdditionalFieldList, feature.fetchDealAdditionalFields);
    const actions = useDealAdditionalFieldActions({ feature, drawer, refetch: filters.refetch });
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
        dropdownDirection: dropdown.dropdownDirection,
        setDropdownDirection: dropdown.setDropdownDirection,
        handleEditClick,
        handleDeleteClick,
        formData: drawer.formData,
        editingItem: drawer.editingItem,
        handleInputChange: drawer.handleInputChange,
        handleSubmit: actions.handleSubmit,
        deletingItem: actions.deletingItem,
        setDeletingItem: actions.setDeletingItem,
        handleConfirmDelete: actions.handleConfirmDelete,
    };
}
//# sourceMappingURL=useDealAdditionalFieldPage.js.map