import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { dealSettingsTabs } from '../../shared/dealSettingsTabs';
import { useDealAdditionalFieldPage } from '../hooks';
import DealAdditionalFieldTable from '../components/DealAdditionalFieldTable';
import DealAdditionalFieldFormPanel from '../components/DealAdditionalFieldFormPanel';
import DeleteDealAdditionalFieldModal from '../components/DeleteDealAdditionalFieldModal';
import './DealAdditionalFieldPage.css';
const DealAdditionalFieldPage = () => {
    const d = useDealAdditionalFieldPage();
    return (_jsxs("div", { className: "deal-settings-page", children: [_jsx(PageHeader, { title: "Deal Settings", description: "Configure deal types, stages and custom fields" }), _jsx(SettingsTabs, { items: dealSettingsTabs }), _jsxs("div", { className: "additional-fields-layout", children: [_jsx("div", { className: "additional-form-panel", children: _jsx(DealAdditionalFieldFormPanel, { formData: d.formData, editingItem: d.editingItem, onInputChange: d.handleInputChange, onSubmit: d.handleSubmit }) }), _jsx("div", { className: "additional-table-panel", children: _jsx(DealAdditionalFieldTable, { data: d.filteredData, searchQuery: d.searchQuery, onSearchChange: d.handleSearchChange, onAdd: d.handleAddClick, addLabel: "Add Field", rowsPerPage: d.limit, onRowsPerPageChange: d.handleLimitChange, startIndex: d.startIndex, dropdownOpen: d.dropdownOpen, dropdownDirection: d.dropdownDirection, setDropdownOpen: d.setDropdownOpen, setDropdownDirection: d.setDropdownDirection, handleEditClick: d.handleEditClick, handleDeleteClick: d.handleDeleteClick, page: d.page, totalPages: d.meta.totalPages, total: d.meta.total, onPageChange: d.handlePageChange }) })] }), d.deletingItem && (_jsx(DeleteDealAdditionalFieldModal, { deletingItem: d.deletingItem, onConfirm: d.handleConfirmDelete, onClose: () => d.setDeletingItem(null) }))] }));
};
export default DealAdditionalFieldPage;
//# sourceMappingURL=DealAdditionalFieldPage.js.map