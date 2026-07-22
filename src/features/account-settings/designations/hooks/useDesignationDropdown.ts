import { useState, useCallback } from 'react';

export function useDesignationDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = useCallback((id: number | null) => {
    setDropdownOpen(id);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(null);
  }, []);

  return {
    dropdownOpen,
    toggleDropdown,
    closeDropdown,
  };
}
