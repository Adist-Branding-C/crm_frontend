import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCampaignTaskPage } from '../hooks/useCampaignTaskPage';
import { addCampaignTaskValidationSchema, editCampaignTaskValidationSchema } from '../validations/index';
import { ADD_CAMPAIGN_TASK_INITIAL_VALUES } from '../constants/index';
import CampaignTaskTable from '../components/CampaignTaskTable';
import AddCampaignTaskDrawer from '../components/AddCampaignTaskDrawer';
import EditCampaignTaskDrawer from '../components/EditCampaignTaskDrawer';
import DeleteCampaignTaskDialog from '../components/DeleteCampaignTaskDialog';
import ToastNotification from '../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import './CampaignTaskPage.css';
const CampaignTaskPage = () => {
    const { fetch, addDrawer, editDrawer, deleteDialog, dropdown, toast, staff, leads, handlers, searchValue, handleSearchInput, totalPages, } = useCampaignTaskPage();
    return (_jsxs("div", { className: "task-settings-page", children: [_jsx(PageHeader, { title: "Campaign Task", description: "Manage your campaign tasks" }), _jsx(SettingsTabs, { items: taskTabs }), _jsxs("div", { className: "account-content", children: [_jsx("div", { className: "campaign-task-table-wrapper", children: _jsx(CampaignTaskTable, { data: fetch.campaignTaskList, searchQuery: searchValue, onSearchChange: handleSearchInput, currentPage: fetch.pageNumber, totalPages: totalPages, totalRecords: fetch.totalCount, rowsPerPage: fetch.limit, onPageChange: fetch.setPageNumber, onRowsPerPageChange: fetch.handleRowsPerPageChange, dropdownOpen: dropdown.dropdownOpen, onToggleDropdown: dropdown.toggleDropdown, onEdit: editDrawer.openEditDrawer, onDelete: deleteDialog.handleDeleteClick, onAdd: addDrawer.openAddDrawer, staffOptions: staff.staffOptions, leadOptions: leads.leadOptions }) }), _jsx(AddCampaignTaskDrawer, { isOpen: addDrawer.showAddDrawer, onClose: addDrawer.closeAddDrawer, validationSchema: addCampaignTaskValidationSchema, initialValues: ADD_CAMPAIGN_TASK_INITIAL_VALUES, onSubmit: handlers.handleAddSubmit, isLoading: fetch.isLoading, error: fetch.error, staffOptions: staff.staffOptions, staffLoading: staff.staffLoading, leadOptions: leads.leadOptions, leadLoading: leads.leadLoading }), _jsx(EditCampaignTaskDrawer, { isOpen: editDrawer.showEditDrawer, onClose: editDrawer.closeEditDrawer, validationSchema: editCampaignTaskValidationSchema, initialValues: editDrawer.editInitialValues, onSubmit: handlers.handleEditSubmit, isLoading: fetch.isLoading, error: fetch.error, editingItem: editDrawer.editingItem, staffOptions: staff.staffOptions, staffLoading: staff.staffLoading, leadOptions: leads.leadOptions, leadLoading: leads.leadLoading }), _jsx(DeleteCampaignTaskDialog, { isOpen: !!deleteDialog.deletingItem, itemName: deleteDialog.deletingItem?.title || '', onConfirm: handlers.handleConfirmDelete, onClose: deleteDialog.closeDeleteDialog })] }), _jsx(ToastNotification, { message: toast.toastMessage, type: toast.toastType, visible: toast.showToast, onClose: () => toast.setShowToast(false) })] }));
};
export default CampaignTaskPage;
//# sourceMappingURL=CampaignTaskPage.js.map