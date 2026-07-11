import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES } from '../../constants/labels';
import { ACTION_SEARCH } from '../../constants/actionLabels';
const AdminToolbar = React.memo(({ searchQuery, onSearchChange, onAdd, addLabel, showAddButton = true, rowsPerPage, onRowsPerPageChange, }) => (_jsxs("div", { className: "table-header-controls", children: [rowsPerPage !== undefined && onRowsPerPageChange !== undefined && (_jsx("div", { className: "entries-select", children: _jsxs("label", { children: [LABEL_SHOW, _jsx("select", { value: rowsPerPage, onChange: onRowsPerPageChange, children: ROWS_OPTIONS_10_25_50_100.map(n => (_jsx("option", { value: n, children: n }, n))) }), LABEL_ENTRIES] }) })), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: ACTION_SEARCH, value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }), showAddButton && (_jsxs("button", { className: "btn btn-primary", onClick: onAdd, children: [_jsx(Plus, { size: 16 }), " ", addLabel] }))] })] })));
AdminToolbar.displayName = 'AdminToolbar';
export default AdminToolbar;
//# sourceMappingURL=AdminToolbar.js.map