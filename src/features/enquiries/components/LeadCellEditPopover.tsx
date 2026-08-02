import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Check, Loader2, X } from 'lucide-react';
import type { LabelValuePair } from '../../../shared/types/common';
import './LeadCellEditPopover.css';

export interface LeadCellEditPopoverProps {
  anchorRect: DOMRect;
  label: string;
  type: 'text' | 'select';
  options?: LabelValuePair[];
  onSave: (value: string) => Promise<boolean>;
  onClose: () => void;
}

const POPOVER_WIDTH = 240;

/**
 * Small portal-positioned popover for setting an empty leads-table cell's
 * value inline, without opening the full lead-detail drawer. Positioning
 * follows the same fixed/viewport-clamped pattern as ActionDropdownPortal,
 * kept separate since that component's children-cloning is button-menu
 * specific and not a fit for a form input here.
 *
 * Used by:
 * - EnquiriesRow (opened by clicking an empty, underlined cell)
 */
const LeadCellEditPopover = ({ anchorRect, label, type, options = [], onSave, onClose }: LeadCellEditPopoverProps) => {
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const position = (() => {
    const margin = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let left = anchorRect.left;
    left = Math.max(margin, Math.min(left, viewportWidth - POPOVER_WIDTH - margin));
    const top = Math.min(anchorRect.bottom + 4, viewportHeight - margin - 120);
    return { top, left };
  })();

  const handleSave = useCallback(async () => {
    if (!value) return;
    setIsSaving(true);
    const success = await onSave(value);
    setIsSaving(false);
    if (success) onClose();
  }, [value, onSave, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div ref={popoverRef} className="lead-cell-edit-popover" style={{ top: position.top, left: position.left, width: POPOVER_WIDTH }}>
      <div className="lead-cell-edit-popover-label">{label}</div>
      {type === 'select' ? (
        <select autoFocus value={value} onChange={(e) => setValue(e.target.value)} disabled={isSaving}>
          <option value="">Select {label}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          autoFocus
          value={value}
          placeholder={`Enter ${label}`}
          onChange={(e) => setValue(e.target.value)}
          disabled={isSaving}
        />
      )}
      <div className="lead-cell-edit-popover-actions">
        <button type="button" onClick={handleSave} disabled={isSaving || !value} title="Save">
          {isSaving ? <Loader2 size={14} className="spin" /> : <Check size={14} />}
        </button>
        <button type="button" onClick={onClose} disabled={isSaving} title="Cancel">
          <X size={14} />
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default LeadCellEditPopover;
