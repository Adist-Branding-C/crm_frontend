import { useState, useCallback } from 'react';

/**
 * Open/closed state for the staff filter's dropdown panel.
 *
 * Used by:
 * - DailyActivityPage (wired to ActivityFilters + useClickOutside).
 */
export function useStaffDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, setIsOpen, close };
}
