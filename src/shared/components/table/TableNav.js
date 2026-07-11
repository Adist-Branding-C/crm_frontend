import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES } from '../../constants/labels';
import { ACTION_SEARCH } from '../../constants/actionLabels';
const TableNav = ({ searchQuery, onSearchChange, searchPlaceholder, rowsPerPage, onRowsPerPageChange, children, }) => (_jsxs("div", { className: "table-header-controls", children: [_jsx("div", { className: "entries-select", children: _jsxs("label", { children: [LABEL_SHOW, _jsx("select", { value: rowsPerPage, onChange: onRowsPerPageChange, children: ROWS_OPTIONS_10_25_50_100.map(n => (_jsx("option", { value: n, children: n }, n))) }), LABEL_ENTRIES] }) }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: searchPlaceholder ?? ACTION_SEARCH, value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }), children] })] }));
export default TableNav;
//# sourceMappingURL=TableNav.js.map