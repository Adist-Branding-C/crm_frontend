import { useCallback } from 'react';
import { useDealType } from './useDealType';
import { useDealTypeDrawer } from './useDealTypeDrawer';
import { useDealTypeActions } from './useDealTypeActions';
import { useDealTypeDropdown } from './useDealTypeDropdown';
import { useDealTypeFilters } from './useDealTypeFilters';

export function useDealTypePage() {
  const feature = useDealType();
  const drawer = useDealTypeDrawer();
  const dropdown = useDealTypeDropdown();
  const filters = useDealTypeFilters(feature.dealTypeList, feature.fetchDealTypes);
  const actions = useDealTypeActions({ feature, drawer, refetch: filters.refetch });

  const handleEditClick = useCallback((item: Parameters<typeof drawer.openEditDrawer>[0]) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer, dropdown]);

  const handleDeleteClick = useCallback((item: Parameters<typeof actions.handleDeleteClick>[0]) => {
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
