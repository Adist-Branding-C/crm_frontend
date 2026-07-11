import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search, Plus } from 'lucide-react';
import AdminTable from '../../../../shared/components/crud/AdminTable';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES } from '../../../../shared/constants/labels';
import { ACTION_SEARCH } from '../../../../shared/constants/actionLabels';
const dealTypeColumns = [
    { key: 'name', label: 'Name' },
    {
        key: 'status',
        label: 'Status',
        render: (item) => (_jsx("span", { className: 'status-badge status-' + (item.status || 'Active').toLowerCase(), children: item.status || 'Active' })),
    },
];
const DealTypeTable = ({ data, searchQuery, onSearchChange, onAdd, addLabel, rowsPerPage, onRowsPerPageChange, startIndex, dropdownOpen, onToggleDropdown, onEdit, onDelete, page, totalPages, total, onPageChange, }) => (_jsxs("div", { className: "table-container", children: [_jsxs("div", { className: "table-header-controls", children: [_jsx("div", { className: "entries-select", children: _jsxs("label", { children: [LABEL_SHOW, _jsx("select", { value: rowsPerPage, onChange: onRowsPerPageChange, children: ROWS_OPTIONS_10_25_50_100.map(n => _jsx("option", { value: n, children: n }, n)) }), LABEL_ENTRIES] }) }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: ACTION_SEARCH, value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }), _jsxs("button", { className: "btn btn-primary", onClick: onAdd, children: [_jsx(Plus, { size: 16 }), " ", addLabel] })] })] }), _jsx(AdminTable, { data: data, columns: dealTypeColumns, startIndex: startIndex, dropdownOpen: dropdownOpen, onToggleDropdown: onToggleDropdown, onEdit: onEdit, onDelete: onDelete })] }));
export default DealTypeTable;
//# sourceMappingURL=DealTypeTable.js.map