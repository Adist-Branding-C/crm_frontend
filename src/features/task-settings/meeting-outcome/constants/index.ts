import type { CsvColumn } from '../../../../shared/types/csv';
import type { FieldErrorMap, FieldErrorFallback } from '../../../../shared/types/formFieldError.types';
import type { MeetingOutcomeItem } from '../types/interface';

/**
 * Meeting Outcome API endpoint paths.
 *
 * Used by:
 * - MeetingOutcomeApiService (fetchAll/create/update/delete)
 */
export const MEETING_OUTCOME_API_ENDPOINTS = {
  GET_ALL: '/meeting-outcome',
  CREATE: '/meeting-outcome',
  UPDATE: (id: number) => `/meeting-outcome/${id}`,
  DELETE: (id: number) => `/meeting-outcome/${id}`,
};

/**
 * Blank Formik initial state for the meeting-outcome add drawer.
 *
 * Used by:
 * - MeetingOutcomePage (Add Meeting Outcome drawer)
 */
export const ADD_MEETING_OUTCOME_INITIAL_VALUES = {
  name: '',
  status: '',
};

/**
 * Maps backend meeting-outcome field names to frontend Formik field names.
 *
 * Used by:
 * - useMeetingOutcomeCrud (create/update error handling, via shared useSubmitErrorHandler)
 *
 * Notes:
 * - Empty because the backend already uses the same field names as the form; kept for
 *   parity with the shared useSubmitErrorHandler contract.
 */
export const MEETING_OUTCOME_FIELD_MAP: FieldErrorMap = {};

/**
 * Keyword -> field fallback used when the backend returns a plain message with no
 * field-scoped errors. Order matters; first match wins.
 *
 * Used by:
 * - useMeetingOutcomeCrud (create/update error handling, via shared useSubmitErrorHandler)
 */
export const MEETING_OUTCOME_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'name', field: 'name' },
];

/**
 * CSV column definitions for meeting-outcome export.
 *
 * Used by:
 * - MeetingOutcomePage (Export button)
 */
export const MEETING_OUTCOME_CSV_COLUMNS: CsvColumn<MeetingOutcomeItem>[] = [
  { header: 'Outcome', value: (item) => item.name },
  { header: 'Status', value: (item) => item.status ?? '' },
];
