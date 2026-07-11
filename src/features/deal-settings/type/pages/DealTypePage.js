import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { dealSettingsTabs } from '../../shared/dealSettingsTabs';
import { useDealTypePage } from '../hooks';
import DealTypeTable from '../components/DealTypeTable';
import AddDealTypeDrawer from '../components/AddDealTypeDrawer';
import DeleteDealTypeModal from '../components/DeleteDealTypeModal';
import './DealTypePage.css';
const DealTypePage = () => {
    const d = useDealTypePage();
    return (_jsxs("div", { className: "account-page", children: [_jsx(PageHeader, { title: "Deal Types", description: "Manage deal categories and their status" }), _jsx(SettingsTabs, { items: dealSettingsTabs }), _jsx("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: _jsx(DealTypeTable, { data: d.filteredData, searchQuery: d.searchQuery, onSearchChange: d.handleSearchChange, onAdd: d.handleAddClick, addLabel: "Add Deal Type", rowsPerPage: d.limit, onRowsPerPageChange: d.handleLimitChange, startIndex: d.startIndex, dropdownOpen: d.dropdownOpen, onToggleDropdown: d.setDropdownOpen, onEdit: d.handleEditClick, onDelete: d.handleDeleteClick, page: d.page, totalPages: d.meta.totalPages, total: d.meta.total, onPageChange: d.handlePageChange }) }), _jsx(AddDealTypeDrawer, { isOpen: d.showForm, formData: d.formData, onChange: d.handleFormChange, onSave: d.handleSave, onClose: d.handleCloseForm, isEditing: !!d.editingItem }), _jsx(DeleteDealTypeModal, { isOpen: !!d.deletingItem, itemName: d.deletingItem?.name ?? '', onConfirm: d.handleConfirmDelete, onClose: () => d.setDeletingItem(null) })] }));
};
export default DealTypePage;
//# sourceMappingURL=DealTypePage.js.map