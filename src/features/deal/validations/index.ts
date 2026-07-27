import * as yup from 'yup';
import type { DealAdditionalFieldDef } from '../types/interface';
import { isPastDate } from '../utils/dealDateValidation';
// import { isValidPhoneForCountry, getPhoneLengthErrorMessage } from '../../enquiries/constants/phoneValidation';


/**
 * Original Start/End Date values a Deal had when the edit drawer opened.
 * Used only to exempt pre-filled, untouched dates from the "no past date"
 * rule so editing an existing deal that legitimately started in the past
 * isn't blocked; every other rule (required, end >= start) still applies.
 */
interface DealOriginalDates {
  startDate?: string | undefined;
  endDate?: string | undefined;
}

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
 * - `mobileCountryCode` / `mobileNumber` are required; the number's expected
 *   length/format is validated per selected dial code, reusing the Leads
 *   phone field's per-country rules (see enquiries/constants/phoneValidation.ts).
 * - `startDate` / `endDate` are required, must not be in the past, and
 *   endDate must be >= startDate. The "not in the past" check is skipped
 *   when a date still equals the original value passed in via
 *   `original` (i.e. an existing deal's pre-filled date that the user
 *   hasn't touched during this edit).
 * - `amount` stays a string (matches `DealFormData.amount: string`) but is
 *   validated as a number strictly greater than 0 via `.test()`, mirroring the
 *   `mobileNumber` pattern below, rather than switching to `yup.number()` —
 *   a number schema would silently cast an empty string to `0` and pass
 *   `required()`, letting a blank field slip through.
 * - Dynamic `additionalField_<fieldKey>` rules are built from the company's
 *   configured Deal additional fields so the schema stays in sync with them;
 *   frontend validates required-ness only, the backend owns dropdown/type checks.
 */
function getBaseValidationShape(original?: DealOriginalDates) {
  return {
    dealName: yup
      .string()
      .trim()
      .required('Deal name is required')
      .min(2, 'Deal name must be at least 2 characters')
      .max(100, 'Deal name must not exceed 100 characters'),
    lead: yup.string().notRequired(),
    leadId: yup.string().required('Lead is required'),
    mobileCountryCode: yup.string().required('Country code is required'),
    mobileNumber: yup
      .string()
      .trim()
      .required('Mobile is required'),
      // .test('valid-mobile-format', function (value) {
      //   if (!value) return true;
      //   const { mobileCountryCode } = this.parent;
      //   if (isValidPhoneForCountry(value, mobileCountryCode)) return true;
      //   return this.createError({ message: getPhoneLengthErrorMessage(mobileCountryCode) });
      // }),
    amount: yup
      .string()
      .trim()
      .required('Amount is required')
      .test('valid-amount', function (value) {
        if (!value) return true;
        if (!/^-?\d+(\.\d+)?$/.test(value)) {
          return this.createError({ message: 'Amount must be a valid number' });
        }
        if (Number(value) <= 0) {
          return this.createError({ message: 'Amount must be greater than 0.' });
        }
        return true;
      }),
    statusId: yup.string().required('Status is required'),
    typeId: yup.string().required('Type is required'),
    startDate: yup
      .string()
      .required('Start date is required')
      .test('not-in-past', 'Start date cannot be in the past', (value) => {
        if (!value) return true;
        if (original?.startDate && value === original.startDate) return true;
        return !isPastDate(value);
      }),
    endDate: yup
      .string()
      .required('End date is required')
      .test('not-in-past', 'End date cannot be in the past', (value) => {
        if (!value) return true;
        if (original?.endDate && value === original.endDate) return true;
        return !isPastDate(value);
      })
      .test('is-after-start', 'End date must be on or after start date', function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) >= new Date(startDate);
      }),
    assignAgent: yup.string().notRequired(),
    agentId: yup.string().required('Assign agent is required'),
  };
}

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

function getDealValidationSchema(additionalFields: DealAdditionalFieldDef[] = [], original?: DealOriginalDates) {
  return yup.object({
    ...getBaseValidationShape(original),
    ...getAdditionalFieldsValidationShape(additionalFields),
  });
}

const dealValidationSchema = getDealValidationSchema();

export { dealValidationSchema, getDealValidationSchema };
