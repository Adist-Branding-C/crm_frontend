/**
 * Blank Formik initial state for LeadStatusForm's "add" mode.
 *
 * Used by:
 * - LeadStatusPage (useEditDrawer, seeds the drawer in add mode)
 */
export const EMPTY_LEAD_STATUS_FORM_DATA = { status: '', color: '#3b82f6', useForConversion: false };
/**
 * Toolbar button label for opening the add-lead-status drawer.
 *
 * Used by:
 * - LeadStatusPage
 */
export const ADD_LEAD_STATUS_LABEL = 'Add Status';
/**
 * "Added By" column header for the lead statuses table.
 *
 * Used by:
 * - LeadStatusPage
 */
export const LEAD_STATUS_COLUMN_ADDED_BY = 'Added By';
/**
 * "Status" column header for the lead statuses table.
 *
 * Used by:
 * - LeadStatusPage
 */
export const LEAD_STATUS_COLUMN_STATUS = 'Status';
/**
 * "Color" column header for the lead statuses table.
 *
 * Used by:
 * - LeadStatusPage
 */
export const LEAD_STATUS_COLUMN_COLOR = 'Color';
/**
 * "Use for Conversion Metrics" column header for the lead statuses table.
 *
 * Used by:
 * - LeadStatusPage
 */
export const LEAD_STATUS_COLUMN_CONVERSION = 'Use for Conversion Metrics';
/**
 * Label for LeadStatusForm's "status" input.
 *
 * Used by:
 * - LeadStatusForm
 */
export const LEAD_STATUS_FIELD_LABEL = 'Status';
/**
 * Placeholder text for LeadStatusForm's "status" input.
 *
 * Used by:
 * - LeadStatusForm
 */
export const LEAD_STATUS_FIELD_PLACEHOLDER = 'Enter status name';
/**
 * Label for LeadStatusForm's "color" input.
 *
 * Used by:
 * - LeadStatusForm
 */
export const LEAD_STATUS_COLOR_FIELD_LABEL = 'Color';
/**
 * Label for LeadStatusForm's "use for conversion" switch.
 *
 * Used by:
 * - LeadStatusForm
 */
export const LEAD_STATUS_CONVERSION_FIELD_LABEL = 'Use for Conversion Metrics';
/**
 * Maps backend lead-status field names to frontend Formik field names.
 *
 * Used by:
 * - useLeadStatusCrud (create/update lead status error handling, via shared applyFieldErrors)
 */
export const LEAD_STATUS_FIELD_MAP = {
    status: 'status',
    color: 'color',
    conversion: 'useForConversion',
};
/**
 * Keyword -> field fallback used when the backend returns a plain message with no field-scoped
 * errors (e.g. a generic "Status already exists" string). Order matters; first match wins.
 *
 * Used by:
 * - useLeadStatusCrud (create/update lead status error handling, via shared applyFieldErrors)
 */
export const LEAD_STATUS_FIELD_ERROR_FALLBACKS = [
    { keyword: 'status', field: 'status' },
    { keyword: 'color', field: 'color' },
];
//# sourceMappingURL=index.js.map