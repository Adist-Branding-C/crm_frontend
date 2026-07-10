import { useCallback } from 'react';
import { useFetchCampaignTasks } from './useFetchCampaignTasks';
import { useCampaignTaskSubmitHandlers } from './useCampaignTaskSubmitHandlers';
import { useAddCampaignTaskDrawer } from './useAddCampaignTaskDrawer';
import { useEditCampaignTaskDrawer } from './useEditCampaignTaskDrawer';
import { useDeleteCampaignTaskDialog } from './useDeleteCampaignTaskDialog';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useStaffOptions } from '../../shared/hooks/useStaffOptions';
import { useLeadOptions } from '../../shared/hooks/useLeadOptions';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useToast } from '../../../../shared/hooks/useToast';

export function useCampaignTaskPage() {
  const fetch = useFetchCampaignTasks();
  const staff = useStaffOptions();
  const leads = useLeadOptions();
  const loadAddLookups = useCallback(() => {
    staff.loadStaff();
    leads.loadLeads();
  }, [staff.loadStaff, leads.loadLeads]);
  const addDrawer = useAddCampaignTaskDrawer(loadAddLookups);
  const editDrawer = useEditCampaignTaskDrawer(loadAddLookups);
  const deleteDialog = useDeleteCampaignTaskDialog();
  const dropdown = useDropdownMenu<number>();
  const toast = useToast();
  const handlers = useCampaignTaskSubmitHandlers(
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
    leads,
    handlers,
    searchValue,
    handleSearchInput,
    totalPages,
  };
}
