import { useState, useCallback } from 'react';

export function useDealStatusDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = useCallback((key: number | null) => {
    setDropdownOpen(prev => prev === key ? null : key);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(null);
  }, []);

  return { dropdownOpen, setDropdownOpen, toggleDropdown, closeDropdown };
}
