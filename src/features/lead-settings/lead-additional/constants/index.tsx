import type { FieldErrorMap, FieldErrorFallback } from '../../../../shared/types/formFieldError.types';

/**
 * "Added By" column header for the lead additional-fields table.
 *
 * Used by:
 * - LeadAdditionalPage
 */
export const LEAD_ADDITIONAL_COLUMN_ADDED_BY = 'Added By';

/**
 * "Field" column header for the lead additional-fields table.
 *
 * Used by:
 * - LeadAdditionalPage
 */
export const LEAD_ADDITIONAL_COLUMN_FIELD = 'Field';

/**
 * "Type" column header for the lead additional-fields table.
 *
 * Used by:
 * - LeadAdditionalPage
 */
export const LEAD_ADDITIONAL_COLUMN_TYPE = 'Type';

/**
 * "Values" column header for the lead additional-fields table.
 *
 * Used by:
 * - LeadAdditionalPage
 */
export const LEAD_ADDITIONAL_COLUMN_VALUES = 'Values';

/**
 * "in filter" column header for the lead additional-fields table.
 *
 * Used by:
 * - LeadAdditionalPage
 */
export const LEAD_ADDITIONAL_COLUMN_IN_FILTER = 'in filter';

/**
 * "in list" column header for the lead additional-fields table.
 *
 * Used by:
 * - LeadAdditionalPage
 */
export const LEAD_ADDITIONAL_COLUMN_IN_LIST = 'in list';

/**
 * "Required" column header for the lead additional-fields table.
 *
 * Used by:
 * - LeadAdditionalPage
 */
export const LEAD_ADDITIONAL_COLUMN_REQUIRED = 'Required';

/**
 * "Purpose" column header for the lead additional-fields table.
 *
 * Used by:
 * - LeadAdditionalPage
 */
export const LEAD_ADDITIONAL_COLUMN_PURPOSE = 'Purpose';

/**
 * Maps backend lead-additional-field field names to frontend Formik field names. The backend's
 * "values" field is the frontend's "dropdownValues" - see AdditionalFieldFormData.
 *
 * Used by:
 * - useLeadAdditionalCrud (create/update error handling, via shared applyFieldErrors)
 */
export const LEAD_ADDITIONAL_FIELD_MAP: FieldErrorMap = {
  name: 'name',
  fieldType: 'fieldType',
  purposeId: 'purposeId',
  values: 'dropdownValues',
};

/**
 * Keyword -> field fallback used when the backend returns a plain message with no field-scoped
 * errors (e.g. a generic "Field name already exists" string). Order matters; first match wins.
 *
 * Used by:
 * - useLeadAdditionalCrud (create/update error handling, via shared applyFieldErrors)
 */
export const LEAD_ADDITIONAL_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'name', field: 'name' },
  { keyword: 'purpose', field: 'purposeId' },
  { keyword: 'type', field: 'fieldType' },
];
