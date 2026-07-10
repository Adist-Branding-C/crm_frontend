import { useCampaignTaskPage } from '../hooks/useCampaignTaskPage';
import { addCampaignTaskValidationSchema, editCampaignTaskValidationSchema } from '../validations/index';
import { ADD_CAMPAIGN_TASK_INITIAL_VALUES } from '../constants/index';
import CampaignTaskTable from '../components/CampaignTaskTable';
import AddCampaignTaskDrawer from '../components/AddCampaignTaskDrawer';
import EditCampaignTaskDrawer from '../components/EditCampaignTaskDrawer';
import DeleteCampaignTaskDialog from '../components/DeleteCampaignTaskDialog';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../task-settings/components/SettingsTabs/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import './CampaignTaskPage.css';

const CampaignTaskPage = () => {
  const {
    fetch, addDrawer, editDrawer, deleteDialog, dropdown, toast, staff, leads,
    handlers, searchValue, handleSearchInput, totalPages,
  } = useCampaignTaskPage();

  return (
    <div className="task-settings-page">
      <PageHeader title="Campaign Task" description="Manage your campaign tasks" />
      <SettingsTabs tabs={taskTabs} />
      <div className="account-content">
        <div className="campaign-task-table-wrapper">
          <CampaignTaskTable
            data={fetch.campaignTaskList}
            searchQuery={searchValue}
            onSearchChange={handleSearchInput}
            currentPage={fetch.pageNumber}
            totalPages={totalPages}
            totalRecords={fetch.totalCount}
            rowsPerPage={fetch.limit}
            onPageChange={fetch.setPageNumber}
            onRowsPerPageChange={fetch.handleRowsPerPageChange}
            dropdownOpen={dropdown.dropdownOpen}
            onToggleDropdown={dropdown.toggleDropdown}
            onEdit={editDrawer.openEditDrawer}
            onDelete={deleteDialog.handleDeleteClick}
            onAdd={addDrawer.openAddDrawer}
          />
        </div>
        <AddCampaignTaskDrawer
          isOpen={addDrawer.showAddDrawer}
          onClose={addDrawer.closeAddDrawer}
          validationSchema={addCampaignTaskValidationSchema}
          initialValues={ADD_CAMPAIGN_TASK_INITIAL_VALUES}
          onSubmit={handlers.handleAddSubmit}
          isLoading={fetch.isLoading}
          error={fetch.error}
          staffOptions={staff.staffOptions}
          staffLoading={staff.staffLoading}
          leadOptions={leads.leadOptions}
          leadLoading={leads.leadLoading}
        />
        <EditCampaignTaskDrawer
          isOpen={editDrawer.showEditDrawer}
          onClose={editDrawer.closeEditDrawer}
          validationSchema={editCampaignTaskValidationSchema}
          initialValues={editDrawer.editInitialValues}
          onSubmit={handlers.handleEditSubmit}
          isLoading={fetch.isLoading}
          error={fetch.error}
          editingItem={editDrawer.editingItem}
          staffOptions={staff.staffOptions}
          staffLoading={staff.staffLoading}
          leadOptions={leads.leadOptions}
          leadLoading={leads.leadLoading}
        />
        <DeleteCampaignTaskDialog
          isOpen={!!deleteDialog.deletingItem}
          itemName={deleteDialog.deletingItem?.title || ''}
          onConfirm={handlers.handleConfirmDelete}
          onClose={deleteDialog.closeDeleteDialog}
        />
      </div>
      <ToastNotification isVisible={toast.showToast} type={toast.toastType} message={toast.toastMessage} onDismiss={() => toast.setShowToast(false)} />
    </div>
  );
};

export default CampaignTaskPage;
