/**
 * Blank Formik initial state for LeadSourceForm's "add" mode.
 *
 * Used by:
 * - LeadSourcePage (useEditDrawer, seeds the drawer in add mode)
 */
export const EMPTY_LEAD_SOURCE_FORM_DATA = { source: '' };
/**
 * Toolbar button label for opening the add-lead-source drawer.
 *
 * Used by:
 * - LeadSourcePage
 */
export const ADD_LEAD_SOURCE_LABEL = 'Add Lead Source';
/**
 * "Added by" column header for the lead sources table.
 *
 * Used by:
 * - LeadSourcePage
 */
export const LEAD_SOURCE_COLUMN_ADDED_BY = 'Added By';
/**
 * "Source" column header for the lead sources table.
 *
 * Used by:
 * - LeadSourcePage
 */
export const LEAD_SOURCE_COLUMN_SOURCE = 'Source';
/**
 * Label for LeadSourceForm's single "source" input.
 *
 * Used by:
 * - LeadSourceForm
 */
export const LEAD_SOURCE_FIELD_LABEL = 'Source';
/**
 * Placeholder text for LeadSourceForm's single "source" input.
 *
 * Used by:
 * - LeadSourceForm
 */
export const LEAD_SOURCE_FIELD_PLACEHOLDER = 'Enter source';
/**
 * Maps backend lead-source field names to frontend Formik field names.
 *
 * Used by:
 * - useLeadSourceCrud (create/update lead source error handling, via shared applyFieldErrors)
 */
export const LEAD_SOURCE_FIELD_MAP = {
    source: 'source',
};
/**
 * Keyword -> field fallback used when the backend returns a plain message with no field-scoped
 * errors (e.g. a generic "Lead source already exists" string). Order matters; first match wins.
 *
 * Used by:
 * - useLeadSourceCrud (create/update lead source error handling, via shared applyFieldErrors)
 */
export const LEAD_SOURCE_FIELD_ERROR_FALLBACKS = [
    { keyword: 'source', field: 'source' },
];
//# sourceMappingURL=index.js.map