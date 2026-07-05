import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import WorkModeActions from './WorkModeActions';
import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { WorkModeItem, StaffWorkModesTableProps } from '../types';
import type { Column } from '../../../../shared/components/table';

const StaffWorkModesTable = ({
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
}: StaffWorkModesTableProps) => {
  const columns: Column<WorkModeItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Work Mode Name', render: (row) => row.workModeName || row.name || '-' },
    { header: 'Description', accessor: 'description' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <WorkModeActions
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
      addLabel="Add Work Mode"
    />
  );
};

export default StaffWorkModesTable;
