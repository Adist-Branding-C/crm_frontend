import React from 'react';
import { RotateCcw, MoreHorizontal } from 'lucide-react';
import { TRow, TCell } from '../../../shared/components/table';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import { formatRelativeDate } from '../../../shared/utils/dateUtils';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import { LABEL_NOT_ASSIGNED } from '../../../shared/constants/labels';
import type { Lead } from '../../enquiries/types';
import type { Column } from '../../../shared/types/table';

const LEAD_PROPERTY_KEYS = new Set([
  'name', 'phone', 'email', 'location', 'assignedTo', 'purpose', 'type',
  'status', 'source', 'deletedBy',
]);

interface DeletedLeadRowActionMenu {
  isOpen: boolean;
  buttonRect: DOMRect | null;
  onOpen: (id: string, rect: DOMRect) => void;
  onClose: () => void;
}

interface DeletedLeadRowProps {
  lead: Lead;
  columns: Column[];
  isSelected: boolean;
  onSelectRow: (id: string) => void;
  actionMenu: DeletedLeadRowActionMenu;
  onRecoverLead: (lead: Lead) => void;
}

const getCellContent = (row: Lead, colKey: string) => {
  if (colKey === 'type') {
    return { children: <span className={`badge badge-${badgeClass(row.type)}`}>{row.type}</span> };
  }
  if (colKey === 'status') {
    return { children: <span className={`badge badge-${badgeClass(row.status)}`}>{row.status}</span> };
  }
  if (colKey === 'createdAt' || colKey === 'updatedAt' || colKey === 'deletedAt') {
    return { children: formatRelativeDate((row as unknown as Record<string, string>)[colKey]) };
  }
  if (colKey === 'assignedTo') {
    return { children: row.assignedTo || LABEL_NOT_ASSIGNED };
  }
  if (LEAD_PROPERTY_KEYS.has(colKey)) {
    return { children: (row as unknown as Record<string, string>)[colKey] || '-' };
  }
  const af = row.additionalFields.find(f => f.name === colKey);
  return { children: af ? af.value : '-' };
};

const DeletedLeadRow: React.FC<DeletedLeadRowProps> = ({ lead, columns, isSelected, onSelectRow, actionMenu, onRecoverLead }) => (
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
                  <button onClick={() => { onRecoverLead(lead); actionMenu.onClose(); }} className="whatsapp">
                    <RotateCcw size={14} /> Recover
                  </button>
                </ActionDropdownPortal>
              )}
            </div>
          </TCell>
        );
      }
      const cell = getCellContent(lead, col.key);
      return (
        <TCell key={col.key}>
          {cell.children}
        </TCell>
      );
    })}
  </TRow>
);

export default React.memo(DeletedLeadRow);
