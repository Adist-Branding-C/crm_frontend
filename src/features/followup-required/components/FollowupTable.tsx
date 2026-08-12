import React from 'react';
import SortableTable from '../../../shared/components/table/SortableTable';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import {
  formatRelativeDate,
  formatFollowUpDateOnly,
} from '../../../shared/utils/dateUtils';
import FollowupEditableCell from './FollowupEditableCell';
import type { UpdateLeadPayload } from '../../enquiries/types/request';
import type { FollowupLead, FollowupTableProps, FollowupFieldOptions } from '../types';

// Column key -> cell content. Keeps SortableTable generic (it just calls this
// per row/column) while all follow-up-specific formatting (badges, relative
// dates) stays here.
const renderCell = (
  row: FollowupLead,
  columnKey: string,
  fieldOptions: FollowupFieldOptions,
  onFieldSave: (leadId: string, payload: UpdateLeadPayload) => Promise<boolean>,
): React.ReactNode => {
  switch (columnKey) {
    case 'name':
      return row.name;
    case 'phone':
      return row.phone;
    case 'assignedTo':
      return (
        <FollowupEditableCell
          leadId={row.leadId}
          value={row.assignedTo}
          label="Assigned To"
          payloadKey="agentId"
          options={fieldOptions.staffOptions}
          onFieldSave={onFieldSave}
        />
      );
    case 'purpose':
      return (
        <FollowupEditableCell
          leadId={row.leadId}
          value={row.purpose}
          label="Purpose"
          payloadKey="purposeId"
          options={fieldOptions.purposeOptions}
          onFieldSave={onFieldSave}
        />
      );
    case 'type':
      return (
        <FollowupEditableCell
          leadId={row.leadId}
          value={row.type}
          label="Type"
          payloadKey="typeId"
          options={fieldOptions.typeOptions}
          onFieldSave={onFieldSave}
          renderValue={(v) => <span className={`badge badge-${badgeClass(v)}`}>{v}</span>}
        />
      );
    case 'status':
      return (
        <FollowupEditableCell
          leadId={row.leadId}
          value={row.status}
          label="Status"
          payloadKey="statusId"
          options={fieldOptions.statusOptions}
          onFieldSave={onFieldSave}
          renderValue={(v) => <span className={`badge badge-${badgeClass(v)}`}>{v}</span>}
        />
      );
    case 'source':
      return (
        <FollowupEditableCell
          leadId={row.leadId}
          value={row.source}
          label="Source"
          payloadKey="sourceId"
          options={fieldOptions.sourceOptions}
          onFieldSave={onFieldSave}
        />
      );
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
  fieldOptions,
  onFieldSave,
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
    renderCell={(row, columnKey) => renderCell(row, columnKey, fieldOptions, onFieldSave)}
    onRowClick={onViewLead}
  />
);

export default FollowupTable;
