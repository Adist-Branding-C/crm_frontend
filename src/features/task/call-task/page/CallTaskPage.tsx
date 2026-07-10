import { useCallTaskPage } from '../hooks/useCallTaskPage';
import { addCallTaskValidationSchema, editCallTaskValidationSchema } from '../validations/index';
import { ADD_CALL_TASK_INITIAL_VALUES } from '../constants/index';
import CallTaskTable from '../components/CallTaskTable';
import AddCallTaskDrawer from '../components/AddCallTaskDrawer';
import EditCallTaskDrawer from '../components/EditCallTaskDrawer';
import DeleteCallTaskDialog from '../components/DeleteCallTaskDialog';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../task-settings/components/SettingsTabs/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import './CallTaskPage.css';

const CallTaskPage = () => {
  const {
    fetch, addDrawer, editDrawer, deleteDialog, dropdown, toast, staff, leads,
    handlers, searchValue, handleSearchInput, totalPages,
  } = useCallTaskPage();

  return (
    <div className="task-settings-page">
      <PageHeader title="Call Task" description="Manage your call tasks" />
      <SettingsTabs tabs={taskTabs} />
      <div className="account-content">
        <div className="call-task-table-wrapper">
          <CallTaskTable
            data={fetch.callTaskList}
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
        <AddCallTaskDrawer
          isOpen={addDrawer.showAddDrawer}
          onClose={addDrawer.closeAddDrawer}
          validationSchema={addCallTaskValidationSchema}
          initialValues={ADD_CALL_TASK_INITIAL_VALUES}
          onSubmit={handlers.handleAddSubmit}
          isLoading={fetch.isLoading}
          error={fetch.error}
          staffOptions={staff.staffOptions}
          staffLoading={staff.staffLoading}
          leadOptions={leads.leadOptions}
          leadLoading={leads.leadLoading}
        />
        <EditCallTaskDrawer
          isOpen={editDrawer.showEditDrawer}
          onClose={editDrawer.closeEditDrawer}
          validationSchema={editCallTaskValidationSchema}
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
        <DeleteCallTaskDialog
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

export default CallTaskPage;
