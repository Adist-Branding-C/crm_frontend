import type { AgentFormData } from '../types/agent.types';
import type { FieldErrorMap, FieldErrorFallback } from '../../../../shared/types/formFieldError.types';
import { DEFAULT_COUNTRY_CODE } from '../../../../shared/constants/countryCodes';

// Blank Formik initial state for AddAgentDrawer's "add" mode (account-settings/agent).
export const ADD_AGENT_INITIAL_VALUES: AgentFormData = {
  fullName: '',
  email: '',
countryCode: DEFAULT_COUNTRY_CODE,
  phone: '',
  password: '',
  confirmPassword: '',
  designationId: '',
  departmentId: '',
  status: '',
  isAdmin: false,
};

/**
 * Maps backend staff field names to frontend Formik field names.
 *
 * Used by:
 * - useAgentCrud (create/update staff error handling, via shared applyFieldErrors)
 *
 * Notes:
 * - Backend uses snake_case (phone_number, full_name, confirm_password) in some error payloads;
 *   Formik's field names are camelCase.
 */
export const AGENT_FIELD_MAP: FieldErrorMap = {
  phone_number: 'phone',
  full_name: 'fullName',
  confirm_password: 'confirmPassword',
  country_code: 'countryCode',
};

/**
 * Keyword -> field fallback used when the backend returns a plain message with no field-scoped
 * errors (e.g. a generic "Email already exists" string). Order matters; first match wins.
 *
 * Used by:
 * - useAgentCrud (create/update staff error handling, via shared applyFieldErrors)
 */
export const AGENT_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'email', field: 'email' },
  { keyword: 'country code', field: 'countryCode' },
  { keyword: 'phone', field: 'phone' },
  { keyword: 'password', field: 'password' },
  { keyword: 'name', field: 'fullName' },
];