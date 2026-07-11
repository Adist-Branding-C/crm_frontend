import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Tag, Layers, FileText } from 'lucide-react';
import { useDealStagesData } from '../hooks/useDealStagesData';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import './DealStagesPage.css';
import { formFields, columns } from '../constants';
const DealStagesPage = () => {
    const d = useDealStagesData();
    return (_jsxs("div", { className: "deal-settings-page", children: [_jsxs("div", { className: "settings-menu", children: [_jsxs(Link, { to: "/user/deal-types", children: [_jsx(Tag, { size: 16 }), " Type"] }), _jsxs(Link, { to: "/user/deal-stages", children: [_jsx(Layers, { size: 16 }), " Status"] }), _jsxs(Link, { to: "/user/additional-fields-deal", children: [_jsx(FileText, { size: 16 }), " Additional Fields"] })] }), _jsxs("div", { className: "settings-content", children: [_jsx(PageHeader, { title: "Deal Stages", description: "Manage deal pipeline stages" }), _jsxs("div", { className: "table-container", children: [_jsx(AdminToolbar, { searchQuery: d.searchQuery, onSearchChange: d.setSearchQuery, onAdd: d.handleAdd, addLabel: "Add Stage" }), _jsx(AdminTable, { data: d.paginatedData, columns: columns, startIndex: d.startIndex, dropdownOpen: d.dropdownOpen, onToggleDropdown: d.setDropdownOpen, onEdit: d.handleEdit, onDelete: d.handleDeleteClick }), _jsx(AdminPagination, { currentPage: d.currentPage, totalPages: d.totalPages, startIndex: d.startIndex, rowsPerPage: d.rowsPerPage, totalItems: d.filteredData.length, onPageChange: d.setCurrentPage, onRowsPerPageChange: d.handleRowsPerPageChange, prevNextOnly: true })] })] }), _jsx(AdminFormDrawer, { isOpen: d.showForm, title: "Stage", fields: formFields, formData: d.formData, onChange: d.setFormData, onSave: d.handleSave, onClose: d.handleCloseForm, isEditing: !!d.editingItem }), _jsx(AdminDeleteModal, { isOpen: !!d.deletingItem, itemName: d.deletingItem?.status, itemType: "stage", onConfirm: d.handleConfirmDelete, onClose: () => d.setDeletingItem(null) })] }));
};
export default DealStagesPage;
//# sourceMappingURL=DealStagesPage.js.map