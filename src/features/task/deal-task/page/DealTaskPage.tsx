import { Plus } from 'lucide-react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { ListResponseMapper } from '../../../../shared/mappers/list-response.mapper';
import { useToast } from '../../../../shared/hooks/useToast';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDealTaskCrud } from '../hooks/useDealTaskCrud';
import { useDealTaskDrawer } from '../hooks/useDealTaskDrawer';
import { useDealTaskDeleteConfirm } from '../hooks/useDealTaskDeleteConfirm';
import { useDealTaskFormSubmit } from '../hooks/useDealTaskFormSubmit';
import { useStaffOptions } from '../../shared/hooks/useStaffOptions';
import { useLeadOptions } from '../../shared/hooks/useLeadOptions';
import { dealTaskApiService } from '../services/index';
import { addDealTaskValidationSchema, editDealTaskValidationSchema } from '../validations/index';
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
import type { DealTaskItem } from '../types/index';
import './DealTaskPage.css';

const DealTaskPage = () => {
  const pagination = useTableData<DealTaskItem>({
    fetchFn: async (params) => {
      const response = await dealTaskApiService.fetchAll({ ...params, type: 'DEAL_TASK' });
      return ListResponseMapper.toPagedResult<DealTaskItem>(response);
    },
  });
  const toast = useToast();
  const crud = useDealTaskCrud({ pagination, showToastMessage: toast.showToastMessage });
  const staff = useStaffOptions();
  const leads = useLeadOptions();
  const drawer = useDealTaskDrawer({ loadStaff: staff.loadStaff, loadLeads: leads.loadLeads });
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useDealTaskDeleteConfirm({ handleDeleteDealTask: crud.handleDeleteDealTask });
  const formSubmit = useDealTaskFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleAddDealTask: crud.handleAddDealTask,
    handleUpdateDealTask: crud.handleUpdateDealTask,
  });
  const { searchValue, handleSearchInput } = useDebouncedSearch(pagination.searchQuery, pagination.handleSearchChange);

  return (
    <div className="task-settings-page">
      <PageHeader title="Deal Task" description="Manage your deal tasks" />
      <SettingsTabs items={taskTabs} />
      <div className="account-content">
        <div className="table-container">
          <TableNav searchQuery={searchValue} onSearchChange={handleSearchInput} rowsPerPage={pagination.limit} onRowsPerPageChange={pagination.handleRowsPerPageChange}>
            <button className="btn btn-primary" onClick={drawer.openAddDrawer} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Add Deal Task
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
        <Drawer isOpen={drawer.showDrawer} onClose={drawer.closeDrawer} title={drawer.editingItem ? 'Edit Deal Task' : 'Add Deal Task'}>
          <GenericTaskForm
            validationSchema={drawer.editingItem ? editDealTaskValidationSchema : addDealTaskValidationSchema}
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

export default DealTaskPage;
