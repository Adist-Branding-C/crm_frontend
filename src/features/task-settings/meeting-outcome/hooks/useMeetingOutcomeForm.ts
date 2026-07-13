import { useMemo } from 'react';
import type { MeetingOutcomeItem, MeetingOutcomeFormData } from '../types/index';
import { ADD_MEETING_OUTCOME_INITIAL_VALUES } from '../constants/index';

export function useMeetingOutcomeForm(editingItem: MeetingOutcomeItem | null) {
  const editInitialValues: MeetingOutcomeFormData = useMemo(
    () => editingItem
      ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
      : ADD_MEETING_OUTCOME_INITIAL_VALUES,
    [editingItem],
  );

  return { editInitialValues };
}
