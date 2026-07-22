import { useMemo } from 'react';
import type { MeetingOutcomeItem, MeetingOutcomeFormData } from '../types/index';
import { ADD_MEETING_OUTCOME_INITIAL_VALUES } from '../constants/index';

/**
 * Derives the Formik initial values for the edit drawer from the item being edited, defaulting
 * status to 'Active' if it's missing. Memoized on editingItem so the add drawer's blank initial
 * values aren't recomputed on every render.
 */
export function useMeetingOutcomeForm(editingItem: MeetingOutcomeItem | null) {
  const editInitialValues: MeetingOutcomeFormData = useMemo(
    () => editingItem
      ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
      : ADD_MEETING_OUTCOME_INITIAL_VALUES,
    [editingItem],
  );

  return { editInitialValues };
}
