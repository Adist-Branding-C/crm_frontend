import type { LeadPurposeFormData } from '../types/interface';
import type { FieldErrorMap, FieldErrorFallback } from '../../../../shared/types/formFieldError.types';

/**
 * Blank Formik initial state for LeadPurposeForm's "add" mode.
 *
 * Used by:
 * - LeadPurposePage (useEditDrawer, seeds the drawer in add mode)
 */
export const EMPTY_LEAD_PURPOSE_FORM_DATA: LeadPurposeFormData = { title: '' };

/**
 * Toolbar button label for opening the add-lead-purpose drawer.
 *
 * Used by:
 * - LeadPurposePage
 */
export const ADD_LEAD_PURPOSE_LABEL = 'Add Lead Purpose';

/**
 * "Added By" column header for the lead purposes table.
 *
 * Used by:
 * - LeadPurposePage
 */
export const LEAD_PURPOSE_COLUMN_ADDED_BY = 'Added By';

/**
 * "Title" column header for the lead purposes table.
 *
 * Used by:
 * - LeadPurposePage
 */
export const LEAD_PURPOSE_COLUMN_TITLE = 'Title';

/**
 * Label for LeadPurposeForm's single "title" input.
 *
 * Used by:
 * - LeadPurposeForm
 */
export const LEAD_PURPOSE_FIELD_LABEL = 'Title';

/**
 * Placeholder text for LeadPurposeForm's single "title" input.
 *
 * Used by:
 * - LeadPurposeForm
 */
export const LEAD_PURPOSE_FIELD_PLACEHOLDER = 'Enter title';

/**
 * Maps backend lead-purpose field names to frontend Formik field names. The backend field
 * is "purpose"; the frontend form field is "title" - see LeadPurposeItem/LeadPurposeFormData.
 *
 * Used by:
 * - useLeadPurposeCrud (create/update lead purpose error handling, via shared applyFieldErrors)
 */
export const LEAD_PURPOSE_FIELD_MAP: FieldErrorMap = {
  purpose: 'title',
};

/**
 * Keyword -> field fallback used when the backend returns a plain message with no field-scoped
 * errors (e.g. a generic "Purpose already exists" string). Order matters; first match wins.
 *
 * Used by:
 * - useLeadPurposeCrud (create/update lead purpose error handling, via shared applyFieldErrors)
 */
export const LEAD_PURPOSE_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'purpose', field: 'title' },
  { keyword: 'title', field: 'title' },
];
