import { useCallback, useMemo } from 'react';
import { applyFieldErrors } from '../utils/formFieldError.util';
import { scrollToFirstError, scrollContainerToTop } from '../utils/scrollToError.util';
import type { FieldErrorMap, FieldErrorFallback } from '../types/formFieldError.types';

interface SubmitErrorResponse {
  errors?: Record<string, string[]> | undefined;
  message?: string | undefined;
  field?: string | undefined;
}

interface UseSubmitErrorHandlerParams {
  fieldMap: FieldErrorMap;
  fieldFallbacks: FieldErrorFallback[];
  setError: (message: string) => void;
  containerSelector?: string;
}

/**
 * Turns a failed create/update submit (a `{ status: false }` response or a thrown request error)
 * into Formik field errors plus the right scroll/focus behavior, falling back to a generic
 * form-level error when the failure isn't tied to one field.
 *
 * Used by:
 * - account-settings/agent (useAgentCrud)
 *
 * Notes:
 * - Generic across entities: pass the entity's own FieldErrorMap/FieldErrorFallback[] and its
 *   pagination/list hook's setError. containerSelector defaults to '.drawer-body' since every
 *   account-settings add/edit form lives in a drawer.
 * - This consolidates logic that was previously duplicated per-feature (each hook reimplementing
 *   its own axios-error classification, field-error mapping, and scroll-to-field/top orchestration).
 *   Other account-settings features (branch, department, etc.) still inline their own copy of this
 *   and are candidates to migrate onto this hook in a later pass.
 */
export function useSubmitErrorHandler({ fieldMap, fieldFallbacks, setError, containerSelector = '.drawer-body' }: UseSubmitErrorHandlerParams) {
  const scrollAndFocusFieldError = useCallback(() => {
    setTimeout(() => scrollToFirstError(document.querySelector<HTMLElement>(containerSelector)), 0);
  }, [containerSelector]);

  const scrollToTop = useCallback(() => {
    setTimeout(() => scrollContainerToTop(document.querySelector<HTMLElement>(containerSelector)), 0);
  }, [containerSelector]);

  const handleErrorResponse = useCallback((
    response: SubmitErrorResponse,
    setFieldError: (field: string, message: string) => void,
    fallbackMessage: string,
  ) => {
    const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError, fieldMap, fieldFallbacks);
    if (errorField) {
      scrollAndFocusFieldError();
    } else {
      setError(response.message || fallbackMessage);
      scrollToTop();
    }
  }, [fieldMap, fieldFallbacks, setError, scrollAndFocusFieldError, scrollToTop]);

  const handleThrownError = useCallback((
    err: unknown,
    setFieldError: (field: string, message: string) => void,
    fallbackMessage: string,
  ) => {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosErr = err as { response?: { data?: SubmitErrorResponse } };
      const serverErrors = axiosErr.response?.data?.errors;
      const serverField = axiosErr.response?.data?.field;
      const serverMessage = axiosErr.response?.data?.message;
      if (serverErrors || (serverField && serverMessage)) {
        handleErrorResponse({ errors: serverErrors, message: serverMessage, field: serverField }, setFieldError, fallbackMessage);
      } else {
        setError(serverMessage || fallbackMessage);
        scrollToTop();
      }
    } else if (err && typeof err === 'object' && 'message' in err) {
      setError((err as { message: string }).message);
      scrollToTop();
    } else {
      setError('Network error. Please try again.');
      scrollToTop();
    }
  }, [handleErrorResponse, setError, scrollToTop]);

  return useMemo(() => ({ handleErrorResponse, handleThrownError }), [handleErrorResponse, handleThrownError]);
}
