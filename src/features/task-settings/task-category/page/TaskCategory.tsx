import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTaskCategory } from '../hooks/useTaskCategory';
import { useTaskCategoryForm } from '../hooks/useTaskCategoryForm';
import { useTaskSettingsSearch } from '../../hooks/useTaskSettingsSearch';
import { SETTINGS_TABS } from '../../constants/index';
import { addTaskCategoryValidationSchema, editTaskCategoryValidationSchema } from '../validations/index';
import { ADD_TASK_CATEGORY_INITIAL_VALUES } from '../constants/index';
import TaskCategoryTable from '../components/TaskCategoryTable';
import AddTaskCategoryDrawer from '../components/AddTaskCategoryDrawer';
import EditTaskCategoryDrawer from '../components/EditTaskCategoryDrawer';
import DeleteTaskCategoryDialog from '../components/DeleteTaskCategoryDialog';
import ToastNotification from '../../components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../components/SettingsTabs/SettingsTabs';
import type { TaskCategoryFormData } from '../types/index';
import './TaskCategory.css';

const TaskCategoryPage = () => {
  const {
    taskCategoryList,
    isLoading,
    error,
    handleAdd,
    handleUpdate,
    handleDelete,
    toastMessage,
    toastType,
    showToast,
    setShowToast,
    pageNumber,
    setPageNumber,
    limit,
    totalCount,
    searchQuery,
    handleSearchChange,
    handleRowsPerPageChange,
  } = useTaskCategory();

  const form = useTaskCategoryForm();

  const { searchValue, handleSearchInput } = useTaskSettingsSearch(searchQuery, handleSearchChange);

  const totalPages = Math.ceil(totalCount / limit) || 1;

  const handleAddSubmit = useCallback(async (
    values: TaskCategoryFormData,
    helpers: FormikHelpers<TaskCategoryFormData>,
  ) => {
    const success = await handleAdd(values, helpers);
    if (success) {
      form.closeAddDrawer();
    }
  }, [handleAdd, form]);

  const handleEditSubmit = useCallback(async (
    values: TaskCategoryFormData,
    helpers: FormikHelpers<TaskCategoryFormData>,
  ) => {
    if (!form.editingItem) return;
    const item = form.editingItem;
    const original: TaskCategoryFormData = {
      category: item.category || '',
      action: item.action || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdate(form.editingItem.id, values, helpers);
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
      <PageHeader title="Task Settings" description="Manage task configurations and settings" />
      <SettingsTabs tabs={SETTINGS_TABS} />
      <div className="account-content">
        <div className="task-category-table-wrapper">
          <TaskCategoryTable
            data={taskCategoryList}
            searchQuery={searchValue}
            onSearchChange={handleSearchInput}
            rowsPerPage={limit}
            onRowsPerPageChange={handleRowsPerPageChange}
            totalRecords={totalCount}
            currentPage={pageNumber}
            totalPages={totalPages}
            onPageChange={setPageNumber}
            dropdownOpen={form.dropdownOpen}
            onToggleDropdown={form.toggleDropdown}
            onEdit={form.openEditDrawer}
            onDelete={form.handleDeleteClick}
            onAdd={form.openAddDrawer}
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
      <ToastNotification message={toastMessage} type={toastType} visible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default TaskCategoryPage;
