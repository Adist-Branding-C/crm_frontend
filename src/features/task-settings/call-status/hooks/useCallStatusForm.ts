import { useMemo } from 'react';
import type { CallStatusItem, CallStatusFormData } from '../types/index';
import { ADD_CALL_STATUS_INITIAL_VALUES } from '../constants/index';

export function useCallStatusForm(editingItem: CallStatusItem | null) {
  const editInitialValues: CallStatusFormData = useMemo(
    () => editingItem
      ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
      : ADD_CALL_STATUS_INITIAL_VALUES,
    [editingItem],
  );

  return { editInitialValues };
}
