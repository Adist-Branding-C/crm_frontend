import { Plus, FileText, CheckSquare } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { ListResponseMapper } from '../../../../shared/mappers/list-response.mapper';
import { useToast } from '../../../../shared/hooks/useToast';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useTaskCrud } from '../../common/hooks/useTaskCrud';
import { useTaskFormSubmit } from '../../common/hooks/useTaskFormSubmit';
import { useTaskDeleteConfirm } from '../../common/hooks/useTaskDeleteConfirm';
import { useUnifiedTaskDrawer } from '../../common/hooks/useUnifiedTaskDrawer';
import { useStaffOptions } from '../../common/hooks/useStaffOptions';
import { useCategoryOptions } from '../../common/hooks/useCategoryOptions';
import { useLeadOptions } from '../../common/hooks/useLeadOptions';
import { useCampaignOptions } from '../../common/hooks/useCampaignOptions';
import { useDealOptions } from '../../common/hooks/useDealOptions';
import { unifiedTaskDataService } from '../../common/services/unifiedTaskDataService';
import { UnifiedTaskMapper } from '../../common/mapper/unifiedTaskMapper';
import { isRecurring, getNextOccurrenceDate } from '../../common/utils/recurrence';
import { isTaskTypeKey } from '../../common/utils/unifiedTask.helpers';
import type { TaskTypeFilterKey } from '../../common/types/taskType.types';
import type { UnifiedTaskItem, UnifiedTaskPayload, UnifiedTaskFormValues } from '../../common/types/unifiedTask.types';
import type { TaskPreviewData } from '../../common/types/genericTaskForm.types';
import type { RepeatType } from '../../task/types/interface';
import type { RecurrenceChainItem } from '../types';
import { LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, Pagination } from '../../../../shared/components/table';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import TaskListLoadingRow from '../../common/components/TaskListLoadingRow';
import UnifiedTaskRow from '../../common/components/UnifiedTaskRow';
import type { UnifiedRowFieldOptions } from '../../common/components/UnifiedTaskRow';
import TaskFormDrawer from '../../common/components/TaskFormDrawer';
import TaskTypeFilter from '../../common/components/TaskTypeFilter';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import DraftsList from '../../../enquiries/components/DraftsList';
import PreviewCanvas from '../../../../shared/components/preview/PreviewCanvas';
import { draftService } from '../../../../shared/services/draftService';
import { useDrafts } from '../../../../shared/hooks/useDrafts';
import { getErrorMessage } from '../../../../shared/utils/error';
import TaskViewToggle from '../../kanban/components/TaskViewToggle';
import TaskKanbanView from '../../kanban/components/TaskKanbanView';
import { TASK_BOARD_VIEW_STORAGE_KEY } from '../../kanban/constants/taskBoard.constants';
import type { TaskBoardView } from '../../kanban/types/kanban.types';
import './TaskPage.css';

type TaskView = 'tasks' | 'drafts';

function readStoredView(): TaskBoardView {
  try {
    const stored = localStorage.getItem(TASK_BOARD_VIEW_STORAGE_KEY);
    return stored === 'table' ? 'table' : 'kanban';
  } catch {
    return 'kanban';
  }
}

