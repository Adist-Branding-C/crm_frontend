import { useState, useCallback } from 'react';

export function useRowDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = useCallback((id: number | null) => setDropdownOpen(id), []);

  return { dropdownOpen, toggleDropdown };
}
