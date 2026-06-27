import React from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Eye, Edit2, Trash2, Phone, MessageSquare } from 'lucide-react';
import type { Lead, EnquiriesTableProps } from '../types';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';


const EnquiriesTable: React.FC<EnquiriesTableProps> = ({
  data, columns, sortConfig, onSort,
  paginatedIds, selectedIds, onSelectAll, onSelectRow,
  actionMenuOpen, actionMenuButtonRect, onSetActionMenuOpen, onSetActionMenuButtonRect,
  onViewLead, onEditLead, onDeleteLead,
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
                  <button className="action-btn" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    if (actionMenuOpen === row.id) {
                      onSetActionMenuOpen(null);
                      onSetActionMenuButtonRect(null);
                    } else {
                      onSetActionMenuOpen(row.id);
                      onSetActionMenuButtonRect(rect);
                    }
                  }}>
                    <MoreHorizontal size={16} />
                  </button>
                  {actionMenuOpen === row.id && actionMenuButtonRect && (
                    <ActionDropdownPortal isOpen={actionMenuOpen === row.id} buttonRect={actionMenuButtonRect} onClose={() => { onSetActionMenuOpen(null); onSetActionMenuButtonRect(null); }}>
                      <button onClick={() => { onEditLead(row); onSetActionMenuOpen(null); onSetActionMenuButtonRect(null); }}>
                        <Edit2 size={14} /> Edit
                      </button>
                      <button onClick={() => { onDeleteLead(row); onSetActionMenuOpen(null); onSetActionMenuButtonRect(null); }} className="delete">
                        <Trash2 size={14} /> Delete
                      </button>
                      <button onClick={() => { onViewLead(row); onSetActionMenuOpen(null); onSetActionMenuButtonRect(null); }} className="whatsapp">
                        <Eye size={14} /> View Details
                      </button>
                    </ActionDropdownPortal>
                  )}
                </div>
              </td>
              <td className="lead-name-cell" onClick={() => onViewLead(row)}>{row.name}</td>
              <td>{row.phone}</td>
              <td>{row.location}</td>
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

export default EnquiriesTable;
