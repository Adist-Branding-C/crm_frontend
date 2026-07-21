import { Plus } from 'lucide-react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { ListResponseMapper } from '../../../../shared/mappers/list-response.mapper';
import { useToast } from '../../../../shared/hooks/useToast';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useCampaignTaskCrud } from '../hooks/useCampaignTaskCrud';
import { useCampaignTaskDrawer } from '../hooks/useCampaignTaskDrawer';
import { useCampaignTaskDeleteConfirm } from '../hooks/useCampaignTaskDeleteConfirm';
import { useCampaignTaskFormSubmit } from '../hooks/useCampaignTaskFormSubmit';
import { useStaffOptions } from '../../shared/hooks/useStaffOptions';
import { useLeadOptions } from '../../shared/hooks/useLeadOptions';
import { campaignTaskApiService } from '../services/index';
import { addCampaignTaskValidationSchema, editCampaignTaskValidationSchema } from '../validations/index';
import { LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, Pagination } from '../../../../shared/components/table';
import Drawer from '../../../../shared/components/Drawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import GenericTaskForm from '../../shared/components/GenericTaskForm';
import TaskItemRow from '../../shared/components/TaskItemRow';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import type { CampaignTaskItem } from '../types/index';
import './CampaignTaskPage.css';

const CampaignTaskPage = () => {
  const pagination = useTableData<CampaignTaskItem>({
    fetchFn: async (params) => {
      const response = await campaignTaskApiService.fetchAll({ ...params, type: 'CAMPAIGN_TASK' });
      return ListResponseMapper.toPagedResult<CampaignTaskItem>(response);
    },
  });
  const toast = useToast();
  const crud = useCampaignTaskCrud({ pagination, showToastMessage: toast.showToastMessage });
  const staff = useStaffOptions();
  const leads = useLeadOptions();
  const drawer = useCampaignTaskDrawer({ loadStaff: staff.loadStaff, loadLeads: leads.loadLeads });
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useCampaignTaskDeleteConfirm({ handleDeleteCampaignTask: crud.handleDeleteCampaignTask });
  const formSubmit = useCampaignTaskFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleAddCampaignTask: crud.handleAddCampaignTask,
    handleUpdateCampaignTask: crud.handleUpdateCampaignTask,
  });
  const { searchValue, handleSearchChange } = useDebouncedSearch(pagination.handleSearchChange);

  return (
    <div className="task-settings-page">
      <PageHeader title="Campaign Task" description="Manage your campaign tasks" />
      <SettingsTabs items={taskTabs} />
      <div className="account-content">
        <div className="table-container">
          <TableNav searchQuery={searchValue} onSearchChange={handleSearchChange} rowsPerPage={pagination.limit} onRowsPerPageChange={pagination.handleRowsPerPageChange}>
            <button className="btn btn-primary" onClick={drawer.openAddDrawer}>
              <Plus size={16} /> Add Campaign Task
            </button>
          </TableNav>
          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">Sl No</TCell>
                <TCell variant="th">Title</TCell>
                <TCell variant="th">Scheduled Date</TCell>
                <TCell variant="th">Assigned To</TCell>
                <TCell variant="th">Priority</TCell>
                <TCell variant="th">Status</TCell>
                <TCell variant="th">Lead</TCell>
                <TCell variant="th">Actions</TCell>
              </TRow>
            </THead>
            <TBody>
              {pagination.list.length === 0 ? <EmptyState colSpan={8} message={LABEL_NO_DATA} /> : pagination.list.map((item, idx) => (
                <TaskItemRow
                  key={item.id}
                  item={item}
                  index={pagination.startIndex + idx + 1}
                  dropdownOpen={dropdown.dropdownOpen}
                  onToggleDropdown={dropdown.toggleDropdown}
                  onEdit={drawer.openEditDrawer}
                  onDelete={deleteConfirm.handleDeleteClick}
                />
              ))}
            </TBody>
          </Table>
          <Pagination
            currentPage={pagination.pageNumber}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalCount}
            rowsPerPage={pagination.limit}
            onPageChange={pagination.setPageNumber}
          />
        </div>
        <Drawer isOpen={drawer.showDrawer} onClose={drawer.closeDrawer} title={drawer.editingItem ? 'Edit Campaign Task' : 'Add Campaign Task'}>
          <GenericTaskForm
            validationSchema={drawer.editingItem ? editCampaignTaskValidationSchema : addCampaignTaskValidationSchema}
            initialValues={drawer.drawerInitialValues}
            onSubmit={drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit}
            isLoading={pagination.isLoading}
            error={pagination.error}
            isEditing={!!drawer.editingItem}
            staffOptions={staff.staffOptions}
            staffLoading={staff.staffLoading}
            leadOptions={leads.leadOptions}
            leadLoading={leads.leadLoading}
            hideCategory
          />
        </Drawer>
        <AdminDeleteModal
          isOpen={!!deleteConfirm.deletingItem}
          itemName={deleteConfirm.deletingItem?.title || ''}
          onConfirm={deleteConfirm.handleConfirmDelete}
          onClose={deleteConfirm.closeDeleteModal}
        />
      </div>
      <ToastNotification isVisible={toast.showToast} type={toast.toastType} message={toast.toastMessage} onDismiss={() => toast.setShowToast(false)} />
    </div>
  );
};

export default CampaignTaskPage;
