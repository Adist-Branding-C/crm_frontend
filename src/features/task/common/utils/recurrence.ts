import { WEEK_DAY_OPTIONS, MONTHLY_LAST_DAY_VALUE } from '../constants/repeatOptions';
import type { RepeatType, RepeatConfig } from '../../task/types/interface';

const REPEAT_TYPE_LABEL: Record<RepeatType, string> = {
  Never: 'Never',
  Daily: 'Daily',
  Weekly: 'Weekly',
  Monthly: 'Monthly',
};

export function repeatTypeLabel(type?: RepeatType | null): string {
  return type ? REPEAT_TYPE_LABEL[type] ?? 'Never' : 'Never';
}

export function getDayOfWeekLabel(dayOfWeek?: number): string {
  const option = WEEK_DAY_OPTIONS.find((o) => String(o.value) === String(dayOfWeek));
  return option?.label ?? '';
}

export function getDayOfMonthLabel(dayOfMonth?: number | 'last'): string {
  if (dayOfMonth === MONTHLY_LAST_DAY_VALUE) return 'last day';
  if (typeof dayOfMonth === 'number' && dayOfMonth >= 1 && dayOfMonth <= 31) {
    const suffix =
      dayOfMonth % 10 === 1 && dayOfMonth % 100 !== 11
        ? 'st'
        : dayOfMonth % 10 === 2 && dayOfMonth % 100 !== 12
          ? 'nd'
          : dayOfMonth % 10 === 3 && dayOfMonth % 100 !== 13
            ? 'rd'
            : 'th';
    return `the ${dayOfMonth}${suffix}`;
  }
  return '';
}

export function getRecurrenceLabel(type?: RepeatType | null, config?: RepeatConfig | null): string {
  const base = repeatTypeLabel(type ?? 'Never');
  if (type === 'Daily') return `Repeats: ${base}`;
  if (type === 'Weekly') {
    const day = getDayOfWeekLabel(config?.dayOfWeek);
    return day ? `Repeats: ${base} on ${day}` : `Repeats: ${base}`;
  }
  if (type === 'Monthly') {
    const day = getDayOfMonthLabel(config?.dayOfMonth);
    return day ? `Repeats: ${base} on ${day}` : `Repeats: ${base}`;
  }
  return `Repeats: ${base}`;
}

export function isRecurring(type?: RepeatType | null): boolean {
  return !!type && type !== 'Never';
}

export function getNextOccurrenceDate(
  fromDate: string,
  type?: RepeatType | null,
  config?: RepeatConfig | null,
): string | null {
  if (!type || type === 'Never' || !fromDate) return null;
  const base = new Date(fromDate + 'T00:00:00');
  const result = new Date(base);

  if (type === 'Daily') {
    result.setDate(result.getDate() + 1);
  } else if (type === 'Weekly' && typeof config?.dayOfWeek === 'number') {
    const targetDay = config.dayOfWeek;
    const currentDay = result.getDay() === 0 ? 7 : result.getDay();
    let daysAhead = targetDay - currentDay;
    if (daysAhead <= 0) daysAhead += 7;
    result.setDate(result.getDate() + daysAhead);
  } else if (type === 'Monthly') {
    const dom = config?.dayOfMonth;
    if (typeof dom === 'number') {
      result.setMonth(result.getMonth() + 1);
      result.setDate(Math.min(dom, 28));
    } else if (dom === MONTHLY_LAST_DAY_VALUE) {
      result.setMonth(result.getMonth() + 1);
      result.setDate(0);
    } else {
      return null;
    }
  } else {
    return null;
  }

  return result.toISOString().split('T')[0] ?? null;
}