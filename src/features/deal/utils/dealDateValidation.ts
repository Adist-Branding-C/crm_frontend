/**
 * Deal-specific date helpers for Start Date / End Date validation.
 *
 * Dates flow through the Deal form as plain `yyyy-MM-dd` strings (native
 * `<input type="date">` value format), so comparisons are done as string
 * comparisons rather than via `Date` objects — this avoids timezone-related
 * off-by-one errors that `new Date(value)` (parsed as UTC midnight) vs
 * `new Date()` (local time) would introduce when checking against "today".
 */
const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isPastDate = (value: string): boolean => {
  if (!value) return false;
  return value < getTodayDateString();
};

export { getTodayDateString, isPastDate };
