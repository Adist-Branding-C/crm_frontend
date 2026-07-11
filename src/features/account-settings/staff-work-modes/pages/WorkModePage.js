import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useWorkModePage } from '../hooks';
import AddWorkModeDrawer from '../components/AddWorkModeDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout } from '../../../../shared/components/settings';
import { WORK_MODE_TABLE_COLUMNS } from '../constants/workModeTableColumns';
const WorkModePage = () => {
    const { workMode, searchQuery, handleSearchChange, rowsPerPage, handleRowsPerPageChange, pageNumber, setPageNumber, totalCount, startIndex, totalPages, showDrawer, dropdownOpen, onToggleDropdown, editingItem, deletingItem, filteredData, drawerInitialValues, handleAddClick, handleCloseDrawer, handleEditClick, handleDeleteClick, handleConfirmDelete, handleCloseDeleteModal, handleSubmit, handleEditSubmit, } = useWorkModePage();
    return (_jsxs("div", { className: "account-page", children: [_jsx(PageHeader, { title: "Account Settings", description: "Manage your login credentials, settings, and preferences" }), _jsx(SettingsTabs, {}), _jsxs("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: [_jsx(SettingsTableLayout, { searchQuery: searchQuery, onSearchChange: handleSearchChange, onAdd: handleAddClick, addLabel: "Add Work Mode", data: filteredData, columns: WORK_MODE_TABLE_COLUMNS, startIndex: startIndex, dropdownOpen: dropdownOpen, onToggleDropdown: onToggleDropdown, onEdit: handleEditClick, onDelete: handleDeleteClick, currentPage: pageNumber, totalPages: totalPages, rowsPerPage: rowsPerPage, totalItems: totalCount, onPageChange: setPageNumber, onRowsPerPageChange: handleRowsPerPageChange }), _jsx(AddWorkModeDrawer, { isOpen: showDrawer, onClose: handleCloseDrawer, validationSchema: editingItem ? workMode.editValidationSchema : workMode.validationSchema, initialValues: drawerInitialValues, onSubmit: editingItem ? handleEditSubmit : handleSubmit, isLoading: workMode.isLoading, error: workMode.error, isEditing: !!editingItem }), _jsx(AdminDeleteModal, { isOpen: !!deletingItem, itemName: deletingItem?.workModeName || deletingItem?.name || '', onConfirm: handleConfirmDelete, onClose: handleCloseDeleteModal })] })] }));
};
export default WorkModePage;
//# sourceMappingURL=WorkModePage.js.map