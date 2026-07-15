import * as yup from 'yup';
import type { DealAdditionalFieldDef } from '../types/additionalField';

/**
 * Single validation schema shared by the Deal add and edit forms.
 *
 * Used by:
 * - DealForm (via DealPage's add/edit drawers)
 *
 * Notes:
 * - `leadId` and `agentId` are validated as required because the form selects
 *   store IDs, while the shared DealFormData type also carries display names
 *   (`lead`, `assignAgent`) that are derived from the selected option.
 * - `mobile` is required and must be exactly 10 digits.
 * - `startDate` / `endDate` are required; endDate must be >= startDate.
 * - Dynamic `additionalField_<fieldKey>` rules are built from the company's
 *   configured Deal additional fields so the schema stays in sync with them;
 *   frontend validates required-ness only, the backend owns dropdown/type checks.
 */
const BASE_VALIDATION_SHAPE = {
  dealName: yup.string().trim().required('Deal name is required'),
  lead: yup.string().notRequired(),
  leadId: yup.string().required('Lead is required'),
  mobile: yup
    .string()
    .trim()
    .required('Mobile is required')
    .matches(/^\d{10}$/, 'Mobile must be exactly 10 digits'),
  amount: yup.string().trim().required('Amount is required'),
  statusId: yup.string().required('Status is required'),
  typeId: yup.string().required('Type is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup
    .string()
    .required('End date is required')
    .test('is-after-start', 'End date must be after start date', function (value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return new Date(value) >= new Date(startDate);
    }),
  assignAgent: yup.string().notRequired(),
  agentId: yup.string().required('Assign agent is required'),
};

function getAdditionalFieldsValidationShape(fields: DealAdditionalFieldDef[]): Record<string, yup.Schema> {
  const shape: Record<string, yup.Schema> = {};
  for (const field of fields) {
    const key = `additionalField_${field.fieldKey}`;
    shape[key] = field.isRequired
      ? yup.string().trim().required(`${field.fieldName} is required`)
      : yup.string().trim();
  }
  return shape;
}

function getDealValidationSchema(additionalFields: DealAdditionalFieldDef[] = []) {
  return yup.object({
    ...BASE_VALIDATION_SHAPE,
    ...getAdditionalFieldsValidationShape(additionalFields),
  });
}

const dealValidationSchema = getDealValidationSchema();

export { dealValidationSchema, getDealValidationSchema };
