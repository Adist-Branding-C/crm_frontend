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
  .max(500, 'Description must not exceed 500 characters');

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

const campaignValidationSchema = yup.object({
  type: typeValidation,
  name: yup.string().when('type', {
    is: 'Lead Campaign',
    then: (schema) => nameValidation,
    otherwise: (schema) => schema.notRequired(),
  }),
  startDate: yup.string(),
  endDate: yup.string().when('type', {
    is: 'Lead Campaign',
    then: (schema) =>
      schema.test(
        'end-date-not-before-start',
        'End date cannot be earlier than Start date',
        function (value) {
          const { startDate } = this.parent;
          if (!value || !startDate) return true;
          return new Date(value) >= new Date(startDate);
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

export const addCampaignValidationSchema = campaignValidationSchema;
export const editCampaignValidationSchema = campaignValidationSchema;
