import * as yup from 'yup';

const meetingOutcomeValidationSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  status: yup.string().required('Status is required'),
});

export const addMeetingOutcomeValidationSchema = meetingOutcomeValidationSchema;
export const editMeetingOutcomeValidationSchema = meetingOutcomeValidationSchema;
