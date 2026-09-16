import { useEffect, useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import Dropdown from '../Dropdown';
import MiniCalendar from './MiniCalendar';
import { useDropdownState } from '../../hooks/useDropdownState';
import { formatFollowUpDateOnly } from '../../utils/dateUtils';

interface CustomDateRangeFieldProps {
  label?: string;
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
}

/**
 * Calendar-based "from / to" picker, styled and behaving the same as Lead
 * Export's DateRangePicker "Custom" view (same trigger button, same
 * MiniCalendar, same Apply/Reset footer) - reused here so every Deal Report's
 * Custom Range control looks and feels identical to Lead Export's, instead of
 * two bare native `<input type="date">` elements.
 *
 * Unlike DateRangePicker, this has no preset list of its own - Deal Reports
 * already have their own Period dropdown (Today/This Week/This Month/Custom)
 * for presets, so this only needs to cover the "Custom" sub-picker.
 */
const CustomDateRangeField = ({ label = 'Custom Range', from, to, onChange }: CustomDateRangeFieldProps) => {
  const dropdown = useDropdownState();
  const [pendingStart, setPendingStart] = useState<string | null>(null);
  const [pendingEnd, setPendingEnd] = useState<string | null>(null);

  useEffect(() => {
    if (!dropdown.isOpen) return;
    setPendingStart(from || null);
    setPendingEnd(to || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdown.isOpen]);

  const triggerLabel = from && to
    ? `${formatFollowUpDateOnly(from)} - ${formatFollowUpDateOnly(to)}`
    : 'Select Date Range';

  const handleSelectDate = (dateStr: string) => {
    if (!pendingStart || pendingEnd) {
      setPendingStart(dateStr);
      setPendingEnd(null);
      return;
    }
    if (dateStr < pendingStart) {
      setPendingStart(dateStr);
    } else {
      setPendingEnd(dateStr);
    }
  };

  const handleApply = () => {
    if (!pendingStart || !pendingEnd) return;
    onChange(pendingStart, pendingEnd);
    dropdown.close();
  };

  const handleReset = () => {
    setPendingStart(null);
    setPendingEnd(null);
  };

  return (
    <div className="filter-group" style={{ flex: '1 1 260px', minWidth: '260px' }}>
      <label>{label}</label>
      <Dropdown
        isOpen={dropdown.isOpen}
        isClosing={dropdown.isClosing}
        dropdownRef={dropdown.ref}
        panelClassName="date-range-dropdown"
        trigger={
          <button
            type="button"
            className={`date-range-trigger ${dropdown.isOpen ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); dropdown.toggle(); }}
          >
            <Calendar size={14} />
            <span>{triggerLabel}</span>
            {from && to && <Check size={14} className="check-icon" />}
          </button>
        }
      >
        <div className="date-range-custom-view">
          <div className="date-range-custom-hint">
            {pendingStart ? formatFollowUpDateOnly(pendingStart) : 'Start date'}
            {' → '}
            {pendingEnd ? formatFollowUpDateOnly(pendingEnd) : 'End date'}
          </div>
          <MiniCalendar rangeStart={pendingStart} rangeEnd={pendingEnd} onSelectDate={handleSelectDate} />
          <div className="date-range-dropdown-footer">
            <button type="button" className="date-range-clear" onClick={handleReset}>Reset</button>
            <button type="button" className="btn btn-primary date-range-apply" disabled={!pendingStart || !pendingEnd} onClick={handleApply}>Apply</button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default CustomDateRangeField;
