import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { MeetingOutcomeFormData, UseMeetingOutcomeFormSubmitParams } from '../types/index';

/**
 * Add/edit submit orchestration for the meeting-outcome drawer: dispatches to add or update,
 * skips the update call when the form is unchanged, and closes the relevant drawer on success.
 */
export function useMeetingOutcomeFormSubmit({
  editingItem,
  closeAddDrawer,
  closeEditDrawer,
  handleAddMeetingOutcome,
  handleUpdateMeetingOutcome,
}: UseMeetingOutcomeFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: MeetingOutcomeFormData,
    helpers: FormikHelpers<MeetingOutcomeFormData>,
  ) => {
    const success = await handleAddMeetingOutcome(values, helpers);
    if (success) closeAddDrawer();
  }, [handleAddMeetingOutcome, closeAddDrawer]);

  const handleEditSubmit = useCallback(async (
    values: MeetingOutcomeFormData,
    helpers: FormikHelpers<MeetingOutcomeFormData>,
  ) => {
    if (!editingItem) return;
    const original: MeetingOutcomeFormData = {
      name: editingItem.name || '',
      status: editingItem.status || 'Active',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateMeetingOutcome(editingItem.id, values, helpers);
    if (success) closeEditDrawer();
  }, [editingItem, handleUpdateMeetingOutcome, closeEditDrawer]);

  return { handleSubmit, handleEditSubmit };
}
