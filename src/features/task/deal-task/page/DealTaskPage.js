import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDealTaskPage } from '../hooks/useDealTaskPage';
import { addDealTaskValidationSchema, editDealTaskValidationSchema } from '../validations/index';
import { ADD_DEAL_TASK_INITIAL_VALUES } from '../constants/index';
import DealTaskTable from '../components/DealTaskTable';
import AddDealTaskDrawer from '../components/AddDealTaskDrawer';
import EditDealTaskDrawer from '../components/EditDealTaskDrawer';
import DeleteDealTaskDialog from '../components/DeleteDealTaskDialog';
import ToastNotification from '../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import './DealTaskPage.css';
const DealTaskPage = () => {
    const { fetch, addDrawer, editDrawer, deleteDialog, dropdown, toast, staff, leads, handlers, searchValue, handleSearchInput, totalPages, } = useDealTaskPage();
    return (_jsxs("div", { className: "task-settings-page", children: [_jsx(PageHeader, { title: "Deal Task", description: "Manage your deal tasks" }), _jsx(SettingsTabs, { items: taskTabs }), _jsxs("div", { className: "account-content", children: [_jsx("div", { className: "deal-task-table-wrapper", children: _jsx(DealTaskTable, { data: fetch.dealTaskList, searchQuery: searchValue, onSearchChange: handleSearchInput, currentPage: fetch.pageNumber, totalPages: totalPages, totalRecords: fetch.totalCount, rowsPerPage: fetch.limit, onPageChange: fetch.setPageNumber, onRowsPerPageChange: fetch.handleRowsPerPageChange, dropdownOpen: dropdown.dropdownOpen, onToggleDropdown: dropdown.toggleDropdown, onEdit: editDrawer.openEditDrawer, onDelete: deleteDialog.handleDeleteClick, onAdd: addDrawer.openAddDrawer, staffOptions: staff.staffOptions, leadOptions: leads.leadOptions }) }), _jsx(AddDealTaskDrawer, { isOpen: addDrawer.showAddDrawer, onClose: addDrawer.closeAddDrawer, validationSchema: addDealTaskValidationSchema, initialValues: ADD_DEAL_TASK_INITIAL_VALUES, onSubmit: handlers.handleAddSubmit, isLoading: fetch.isLoading, error: fetch.error, staffOptions: staff.staffOptions, staffLoading: staff.staffLoading, leadOptions: leads.leadOptions, leadLoading: leads.leadLoading }), _jsx(EditDealTaskDrawer, { isOpen: editDrawer.showEditDrawer, onClose: editDrawer.closeEditDrawer, validationSchema: editDealTaskValidationSchema, initialValues: editDrawer.editInitialValues, onSubmit: handlers.handleEditSubmit, isLoading: fetch.isLoading, error: fetch.error, editingItem: editDrawer.editingItem, staffOptions: staff.staffOptions, staffLoading: staff.staffLoading, leadOptions: leads.leadOptions, leadLoading: leads.leadLoading }), _jsx(DeleteDealTaskDialog, { isOpen: !!deleteDialog.deletingItem, itemName: deleteDialog.deletingItem?.title || '', onConfirm: handlers.handleConfirmDelete, onClose: deleteDialog.closeDeleteDialog })] }), _jsx(ToastNotification, { message: toast.toastMessage, type: toast.toastType, visible: toast.showToast, onClose: () => toast.setShowToast(false) })] }));
};
export default DealTaskPage;
//# sourceMappingURL=DealTaskPage.js.map