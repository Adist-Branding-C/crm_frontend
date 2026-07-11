import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFetchCallReasons } from '../hooks/useFetchCallReasons';
import { useCallReasonSubmitHandlers } from '../hooks/useCallReasonSubmitHandlers';
import { useAddCallReasonDrawer } from '../hooks/useAddCallReasonDrawer';
import { useEditCallReasonDrawer } from '../hooks/useEditCallReasonDrawer';
import { useDeleteCallReasonDialog } from '../hooks/useDeleteCallReasonDialog';
import { useRowDropdown } from '../hooks/useRowDropdown';
import { useTaskSettingsSearch } from '../../hooks/useTaskSettingsSearch';
import { useToast } from '../../hooks/useToast';
import { SETTINGS_TABS } from '../../constants/index';
import { addCallReasonValidationSchema, editCallReasonValidationSchema } from '../validations/index';
import { ADD_CALL_REASON_INITIAL_VALUES } from '../constants/index';
import CallReasonTable from '../components/CallReasonTable';
import AddCallReasonDrawer from '../components/AddCallReasonDrawer';
import EditCallReasonDrawer from '../components/EditCallReasonDrawer';
import DeleteCallReasonDialog from '../components/DeleteCallReasonDialog';
import ToastNotification from '../../components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../components/SettingsTabs/SettingsTabs';
import './CallReason.css';
const CallReasonPage = () => {
    const fetch = useFetchCallReasons();
    const addDrawer = useAddCallReasonDrawer();
    const editDrawer = useEditCallReasonDrawer();
    const deleteDialog = useDeleteCallReasonDialog();
    const dropdown = useRowDropdown();
    const toast = useToast();
    const handlers = useCallReasonSubmitHandlers({
        onAddSuccess: addDrawer.closeAddDrawer,
        onEditSuccess: editDrawer.closeEditDrawer,
        onDeleteSuccess: deleteDialog.closeDeleteDialog,
        editingItem: editDrawer.editingItem,
        deletingItem: deleteDialog.deletingItem,
    }, fetch, toast);
    const { searchValue, handleSearchInput } = useTaskSettingsSearch(fetch.searchQuery, fetch.handleSearchChange);
    const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;
    return (_jsxs("div", { className: "task-settings-page", children: [_jsx(PageHeader, { title: "Task Settings", description: "Manage task configurations and settings" }), _jsx(SettingsTabs, { tabs: SETTINGS_TABS }), _jsxs("div", { className: "account-content", children: [_jsx("div", { className: "call-reason-table-wrapper", children: _jsx(CallReasonTable, { data: fetch.callReasonList, searchQuery: searchValue, onSearchChange: handleSearchInput, rowsPerPage: fetch.limit, onRowsPerPageChange: fetch.handleRowsPerPageChange, totalRecords: fetch.totalCount, currentPage: fetch.pageNumber, totalPages: totalPages, onPageChange: fetch.setPageNumber, dropdownOpen: dropdown.dropdownOpen, onToggleDropdown: dropdown.toggleDropdown, onEdit: editDrawer.openEditDrawer, onDelete: deleteDialog.handleDeleteClick, onAdd: addDrawer.openAddDrawer }) }), _jsx(AddCallReasonDrawer, { isOpen: addDrawer.showAddDrawer, onClose: addDrawer.closeAddDrawer, validationSchema: addCallReasonValidationSchema, initialValues: ADD_CALL_REASON_INITIAL_VALUES, onSubmit: handlers.handleAddSubmit, isLoading: fetch.isLoading, error: fetch.error }), _jsx(EditCallReasonDrawer, { isOpen: editDrawer.showEditDrawer, onClose: editDrawer.closeEditDrawer, validationSchema: editCallReasonValidationSchema, initialValues: editDrawer.editInitialValues, onSubmit: handlers.handleEditSubmit, isLoading: fetch.isLoading, error: fetch.error, editingItem: editDrawer.editingItem }), _jsx(DeleteCallReasonDialog, { isOpen: !!deleteDialog.deletingItem, itemName: deleteDialog.deletingItem?.name || '', onConfirm: handlers.handleConfirmDelete, onClose: deleteDialog.closeDeleteDialog })] }), _jsx(ToastNotification, { message: toast.toastMessage, type: toast.toastType, visible: toast.showToast, onClose: () => toast.setShowToast(false) })] }));
};
export default CallReasonPage;
//# sourceMappingURL=CallReason.js.map