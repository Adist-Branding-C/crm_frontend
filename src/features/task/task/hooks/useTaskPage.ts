import { useCallback } from 'react';
import { useFetchTasks } from './useFetchTasks';
import { useTaskSubmitHandlers } from './useTaskSubmitHandlers';
import { useAddTaskDrawer } from './useAddTaskDrawer';
import { useEditTaskDrawer } from './useEditTaskDrawer';
import { useDeleteTaskDialog } from './useDeleteTaskDialog';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useStaffOptions } from '../../shared/hooks/useStaffOptions';
import { useCategoryOptions } from '../../shared/hooks/useCategoryOptions';
import { useLeadOptions } from '../../shared/hooks/useLeadOptions';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useToast } from '../../../../shared/hooks/useToast';

export function useTaskPage() {
  const fetch = useFetchTasks();
  const staff = useStaffOptions();
  const categories = useCategoryOptions();
  const leads = useLeadOptions();
  const loadAddLookups = useCallback(() => {
    staff.loadStaff();
    categories.loadCategories();
    leads.loadLeads();
  }, [staff.loadStaff, categories.loadCategories, leads.loadLeads]);
  const addDrawer = useAddTaskDrawer(loadAddLookups);
  const editDrawer = useEditTaskDrawer(loadAddLookups);
  const deleteDialog = useDeleteTaskDialog();
  const dropdown = useDropdownMenu<number>();
  const toast = useToast();
  const handlers = useTaskSubmitHandlers(
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

  const { searchValue, handleSearchInput } = useDebouncedSearch(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  return {
    fetch,
    addDrawer,
    editDrawer,
    deleteDialog,
    dropdown,
    toast,
    staff,
    categories,
    leads,
    handlers,
    searchValue,
    handleSearchInput,
    totalPages,
  };
}
