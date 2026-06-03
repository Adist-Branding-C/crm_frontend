import React from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Eye, Edit2, Trash2, Phone, MessageSquare } from 'lucide-react';
import type { DealItem, DealsTableProps } from '../types';
import { DEAL_STATUS_MAP, DEAL_STATUS_LABEL_MAP, DEAL_TYPE_MAP, DEAL_TYPE_LABEL_MAP } from '../../../shared/constants/dealOptions';

const getStatusBadge = (status: string) => {
  const colorMap: Record<string, string> = { won: '#10b981', lost: '#ef4444', pending: '#f59e0b', 'in-progress': '#3b82f6' };
  const color = colorMap[status.toLowerCase()] || '#6b7280';
  const label = DEAL_STATUS_LABEL_MAP[status] || status;
  return <span className="status-badge" style={{ background: `${color}20`, color }}>{label}</span>;
};

const getTypeBadge = (type: string) => {
  const colorMap: Record<string, string> = { 'new': '#8b5cf6', 'renewal': '#3b82f6', 'upgrade': '#10b981' };
  const color = colorMap[type.toLowerCase()] || '#6b7280';
  const label = DEAL_TYPE_LABEL_MAP[type] || type;
  return <span className="type-badge" style={{ background: `${color}20`, color }}>{label}</span>;
};

const DealsTable: React.FC<DealsTableProps> = ({
  data, columns, sortConfig, onSort,
  paginatedIds, selectedIds, onSelectAll, onSelectRow,
  actionMenuOpen, onSetActionMenuOpen, onEdit, onDelete,
}) => {

  return (
    <div className="table-container">
      <table className="enquiries-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={col.sortable ? 'sortable' : ''} onClick={col.sortable ? () => onSort(col.key) : undefined}>
                {col.key === 'checkbox' ? (
                  <input type="checkbox" checked={data.length > 0 && selectedIds.length === data.length} onChange={(e) => onSelectAll(paginatedIds, e.target.checked)} />
                ) : (
                  <>
                    {col.label}
                    {col.sortable && sortConfig.key === col.key && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className={selectedIds.includes(row.id) ? 'selected' : ''}>
              <td><input type="checkbox" checked={selectedIds.includes(row.id)} onChange={() => onSelectRow(row.id)} /></td>
              <td className="action-cell">
                <div className="action-menu-container">
                  <button className="action-btn" onClick={() => onSetActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}>
                    <MoreHorizontal size={16} />
                  </button>
                  {actionMenuOpen === row.id && (
                    <div className="action-dropdown">
                      <button><Eye size={14} /> View Deal</button>
                      <button onClick={() => onEdit(row)}><Edit2 size={14} /> Edit Deal</button>
                      <button><Phone size={14} /> WhatsApp</button>
                      <button><MessageSquare size={14} /> Message</button>
                      <button onClick={() => onDelete(row.id)} className="delete"><Trash2 size={14} /> Delete</button>
                    </div>
                  )}
                </div>
              </td>
              <td>{row.dealId}</td>
              <td className="lead-name-cell">{row.dealName}</td>
              <td>{row.lead}</td>
              <td>{row.mobile}</td>
              <td>₹{Number(row.amount).toLocaleString()}</td>
              <td>{getStatusBadge(row.status)}</td>
              <td>{getTypeBadge(row.type)}</td>
              <td>{row.startDate}</td>
              <td>{row.endDate}</td>
              <td>{row.agent}</td>
              <td>{row.createdBy}</td>
              <td>{row.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealsTable;
