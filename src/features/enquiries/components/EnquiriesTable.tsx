import React from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Eye, Trash2 } from 'lucide-react';
import type { Lead } from '../types';
import type { Column } from '../../../shared/types/table';
import type { EnquiriesTableProps } from '../types/component.types';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import { formatRelativeDate, formatFollowUpDate } from '../../../shared/utils/dateUtils';

const LEAD_PROPERTY_KEYS = new Set([
  'name', 'phone', 'email', 'location', 'assignedTo', 'purpose', 'type',
  'status', 'source',
]);

const EnquiriesTable: React.FC<EnquiriesTableProps> = ({
  data, columns, sortConfig, onSort,
  paginatedIds, selectedIds, onSelectAll, onSelectRow,
  actionMenuOpen, actionMenuButtonRect, onSetActionMenuOpen, onSetActionMenuButtonRect,
  onViewLead, onEditLead, onDeleteLead,
}) => {

  const getCellContent = (row: Lead, colKey: string) => {
    if (colKey === 'name') {
      return { className: 'lead-name-cell', onClick: () => onViewLead(row), children: row.name };
    }
    if (colKey === 'type') {
      return { children: <span className={`badge badge-${row.type.toLowerCase().replace(' ', '-')}`}>{row.type}</span> };
    }
    if (colKey === 'status') {
      return { children: <span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span> };
    }
    if (colKey === 'createdAt' || colKey === 'updatedAt') {
      return { children: formatRelativeDate((row as unknown as Record<string, string>)[colKey]) };
    }
    if (colKey === 'nextFollowUp') {
      return { children: formatFollowUpDate((row as unknown as Record<string, string>)[colKey]) };
    }
    if (LEAD_PROPERTY_KEYS.has(colKey)) {
      return { children: (row as unknown as Record<string, string>)[colKey] || '-' };
    }
    const af = row.additionalFields.find(f => f.name === colKey);
    return { children: af ? af.value : '-' };
  };

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
              {columns.map(col => {
                if (col.key === 'checkbox') {
                  return (
                    <td key={col.key}>
                      <input type="checkbox" checked={selectedIds.includes(row.id)} onChange={() => onSelectRow(row.id)} />
                    </td>
                  );
                }
                if (col.key === 'action') {
                  return (
                    <td key={col.key} className="action-cell">
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
                  );
                }
                const cell = getCellContent(row, col.key);
                return (
                  <td key={col.key} className={cell.className || ''} onClick={cell.onClick} style={cell.onClick ? { cursor: 'pointer' } : undefined}>
                    {cell.children}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiriesTable;
