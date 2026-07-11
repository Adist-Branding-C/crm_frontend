import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import TaskCategoryActions from './TaskCategoryActions';
const TaskCategoryTable = ({ data, searchQuery, onSearchChange, rowsPerPage, onRowsPerPageChange, totalRecords, currentPage, totalPages, onPageChange, dropdownOpen, onToggleDropdown, onEdit, onDelete, onAdd, }) => {
    const columns = useMemo(() => [
        { header: 'Sl No' },
        { header: 'Category', accessor: 'category' },
        { header: 'Action', accessor: 'action' },
        {
            header: 'Actions',
            render: (row) => (_jsx(TaskCategoryActions, { item: row, dropdownOpen: dropdownOpen, onToggleDropdown: onToggleDropdown, onEdit: onEdit, onDelete: onDelete })),
        },
    ], [dropdownOpen, onToggleDropdown, onEdit, onDelete]);
    return (_jsx(DataTable, { columns: columns, data: data, searchQuery: searchQuery, onSearchChange: onSearchChange, rowsPerPage: rowsPerPage, onRowsPerPageChange: onRowsPerPageChange, totalRecords: totalRecords, currentPage: currentPage, totalPages: totalPages, onPageChange: onPageChange, ...(onAdd ? { onAdd } : {}), addLabel: "Add Category" }));
};
export default TaskCategoryTable;
//# sourceMappingURL=TaskCategoryTable.js.map