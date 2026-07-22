import * as yup from 'yup';

const nameValidation = yup
  .string()
  .trim()
  .required('Outcome is required')
  .min(2, 'Outcome must be at least 2 characters')
  .max(100, 'Outcome must not exceed 100 characters');

/**
 * Validation schema for creating and editing a meeting outcome.
 *
 * Used by:
 * - MeetingOutcomeForm (meeting-outcome add/edit drawer)
 *
 * Notes:
 * - The same schema is reused for both add and edit modes; no field differs between them.
 * - Checks format and required-ness only; the backend re-validates on submit.
 */
const meetingOutcomeValidationSchema = yup.object({
  name: nameValidation,
  status: yup.string().required('Please select a status'),
});

export const addMeetingOutcomeValidationSchema = meetingOutcomeValidationSchema;
export const editMeetingOutcomeValidationSchema = meetingOutcomeValidationSchema;
