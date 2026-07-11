import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import AdminToolbar from '../crud/AdminToolbar';
import AdminTable from '../crud/AdminTable';
import AdminPagination from '../crud/AdminPagination';
function SettingsTableLayoutInner(props) {
    const { searchQuery, onSearchChange, onAdd, addLabel, data, columns, startIndex, dropdownOpen, onToggleDropdown, onEdit, onDelete, currentPage, totalPages, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange, } = props;
    const handleToggleDropdown = (id) => {
        onToggleDropdown(id);
    };
    return (_jsxs("div", { className: "table-container", children: [_jsx(AdminToolbar, { searchQuery: searchQuery, onSearchChange: onSearchChange, onAdd: onAdd, addLabel: addLabel, rowsPerPage: rowsPerPage, onRowsPerPageChange: onRowsPerPageChange }), _jsx(AdminTable, { data: data, columns: columns, startIndex: startIndex, dropdownOpen: dropdownOpen, onToggleDropdown: handleToggleDropdown, onEdit: onEdit, onDelete: onDelete }), _jsx(AdminPagination, { currentPage: currentPage, totalPages: totalPages, startIndex: startIndex, rowsPerPage: rowsPerPage, totalItems: totalItems, onPageChange: onPageChange, onRowsPerPageChange: onRowsPerPageChange, showRowsSelector: false, prevNextOnly: false })] }));
}
const SettingsTableLayout = React.memo(SettingsTableLayoutInner);
export default SettingsTableLayout;
//# sourceMappingURL=SettingsTableLayout.js.map