import { useState, type ReactNode } from 'react';
import CellEditPopover from '../../../shared/components/CellEditPopover';
import type { LabelValuePair } from '../../../shared/types/common';
import type { UpdateLeadPayload } from '../../enquiries/types/request';

interface FollowupEditableCellProps {
  leadId: string;
  value: string;
  label: string;
  payloadKey: keyof UpdateLeadPayload;
  options: LabelValuePair[];
  onFieldSave: (leadId: string, payload: UpdateLeadPayload) => Promise<boolean>;
  renderValue?: (value: string) => ReactNode;
}

/**
 * Click-to-edit cell for the Follow Up table's lead-derived, often-empty
 * fields (Assigned To, Purpose, Type, Status, Source) - mirrors
 * EnquiriesRow's empty-cell popover, but standalone since FollowupTable's
 * renderCell is a stateless per-column switch, not a per-row component.
 */
const FollowupEditableCell = ({ leadId, value, label, payloadKey, options, onFieldSave, renderValue }: FollowupEditableCellProps) => {
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  if (value) {
    return <>{renderValue ? renderValue(value) : value}</>;
  }

  return (
    <>
      <span
        className="lead-cell-empty"
        onClick={(e) => {
          e.stopPropagation();
          setAnchorRect(e.currentTarget.getBoundingClientRect());
        }}
      >
        None
      </span>
      {anchorRect && (
        <CellEditPopover
          anchorRect={anchorRect}
          label={label}
          type="select"
          options={options}
          onSave={(v) => onFieldSave(leadId, { [payloadKey]: v })}
          onClose={() => setAnchorRect(null)}
        />
      )}
    </>
  );
};

export default FollowupEditableCell;
