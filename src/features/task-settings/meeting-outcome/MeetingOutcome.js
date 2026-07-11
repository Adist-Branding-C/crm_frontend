import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { useMeetingOutcome } from './hooks/useMeetingOutcome';
import { useMeetingOutcomeForm } from './hooks/useMeetingOutcomeForm';
import { useTaskSettingsSearch } from '../hooks/useTaskSettingsSearch';
import { SETTINGS_TABS } from '../constants/index';
import { addMeetingOutcomeValidationSchema, editMeetingOutcomeValidationSchema } from './validations/index';
import { ADD_MEETING_OUTCOME_INITIAL_VALUES } from './constants/index';
import MeetingOutcomeTable from './components/MeetingOutcomeTable';
import AddMeetingOutcomeDrawer from './components/AddMeetingOutcomeDrawer';
import EditMeetingOutcomeDrawer from './components/EditMeetingOutcomeDrawer';
import DeleteMeetingOutcomeDialog from './components/DeleteMeetingOutcomeDialog';
import ToastNotification from '../components/ToastNotification';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../components/SettingsTabs/SettingsTabs';
import './MeetingOutcome.css';
const MeetingOutcomePage = () => {
    const { meetingOutcomeList, isLoading, error, handleAdd, handleUpdate, handleDelete, toastMessage, toastType, showToast, setShowToast, pageNumber, setPageNumber, limit, totalCount, searchQuery, handleSearchChange, handleRowsPerPageChange, } = useMeetingOutcome();
    const form = useMeetingOutcomeForm();
    const { searchValue, handleSearchInput } = useTaskSettingsSearch(searchQuery, handleSearchChange);
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const handleAddSubmit = useCallback(async (values, helpers) => {
        const success = await handleAdd(values, helpers);
        if (success) {
            form.closeAddDrawer();
        }
    }, [handleAdd, form]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!form.editingItem)
            return;
        const item = form.editingItem;
        const original = {
            name: item.name || '',
            status: item.status || 'Active',
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
        if (!form.deletingItem)
            return;
        const success = await handleDelete(form.deletingItem.id);
        if (success) {
            form.closeDeleteDialog();
        }
    }, [form.deletingItem, handleDelete, form]);
    return (_jsxs("div", { className: "task-settings-page", children: [_jsx(PageHeader, { title: "Task Settings", description: "Manage task configurations and settings" }), _jsx(SettingsTabs, { tabs: SETTINGS_TABS }), _jsxs("div", { className: "account-content", children: [_jsx("div", { className: "meeting-outcome-table-wrapper", children: _jsx(MeetingOutcomeTable, { data: meetingOutcomeList, searchQuery: searchValue, onSearchChange: handleSearchInput, rowsPerPage: limit, onRowsPerPageChange: handleRowsPerPageChange, totalRecords: totalCount, currentPage: pageNumber, totalPages: totalPages, onPageChange: setPageNumber, dropdownOpen: form.dropdownOpen, onToggleDropdown: form.toggleDropdown, onEdit: form.openEditDrawer, onDelete: form.handleDeleteClick, onAdd: form.openAddDrawer }) }), _jsx(AddMeetingOutcomeDrawer, { isOpen: form.showAddDrawer, onClose: form.closeAddDrawer, validationSchema: addMeetingOutcomeValidationSchema, initialValues: ADD_MEETING_OUTCOME_INITIAL_VALUES, onSubmit: handleAddSubmit, isLoading: isLoading, error: error }), _jsx(EditMeetingOutcomeDrawer, { isOpen: form.showEditDrawer, onClose: form.closeEditDrawer, validationSchema: editMeetingOutcomeValidationSchema, initialValues: form.editInitialValues, onSubmit: handleEditSubmit, isLoading: isLoading, error: error, editingItem: form.editingItem }), _jsx(DeleteMeetingOutcomeDialog, { isOpen: !!form.deletingItem, itemName: form.deletingItem?.name || '', onConfirm: handleConfirmDelete, onClose: form.closeDeleteDialog })] }), _jsx(ToastNotification, { message: toastMessage, type: toastType, visible: showToast, onClose: () => setShowToast(false) })] }));
};
export default MeetingOutcomePage;
//# sourceMappingURL=MeetingOutcome.js.map