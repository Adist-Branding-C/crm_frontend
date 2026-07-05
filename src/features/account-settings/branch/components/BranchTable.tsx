import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import BranchActions from './BranchActions';
import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { BranchItem, BranchTableProps } from '../types';
import type { Column } from '../../../../shared/components/table';

const BranchTable = ({
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
}: BranchTableProps) => {
  const columns: Column<BranchItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Branch Name', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <BranchActions
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
      addLabel="Add Branch"
    />
  );
};

export default BranchTable;
