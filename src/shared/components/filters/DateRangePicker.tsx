import { useEffect, useState } from 'react';
import { Calendar, ChevronLeft, Check } from 'lucide-react';
import Dropdown from '../Dropdown';
import MiniCalendar from './MiniCalendar';
import { useDropdownState } from '../../hooks/useDropdownState';
import { DATE_RANGE_PRESETS, findMatchingPresetKey } from '../../utils/dateRangePresets';
import { formatFollowUpDateOnly } from '../../utils/dateUtils';
import type { DateRange } from '../../types/common';

interface DateRangePickerProps {
  label: string;
  value: DateRange;
  onChange: (range: DateRange) => void;
}

/**
 * Reusable "Date Range" filter control: a dropdown trigger that opens a
 * preset list (Today, Yesterday, Last 7 Days, This Month, This Year, Last 30
 * Days) plus a "Custom" option that swaps in a calendar for picking an
 * arbitrary start/end. Drop-in replacement for DateRangeFilter's raw
 * start/end date inputs - same `value`/`onChange` shape.
 *
 * Used by:
 * - features/enquiries/components/EnquiriesFilters (Leads page)
 */
const DateRangePicker = ({ label, value, onChange }: DateRangePickerProps) => {
  const dropdown = useDropdownState();
  const [view, setView] = useState<'list' | 'custom'>('list');
  const [pendingStart, setPendingStart] = useState<string | null>(null);
  const [pendingEnd, setPendingEnd] = useState<string | null>(null);

  useEffect(() => {
    if (!dropdown.isOpen) return;
    setView('list');
    setPendingStart(value.start || null);
    setPendingEnd(value.end || null);
  }, [dropdown.isOpen, value.start, value.end]);

  const activePresetKey = findMatchingPresetKey(value);

  const triggerLabel = activePresetKey
    ? DATE_RANGE_PRESETS.find((p) => p.key === activePresetKey)?.label
    : value.start && value.end
      ? `${formatFollowUpDateOnly(value.start)} - ${formatFollowUpDateOnly(value.end)}`
      : 'Select Date Range';

  const applyPreset = (getRange: () => DateRange) => {
    onChange(getRange());
    dropdown.close();
  };

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

  const handleApplyCustom = () => {
    if (!pendingStart || !pendingEnd) return;
    onChange({ start: pendingStart, end: pendingEnd });
    dropdown.close();
  };

  const handleClear = () => {
    onChange({ start: '', end: '' });
    dropdown.close();
  };

  return (
    <div className="filter-group">
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
          </button>
        }
      >
        {view === 'list' ? (
          <>
            <div className="dropdown-header">Date Range</div>
            {DATE_RANGE_PRESETS.map((preset) => (
              <button
                key={preset.key}
                type="button"
                className={`dropdown-item ${activePresetKey === preset.key ? 'selected' : ''}`}
                onClick={() => applyPreset(preset.getRange)}
              >
                <span>{preset.label}</span>
                {activePresetKey === preset.key && <Check size={14} className="check-icon" />}
              </button>
            ))}
            <button type="button" className="dropdown-item" onClick={() => setView('custom')}>
              <span>Custom</span>
            </button>
            <div className="date-range-dropdown-footer">
              <button type="button" className="date-range-clear" onClick={handleClear}>Clear</button>
            </div>
          </>
        ) : (
          <div className="date-range-custom-view">
            <div className="date-range-custom-header">
              <button type="button" className="date-range-back" onClick={() => setView('list')}>
                <ChevronLeft size={16} /> Custom Range
              </button>
            </div>
            <div className="date-range-custom-hint">
              {pendingStart ? formatFollowUpDateOnly(pendingStart) : 'Start date'}
              {' → '}
              {pendingEnd ? formatFollowUpDateOnly(pendingEnd) : 'End date'}
            </div>
            <MiniCalendar rangeStart={pendingStart} rangeEnd={pendingEnd} onSelectDate={handleSelectDate} />
            <div className="date-range-dropdown-footer">
              <button type="button" className="date-range-clear" onClick={() => { setPendingStart(null); setPendingEnd(null); }}>Reset</button>
              <button type="button" className="btn btn-primary date-range-apply" disabled={!pendingStart || !pendingEnd} onClick={handleApplyCustom}>Apply</button>
            </div>
          </div>
        )}
      </Dropdown>
    </div>
  );
};

export default DateRangePicker;
