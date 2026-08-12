import { Plus, FileText, CheckSquare } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
import TaskListLoadingRow from '../../common/components/TaskListLoadingRow';
import TaskRow from '../components/TaskRow';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import DraftsList from '../../../enquiries/components/DraftsList';
import PreviewCanvas, { PreviewSection } from '../../../../shared/components/preview/PreviewCanvas';
import { draftService } from '../../../../shared/services/draftService';
import { useDrafts } from '../../../../shared/hooks/useDrafts';
import { getErrorMessage } from '../../../../shared/utils/error';
import { taskTabs } from '../../common/taskTabs';
import type { TaskItem, TaskFormDataUpdate } from '../types';
import type { TaskPreviewData } from '../../common/types/genericTaskForm.types';
import './TaskPage.css';

type TaskView = 'tasks' | 'drafts';

const TaskPage = () => {
  const [activeView, setActiveView] = useState<TaskView>('tasks');
  const [draftId, setDraftId] = useState<string | null>(null);
  const drafts = useDrafts('task');
  const [previewData, setPreviewData] = useState<TaskPreviewData | null>(null);

  useEffect(() => {
    if (activeView === 'drafts' && drafts.length === 0) {
      setActiveView('tasks');
    }
  }, [activeView, drafts.length]);

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

  const handleResumeDraft = (id: string) => {
    setDraftId(id);
    const draft = draftService.getDrafts('task').find(d => d.id === id);
    if (draft) {
      setActiveView('tasks');
      drawer.openAddDrawer();
    }
  };

  const taskInitialValues = useMemo(() => {
    if (draftId) {
      return draftService.getDrafts('task').find(d => d.id === draftId)?.payload || drawer.drawerInitialValues;
    }
    return drawer.drawerInitialValues;
  }, [draftId, drawer.drawerInitialValues]);

  const handleSavePreview = async () => {
    if (!previewData) return;
    try {
      const isEditing = !!drawer.editingItem;
      const helpers = { setSubmitting: () => {} } as unknown as import('formik').FormikHelpers<Record<string, unknown>>;
      let success = false;
      if (isEditing) {
        success = await formSubmit.handleEditSubmit(previewData.payload as Record<string, unknown>, helpers);
      } else {
        success = await formSubmit.handleSubmit(previewData.payload as Record<string, unknown>, helpers);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fieldOptions = useMemo(
    () => ({
      staffOptions: staff.staffOptions.map((o) => ({ value: String(o.value), label: o.label })),
      categoryOptions: categories.categoryOptions.map((o) => ({ value: String(o.value), label: o.label })),
      leadOptions: leads.leadOptions.map((o) => ({ value: String(o.value), label: o.label })),
    }),
    [staff.staffOptions, categories.categoryOptions, leads.leadOptions],
  );

  const handleFieldSave = async (id: number, payload: TaskFormDataUpdate) => {
    try {
      const res = await taskDataService.update(id, payload);
      if (res.status) {
        pagination.refresh();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <div className="task-settings-page">
      <PageHeader 
        title={activeView === 'drafts' ? 'Task Drafts' : 'Task'} 
        description={activeView === 'drafts' ? 'Resume your unfinished tasks' : 'Manage your tasks'} 
        action={
          drafts.length > 0 && (
            <button
              className={`btn btn-secondary ${activeView === 'drafts' ? 'active' : ''}`}
              onClick={() => setActiveView((v) => (v === 'drafts' ? 'tasks' : 'drafts'))}
            >
              {activeView === 'drafts' ? <><CheckSquare size={16} /> Back to Tasks</> : <><FileText size={16} /> Drafts</>}
            </button>
          )
        }
      />
      
      {activeView === 'tasks' && <SettingsTabs items={taskTabs} />}
      
      <div className="account-content">
        {activeView === 'drafts' && <DraftsList type="task" onResumeDraft={handleResumeDraft} />}
        
        {activeView === 'tasks' && (
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
              {pagination.isLoading && pagination.list.length === 0 ? (
                <TaskListLoadingRow colSpan={12} />
              ) : !pagination.isLoading && pagination.list.length === 0 ? (
                <EmptyState colSpan={12} message={LABEL_NO_DATA} />
              ) : pagination.list.map((item, idx) => (
                <TaskRow
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
            isOpen={true}
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
          <Drawer 
            isOpen={drawer.showDrawer} 
            onClose={() => { drawer.closeDrawer(); setDraftId(null); }} 
            title={drawer.editingItem ? 'Edit Task' : 'Add Task'}
          >
            <GenericTaskForm
            validationSchema={drawer.editingItem ? editTaskValidationSchema : addTaskValidationSchema}
            initialValues={taskInitialValues}
            onSubmit={drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit}
            draftId={draftId}
            onDraftSaved={setDraftId}
            onPreviewRequest={(data) => setPreviewData(data)}
            isLoading={pagination.isLoading}
            error={pagination.error}
            isEditing={!!drawer.editingItem}
            categoryOptions={categories.categoryOptions}
            categoryLoading={categories.categoryLoading}
            staffOptions={staff.staffOptions}
            staffLoading={staff.staffLoading}
            leadOptions={leads.leadOptions}
            leadLoading={leads.leadLoading}
          />
        </Drawer>
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
