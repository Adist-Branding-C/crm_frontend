import React from 'react';
import { Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { TRow, TCell } from '../../../shared/components/table';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import { formatRelativeDate, formatFollowUpDate } from '../../../shared/utils/dateUtils';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import type { Lead } from '../types';
import type { Column } from '../../../shared/types/table';

const LEAD_PROPERTY_KEYS = new Set([
  'name', 'phone', 'email', 'location', 'assignedTo', 'purpose', 'type',
  'status', 'source',
]);

interface EnquiriesRowActionMenu {
  isOpen: boolean;
  buttonRect: DOMRect | null;
  onOpen: (id: string, rect: DOMRect) => void;
  onClose: () => void;
}

interface EnquiriesRowProps {
  lead: Lead;
  columns: Column[];
  isSelected: boolean;
  onSelectRow: (id: string) => void;
  actionMenu: EnquiriesRowActionMenu;
  onViewLead: (lead: Lead) => void;
  onDeleteLead: (lead: Lead) => void;
}

const getCellContent = (row: Lead, colKey: string, onViewLead: (lead: Lead) => void) => {
  if (colKey === 'name') {
    return { className: 'lead-name-cell', onClick: () => onViewLead(row), children: row.name };
  }
  if (colKey === 'type') {
    return { children: <span className={`badge badge-${badgeClass(row.type)}`}>{row.type}</span> };
  }
  if (colKey === 'status') {
    return { children: <span className={`badge badge-${badgeClass(row.status)}`}>{row.status}</span> };
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

const EnquiriesRow: React.FC<EnquiriesRowProps> = ({ lead, columns, isSelected, onSelectRow, actionMenu, onViewLead, onDeleteLead }) => (
  <TRow className={isSelected ? 'selected' : ''}>
    {columns.map(col => {
      if (col.key === 'checkbox') {
        return (
          <TCell key={col.key}>
            <input type="checkbox" checked={isSelected} onChange={() => onSelectRow(lead.leadId)} />
          </TCell>
        );
      }
      if (col.key === 'action') {
        return (
          <TCell key={col.key} className="action-cell">
            <div className="action-menu-container">
              <button
                className="action-btn"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (actionMenu.isOpen) {
                    actionMenu.onClose();
                  } else {
                    actionMenu.onOpen(lead.leadId, rect);
                  }
                }}
              >
                <MoreHorizontal size={16} />
              </button>
              {actionMenu.isOpen && actionMenu.buttonRect && (
                <ActionDropdownPortal isOpen={actionMenu.isOpen} buttonRect={actionMenu.buttonRect} onClose={actionMenu.onClose}>
                  <button onClick={() => { onDeleteLead(lead); actionMenu.onClose(); }} className="delete">
                    <Trash2 size={14} /> Delete
                  </button>
                  <button onClick={() => { onViewLead(lead); actionMenu.onClose(); }} className="whatsapp">
                    <Eye size={14} /> View Details
                  </button>
                </ActionDropdownPortal>
              )}
            </div>
          </TCell>
        );
      }
      const cell = getCellContent(lead, col.key, onViewLead);
      return (
        <TCell key={col.key} className={cell.className} onClick={cell.onClick} style={cell.onClick ? { cursor: 'pointer' } : undefined}>
          {cell.children}
        </TCell>
      );
    })}
  </TRow>
);

export default React.memo(EnquiriesRow);
