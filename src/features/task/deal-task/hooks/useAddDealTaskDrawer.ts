import { useState, useCallback } from 'react';

export function useAddDealTaskDrawer(onOpen?: () => void) {
  const [showAddDrawer, setShowAddDrawer] = useState(false);

  const openAddDrawer = useCallback(() => {
    onOpen?.();
    setShowAddDrawer(true);
  }, [onOpen]);
  const closeAddDrawer = useCallback(() => setShowAddDrawer(false), []);

  return { showAddDrawer, openAddDrawer, closeAddDrawer };
}