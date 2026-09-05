import { useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { useRole, useRoleDrawer, useRoleDropdown, useRoleActions } from './index';
import type { RoleItem } from '../types/role.types';

export function useRolePage() {
  const role = useRole();
  const drawer = useRoleDrawer();
  const dropdown = useRoleDropdown();
  const actions = useRoleActions({ role, drawer });

  const startIndex = (role.pageNumber - 1) * role.limit;
  const totalPages = useMemo(() => Math.ceil(role.totalCount / role.limit) || 1, [role.totalCount, role.limit]);

  const handleEditClick = useCallback((item: RoleItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: RoleItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  const { handleRowsPerPageChange: setRowsPerPage } = role;
  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  }, [setRowsPerPage]);

  return {
    role,
    searchQuery: role.searchQuery,
    handleSearchChange: role.handleSearchChange,
    rowsPerPage: role.limit,
    handleRowsPerPageChange,
    pageNumber: role.pageNumber,
    setPageNumber: role.setPageNumber,
    totalCount: role.totalCount,
    startIndex,
    totalPages,
    showDrawer: drawer.showDrawer,
    dropdownOpen: dropdown.dropdownOpen,
    onToggleDropdown: dropdown.toggleDropdown,
    editingItem: drawer.editingItem,
    deletingItem: actions.deletingItem,
    filteredData: role.roleList,
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
