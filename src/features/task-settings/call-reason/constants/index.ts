import type { CsvColumn } from '../../../../shared/types/csv';
import type { FieldErrorMap, FieldErrorFallback } from '../../../../shared/types/formFieldError.types';
import type { CallReasonItem } from '../types/interface';

/**
 * Call Reason API endpoint paths.
 *
 * Used by:
 * - CallReasonApiService (fetchAll/create/update/delete)
 */
export const CALL_REASON_API_ENDPOINTS = {
  GET_ALL: '/call-reason',
  CREATE: '/call-reason',
  UPDATE: (id: number) => `/call-reason/${id}`,
  DELETE: (id: number) => `/call-reason/${id}`,
};

/**
 * Blank Formik initial state for the call-reason add drawer.
 *
 * Used by:
 * - CallReasonPage (Add Call Reason drawer)
 */
export const ADD_CALL_REASON_INITIAL_VALUES = {
  name: '',
  status: '',
};

/**
 * Maps backend call-reason field names to frontend Formik field names.
 *
 * Used by:
 * - useCallReasonCrud (create/update error handling, via shared useSubmitErrorHandler)
 *
 * Notes:
 * - Empty because the backend already uses the same field names as the form; kept for
 *   parity with the shared useSubmitErrorHandler contract.
 */
export const CALL_REASON_FIELD_MAP: FieldErrorMap = {};

/**
 * Keyword -> field fallback used when the backend returns a plain message with no
 * field-scoped errors. Order matters; first match wins.
 *
 * Used by:
 * - useCallReasonCrud (create/update error handling, via shared useSubmitErrorHandler)
 */
export const CALL_REASON_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'name', field: 'name' },
];

/**
 * CSV column definitions for call-reason export.
 *
 * Used by:
 * - CallReasonPage (Export button)
 */
export const CALL_REASON_CSV_COLUMNS: CsvColumn<CallReasonItem>[] = [
  { header: 'Reason', value: (item) => `"${item.name}"` },
  { header: 'Status', value: (item) => item.status ?? '' },
];
