import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import AgentActions from './AgentActions';
import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { AgentItem, AgentTableProps } from '../types';
import type { Column } from '../../../../shared/components/table';

const AgentTable = ({
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
}: AgentTableProps) => {
  const columns: Column<AgentItem>[] = useMemo(() => [
    { header: 'Sl No' },
    {
      header: 'Full Name',
      render: (row) => row.fullName || row.name || '-',
    },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Phone',
      render: (row) => row.phone || row.phone_number || row.phoneNumber || row.mobile || '-',
    },
    {
      header: 'Department',
      render: (row) => row.department?.name || '-',
    },
    {
      header: 'Designation',
      render: (row) => row.designation?.designationName || '-',
    },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <AgentActions
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
      addLabel="Add Agent"
    />
  );
};

export default AgentTable;
