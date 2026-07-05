import { useState, useCallback } from 'react';

export function useAddWorkModeDrawer() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);

  const openAddDrawer = useCallback(() => setShowAddDrawer(true), []);
  const closeAddDrawer = useCallback(() => setShowAddDrawer(false), []);

  return { showAddDrawer, openAddDrawer, closeAddDrawer };
}
