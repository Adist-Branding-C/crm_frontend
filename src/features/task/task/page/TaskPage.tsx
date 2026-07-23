import { Plus } from 'lucide-react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { ListResponseMapper } from '../../../../shared/mappers/list-response.mapper';
import { useToast } from '../../../../shared/hooks/useToast';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useTaskCrud } from '../hooks/useTaskCrud';
import { useTaskDrawer } from '../hooks/useTaskDrawer';
import { useTaskDeleteConfirm } from '../hooks/useTaskDeleteConfirm';
import { useTaskFormSubmit } from '../hooks/useTaskFormSubmit';
import { useStaffOptions } from '../../common/hooks/useStaffOptions';
import { useCategoryOptions } from '../../common/hooks/useCategoryOptions';
import { useLeadOptions } from '../../common/hooks/useLeadOptions';
import { taskDataService } from '../services/taskDataService';
import { addTaskValidationSchema, editTaskValidationSchema } from '../validations/task.validation';
import { LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, Pagination } from '../../../../shared/components/table';
import Drawer from '../../../../shared/components/Drawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import GenericTaskForm from '../../common/components/GenericTaskForm';
import TaskRow from '../components/TaskRow';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../common/taskTabs';
import type { TaskItem } from '../types';
import './TaskPage.css';

const TaskPage = () => {
  const pagination = useTableData<TaskItem>({
    fetchFn: async (params) => {
      const response = await taskDataService.getAll({ ...params, type: 'NORMAL' });
      return ListResponseMapper.toPagedResult<TaskItem>(response);
    },
  });
  const toast = useToast();
  const crud = useTaskCrud({ pagination, showToastMessage: toast.showToastMessage });
  const staff = useStaffOptions();
  const categories = useCategoryOptions();
  const leads = useLeadOptions();
  const drawer = useTaskDrawer({ loadStaff: staff.loadStaff, loadCategories: categories.loadCategories, loadLeads: leads.loadLeads });
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useTaskDeleteConfirm({ handleDeleteTask: crud.handleDeleteTask });
  const formSubmit = useTaskFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleAddTask: crud.handleAddTask,
    handleUpdateTask: crud.handleUpdateTask,
  });
  const { searchValue, handleSearchChange } = useDebouncedSearch(pagination.handleSearchChange);

  return (
    <div className="task-settings-page">
      <PageHeader title="Task" description="Manage your tasks" />
      <SettingsTabs items={taskTabs} />
      <div className="account-content">
        <div className="table-container">
          <TableNav searchQuery={searchValue} onSearchChange={handleSearchChange} rowsPerPage={pagination.limit} onRowsPerPageChange={pagination.handleRowsPerPageChange}>
            <button className="btn btn-primary" onClick={drawer.openAddDrawer} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Add Task
            </button>
          </TableNav>
          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">Sl No</TCell>
                <TCell variant="th">Title</TCell>
                <TCell variant="th">Description</TCell>
                <TCell variant="th">Category</TCell>
                <TCell variant="th">Scheduled Date</TCell>
                <TCell variant="th">Scheduled Time</TCell>
                <TCell variant="th">Assigned To</TCell>
                <TCell variant="th">Assigned By</TCell>
                <TCell variant="th">Priority</TCell>
                <TCell variant="th">Status</TCell>
                <TCell variant="th">Lead</TCell>
                <TCell variant="th">Actions</TCell>
              </TRow>
            </THead>
            <TBody>
              {pagination.list.length === 0 ? <EmptyState colSpan={12} message={LABEL_NO_DATA} /> : pagination.list.map((item, idx) => (
                <TaskRow
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
        <Drawer isOpen={drawer.showDrawer} onClose={drawer.closeDrawer} title={drawer.editingItem ? 'Edit Task' : 'Add Task'}>
          <GenericTaskForm
            validationSchema={drawer.editingItem ? editTaskValidationSchema : addTaskValidationSchema}
            initialValues={drawer.drawerInitialValues}
            onSubmit={drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit}
            isLoading={pagination.isLoading}
            error={pagination.error}
            isEditing={!!drawer.editingItem}
            categoryOptions={categories.categoryOptions}
            staffOptions={staff.staffOptions}
            staffLoading={staff.staffLoading}
            leadOptions={leads.leadOptions}
            leadLoading={leads.leadLoading}
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

export default TaskPage;
