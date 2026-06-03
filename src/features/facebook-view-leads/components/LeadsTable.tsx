import React from 'react';
import { Eye, AlertCircle } from 'lucide-react';
import type { LeadsTableProps } from '../types';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';

const getStatusBadge = (value: string, type: 'status' | 'lead') => {
  const colors: Record<string, string> = { success: '#10b981', failed: '#ef4444', pending: '#f59e0b', New: '#3b82f6', Existing: '#8b5cf6', Duplicate: '#f59e0b' };
  const color = colors[value] || '#6b7280';
  return <span className={`${type}-badge`} style={{ background: `${color}20`, color }}>{value}</span>;
};

const LeadsTable: React.FC<LeadsTableProps> = ({ data, onViewDetails, rowsPerPage, onRowsPerPageChange, onSearchChange }) => (
  <>
    <div className="table-controls">
      <div className="table-controls-left">
        <span className="show-entries">Show entries</span>
        <select value={rowsPerPage} onChange={onRowsPerPageChange}>
          {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="table-controls-right">
        <div className="live-search">
          <input type="text" placeholder="Search..." onChange={(e) => onSearchChange(e.target.value)} />
        </div>
      </div>
    </div>

    {data.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon"><AlertCircle size={48} /></div>
        <p>No Facebook leads found</p>
      </div>
    ) : (
      <div className="leads-table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Workflow Name</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Additional Data</th>
              <th>Status</th>
              <th>Lead Status</th>
              <th>Created At</th>
              <th>Failure Reason</th>
            </tr>
          </thead>
          <tbody>
            {data.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.workflowName}</td>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>
                  <button className="view-data-btn" onClick={() => onViewDetails(lead)}>
                    <Eye size={14} />
                  </button>
                </td>
                <td>{getStatusBadge(lead.status, 'status')}</td>
                <td>{getStatusBadge(lead.leadStatus, 'lead')}</td>
                <td>{lead.createdAt}</td>
                <td>{lead.failureReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </>
);

export default LeadsTable;
