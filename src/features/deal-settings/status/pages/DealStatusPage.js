import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { dealSettingsTabs } from '../../shared/dealSettingsTabs';
import { useDealStatusPage } from '../hooks';
import DealStatusTable from '../components/DealStatusTable';
import AddDealStatusDrawer from '../components/AddDealStatusDrawer';
import DeleteDealStatusModal from '../components/DeleteDealStatusModal';
import './DealStatusPage.css';
const DealStatusPage = () => {
    const d = useDealStatusPage();
    return (_jsxs("div", { className: "account-page", children: [_jsx(PageHeader, { title: "Deal Status", description: "Manage deal statuses and their visibility" }), _jsx(SettingsTabs, { items: dealSettingsTabs }), _jsx("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: _jsx(DealStatusTable, { data: d.filteredData, searchQuery: d.searchQuery, onSearchChange: d.handleSearchChange, onAdd: d.handleAddClick, addLabel: "Add Deal Status", rowsPerPage: d.limit, onRowsPerPageChange: d.handleLimitChange, startIndex: d.startIndex, dropdownOpen: d.dropdownOpen, onToggleDropdown: d.setDropdownOpen, onEdit: d.handleEditClick, onDelete: d.handleDeleteClick, page: d.page, totalPages: d.meta.totalPages, total: d.meta.total, onPageChange: d.handlePageChange }) }), _jsx(AddDealStatusDrawer, { isOpen: d.showForm, formData: d.formData, onChange: d.handleFormChange, onSave: d.handleSave, onClose: d.handleCloseForm, isEditing: !!d.editingItem }), _jsx(DeleteDealStatusModal, { isOpen: !!d.deletingItem, itemName: d.deletingItem?.name ?? '', onConfirm: d.handleConfirmDelete, onClose: () => d.setDeletingItem(null) })] }));
};
export default DealStatusPage;
//# sourceMappingURL=DealStatusPage.js.map