import React from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Eye, Edit2, Trash2 } from 'lucide-react';
import type { SpotlightLead, SpotlightTableProps } from '../types';

const SpotlightTable: React.FC<SpotlightTableProps> = ({
  data, columns, sortConfig, onSort,
  paginatedIds, selectedIds, onSelectAll, onSelectRow,
  actionMenuOpen, onSetActionMenuOpen,
  onViewLead,
}) => {

  return (
    <div className="table-container">
      <table className="enquiries-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={col.sortable ? 'sortable' : ''} onClick={col.sortable ? () => onSort(col.key) : undefined}>
                {col.key === 'checkbox' ? (
                  <input type="checkbox" checked={data.length > 0 && selectedIds.length === data.length}
                    onChange={(e) => onSelectAll(paginatedIds, e.target.checked)} />
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
                      <button onClick={() => { onSetActionMenuOpen(null); }}><Eye size={14} /> View</button>
                      <button onClick={() => { onSetActionMenuOpen(null); }}><Edit2 size={14} /> Edit</button>
                      <button className="delete" onClick={() => { onSetActionMenuOpen(null); }}><Trash2 size={14} /> Delete</button>
                    </div>
                  )}
                </div>
              </td>
              <td className="lead-name-cell" onClick={() => onViewLead(row)}>{row.name}</td>
              <td>{row.phone}</td>
              <td>{row.assignedTo}</td>
              <td>{row.purpose}</td>
              <td><span className={`badge badge-${row.type.toLowerCase().replace(' ', '-')}`}>{row.type}</span></td>
              <td><span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
              <td>{row.source}</td>
              <td>{row.createdAt}</td>
              <td>{row.updatedAt}</td>
              <td>{row.nextFollowUp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpotlightTable;
