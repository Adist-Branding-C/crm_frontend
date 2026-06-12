import { useState, useCallback } from 'react';
import type { DealTypeItem, DealTypeFormData } from '../types/deal-type.types';
import { ADD_DEAL_TYPE_INITIAL_VALUES } from '../constants/deal-type.constants';

export function useDealTypeDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<DealTypeItem | null>(null);
  const [formData, setFormData] = useState<DealTypeFormData>(ADD_DEAL_TYPE_INITIAL_VALUES);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setFormData(ADD_DEAL_TYPE_INITIAL_VALUES);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: DealTypeItem) => {
    setEditingItem(item);
    setFormData({ name: item.name || '', status: item.status || '' });
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
    setFormData(ADD_DEAL_TYPE_INITIAL_VALUES);
  }, []);

  const handleFormChange = useCallback((values: DealTypeFormData) => {
    setFormData(values);
  }, []);

  return { showDrawer, editingItem, formData, openAddDrawer, openEditDrawer, closeDrawer, handleFormChange };
}
