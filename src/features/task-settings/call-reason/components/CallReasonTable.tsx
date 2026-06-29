import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import CallReasonActions from './CallReasonActions';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
import type { CallReasonItem, CallReasonTableProps } from '../types/index';
import type { Column } from '../../../../shared/components/table';

const CallReasonTable = ({
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
}: CallReasonTableProps) => {
  const columns: Column<CallReasonItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Reason', accessor: 'name' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <CallReasonActions
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
      addLabel="Add Reason"
    />
  );
};

export default CallReasonTable;
