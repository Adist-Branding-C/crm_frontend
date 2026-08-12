import { toLocalDateString } from './dateUtils';
import type { DateRange } from '../types/common';

export interface DateRangePreset {
  key: string;
  label: string;
  getRange: () => DateRange;
}

function daysAgo(count: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - count);
  return date;
}

export const DATE_RANGE_PRESETS: DateRangePreset[] = [
  {
    key: 'today',
    label: 'Today',
    getRange: () => {
      const today = toLocalDateString(new Date());
      return { start: today, end: today };
    },
  },
  {
    key: 'yesterday',
    label: 'Yesterday',
    getRange: () => {
      const yesterday = toLocalDateString(daysAgo(1));
      return { start: yesterday, end: yesterday };
    },
  },
  {
    key: 'last7Days',
    label: 'Last 7 Days',
    getRange: () => ({ start: toLocalDateString(daysAgo(6)), end: toLocalDateString(new Date()) }),
  },
  {
    key: 'thisMonth',
    label: 'This Month',
    getRange: () => {
      const now = new Date();
      return { start: toLocalDateString(new Date(now.getFullYear(), now.getMonth(), 1)), end: toLocalDateString(now) };
    },
  },
  {
    key: 'thisYear',
    label: 'This Year',
    getRange: () => {
      const now = new Date();
      return { start: toLocalDateString(new Date(now.getFullYear(), 0, 1)), end: toLocalDateString(now) };
    },
  },
  {
    key: 'last30Days',
    label: 'Last 30 Days',
    getRange: () => ({ start: toLocalDateString(daysAgo(29)), end: toLocalDateString(new Date()) }),
  },
];

/**
 * Finds the preset whose computed range matches the given value, so the
 * trigger button/list can show the active preset as selected instead of
 * falling back to a raw date string.
 */
export function findMatchingPresetKey(value: DateRange): string | null {
  if (!value.start || !value.end) return null;
  const match = DATE_RANGE_PRESETS.find((preset) => {
    const range = preset.getRange();
    return range.start === value.start && range.end === value.end;
  });
  return match?.key ?? null;
}
