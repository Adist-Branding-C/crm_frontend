import React from 'react';
import SortableTable from '../../../shared/components/table/SortableTable';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import {
  formatRelativeDate,
  formatFollowUpDateOnly,
} from '../../../shared/utils/dateUtils';
import { LABEL_NOT_ASSIGNED } from '../../../shared/constants/labels';
import type { FollowupLead, FollowupTableProps } from '../types';

// Column key -> cell content. Keeps SortableTable generic (it just calls this
// per row/column) while all follow-up-specific formatting (badges, relative
// dates) stays here.
const renderCell = (row: FollowupLead, columnKey: string): React.ReactNode => {
  switch (columnKey) {
    case 'name':
      return row.name;
    case 'phone':
      return row.phone;
    case 'assignedTo':
      return row.assignedTo || LABEL_NOT_ASSIGNED;
    case 'purpose':
      return row.purpose || '-';
    case 'type':
      return <span className={`badge badge-${badgeClass(row.type)}`}>{row.type || '-'}</span>;
    case 'status':
      return <span className={`badge badge-${badgeClass(row.status)}`}>{row.status || '-'}</span>;
    case 'source':
      return row.source || '-';
    case 'createdAt':
      return formatRelativeDate(row.createdAt);
    case 'updatedAt':
      return formatRelativeDate(row.updatedAt);
    case 'nextFollowUp':
      return formatFollowUpDateOnly(row.nextFollowUp);
    default:
      return '-';
  }
};

const FollowupTable: React.FC<FollowupTableProps> = ({
  data,
  columns,
  sortConfig,
  onSort,
  isLoading,
  error,
  onRetry,
  onViewLead,
}) => (
  <SortableTable
    data={data}
    columns={columns}
    sortConfig={sortConfig}
    onSort={onSort}
    isLoading={isLoading}
    error={error}
    onRetry={onRetry}
    emptyMessage="No leads are due for follow-up."
    keyExtractor={(row) => row.id}
    renderCell={renderCell}
    onRowClick={onViewLead}
  />
);

export default FollowupTable;
