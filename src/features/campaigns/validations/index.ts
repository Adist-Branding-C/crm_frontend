import * as yup from 'yup';

const typeValidation = yup.string().required('Please select a campaign type');

const nameValidation = yup
  .string()
  .trim()
  .required('Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters');

const descriptionValidation = yup
  .string()
  .trim()
  .required('Description is required')
  .max(500, 'Description cannot exceed 500 characters');

const poolNameValidation = yup
  .string()
  .trim()
  .required('Pool Name is required')
  .min(2, 'Pool Name must be at least 2 characters')
  .max(100, 'Pool Name must not exceed 100 characters');

const agentsValidation = yup
  .array()
  .of(yup.string())
  .min(1, 'Select at least one agent');

/**
 * Validation schema for creating and editing a campaign.
 *
 * Used by:
 * - CampaignForm (shared by the Add Campaign and Edit Campaign drawers on CampaignsPage)
 *
 * Notes:
 * - A single schema covers both create and edit since the two forms share the
 *   exact same field shape (CampaignFormData) and conditional rules.
 * - Fields are conditionally required based on `type`: Lead Campaign requires
 *   name/agents/startDate/endDate/description, Data Pool requires poolName/poolAgents.
 * - End date is validated against start date on the frontend for immediate
 *   feedback; the backend re-validates all fields on submit.
 */
const campaignValidationSchema = yup.object({
  type: typeValidation,
  name: yup.string().when('type', {
    is: 'Lead Campaign',
    then: (schema) => nameValidation,
    otherwise: (schema) => schema.notRequired(),
  }),
  startDate: yup.string().when('type', {
    is: 'Lead Campaign',
    then: (schema) =>
      schema
        .required('Start date is required')
        .test(
          'not-in-past',
          'Start date cannot be in the past',
          function (value) {
            if (!value) return true;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const input = new Date(value);
            input.setHours(0, 0, 0, 0);
            return input >= today;
          },
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  endDate: yup.string().when('type', {
    is: 'Lead Campaign',
    then: (schema) =>
      schema
        .required('End date is required')
        .test(
          'not-before-start',
          'End date must be after start date',
          function (value) {
            const { startDate } = this.parent;
            if (!value || !startDate) return true;
            return new Date(value) > new Date(startDate);
          },
        )
        .test(
          'not-in-past',
          'End date cannot be in the past',
          function (value) {
            if (!value) return true;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const input = new Date(value);
            input.setHours(0, 0, 0, 0);
            return input >= today;
          },
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  description: yup.string().when('type', {
    is: 'Lead Campaign',
    then: (schema) => descriptionValidation,
    otherwise: (schema) => schema.notRequired(),
  }),
  agents: yup.array().of(yup.string()).when('type', {
    is: 'Lead Campaign',
    then: (schema) => agentsValidation,
    otherwise: (schema) => schema.notRequired(),
  }),
  poolName: yup.string().when('type', {
    is: 'Data Pool',
    then: (schema) => poolNameValidation,
    otherwise: (schema) => schema.notRequired(),
  }),
  poolAgents: yup.array().of(yup.string()).when('type', {
    is: 'Data Pool',
    then: (schema) => agentsValidation,
    otherwise: (schema) => schema.notRequired(),
  }),
});

export { campaignValidationSchema };
