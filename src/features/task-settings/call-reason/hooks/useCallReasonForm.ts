import { useMemo } from 'react';
import type { CallReasonItem, CallReasonFormData } from '../types/index';
import { ADD_CALL_REASON_INITIAL_VALUES } from '../constants/index';

export function useCallReasonForm(editingItem: CallReasonItem | null) {
  const editInitialValues: CallReasonFormData = useMemo(
    () => editingItem
      ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
      : ADD_CALL_REASON_INITIAL_VALUES,
    [editingItem],
  );

  return { editInitialValues };
}
