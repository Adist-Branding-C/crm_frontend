import { useState, useCallback } from 'react';

/**
 * Generic single-open-row action-menu state, keyed by an item id.
 *
 * Notes:
 * - Reusable across any list/table with a per-row action menu (edit/delete dropdown).
 *   Previously reimplemented per-feature (account-settings/agent, branch, department,
 *   designations each had an identical local useXDropdown hook); this is the shared version.
 */
export function useDropdownMenu<TId = number>() {
  const [dropdownOpen, setDropdownOpen] = useState<TId | null>(null);

  const toggleDropdown = useCallback((id: TId | null) => {
    setDropdownOpen(id);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(null);
  }, []);

  return { dropdownOpen, toggleDropdown, closeDropdown };
}
