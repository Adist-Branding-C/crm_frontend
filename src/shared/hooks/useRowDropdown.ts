import { useState, useCallback } from 'react';

export function useRowDropdown<T = number>() {
  const [dropdownOpen, setDropdownOpen] = useState<T | null>(null);

  const toggleDropdown = useCallback((id: T | null) => setDropdownOpen(id), []);

  return { dropdownOpen, toggleDropdown };
}
