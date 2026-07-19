import { useState, useCallback } from 'react';
import type { CallStatusItem } from '../types/index';

/**
 * Add/edit drawer open/close state, plus which item (if any) is being edited. The two drawers
 * are independent booleans rather than a single mode flag, so callers must never open both at
 * once; closing the edit drawer also clears the editing item so the form can't flash stale data.
 */
export function useCallStatusDrawer() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<CallStatusItem | null>(null);

  const openAddDrawer = useCallback(() => setShowAddDrawer(true), []);
  const closeAddDrawer = useCallback(() => setShowAddDrawer(false), []);

  const openEditDrawer = useCallback((item: CallStatusItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  return {
    showAddDrawer,
    showEditDrawer,
    editingItem,
    openAddDrawer,
    closeAddDrawer,
    openEditDrawer,
    closeEditDrawer,
  };
}
