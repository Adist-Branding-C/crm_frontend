import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import CallTaskActions from './CallTaskActions';
const CallTaskTable = ({ data, searchQuery, onSearchChange, currentPage, totalPages, totalRecords, rowsPerPage, onPageChange, onRowsPerPageChange, dropdownOpen, onToggleDropdown, onEdit, onDelete, onAdd, staffOptions, leadOptions, }) => {
    const columns = useMemo(() => [
        { header: 'Sl No' },
        { header: 'Title', accessor: 'title' },
        { header: 'Scheduled Date', accessor: 'scheduledDate' },
        {
            header: 'Assigned To',
            render: (row) => row.assignedTo?.name ?? '-',
        },
        {
            header: 'Priority',
            render: (row) => _jsx("span", { className: `status-badge status-${(row.priority || '').toLowerCase()}`, children: row.priority || '-' }),
        },
        {
            header: 'Status',
            render: (row) => _jsx("span", { className: `status-badge status-${(row.status || '').toLowerCase()}`, children: row.status }),
        },
        {
            header: 'Lead',
            render: (row) => row.lead?.name ?? '-',
        },
        {
            header: 'Actions',
            render: (row) => (_jsx(CallTaskActions, { item: row, dropdownOpen: dropdownOpen, onToggleDropdown: onToggleDropdown, onEdit: onEdit, onDelete: onDelete })),
        },
    ], [dropdownOpen, onToggleDropdown, onEdit, onDelete]);
    return (_jsx(DataTable, { columns: columns, data: data, searchQuery: searchQuery, onSearchChange: onSearchChange, currentPage: currentPage, totalPages: totalPages, totalRecords: totalRecords, rowsPerPage: rowsPerPage, onPageChange: onPageChange, onRowsPerPageChange: onRowsPerPageChange, ...(onAdd ? { onAdd } : {}), addLabel: "Add Call Task" }));
};
export default CallTaskTable;
//# sourceMappingURL=CallTaskTable.js.map