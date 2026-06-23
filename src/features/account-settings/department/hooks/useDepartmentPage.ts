import { useCallback } from 'react';
import { useDepartment, useDepartmentDrawer, useDepartmentDropdown, useDepartmentFilters, useDepartmentActions } from './index';
import type { DepartmentItem } from '../types/department.types';

export function useDepartmentPage() {
  const department = useDepartment();
  const drawer = useDepartmentDrawer();
  const dropdown = useDepartmentDropdown();
  const filters = useDepartmentFilters(department.departmentList);
  const actions = useDepartmentActions({ department, drawer });

  const handleEditClick = useCallback((item: DepartmentItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: DepartmentItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    department,
    searchQuery: department.searchQuery,
    handleSearchChange: department.handleSearchChange,
    rowsPerPage: department.limit,
    handleRowsPerPageChange: department.handleRowsPerPageChange,
    pageNumber: department.pageNumber,
    setPageNumber: department.setPageNumber,
    totalCount: department.totalCount,
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
