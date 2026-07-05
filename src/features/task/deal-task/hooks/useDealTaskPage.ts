import { useCallback } from 'react';
import { useFetchDealTasks } from './useFetchDealTasks';
import { useDealTaskSubmitHandlers } from './useDealTaskSubmitHandlers';
import { useAddDealTaskDrawer } from './useAddDealTaskDrawer';
import { useEditDealTaskDrawer } from './useEditDealTaskDrawer';
import { useDeleteDealTaskDialog } from './useDeleteDealTaskDialog';
import { useRowDropdown } from '../../shared/hooks/useRowDropdown';
import { useStaffOptions } from '../../shared/hooks/useStaffOptions';
import { useLeadOptions } from '../../shared/hooks/useLeadOptions';
import { useSearchInput } from '../../../../shared/hooks/useSearchInput';
import { useToast } from '../../hooks/useToast';

export function useDealTaskPage() {
  const fetch = useFetchDealTasks();
  const staff = useStaffOptions();
  const leads = useLeadOptions();
  const loadAddLookups = useCallback(() => {
    staff.loadStaff();
    leads.loadLeads();
  }, [staff.loadStaff, leads.loadLeads]);
  const addDrawer = useAddDealTaskDrawer(loadAddLookups);
  const editDrawer = useEditDealTaskDrawer(loadAddLookups);
  const deleteDialog = useDeleteDealTaskDialog();
  const dropdown = useRowDropdown();
  const toast = useToast();
  const handlers = useDealTaskSubmitHandlers(
    {
      onAddSuccess: addDrawer.closeAddDrawer,
      onEditSuccess: editDrawer.closeEditDrawer,
      onDeleteSuccess: deleteDialog.closeDeleteDialog,
      editingItem: editDrawer.editingItem,
      deletingItem: deleteDialog.deletingItem,
    },
    fetch,
    toast,
  );

  const { searchValue, handleSearchInput } = useSearchInput(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  return {
    fetch,
    addDrawer,
    editDrawer,
    deleteDialog,
    dropdown,
    toast,
    staff,
    leads,
    handlers,
    searchValue,
    handleSearchInput,
    totalPages,
  };
}
