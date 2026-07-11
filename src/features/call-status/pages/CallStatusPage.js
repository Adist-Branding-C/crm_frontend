import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Users, Tag } from 'lucide-react';
import { useCallStatusData } from '../hooks/useCallStatusData';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import './CallStatusPage.css';
import { formFields, columns } from '../constants';
const CallStatusPage = () => {
    const d = useCallStatusData();
    return (_jsxs("div", { className: "task-settings-page", children: [_jsxs("div", { className: "settings-menu", children: [_jsxs(Link, { to: "/user/call_status", children: [_jsx(Phone, { size: 16 }), " Call Status"] }), _jsxs(Link, { to: "/user/reason", children: [_jsx(MessageSquare, { size: 16 }), " Call Reasons"] }), _jsxs(Link, { to: "/user/meeting-outcome", children: [_jsx(Users, { size: 16 }), " Meeting Outcome"] }), _jsxs(Link, { to: "/user/task-categories", children: [_jsx(Tag, { size: 16 }), " Task Categories"] })] }), _jsxs("div", { className: "settings-content", children: [_jsx(PageHeader, { title: "Call Status", description: "Manage call status options" }), _jsxs("div", { className: "table-container", children: [_jsx(AdminToolbar, { searchQuery: d.searchQuery, onSearchChange: d.setSearchQuery, onAdd: d.handleAdd, addLabel: "Add Call Status" }), _jsx(AdminTable, { data: d.paginatedData, columns: columns, startIndex: d.startIndex, dropdownOpen: d.dropdownOpen, onToggleDropdown: d.setDropdownOpen, onEdit: d.handleEdit, onDelete: d.handleDeleteClick }), _jsx(AdminPagination, { currentPage: d.currentPage, totalPages: d.totalPages, startIndex: d.startIndex, rowsPerPage: d.rowsPerPage, totalItems: d.filteredData.length, onPageChange: d.setCurrentPage, onRowsPerPageChange: d.handleRowsPerPageChange, prevNextOnly: true })] })] }), _jsx(AdminFormDrawer, { isOpen: d.showForm, title: "Call Status", fields: formFields, formData: d.formData, onChange: d.setFormData, onSave: d.handleSave, onClose: d.handleCloseForm, isEditing: !!d.editingItem }), _jsx(AdminDeleteModal, { isOpen: !!d.deletingItem, itemName: d.deletingItem?.name, onConfirm: d.handleConfirmDelete, onClose: () => d.setDeletingItem(null) })] }));
};
export default CallStatusPage;
//# sourceMappingURL=CallStatusPage.js.map