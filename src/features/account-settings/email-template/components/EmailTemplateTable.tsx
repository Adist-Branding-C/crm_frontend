import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import EmailTemplateActions from './EmailTemplateActions';
import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { EmailTemplateItem, EmailTemplateTableProps } from '../types';
import type { Column } from '../../../../shared/components/table';

const EmailTemplateTable = ({
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
}: EmailTemplateTableProps) => {
  const columns: Column<EmailTemplateItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Template Name', accessor: 'templateName' },
    { header: 'Subject', accessor: 'subject' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <EmailTemplateActions
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
      addLabel="Add Email Template"
    />
  );
};

export default EmailTemplateTable;
