import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toLocalDateString } from '../../utils/dateUtils';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface CalendarDay {
  date: Date;
  dateStr: string;
  inCurrentMonth: boolean;
}

function buildMonthGrid(year: number, month: number): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const gridStart = new Date(year, month, 1 - firstOfMonth.getDay());

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
    return { date, dateStr: toLocalDateString(date), inCurrentMonth: date.getMonth() === month };
  });
}

export interface MiniCalendarProps {
  /** Range start (YYYY-MM-DD), or null if not yet picked. */
  rangeStart: string | null;
  /** Range end (YYYY-MM-DD), or null if not yet picked. */
  rangeEnd: string | null;
  onSelectDate: (dateStr: string) => void;
  /** Latest date selectable - defaults to today so future dates aren't pickable. */
  maxDate?: string;
}

/**
 * Single-month calendar grid with range highlighting, used by DateRangePicker's
 * "Custom" view. Purely presentational - the caller owns which click sets the
 * range start vs. end.
 */
const MiniCalendar = ({ rangeStart, rangeEnd, onSelectDate, maxDate }: MiniCalendarProps) => {
  const initial = rangeStart ? new Date(rangeStart) : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); } else { setViewMonth((m) => m - 1); }
  };
  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); } else { setViewMonth((m) => m + 1); }
  };

  const days = buildMonthGrid(viewYear, viewMonth);
  const max = maxDate ?? toLocalDateString(new Date());

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-header">
        <button type="button" className="mini-calendar-nav" onClick={goToPrevMonth} aria-label="Previous month">
          <ChevronLeft size={16} />
        </button>
        <span className="mini-calendar-title">{MONTH_LABELS[viewMonth]} {viewYear}</span>
        <button type="button" className="mini-calendar-nav" onClick={goToNextMonth} aria-label="Next month">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="mini-calendar-weekdays">
        {WEEKDAY_LABELS.map((label, i) => <span key={i}>{label}</span>)}
      </div>
      <div className="mini-calendar-grid">
        {days.map(({ dateStr, inCurrentMonth }) => {
          const isDisabled = dateStr > max;
          const isStart = dateStr === rangeStart;
          const isEnd = dateStr === rangeEnd;
          const isInRange = !!rangeStart && !!rangeEnd && dateStr > rangeStart && dateStr < rangeEnd;
          const classNames = [
            'mini-calendar-day',
            !inCurrentMonth && 'muted',
            isDisabled && 'disabled',
            (isStart || isEnd) && 'selected',
            isInRange && 'in-range',
          ].filter(Boolean).join(' ');

          return (
            <button
              type="button"
              key={dateStr}
              className={classNames}
              disabled={isDisabled}
              onClick={() => onSelectDate(dateStr)}
            >
              {Number(dateStr.slice(-2))}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
