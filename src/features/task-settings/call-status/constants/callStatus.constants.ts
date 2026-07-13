import type { CsvColumn } from '../../../../shared/types/csv';
import type { FieldErrorMap, FieldErrorFallback } from '../../../../shared/types/formFieldError.types';
import type { CallStatusItem } from '../types/interface';

/**
 * Call Status API endpoint paths.
 *
 * Used by:
 * - CallStatusApiService (fetchAll/create/update/delete)
 */
export const CALL_STATUS_API_ENDPOINTS = {
  GET_ALL: '/call-status',
  CREATE: '/call-status',
  UPDATE: (id: number) => `/call-status/${id}`,
  DELETE: (id: number) => `/call-status/${id}`,
};

/**
 * Blank Formik initial state for the call-status add drawer.
 *
 * Used by:
 * - CallStatusPage (Add Call Status drawer)
 */
export const ADD_CALL_STATUS_INITIAL_VALUES = {
  name: '',
  status: '',
};

/**
 * Maps backend call-status field names to frontend Formik field names.
 *
 * Used by:
 * - useCallStatusCrud (create/update error handling, via shared useSubmitErrorHandler)
 *
 * Notes:
 * - Empty because the backend already uses the same field names as the form; kept for
 *   parity with the shared useSubmitErrorHandler contract.
 */
export const CALL_STATUS_FIELD_MAP: FieldErrorMap = {};

/**
 * Keyword -> field fallback used when the backend returns a plain message with no
 * field-scoped errors. Order matters; first match wins.
 *
 * Used by:
 * - useCallStatusCrud (create/update error handling, via shared useSubmitErrorHandler)
 */
export const CALL_STATUS_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'name', field: 'name' },
];

/**
 * CSV column definitions for call-status export.
 *
 * Used by:
 * - CallStatusPage (Export button)
 */
export const CALL_STATUS_CSV_COLUMNS: CsvColumn<CallStatusItem>[] = [
  { header: 'Name', value: (item) => `"${item.name}"` },
  { header: 'Status', value: (item) => item.status ?? '' },
];
