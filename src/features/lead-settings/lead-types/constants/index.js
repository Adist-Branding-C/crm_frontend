/**
 * Blank Formik initial state for LeadTypeForm's "add" mode.
 *
 * Used by:
 * - LeadTypesPage (useEditDrawer, seeds the drawer in add mode)
 */
export const EMPTY_LEAD_TYPE_FORM_DATA = { type: '' };
/**
 * Toolbar button label for opening the add-lead-type drawer.
 *
 * Used by:
 * - LeadTypesPage
 */
export const ADD_LEAD_TYPE_LABEL = 'Add Lead Type';
/**
 * "Added by" column header for the lead types table.
 *
 * Used by:
 * - LeadTypesPage
 */
export const LEAD_TYPE_COLUMN_ADDED_BY = 'Added By';
/**
 * "Lead type" column header for the lead types table.
 *
 * Used by:
 * - LeadTypesPage
 */
export const LEAD_TYPE_COLUMN_TYPE = 'Lead Type';
/**
 * Label for LeadTypeForm's single "type" input.
 *
 * Used by:
 * - LeadTypeForm
 */
export const LEAD_TYPE_FIELD_LABEL = 'Lead Type';
/**
 * Placeholder text for LeadTypeForm's single "type" input.
 *
 * Used by:
 * - LeadTypeForm
 */
export const LEAD_TYPE_FIELD_PLACEHOLDER = 'Enter lead type';
/**
 * Maps backend lead-type field names to frontend Formik field names.
 *
 * Used by:
 * - useLeadTypeCrud (create/update lead type error handling, via shared applyFieldErrors)
 */
export const LEAD_TYPE_FIELD_MAP = {
    type: 'type',
};
/**
 * Keyword -> field fallback used when the backend returns a plain message with no field-scoped
 * errors (e.g. a generic "Lead type already exists" string). Order matters; first match wins.
 *
 * Used by:
 * - useLeadTypeCrud (create/update lead type error handling, via shared applyFieldErrors)
 */
export const LEAD_TYPE_FIELD_ERROR_FALLBACKS = [
    { keyword: 'type', field: 'type' },
];
//# sourceMappingURL=index.js.map