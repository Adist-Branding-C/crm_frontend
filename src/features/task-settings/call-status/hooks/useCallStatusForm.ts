import { useMemo } from 'react';
import type { CallStatusItem, CallStatusFormData } from '../types/index';
import { ADD_CALL_STATUS_INITIAL_VALUES } from '../constants/index';

/**
 * Derives the Formik initial values for the edit drawer from the item being edited, defaulting
 * status to 'Active' if it's missing. Memoized on editingItem so the add drawer's blank initial
 * values aren't recomputed on every render.
 */
export function useCallStatusForm(editingItem: CallStatusItem | null) {
  const editInitialValues: CallStatusFormData = useMemo(
    () => editingItem
      ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
      : ADD_CALL_STATUS_INITIAL_VALUES,
    [editingItem],
  );

  return { editInitialValues };
}
