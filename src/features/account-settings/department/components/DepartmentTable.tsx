import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import DepartmentActions from './DepartmentActions';
import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { DepartmentItem, DepartmentTableProps } from '../types';
import type { Column } from '../../../../shared/components/table';

const DepartmentTable = ({
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
}: DepartmentTableProps) => {
  const columns: Column<DepartmentItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Department Name', render: (row) => row.departmentName || row.name || '-' },
    { header: 'Description', accessor: 'description' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <DepartmentActions
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
      addLabel="Add Department"
    />
  );
};

export default DepartmentTable;
