import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useBranchData } from '../hooks/useBranchData';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import './BranchPage.css';
import { formFields, columns } from '../constants';
const BranchPage = () => {
    const d = useBranchData();
    return (_jsxs("div", { className: "account-page", children: [_jsx("div", { className: "account-layout", children: _jsxs("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: [_jsx(PageHeader, { title: "Branches", description: "Create and manage company branches" }), _jsx(SettingsTabs, {}), _jsxs("div", { className: "table-container", children: [_jsx(AdminToolbar, { searchQuery: d.searchQuery, onSearchChange: d.setSearchQuery, onAdd: d.handleAdd, addLabel: "Add Branch" }), _jsx(AdminTable, { data: d.paginatedData, columns: columns, startIndex: d.startIndex, dropdownOpen: d.dropdownOpen, onToggleDropdown: d.setDropdownOpen, onEdit: d.handleEdit, onDelete: d.handleDeleteClick }), _jsx(AdminPagination, { currentPage: d.currentPage, totalPages: d.totalPages, startIndex: d.startIndex, rowsPerPage: d.rowsPerPage, totalItems: d.filteredData.length, onPageChange: d.setCurrentPage, onRowsPerPageChange: d.handleRowsPerPageChange })] })] }) }), _jsx(AdminFormDrawer, { isOpen: d.showForm, title: "Branch", fields: formFields, formData: d.formData, onChange: d.setFormData, onSave: d.handleSave, onClose: d.handleCloseForm, isEditing: !!d.editingItem }), _jsx(AdminDeleteModal, { isOpen: !!d.deletingItem, itemName: d.deletingItem?.name, onConfirm: d.handleConfirmDelete, onClose: () => d.setDeletingItem(null) })] }));
};
export default BranchPage;
//# sourceMappingURL=BranchPage.js.map