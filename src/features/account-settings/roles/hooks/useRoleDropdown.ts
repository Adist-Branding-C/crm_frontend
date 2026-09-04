import { useState, useCallback } from 'react';

export function useRoleDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const toggleDropdown = useCallback((id: string | null) => {
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
