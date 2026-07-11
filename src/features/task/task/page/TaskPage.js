import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTaskPage } from '../hooks/useTaskPage';
import { addTaskValidationSchema, editTaskValidationSchema } from '../validations/index';
import { ADD_TASK_INITIAL_VALUES } from '../constants/index';
import TaskTable from '../components/TaskTable';
import AddTaskDrawer from '../components/AddTaskDrawer';
import EditTaskDrawer from '../components/EditTaskDrawer';
import DeleteTaskDialog from '../components/DeleteTaskDialog';
import ToastNotification from '../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import './TaskPage.css';
const TaskPage = () => {
    const { fetch, addDrawer, editDrawer, deleteDialog, dropdown, toast, staff, categories, leads, handlers, searchValue, handleSearchInput, totalPages, } = useTaskPage();
    return (_jsxs("div", { className: "task-settings-page", children: [_jsx(PageHeader, { title: "Task", description: "Manage your tasks" }), _jsx(SettingsTabs, { items: taskTabs }), _jsxs("div", { className: "account-content", children: [_jsx("div", { className: "task-table-wrapper", children: _jsx(TaskTable, { data: fetch.taskList, searchQuery: searchValue, onSearchChange: handleSearchInput, currentPage: fetch.pageNumber, totalPages: totalPages, totalRecords: fetch.totalCount, rowsPerPage: fetch.limit, onPageChange: fetch.setPageNumber, onRowsPerPageChange: fetch.handleRowsPerPageChange, dropdownOpen: dropdown.dropdownOpen, onToggleDropdown: dropdown.toggleDropdown, onEdit: editDrawer.openEditDrawer, onDelete: deleteDialog.handleDeleteClick, onAdd: addDrawer.openAddDrawer, categoryOptions: categories.categoryOptions, staffOptions: staff.staffOptions, leadOptions: leads.leadOptions }) }), _jsx(AddTaskDrawer, { isOpen: addDrawer.showAddDrawer, onClose: addDrawer.closeAddDrawer, validationSchema: addTaskValidationSchema, initialValues: ADD_TASK_INITIAL_VALUES, onSubmit: handlers.handleAddSubmit, isLoading: fetch.isLoading, error: fetch.error, categoryOptions: categories.categoryOptions, staffOptions: staff.staffOptions, leadOptions: leads.leadOptions, leadLoading: leads.leadLoading }), _jsx(EditTaskDrawer, { isOpen: editDrawer.showEditDrawer, onClose: editDrawer.closeEditDrawer, validationSchema: editTaskValidationSchema, initialValues: editDrawer.editInitialValues, onSubmit: handlers.handleEditSubmit, isLoading: fetch.isLoading, error: fetch.error, editingItem: editDrawer.editingItem, categoryOptions: categories.categoryOptions, staffOptions: staff.staffOptions, leadOptions: leads.leadOptions, leadLoading: leads.leadLoading }), _jsx(DeleteTaskDialog, { isOpen: !!deleteDialog.deletingItem, itemName: deleteDialog.deletingItem?.title || '', onConfirm: handlers.handleConfirmDelete, onClose: deleteDialog.closeDeleteDialog })] }), _jsx(ToastNotification, { message: toast.toastMessage, type: toast.toastType, visible: toast.showToast, onClose: () => toast.setShowToast(false) })] }));
};
export default TaskPage;
//# sourceMappingURL=TaskPage.js.map