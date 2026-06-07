import { useMemo, useCallback } from 'react';
import { Plus, Phone, MessageSquare, Users, Tag } from 'lucide-react';
import { useTaskCategory } from '../hooks/useTaskCategory';
import { useTaskCategoryForm } from '../hooks/useTaskCategoryForm';
import { addTaskCategoryValidationSchema, editTaskCategoryValidationSchema } from '../validation/taskCategory.schema';
import { ADD_TASK_CATEGORY_INITIAL_VALUES } from '../constants/taskCategory.constants';
import TaskCategoryTable from '../components/TaskCategoryTable';
import AddTaskCategoryDrawer from '../components/AddTaskCategoryDrawer';
import EditTaskCategoryDrawer from '../components/EditTaskCategoryDrawer';
import DeleteTaskCategoryDialog from '../components/DeleteTaskCategoryDialog';
import SettingsTabs from '../../components/SettingsTabs/SettingsTabs';
import './TaskCategoryPage.css';

const tabs = [
  { label: 'Call Status', path: '/user/call_status', icon: <Phone size={16} /> },
  { label: 'Call Reasons', path: '/user/call_reasons', icon: <MessageSquare size={16} /> },
  { label: 'Meeting Outcome', path: '/user/meeting_outcome', icon: <Users size={16} /> },
  { label: 'Task Categories', path: '/user/task_categories', icon: <Tag size={16} /> },
];

const TaskCategoryPage = () => {
  const {
    taskCategoryList,
    isLoading,
    error,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useTaskCategory();

  const form = useTaskCategoryForm();

  const filteredData = useMemo(
    () => {
      const query = form.searchQuery.trim().toLowerCase();
      return taskCategoryList.filter(item =>
        (item.category || '').toLowerCase().includes(query) ||
        (item.action || '').toLowerCase().includes(query)
      );
    },
    [taskCategoryList, form.searchQuery]
  );

  const handleAddSubmit = useCallback(async (values: { category: string; action: string }) => {
    const success = await handleAdd(values);
    if (success) {
      form.closeAddDrawer();
    }
  }, [handleAdd, form]);

  const handleEditSubmit = useCallback(async (values: { category: string; action: string }) => {
    if (!form.editingItem) return;
    const success = await handleUpdate(form.editingItem.id, values);
    if (success) {
      form.closeEditDrawer();
    }
  }, [form.editingItem, handleUpdate, form]);

  const handleConfirmDelete = useCallback(async () => {
    if (!form.deletingItem) return;
    const success = await handleDelete(form.deletingItem.id);
    if (success) {
      form.closeDeleteDialog();
    }
  }, [form.deletingItem, handleDelete, form]);

  return (
    <div className="task-settings-page">
      <SettingsTabs tabs={tabs} />
      <div className="settings-content">
        <div className="task-panel">
          <span className="usage-quote">
            <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{taskCategoryList.length}</span> Categories
          </span>
          <div className="task-nav">
            <button className="btn btn-primary" onClick={form.openAddDrawer}>
              <Plus size={16} /> Add Category
            </button>
          </div>
        </div>
        <div className="task-category-table-wrapper">
          <TaskCategoryTable
            data={filteredData.slice(0, form.rowsPerPage)}
            searchQuery={form.searchQuery}
            onSearchChange={form.setSearchQuery}
            rowsPerPage={form.rowsPerPage}
            onRowsPerPageChange={form.setRowsPerPage}
            totalRecords={filteredData.length}
            dropdownOpen={form.dropdownOpen}
            onToggleDropdown={form.toggleDropdown}
            onEdit={form.openEditDrawer}
            onDelete={form.handleDeleteClick}
          />
        </div>
        <AddTaskCategoryDrawer
          isOpen={form.showAddDrawer}
          onClose={form.closeAddDrawer}
          validationSchema={addTaskCategoryValidationSchema}
          initialValues={ADD_TASK_CATEGORY_INITIAL_VALUES}
          onSubmit={handleAddSubmit}
          isLoading={isLoading}
          error={error}
        />
        <EditTaskCategoryDrawer
          isOpen={form.showEditDrawer}
          onClose={form.closeEditDrawer}
          validationSchema={editTaskCategoryValidationSchema}
          initialValues={form.editInitialValues}
          onSubmit={handleEditSubmit}
          isLoading={isLoading}
          error={error}
          editingItem={form.editingItem}
        />
        <DeleteTaskCategoryDialog
          isOpen={!!form.deletingItem}
          itemName={form.deletingItem?.category || ''}
          onConfirm={handleConfirmDelete}
          onClose={form.closeDeleteDialog}
        />
      </div>
    </div>
  );
};

export default TaskCategoryPage;
