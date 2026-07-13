import { useState, useCallback } from 'react';
import type { MeetingOutcomeItem } from '../types/index';

export function useMeetingOutcomeDrawer() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<MeetingOutcomeItem | null>(null);

  const openAddDrawer = useCallback(() => setShowAddDrawer(true), []);
  const closeAddDrawer = useCallback(() => setShowAddDrawer(false), []);

  const openEditDrawer = useCallback((item: MeetingOutcomeItem) => {
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
