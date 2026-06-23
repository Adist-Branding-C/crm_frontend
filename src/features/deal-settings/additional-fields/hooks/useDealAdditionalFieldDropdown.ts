import { useState, useEffect, useCallback } from 'react';

export function useDealAdditionalFieldDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>('down');

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-toggle')) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const toggleDropdown = useCallback((key: string | null) => {
    setDropdownOpen(prev => prev === key ? null : key);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(null);
  }, []);

  return { dropdownOpen, setDropdownOpen, dropdownDirection, setDropdownDirection, toggleDropdown, closeDropdown };
}
