import { useState, useCallback } from 'react';

export function useCampaignDropdown() {
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);

  const toggleDropdown = useCallback((id: number | null) => {
    setActionMenuOpen(id);
  }, []);

  const closeDropdown = useCallback(() => {
    setActionMenuOpen(null);
  }, []);

  return {
    actionMenuOpen,
    toggleDropdown,
    closeDropdown,
    setActionMenuOpen,
  };
}
