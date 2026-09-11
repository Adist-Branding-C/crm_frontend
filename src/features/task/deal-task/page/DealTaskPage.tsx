import { Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { ListResponseMapper } from '../../../../shared/mappers/list-response.mapper';
import { useToast } from '../../../../shared/hooks/useToast';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDealTaskCrud } from '../hooks/useDealTaskCrud';
import { useDealTaskDrawer } from '../hooks/useDealTaskDrawer';
import { useDealTaskDeleteConfirm } from '../hooks/useDealTaskDeleteConfirm';
import { useDealTaskFormSubmit } from '../hooks/useDealTaskFormSubmit';
import { useStaffOptions } from '../../common/hooks/useStaffOptions';
import { useDealOptions } from '../../common/hooks/useDealOptions';
import { dealTaskDataService } from '../services/dealTaskDataService';
import { addDealTaskValidationSchema, editDealTaskValidationSchema } from '../validations/dealTask.validation';
import { LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, Pagination } from '../../../../shared/components/table';
import Drawer from '../../../../shared/components/Drawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import GenericTaskForm from '../../common/components/GenericTaskForm';
import TaskListLoadingRow from '../../common/components/TaskListLoadingRow';
import DealTaskRow from '../components/DealTaskRow';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../common/taskTabs';
import TaskViewToggle from '../../kanban/components/TaskViewToggle';
import TaskKanbanView from '../../kanban/components/TaskKanbanView';
import { TASK_BOARD_VIEW_STORAGE_KEY } from '../../kanban/constants/taskBoard.constants';
import type { TaskBoardView } from '../../kanban/types/kanban.types';
import type { DealTaskItem } from '../types/index';
import './DealTaskPage.css';

function readStoredView(): TaskBoardView {
  try {
    const stored = localStorage.getItem(TASK_BOARD_VIEW_STORAGE_KEY);
    return stored === 'table' ? 'table' : 'kanban';
  } catch {
    return 'kanban';
  }
}

const DealTaskPage = () => {
  const [boardView, setBoardViewState] = useState<TaskBoardView>(readStoredView);
  const pagination = useTableData<DealTaskItem>({
    fetchFn: async (params) => {
      const response = await dealTaskDataService.fetchAll({ ...params, type: 'DEAL_TASK' });
      return ListResponseMapper.toPagedResult<DealTaskItem>(response);
    },
  });

  const handleViewChange = useCallback((next: TaskBoardView) => {
    setBoardViewState(next);
    try {
      localStorage.setItem(TASK_BOARD_VIEW_STORAGE_KEY, next);
    } catch {
      // Non-fatal
    }
  }, []);
  const toast = useToast();
  const crud = useDealTaskCrud({ pagination, showToastMessage: toast.showToastMessage });
  const staff = useStaffOptions();
  const deals = useDealOptions();
  const drawer = useDealTaskDrawer({ loadStaff: staff.loadStaff, loadDeals: deals.loadDeals });
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useDealTaskDeleteConfirm({ handleDeleteDealTask: crud.handleDeleteDealTask });
  const formSubmit = useDealTaskFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleAddDealTask: crud.handleAddDealTask,
    handleUpdateDealTask: crud.handleUpdateDealTask,
  });
  const { searchValue, handleSearchChange } = useDebouncedSearch(pagination.handleSearchChange);

  return (
    <div className="task-settings-page">
      <PageHeader
        title="Deal Task"
        description="Manage your deal tasks"
        action={
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <TaskViewToggle view={boardView} onChange={handleViewChange} />
          </div>
        }
      />
      <SettingsTabs items={taskTabs} />
      <div className="account-content">
        {boardView === 'kanban' ? (
          <TaskKanbanView taskType="DEAL_TASK" onViewChange={handleViewChange} />
        ) : (
          <>
            <div className="table-container">
          <TableNav searchQuery={searchValue} onSearchChange={handleSearchChange} rowsPerPage={pagination.limit} onRowsPerPageChange={pagination.handleRowsPerPageChange}>
            <button className="btn btn-primary" onClick={drawer.openAddDrawer} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Add Deal Task
            </button>
          </TableNav>
          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">Sl No</TCell>
                <TCell variant="th">Title</TCell>
                <TCell variant="th">Description</TCell>
                <TCell variant="th">Scheduled Date</TCell>
                <TCell variant="th">Scheduled Time</TCell>
                <TCell variant="th">Workflow</TCell>
                <TCell variant="th">Stage</TCell>
                <TCell variant="th">Assigned To</TCell>
                <TCell variant="th">Assigned By</TCell>
                <TCell variant="th">Priority</TCell>
                <TCell variant="th">Status</TCell>
                <TCell variant="th">Repeat</TCell>
                <TCell variant="th">Deal</TCell>
                <TCell variant="th">Actions</TCell>
              </TRow>
            </THead>
            <TBody>
              {pagination.isLoading && pagination.list.length === 0 ? (
                <TaskListLoadingRow colSpan={14} />
              ) : !pagination.isLoading && pagination.list.length === 0 ? (
                <EmptyState colSpan={14} message={LABEL_NO_DATA} />
              ) : pagination.list.map((item, idx) => (
                <DealTaskRow
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
          </>
        )}
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
            associationOptions={deals.dealOptions}
            associationLoading={deals.dealLoading}
            associationFieldName="dealId"
            associationLabel="Deal"
            associationPlaceholder="Select a deal"
            associationLoadingLabel="Loading deals..."
            associationEmptyMessage="No deals available. Please create a deal first."
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
