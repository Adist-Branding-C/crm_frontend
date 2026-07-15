import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import {
  formatRelativeDate,
  formatFollowUpDate,
} from '../../../shared/utils/dateUtils';
import { LABEL_NOT_ASSIGNED } from '../../../shared/constants/labels';
import type { FollowupTableProps } from '../types';

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
  <div className="table-container">
    <table className="enquiries-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={col.sortable ? 'sortable' : ''}
              onClick={col.sortable ? () => onSort(col.key) : undefined}
            >
              {col.label}
              {col.sortable &&
                sortConfig.key === col.key &&
                (sortConfig.direction === 'asc' ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                ))}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length} className="leaddrawer-loading">
              Loading follow-up leads...
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={columns.length} className="leaddrawer-error">
              {error}{' '}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onRetry}
              >
                Retry
              </button>
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="leaddrawer-empty">
              No leads are due for follow-up.
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id}>
              <td
                className="lead-name-cell"
                onClick={() => onViewLead(row)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onViewLead(row);
                  }
                }}
              >
                {row.name}
              </td>
              <td>{row.phone}</td>
              <td>{row.assignedTo || LABEL_NOT_ASSIGNED}</td>
              <td>{row.purpose || '-'}</td>
              <td>
                <span className={`badge badge-${badgeClass(row.type)}`}>
                  {row.type || '-'}
                </span>
              </td>
              <td>
                <span className={`badge badge-${badgeClass(row.status)}`}>
                  {row.status || '-'}
                </span>
              </td>
              <td>{row.source || '-'}</td>
              <td>{formatRelativeDate(row.createdAt)}</td>
              <td>{formatRelativeDate(row.updatedAt)}</td>
              <td>{formatFollowUpDate(row.nextFollowUp)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default FollowupTable;
