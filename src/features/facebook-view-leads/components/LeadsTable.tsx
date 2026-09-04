import React from 'react';
import { Eye, AlertCircle } from 'lucide-react';
import type { LeadsTableProps } from '../types';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { tint } from '../../../shared/utils/color';

const STATUS_COLORS: Record<string, string> = {
  processed: 'var(--success)',
  failed: 'var(--danger)',
  processing: 'var(--warning)',
  received: 'var(--info)',
};

const getStatusBadge = (value: string) => {
  const color = STATUS_COLORS[value] || 'var(--text-tertiary)';
  return <span className="status-badge" style={{ background: tint(color), color }}>{value}</span>;
};

// Best-effort guess at a display name from the raw Facebook answers - there's
// no fixed "name" column on a lead event, only whatever the Workflow's
// mapping captured under a Facebook question key.
const guessName = (rawFieldData: Record<string, string> | null): string => {
  if (!rawFieldData) return '-';
  const key = Object.keys(rawFieldData).find((k) => /name/i.test(k));
  return (key ? rawFieldData[key] : undefined) ?? '-';
};

const LeadsTable: React.FC<LeadsTableProps> = ({ data, onViewDetails, rowsPerPage, onRowsPerPageChange, loading }) => (
  <>
    <div className="table-controls">
      <div className="table-controls-left">
        <span className="show-entries">Show entries</span>
        <select value={rowsPerPage} onChange={onRowsPerPageChange}>
          {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    </div>

    {loading ? (
      <div className="empty-state"><p>Loading…</p></div>
    ) : data.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon"><AlertCircle size={48} /></div>
        <p>No Facebook leads found</p>
      </div>
    ) : (
      <div className="leads-table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Workflow Name</th>
              <th>Name (best guess)</th>
              <th>Status</th>
              <th>CRM Lead</th>
              <th>Created At</th>
              <th>Error</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map(lead => (
              <tr key={lead.id}>
                <td>{lead.workflowName}</td>
                <td>{guessName(lead.rawFieldData)}</td>
                <td>{getStatusBadge(lead.status)}</td>
                <td>{lead.leadId || '-'}</td>
                <td>{new Date(lead.createdAt).toLocaleString()}</td>
                <td>{lead.errorMessage || '-'}</td>
                <td>
                  <button className="view-data-btn" onClick={() => onViewDetails(lead)}>
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </>
);

export default LeadsTable;
