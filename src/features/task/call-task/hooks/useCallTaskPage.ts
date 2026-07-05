import { useCallback } from 'react';
import { useFetchCallTasks } from './useFetchCallTasks';
import { useCallTaskSubmitHandlers } from './useCallTaskSubmitHandlers';
import { useAddCallTaskDrawer } from './useAddCallTaskDrawer';
import { useEditCallTaskDrawer } from './useEditCallTaskDrawer';
import { useDeleteCallTaskDialog } from './useDeleteCallTaskDialog';
import { useRowDropdown } from '../../shared/hooks/useRowDropdown';
import { useStaffOptions } from '../../shared/hooks/useStaffOptions';
import { useLeadOptions } from '../../shared/hooks/useLeadOptions';
import { useSearchInput } from '../../../../shared/hooks/useSearchInput';
import { useToast } from '../../hooks/useToast';

export function useCallTaskPage() {
  const fetch = useFetchCallTasks();
  const staff = useStaffOptions();
  const leads = useLeadOptions();
  const loadAddLookups = useCallback(() => {
    staff.loadStaff();
    leads.loadLeads();
  }, [staff.loadStaff, leads.loadLeads]);
  const addDrawer = useAddCallTaskDrawer(loadAddLookups);
  const editDrawer = useEditCallTaskDrawer(loadAddLookups);
  const deleteDialog = useDeleteCallTaskDialog();
  const dropdown = useRowDropdown();
  const toast = useToast();
  const handlers = useCallTaskSubmitHandlers(
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
