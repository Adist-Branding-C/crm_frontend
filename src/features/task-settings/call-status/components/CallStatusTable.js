import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import CallStatusActions from './CallStatusActions';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
const CallStatusTable = ({ data, searchQuery, onSearchChange, rowsPerPage, onRowsPerPageChange, totalRecords, currentPage, totalPages, onPageChange, dropdownOpen, onToggleDropdown, onEdit, onDelete, onAdd, }) => {
    const columns = useMemo(() => [
        { header: 'Sl No' },
        { header: 'Name', accessor: 'name' },
        {
            header: 'Status',
            render: (row) => _jsx(SettingsStatusBadge, { status: row.status }),
        },
        {
            header: 'Actions',
            render: (row) => (_jsx(CallStatusActions, { item: row, dropdownOpen: dropdownOpen, onToggleDropdown: onToggleDropdown, onEdit: onEdit, onDelete: onDelete })),
        },
    ], [dropdownOpen, onToggleDropdown, onEdit, onDelete]);
    return (_jsx(DataTable, { columns: columns, data: data, searchQuery: searchQuery, onSearchChange: onSearchChange, rowsPerPage: rowsPerPage, onRowsPerPageChange: onRowsPerPageChange, totalRecords: totalRecords, currentPage: currentPage, totalPages: totalPages, onPageChange: onPageChange, ...(onAdd ? { onAdd } : {}), addLabel: "Add Call Status" }));
};
export default CallStatusTable;
//# sourceMappingURL=CallStatusTable.js.map