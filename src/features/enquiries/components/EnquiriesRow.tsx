import React, { useState } from 'react';
import { Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { TRow, TCell } from '../../../shared/components/table';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import LeadCellEditPopover from './LeadCellEditPopover';
import { formatRelativeDate, formatFollowUpDate } from '../../../shared/utils/dateUtils';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import { LABEL_NOT_ASSIGNED } from '../../../shared/constants/labels';
import type { Lead } from '../types';
import type { Column } from '../../../shared/types/table';
import type { LabelValuePair } from '../../../shared/types/common';
import type { UpdateLeadPayload } from '../types/request';

const LEAD_PROPERTY_KEYS = new Set([
  'name', 'phone', 'email', 'location', 'assignedTo', 'purpose', 'type',
  'status', 'source',
]);

export interface LeadFieldOptions {
  typeOptions: LabelValuePair[];
  statusOptions: LabelValuePair[];
  sourceOptions: LabelValuePair[];
  purposeOptions: LabelValuePair[];
  staffOptions: LabelValuePair[];
}

// Column key -> the UpdateLeadPayload field it maps to and which option list
// (if any) drives its edit popover. Only columns where an empty value is
// meaningfully fixable inline are covered here - name/phone are required at
// lead creation, so an empty cell there isn't a realistic state.
const EDITABLE_FIELD_CONFIG: Partial<Record<string, {
  payloadKey: keyof UpdateLeadPayload;
  type: 'text' | 'select';
  optionsKey?: keyof LeadFieldOptions;
  label: string;
}>> = {
  location: { payloadKey: 'location', type: 'text', label: 'Location' },
  agentId: { payloadKey: 'agentId', type: 'select', optionsKey: 'staffOptions', label: 'Assigned To' },
  purpose: { payloadKey: 'purposeId', type: 'select', optionsKey: 'purposeOptions', label: 'Purpose' },
  type: { payloadKey: 'typeId', type: 'select', optionsKey: 'typeOptions', label: 'Type' },
  status: { payloadKey: 'statusId', type: 'select', optionsKey: 'statusOptions', label: 'Status' },
  source: { payloadKey: 'sourceId', type: 'select', optionsKey: 'sourceOptions', label: 'Source' },
};

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
  fieldOptions: LeadFieldOptions;
  onFieldSave: (leadId: string, payload: UpdateLeadPayload) => Promise<boolean>;
}

const getCellContent = (row: Lead, colKey: string) => {
  if (colKey === 'type') {
    if (!row.type) return { children: '-', isEmpty: true };
    return { children: <span className={`badge badge-${badgeClass(row.type)}`}>{row.type}</span> };
  }
  if (colKey === 'status') {
    if (!row.status) return { children: '-', isEmpty: true };
    return { children: <span className={`badge badge-${badgeClass(row.status)}`}>{row.status}</span> };
  }
  if (colKey === 'createdAt' || colKey === 'updatedAt') {
    return { children: formatRelativeDate((row as unknown as Record<string, string>)[colKey]) };
  }
  if (colKey === 'nextFollowUpDate') {
    return { children: formatFollowUpDate(row.nextFollowUp) };
  }
  if (colKey === 'agentId') {
    return { children: row.assignedTo || LABEL_NOT_ASSIGNED, isEmpty: !row.assignedTo };
  }
  if (LEAD_PROPERTY_KEYS.has(colKey)) {
    const value = (row as unknown as Record<string, string>)[colKey];
    return { children: value || '-', isEmpty: !value };
  }
  const af = row.additionalFields.find(f => f.name === colKey);
  return { children: af ? af.value : '-' };
};

const EnquiriesRow: React.FC<EnquiriesRowProps> = ({ lead, columns, isSelected, onSelectRow, actionMenu, onViewLead, onDeleteLead, fieldOptions, onFieldSave }) => {
  const [editingCell, setEditingCell] = useState<{ colKey: string; rect: DOMRect } | null>(null);
  const editableConfig = editingCell ? EDITABLE_FIELD_CONFIG[editingCell.colKey] : undefined;

  return (
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
        if (col.key === 'name') {
          return (
            <TCell key={col.key} className="lead-name-cell" onClick={() => onViewLead(lead)} style={{ cursor: 'pointer' }}>
              {lead.name}
            </TCell>
          );
        }

        const cell = getCellContent(lead, col.key);
        const editable = EDITABLE_FIELD_CONFIG[col.key];

        if (cell.isEmpty && editable) {
          return (
            <TCell key={col.key}>
              <span
                className="lead-cell-empty"
                onClick={(e) => setEditingCell({ colKey: col.key, rect: e.currentTarget.getBoundingClientRect() })}
              >
                None
              </span>
            </TCell>
          );
        }

        return (
          <TCell key={col.key}>
            {cell.children}
          </TCell>
        );
      })}

      {editingCell && editableConfig && (
        <LeadCellEditPopover
          anchorRect={editingCell.rect}
          label={editableConfig.label}
          type={editableConfig.type}
          {...(editableConfig.optionsKey ? { options: fieldOptions[editableConfig.optionsKey] } : {})}
          onSave={(value) => onFieldSave(lead.leadId, { [editableConfig.payloadKey]: value })}
          onClose={() => setEditingCell(null)}
        />
      )}
    </TRow>
  );
};

export default React.memo(EnquiriesRow);
