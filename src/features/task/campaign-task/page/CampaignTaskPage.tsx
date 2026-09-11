import { Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { ListResponseMapper } from '../../../../shared/mappers/list-response.mapper';
import { useToast } from '../../../../shared/hooks/useToast';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useCampaignTaskCrud } from '../hooks/useCampaignTaskCrud';
import { useCampaignTaskDrawer } from '../hooks/useCampaignTaskDrawer';
import { useCampaignTaskDeleteConfirm } from '../hooks/useCampaignTaskDeleteConfirm';
import { useCampaignTaskFormSubmit } from '../hooks/useCampaignTaskFormSubmit';
import { useStaffOptions } from '../../common/hooks/useStaffOptions';
import { useCampaignOptions } from '../../common/hooks/useCampaignOptions';
import { campaignTaskDataService } from '../services/campaignTaskDataService';
import { addCampaignTaskValidationSchema, editCampaignTaskValidationSchema } from '../validations/campaignTask.validation';
import { LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, Pagination } from '../../../../shared/components/table';
import Drawer from '../../../../shared/components/Drawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import GenericTaskForm from '../../common/components/GenericTaskForm';
import TaskListLoadingRow from '../../common/components/TaskListLoadingRow';
import CampaignTaskRow from '../components/CampaignTaskRow';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../common/taskTabs';
import TaskViewToggle from '../../kanban/components/TaskViewToggle';
import TaskKanbanView from '../../kanban/components/TaskKanbanView';
import { TASK_BOARD_VIEW_STORAGE_KEY } from '../../kanban/constants/taskBoard.constants';
import type { TaskBoardView } from '../../kanban/types/kanban.types';
import type { CampaignTaskItem } from '../types/index';
import './CampaignTaskPage.css';

function readStoredView(): TaskBoardView {
  try {
    const stored = localStorage.getItem(TASK_BOARD_VIEW_STORAGE_KEY);
    return stored === 'table' ? 'table' : 'kanban';
  } catch {
    return 'kanban';
  }
}

const CampaignTaskPage = () => {
  const [boardView, setBoardViewState] = useState<TaskBoardView>(readStoredView);
  const pagination = useTableData<CampaignTaskItem>({
    fetchFn: async (params) => {
      const response = await campaignTaskDataService.fetchAll({ ...params, type: 'CAMPAIGN_TASK' });
      return ListResponseMapper.toPagedResult<CampaignTaskItem>(response);
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
  const crud = useCampaignTaskCrud({ pagination, showToastMessage: toast.showToastMessage });
  const staff = useStaffOptions();
  const campaigns = useCampaignOptions();
  const drawer = useCampaignTaskDrawer({ loadStaff: staff.loadStaff, loadCampaigns: campaigns.loadCampaigns });
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
      <PageHeader
        title="Campaign Task"
        description="Manage your campaign tasks"
        action={
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <TaskViewToggle view={boardView} onChange={handleViewChange} />
          </div>
        }
      />
      <SettingsTabs items={taskTabs} />
      <div className="account-content">
        {boardView === 'kanban' ? (
          <TaskKanbanView taskType="CAMPAIGN_TASK" onViewChange={handleViewChange} onAddTask={drawer.openAddDrawer} addLabel="Add Campaign Task" />
        ) : (
          <>
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
                <TCell variant="th">Campaign</TCell>
                <TCell variant="th">Actions</TCell>
              </TRow>
            </THead>
            <TBody>
              {pagination.isLoading && pagination.list.length === 0 ? (
                <TaskListLoadingRow colSpan={14} />
              ) : !pagination.isLoading && pagination.list.length === 0 ? (
                <EmptyState colSpan={14} message={LABEL_NO_DATA} />
              ) : pagination.list.map((item, idx) => (
                <CampaignTaskRow
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
            associationOptions={campaigns.campaignOptions}
            associationLoading={campaigns.campaignLoading}
            associationFieldName="campaignId"
            associationLabel="Campaign"
            associationPlaceholder="Select a campaign"
            associationLoadingLabel="Loading campaigns..."
            associationEmptyMessage="No campaigns available. Please create a campaign first."
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
