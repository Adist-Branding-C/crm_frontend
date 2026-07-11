import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TablePagination from './TablePagination';
const DataTable = ({ columns, data, keyExtractor = (row) => row.id, searchQuery, onSearchChange, onAdd, addLabel, currentPage, totalPages, totalRecords, rowsPerPage, onPageChange, onRowsPerPageChange, emptyMessage, onExport, }) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return (_jsxs("div", { className: "table-container", children: [_jsx(TableToolbar, { searchQuery: searchQuery, onSearchChange: onSearchChange, rowsPerPage: rowsPerPage, onRowsPerPageChange: onRowsPerPageChange, ...(onAdd ? { onAdd } : {}), ...(addLabel ? { addLabel } : {}), ...(onExport ? { onExport } : {}) }), _jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx(TableHeader, { columns: columns }), _jsx(TableBody, { columns: columns, data: data, startIndex: startIndex, keyExtractor: keyExtractor, ...(emptyMessage ? { emptyMessage } : {}) })] }) }), _jsx(TablePagination, { currentPage: currentPage, totalPages: totalPages, rowsPerPage: rowsPerPage, totalRecords: totalRecords, onPageChange: onPageChange })] }));
};
export default DataTable;
//# sourceMappingURL=DataTable.js.map