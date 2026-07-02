import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import TaskActions from './TaskActions';
import type { TaskItem, TaskTableProps } from '../types/index';
import type { Column } from '../../../../shared/components/table';

const TaskTable = ({
  data,
  searchQuery,
  onSearchChange,
  currentPage,
  totalPages,
  totalRecords,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  dropdownOpen,
  onToggleDropdown,
  onEdit,
  onDelete,
  onAdd,
  categoryOptions,
  staffOptions,
  leadOptions,
}: TaskTableProps) => {
  const columns: Column<TaskItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Title', accessor: 'title' },
    {
      header: 'Category',
      render: (row) => row.category?.name ?? '-',
    },
    { header: 'Scheduled Date', accessor: 'scheduledDate' },
    {
      header: 'Assigned To',
      render: (row) => row.assignedTo?.name ?? '-',
    },
    {
      header: 'Priority',
      render: (row) => <span className={`status-badge status-${(row.priority || '').toLowerCase()}`}>{row.priority || '-'}</span>,
    },
    {
      header: 'Status',
      render: (row) => <span className={`status-badge status-${(row.status || '').toLowerCase()}`}>{row.status}</span>,
    },
    {
      header: 'Lead',
      render: (row) => row.lead?.name ?? '-',
    },
    {
      header: 'Actions',
      render: (row) => (
        <TaskActions
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
      currentPage={currentPage}
      totalPages={totalPages}
      totalRecords={totalRecords}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      {...(onAdd ? { onAdd } : {})}
      addLabel="Add Task"
    />
  );
};

export default TaskTable;