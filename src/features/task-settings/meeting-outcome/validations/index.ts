import * as yup from 'yup';

const nameValidation = yup
  .string()
  .trim()
  .required('Outcome is required')
  .min(2, 'Outcome must be at least 2 characters')
  .max(100, 'Outcome must not exceed 100 characters');

const meetingOutcomeValidationSchema = yup.object({
  name: nameValidation,
  status: yup.string().required('Please select a status'),
});

export const addMeetingOutcomeValidationSchema = meetingOutcomeValidationSchema;
export const editMeetingOutcomeValidationSchema = meetingOutcomeValidationSchema;
