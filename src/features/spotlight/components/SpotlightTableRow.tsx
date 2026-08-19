import { memo, useState } from 'react';
import { MoreHorizontal, Eye } from 'lucide-react';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import CellEditPopover from '../../../shared/components/CellEditPopover';
import { TRow, TCell } from '../../../shared/components/table';
import type { SpotlightTableRowProps } from '../types';
import type { UpdateLeadPayload } from '../../enquiries/types/request';
import type { SpotlightFilterOptions } from '../types/interface';
import { formatDateTime, formatFollowUpDateOnly } from '../../../shared/utils/dateUtils';

type EditableField = 'assignedTo' | 'purpose' | 'type' | 'status' | 'source';

const EDITABLE_FIELD_CONFIG: Record<EditableField, {
  payloadKey: keyof UpdateLeadPayload;
  optionsKey: keyof SpotlightFilterOptions;
  label: string;
}> = {
  assignedTo: { payloadKey: 'agentId', optionsKey: 'agents', label: 'Assigned To' },
  purpose: { payloadKey: 'purposeId', optionsKey: 'purposes', label: 'Purpose' },
  type: { payloadKey: 'typeId', optionsKey: 'leadTypes', label: 'Type' },
  status: { payloadKey: 'statusId', optionsKey: 'statuses', label: 'Status' },
  source: { payloadKey: 'sourceId', optionsKey: 'sources', label: 'Source' },
};

const SpotlightTableRow = memo(
  ({
    row,
    isSelected,
    isMenuOpen,
    onSelectRow,
    onToggleMenu,
    onViewLead,
    fieldOptions,
    onFieldSave,
  }: SpotlightTableRowProps) => {
    const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
    const [editingField, setEditingField] = useState<{ field: EditableField; rect: DOMRect } | null>(null);
    const editableConfig = editingField ? EDITABLE_FIELD_CONFIG[editingField.field] : undefined;

    const emptyCell = (field: EditableField) => (
      <span
        className="lead-cell-empty"
        onClick={(e) => setEditingField({ field, rect: e.currentTarget.getBoundingClientRect() })}
      >
        None
      </span>
    );

    return (
      <>
      <TRow className={isSelected ? 'selected' : ''}>
        <TCell className="action-cell">
          <div className="action-menu-container">
            <button
              className="action-btn"
              aria-label={`Actions for ${row.name}`}
              onClick={(e) => {
                if (!isMenuOpen) {
                  setButtonRect(e.currentTarget.getBoundingClientRect());
                }
                onToggleMenu(!isMenuOpen);
              }}
            >
              <MoreHorizontal size={16} />
            </button>
            {isMenuOpen && buttonRect && (
              <ActionDropdownPortal
                isOpen={isMenuOpen}
                buttonRect={buttonRect}
                onClose={() => onToggleMenu(false)}
              >
                <button onClick={() => { onViewLead(row); onToggleMenu(false); }} className="whatsapp">
                  <Eye size={14} /> View Details
                </button>
              </ActionDropdownPortal>
            )}
          </div>
        </TCell>
      <TCell className="lead-name-cell" onClick={() => onViewLead(row)}>
        {row.name}
      </TCell>
      <TCell>{row.phone}</TCell>
      <TCell>
        <span
          onClick={(e) => {
            e.stopPropagation();
            setEditingField({ field: 'assignedTo', rect: e.currentTarget.getBoundingClientRect() });
          }}
          style={{ cursor: 'pointer' }}
          title="Click to edit Assigned To"
        >
          {row.assignedStaff?.name || <span className="lead-cell-empty">None</span>}
        </span>
      </TCell>
      <TCell>{row.purpose?.purpose || emptyCell('purpose')}</TCell>
      <TCell>
        {row.type?.type ? (
          <span className={`badge badge-${row.type.type.toLowerCase().replace(' ', '-')}`}>
            {row.type.type}
          </span>
        ) : emptyCell('type')}
      </TCell>
      <TCell>
        <span
          onClick={(e) => {
            e.stopPropagation();
            setEditingField({ field: 'status', rect: e.currentTarget.getBoundingClientRect() });
          }}
          style={{ cursor: 'pointer', display: 'inline-block' }}
          title="Click to edit Status"
        >
          {row.status?.status ? (
            <span className={`badge badge-${row.status.status.toLowerCase()}`}>
              {row.status.status}
            </span>
          ) : <span className="lead-cell-empty">None</span>}
        </span>
      </TCell>
      <TCell>{row.source?.source || emptyCell('source')}</TCell>
      <TCell>{formatDateTime(row.createdAt)}</TCell>
      <TCell>{formatDateTime(row.updatedAt)}</TCell>
      <TCell>{formatFollowUpDateOnly(row.nextFollowUpDate)}</TCell>
      </TRow>

      {editingField && editableConfig && (
        <CellEditPopover
          anchorRect={editingField.rect}
          label={editableConfig.label}
          type="select"
          options={fieldOptions[editableConfig.optionsKey]}
          initialValue={
            editingField.field === 'assignedTo' 
              ? row.assignedStaff?.id 
              : editingField.field === 'status' 
              ? row.status?.id 
              : undefined
          }
          onSave={(value) => onFieldSave(String(row.id), { [editableConfig.payloadKey]: value })}
          onClose={() => setEditingField(null)}
        />
      )}
      </>
    );
  },
);

SpotlightTableRow.displayName = 'SpotlightTableRow';

export default SpotlightTableRow;
