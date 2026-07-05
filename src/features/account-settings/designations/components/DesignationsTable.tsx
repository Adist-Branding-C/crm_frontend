import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import DesignationActions from './DesignationActions';
import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { DesignationItem, DesignationsTableProps } from '../types';
import type { Column } from '../../../../shared/components/table';

const DesignationsTable = ({
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
}: DesignationsTableProps) => {
  const columns: Column<DesignationItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Designation Name', accessor: 'designationName' },
    { header: 'Description', accessor: 'description' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <DesignationActions
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
      addLabel="Add Designation"
    />
  );
};

export default DesignationsTable;
