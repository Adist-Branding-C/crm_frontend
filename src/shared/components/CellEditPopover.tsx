import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Check, Loader2, X } from 'lucide-react';
import type { LabelValuePair } from '../types/common';
import './CellEditPopover.css';

export interface CellEditPopoverProps {
  anchorRect: DOMRect;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: LabelValuePair[];
  initialValue?: string;
  onSave: (value: string) => Promise<boolean>;
  onClose: () => void;
}

const POPOVER_WIDTH = 240;

/**
 * Small portal-positioned popover for setting an empty table cell's value
 * inline, without opening the full record-detail drawer. Positioning follows
 * the same fixed/viewport-clamped pattern as ActionDropdownPortal, kept
 * separate since that component's children-cloning is button-menu specific
 * and not a fit for a form input here.
 *
 * Used by:
 * - EnquiriesRow (Leads), SpotlightTableRow, FollowupTable, TaskRow, DealRow
 *   - all for their "Assigned To" empty-cell click-to-edit affordance.
 */
const CellEditPopover = ({ anchorRect, label, type, options = [], initialValue, onSave, onClose }: CellEditPopoverProps) => {
  const [value, setValue] = useState(initialValue || '');
  const [search, setSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({
    top: -9999,
    left: -9999,
    opacity: 0,
    width: POPOVER_WIDTH,
    visibility: 'hidden',
  });

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  useEffect(() => {
    if (!popoverRef.current) return;

    const margin = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const rect = popoverRef.current.getBoundingClientRect();

    let left = anchorRect.left;
    left = Math.max(margin, Math.min(left, viewportWidth - POPOVER_WIDTH - margin));

    const spaceBelow = viewportHeight - anchorRect.bottom;
    const spaceAbove = anchorRect.top;

    let top: number | undefined;
    let bottom: number | undefined;

    if (spaceBelow >= rect.height + margin) {
      top = anchorRect.bottom + 4;
    } else if (spaceAbove >= rect.height + margin) {
      bottom = viewportHeight - anchorRect.top + 4;
    } else {
      if (spaceBelow > spaceAbove) {
        top = Math.max(margin, Math.min(anchorRect.bottom + 4, viewportHeight - rect.height - margin));
      } else {
        top = Math.max(margin, Math.min(anchorRect.top - rect.height - 4, viewportHeight - rect.height - margin));
      }
    }

    setPopoverStyle({
      ...(top !== undefined ? { top } : {}),
      ...(bottom !== undefined ? { bottom } : {}),
      left,
      opacity: 1,
      visibility: 'visible',
      width: POPOVER_WIDTH,
    });
  }, [anchorRect]);

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
    <div ref={popoverRef} className="cell-edit-popover" style={popoverStyle}>
      <div className="cell-edit-popover-label">{label}</div>
      {type === 'select' ? (
        <div className="cell-edit-popover-select">
          <input
            autoFocus
            type="text"
            placeholder={`Search ${label}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isSaving}
          />
          <div className="cell-edit-popover-options">
            {filteredOptions.map((o) => (
              <div
                key={o.value}
                className={`cell-edit-popover-option ${value === o.value ? 'selected' : ''}`}
                onClick={() => setValue(o.value)}
              >
                {o.label}
              </div>
            ))}
            {filteredOptions.length === 0 && <div className="cell-edit-popover-option empty">No results</div>}
          </div>
        </div>
      ) : (
        <input
          type={type === 'date' ? 'date' : 'text'}
          autoFocus
          value={value}
          placeholder={type === 'date' ? undefined : `Enter ${label}`}
          onChange={(e) => setValue(e.target.value)}
          disabled={isSaving}
        />
      )}
      <div className="cell-edit-popover-actions">
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

export default CellEditPopover;
