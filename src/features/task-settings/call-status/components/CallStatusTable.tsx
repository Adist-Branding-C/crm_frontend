import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import CallStatusActions from './CallStatusActions';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
import type { CallStatusItem, CallStatusTableProps } from '../types/index';
import type { Column } from '../../../../shared/components/table';

const CallStatusTable = ({
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
}: CallStatusTableProps) => {
  const columns: Column<CallStatusItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Name', accessor: 'name' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <CallStatusActions
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
      addLabel="Add Call Status"
    />
  );
};

export default CallStatusTable;