const TaskPage = () => {
  const [boardView, setBoardViewState] = useState<TaskBoardView>(readStoredView);
  const [activeView, setActiveView] = useState<TaskView>('tasks');
  const [draftId, setDraftId] = useState<string | null>(null);
  const drafts = useDrafts('task');
  const [previewData, setPreviewData] = useState<TaskPreviewData | null>(null);
  const [typeFilter, setTypeFilter] = useState<TaskTypeFilterKey>('ALL');
  const typeFilterRef = useRef<TaskTypeFilterKey>('ALL');

  const handleViewChange = useCallback((next: TaskBoardView) => {
    setBoardViewState(next);
    try {
      localStorage.setItem(TASK_BOARD_VIEW_STORAGE_KEY, next);
    } catch {
      // Non-fatal
    }
  }, []);

  useEffect(() => {
    if (activeView === 'drafts' && drafts.length === 0) {
      setActiveView('tasks');
    }
  }, [activeView, drafts.length]);

  const pagination = useTableData<UnifiedTaskItem>({
    fetchFn: async (params) => {
      const type = typeFilterRef.current === 'ALL' ? undefined : typeFilterRef.current;
      const response = await unifiedTaskDataService.getAll({
        pageNumber: params.pageNumber,
        limit: params.limit,
        ...(params.search ? { search: params.search } : {}),
        ...(type ? { taskType: type } : {}),
      });
      return ListResponseMapper.toPagedResult<UnifiedTaskItem>(response);
    },
  });

  const toast = useToast();
  const crud = useTaskCrud<UnifiedTaskFormValues, UnifiedTaskItem>({
    pagination,
    showToastMessage: toast.showToastMessage,
    dataService: unifiedTaskDataService,
    messages: {
      added: 'Task created successfully',
      updated: 'Task updated successfully',
      deleted: 'Task deleted successfully',
      addFailed: 'Failed to add task',
      updateFailed: 'Failed to update task',
      deleteFailed: 'Failed to delete task',
    },
  });
  const staff = useStaffOptions();
  const categories = useCategoryOptions();
  const leads = useLeadOptions();
  const campaigns = useCampaignOptions();
  const deals = useDealOptions();
  const drawer = useUnifiedTaskDrawer({
    loadStaff: staff.loadStaff,
    loadCategories: categories.loadCategories,
    loadLeads: leads.loadLeads,
    loadCampaigns: campaigns.loadCampaigns,
    loadDeals: deals.loadDeals,
  });
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useTaskDeleteConfirm<UnifiedTaskItem>(crud.handleDelete);
  const formSubmit = useTaskFormSubmit<UnifiedTaskItem, UnifiedTaskFormValues>({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    mapItemToFormData: UnifiedTaskMapper.toFormValues,
    handleAdd: crud.handleAdd,
    handleUpdate: crud.handleUpdate,
  });
  const { searchValue, handleSearchChange } = useDebouncedSearch(pagination.handleSearchChange);

  const handleTypeFilterChange = useCallback((value: string) => {
    const next: TaskTypeFilterKey = value === 'ALL' ? 'ALL' : isTaskTypeKey(value) ? value : 'ALL';
    typeFilterRef.current = next;
    setTypeFilter(next);
    pagination.setPageNumber(1);
    pagination.refresh(1);
  }, [pagination]);

  const handleResumeDraft = (id: string) => {
    setDraftId(id);
    const draft = draftService.getDrafts('task').find(d => d.id === id);
    if (draft) {
      setActiveView('tasks');
      drawer.openAddDrawer();
    }
  };

  const taskInitialValues = useMemo(() => {
    if (!drawer.editingItem && draftId) {
      return draftService.getDrafts('task').find(d => d.id === draftId)?.payload || drawer.drawerInitialValues;
    }
    return drawer.drawerInitialValues;
  }, [drawer.editingItem, draftId, drawer.drawerInitialValues]);

  const handleSavePreview = async () => {
    if (!previewData) return;
    try {
      const isEditing = !!drawer.editingItem;
      const helpers = { setSubmitting: () => {} } as unknown as FormikHelpers<UnifiedTaskFormValues>;
      const values = previewData.payload as unknown as UnifiedTaskFormValues;
      let success = false;
      if (isEditing) {
        success = await formSubmit.handleEditSubmit(values, helpers);
      } else {
        success = await formSubmit.handleSubmit(values, helpers);
      }

      if (!success) return;

      if (draftId) {
        draftService.deleteDraft(draftId);
      }
      setPreviewData(null);
      setDraftId(null);
      drawer.closeDrawer();
    } catch (e: unknown) {
      toast.showToastMessage(getErrorMessage(e, 'Failed to save task'), 'error');
    }
  };

  useEffect(() => {
    staff.loadStaff();
    categories.loadCategories();
    leads.loadLeads();
    campaigns.loadCampaigns();
    deals.loadDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fieldOptions = useMemo<UnifiedRowFieldOptions>(() => ({
    staffOptions: staff.staffOptions.map((o) => ({ value: String(o.value), label: o.label })),
    associations: {
      categoryId: { options: categories.categoryOptions.map((o) => ({ value: String(o.value), label: o.label })), loading: categories.categoryLoading },
      leadId: { options: leads.leadOptions.map((o) => ({ value: String(o.value), label: o.label })), loading: leads.leadLoading },
      campaignId: { options: campaigns.campaignOptions.map((o) => ({ value: String(o.value), label: o.label })), loading: campaigns.campaignLoading },
      dealId: { options: deals.dealOptions.map((o) => ({ value: String(o.value), label: o.label })), loading: deals.dealLoading },
    },
  }), [
    staff.staffOptions, staff.staffLoading,
    categories.categoryOptions, categories.categoryLoading,
    leads.leadOptions, leads.leadLoading,
    campaigns.campaignOptions, campaigns.campaignLoading,
    deals.dealOptions, deals.dealLoading,
  ]);

  const handleFieldSave = useCallback(async (id: number, payload: Partial<UnifiedTaskPayload>): Promise<boolean> => {
    try {
      const res = await unifiedTaskDataService.updateFields(id, payload);
      if (res.status) {
        const task = pagination.list.find((t) => t.id === id);
        if (
          payload.status &&
          payload.status.toLowerCase() === 'completed' &&
          task &&
          isRecurring(task.repeatType)
        ) {
          const nextDate = getNextOccurrenceDate(task.scheduledDate, task.repeatType as RepeatType | undefined, task.repeatConfig);
          const formattedDate = nextDate ? new Date(nextDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'next occurrence';
          toast.showToastMessage(`Next task '${task.title}' created for ${formattedDate}`, 'success');
        } else {
          toast.showToastMessage('Task updated successfully', 'success');
        }
        pagination.refresh();
        return true;
      }
      return false;
    } catch (err: unknown) {
      console.error('Failed to update task fields', err);
      return false;
    }
  }, [pagination, toast]);

  const handleHistoryTaskClick = (item: RecurrenceChainItem) => {
    const task = pagination.list.find((t) => t.id === item.id);
    if (task) {
      drawer.openEditDrawer(task);
    } else {
      toast.showToastMessage('That task is not available in the current view', 'error');
    }
  };

  return (
    <div className="task-settings-page">
      <PageHeader
        title={activeView === 'drafts' ? 'Task Drafts' : 'Task'}
        description={activeView === 'drafts' ? 'Resume your unfinished tasks' : 'Manage your tasks'}
        action={
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            {activeView === 'tasks' && (
              <TaskViewToggle view={boardView} onChange={handleViewChange} />
            )}
            {drafts.length > 0 && (
              <button
                className={`btn btn-secondary ${activeView === 'drafts' ? 'active' : ''}`}
                onClick={() => setActiveView((v) => (v === 'drafts' ? 'tasks' : 'drafts'))}
              >
                {activeView === 'drafts' ? <><CheckSquare size={16} /> Back to Tasks</> : <><FileText size={16} /> Drafts</>}
              </button>
            )}
          </div>
        }
      />

      <div className="account-content">
        {activeView === 'drafts' && <DraftsList type="task" onResumeDraft={handleResumeDraft} />}

        {activeView === 'tasks' && boardView === 'kanban' && (
          <TaskKanbanView onViewChange={handleViewChange} onAddTask={() => drawer.openAddDrawer()} addLabel="Add Task" />
        )}

        {activeView === 'tasks' && boardView === 'table' && (
          <div className="table-container">
            <TableNav searchQuery={searchValue} onSearchChange={handleSearchChange} rowsPerPage={pagination.limit} onRowsPerPageChange={pagination.handleRowsPerPageChange}>
              <TaskTypeFilter value={typeFilter} onChange={handleTypeFilterChange} />
              <button className="btn btn-primary" onClick={drawer.openAddDrawer} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={16} /> Add Task
              </button>
            </TableNav>
            <Table wrapperClassName="table-scroll" className="data-table">
              <THead>
                <TRow>
                  <TCell variant="th">Sl No</TCell>
                  <TCell variant="th">Type</TCell>
                  <TCell variant="th">Title</TCell>
                  <TCell variant="th">Description</TCell>
                  <TCell variant="th">Related</TCell>
                  <TCell variant="th">Scheduled Date</TCell>
                  <TCell variant="th">Scheduled Time</TCell>
                  <TCell variant="th">Workflow</TCell>
                  <TCell variant="th">Stage</TCell>
                  <TCell variant="th">Assigned To</TCell>
                  <TCell variant="th">Assigned By</TCell>
                  <TCell variant="th">Priority</TCell>
                  <TCell variant="th">Status</TCell>
                  <TCell variant="th">Repeat</TCell>
                  <TCell variant="th">Actions</TCell>
                </TRow>
              </THead>
              <TBody>
                {pagination.isLoading && pagination.list.length === 0 ? (
                  <TaskListLoadingRow colSpan={15} />
                ) : !pagination.isLoading && pagination.list.length === 0 ? (
                  <EmptyState colSpan={15} message={LABEL_NO_DATA} />
                ) : pagination.list.map((item, idx) => (
                  <UnifiedTaskRow
                    key={item.id}
                    item={item}
                    index={pagination.startIndex + idx + 1}
                    dropdownOpen={dropdown.dropdownOpen}
                    onToggleDropdown={dropdown.toggleDropdown}
                    onEdit={drawer.openEditDrawer}
                    onDelete={deleteConfirm.handleDeleteClick}
                    fieldOptions={fieldOptions}
                    onFieldSave={handleFieldSave}
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
        )}

        {previewData ? (
          <PreviewCanvas
            isOpen
            title={drawer.editingItem ? 'Preview Task Edit' : 'Preview Task'}
            subtitle="Review the details before saving"
            sections={previewData.sections}
            isSaving={false}
            error={pagination.error}
            onClose={() => { setPreviewData(null); pagination.setError(''); }}
            onEdit={() => { setPreviewData(null); pagination.setError(''); }}
            onSave={handleSavePreview}
          />
        ) : (
          <TaskFormDrawer
            isOpen={drawer.showDrawer}
            onClose={() => { drawer.closeDrawer(); setDraftId(null); }}
            isEditing={Boolean(drawer.editingItem)}
            initialValues={taskInitialValues}
            onSubmit={drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit}
            isLoading={pagination.isLoading}
            error={pagination.error}
            draftId={draftId}
            onDraftSaved={setDraftId}
            onPreviewRequest={(data) => setPreviewData(data)}
            editingItem={drawer.editingItem}
            onHistoryItemClick={handleHistoryTaskClick}
            staffOptions={staff.staffOptions}
            staffLoading={staff.staffLoading}
            categoryOptions={categories.categoryOptions}
            categoryLoading={categories.categoryLoading}
            leadOptions={leads.leadOptions}
            leadLoading={leads.leadLoading}
            campaignOptions={campaigns.campaignOptions}
            campaignLoading={campaigns.campaignLoading}
            dealOptions={deals.dealOptions}
            dealLoading={deals.dealLoading}
          />
        )}
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