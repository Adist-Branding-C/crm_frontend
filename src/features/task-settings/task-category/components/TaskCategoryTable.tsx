import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import TaskCategoryActions from './TaskCategoryActions';
import type { TaskCategoryItem, TaskCategoryTableProps } from '../types/index';
import type { Column } from '../../../../shared/components/table';

const TaskCategoryTable = ({
  data,
  searchQuery,
  onSearchChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalRecords,
  currentPage,
  totalPages,
  onPageChange,
  dropdownOpen,
  onToggleDropdown,
  onEdit,
  onDelete,
  onAdd,
}: TaskCategoryTableProps) => {
  const columns: Column<TaskCategoryItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Category', accessor: 'category' },
    { header: 'Action', accessor: 'action' },
    {
      header: 'Actions',
      render: (row) => (
        <TaskCategoryActions
          item={row}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ], [dropdownOpen, onToggleDropdown, onEdit, onDelete]);

  return (
    <DataTable
      columns={columns}
      data={data}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      totalRecords={totalRecords}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      {...(onAdd ? { onAdd } : {})}
      addLabel="Add Category"
    />
  );
};

export default TaskCategoryTable;
