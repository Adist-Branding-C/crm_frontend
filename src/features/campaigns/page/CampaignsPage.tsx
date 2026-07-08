import { useFetchCampaigns } from '../hooks/useFetchCampaigns';
import { useCampaignSubmitHandlers } from '../hooks/useCampaignSubmitHandlers';
import { useAddCampaignDrawer } from '../hooks/useAddCampaignDrawer';
import { useEditCampaignDrawer } from '../hooks/useEditCampaignDrawer';
import { useDeleteCampaignDialog } from '../hooks/useDeleteCampaignDialog';
import { useRowDropdown } from '../hooks/useRowDropdown';
import { useCampaignsSearch } from '../hooks/useCampaignsSearch';
import { useToast } from '../../task-settings/hooks/useToast';
import { addCampaignValidationSchema, editCampaignValidationSchema } from '../validations/index';
import { ADD_CAMPAIGN_INITIAL_VALUES } from '../constants/index';
import CampaignTable from '../components/CampaignTable';
import AddCampaignDrawer from '../components/AddCampaignDrawer';
import EditCampaignDrawer from '../components/EditCampaignDrawer';
import DeleteCampaignDialog from '../components/DeleteCampaignDialog';
import ToastNotification from '../../task-settings/components/ToastNotification';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import './CampaignsPage.css';

const CampaignsPage = () => {
  const fetch = useFetchCampaigns();
  const addDrawer = useAddCampaignDrawer();
  const editDrawer = useEditCampaignDrawer();
  const deleteDialog = useDeleteCampaignDialog();
  const dropdown = useRowDropdown();
  const toast = useToast();

  const handlers = useCampaignSubmitHandlers(
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

  const { searchValue, handleSearchInput } = useCampaignsSearch(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  return (
    <PageContainer>
      <PageHeader title="Campaigns" description="Manage campaign tasks and activities." />
      <CampaignTable
        data={fetch.campaignList}
        searchQuery={searchValue}
        onSearchChange={handleSearchInput}
        rowsPerPage={fetch.limit}
        onRowsPerPageChange={fetch.handleRowsPerPageChange}
        totalRecords={fetch.totalCount}
        currentPage={fetch.pageNumber}
        totalPages={totalPages}
        onPageChange={fetch.setPageNumber}
        dropdownOpen={dropdown.dropdownOpen}
        onToggleDropdown={dropdown.toggleDropdown}
        onView={handlers.handleView}
        onEdit={editDrawer.openEditDrawer}
        onAssign={handlers.handleAssignClick}
        onDelete={deleteDialog.handleDeleteClick}
        onAdd={addDrawer.openAddDrawer}
        onExport={handlers.handleExportCSV}
        addLabel="Campaign"
      />
      <AddCampaignDrawer
        isOpen={addDrawer.showAddDrawer}
        onClose={addDrawer.closeAddDrawer}
        validationSchema={addCampaignValidationSchema}
        initialValues={ADD_CAMPAIGN_INITIAL_VALUES}
        onSubmit={handlers.handleAddSubmit}
        isLoading={fetch.isLoading}
        error={fetch.error}
      />
      <EditCampaignDrawer
        isOpen={editDrawer.showEditDrawer}
        onClose={editDrawer.closeEditDrawer}
        validationSchema={editCampaignValidationSchema}
        initialValues={editDrawer.editInitialValues}
        onSubmit={handlers.handleEditSubmit}
        isLoading={fetch.isLoading}
        error={fetch.error}
        editingItem={editDrawer.editingItem}
      />
      <DeleteCampaignDialog
        isOpen={!!deleteDialog.deletingItem}
        itemName={deleteDialog.deletingItem?.name || ''}
        onConfirm={handlers.handleConfirmDelete}
        onClose={deleteDialog.closeDeleteDialog}
      />
      <ToastNotification
        message={toast.toastMessage}
        type={toast.toastType}
        visible={toast.showToast}
        onClose={() => toast.setShowToast(false)}
      />
    </PageContainer>
  );
};

export default CampaignsPage;
