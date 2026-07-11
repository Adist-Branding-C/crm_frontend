import { useCallback, useMemo } from 'react';
import { applyFieldErrors } from '../utils/formFieldError.util';
import { scrollToFirstError, scrollContainerToTop } from '../utils/scrollToError.util';
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
export function useSubmitErrorHandler({ fieldMap, fieldFallbacks, setError, containerSelector = '.drawer-body' }) {
    const scrollAndFocusFieldError = useCallback(() => {
        setTimeout(() => scrollToFirstError(document.querySelector(containerSelector)), 0);
    }, [containerSelector]);
    const scrollToTop = useCallback(() => {
        setTimeout(() => scrollContainerToTop(document.querySelector(containerSelector)), 0);
    }, [containerSelector]);
    const handleErrorResponse = useCallback((response, setFieldError, fallbackMessage) => {
        const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError, fieldMap, fieldFallbacks);
        if (errorField) {
            scrollAndFocusFieldError();
        }
        else {
            setError(response.message || fallbackMessage);
            scrollToTop();
        }
    }, [fieldMap, fieldFallbacks, setError, scrollAndFocusFieldError, scrollToTop]);
    const handleThrownError = useCallback((err, setFieldError, fallbackMessage) => {
        if (err && typeof err === 'object' && 'response' in err) {
            const axiosErr = err;
            const serverErrors = axiosErr.response?.data?.errors;
            const serverField = axiosErr.response?.data?.field;
            const serverMessage = axiosErr.response?.data?.message;
            if (serverErrors || (serverField && serverMessage)) {
                handleErrorResponse({ errors: serverErrors, message: serverMessage, field: serverField }, setFieldError, fallbackMessage);
            }
            else {
                setError(serverMessage || fallbackMessage);
                scrollToTop();
            }
        }
        else if (err && typeof err === 'object' && 'message' in err) {
            setError(err.message);
            scrollToTop();
        }
        else {
            setError('Network error. Please try again.');
            scrollToTop();
        }
    }, [handleErrorResponse, setError, scrollToTop]);
    return useMemo(() => ({ handleErrorResponse, handleThrownError }), [handleErrorResponse, handleThrownError]);
}
//# sourceMappingURL=useSubmitErrorHandler.js.map