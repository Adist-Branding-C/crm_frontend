import { useState, useCallback } from 'react';
import type { DealStatusItem, DealStatusFormData } from '../types/deal-status.types';
import { ADD_DEAL_STATUS_INITIAL_VALUES } from '../constants/deal-status.constants';

export function useDealStatusDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<DealStatusItem | null>(null);
  const [formData, setFormData] = useState<DealStatusFormData>(ADD_DEAL_STATUS_INITIAL_VALUES);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setFormData(ADD_DEAL_STATUS_INITIAL_VALUES);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: DealStatusItem) => {
    setEditingItem(item);
    setFormData({ name: item.name || '', status: item.status || '' });
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
    setFormData(ADD_DEAL_STATUS_INITIAL_VALUES);
  }, []);

  const handleFormChange = useCallback((values: DealStatusFormData) => {
    setFormData(values);
  }, []);

  return { showDrawer, editingItem, formData, openAddDrawer, openEditDrawer, closeDrawer, handleFormChange };
}
