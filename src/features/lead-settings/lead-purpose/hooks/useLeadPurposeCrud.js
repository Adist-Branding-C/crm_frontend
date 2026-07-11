import { useCallback } from 'react';
import { leadPurposeService } from '../services';
import { getErrorMessage } from '../../../../shared/utils/error';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { ERROR_MESSAGES } from '../../constants/messages';
import { LEAD_PURPOSE_FIELD_MAP, LEAD_PURPOSE_FIELD_ERROR_FALLBACKS } from '../constants';
/**
 * Lead purpose create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive (loading, error, refresh, reset-to-page-1)
 *   as a narrow dependency rather than owning or re-exporting the pagination hook itself -
 *   LeadPurposePage.tsx owns useTableData directly and reads its full state from there.
 */
export function useLeadPurposeCrud({ table }) {
    const submitError = useSubmitErrorHandler({
        fieldMap: LEAD_PURPOSE_FIELD_MAP,
        fieldFallbacks: LEAD_PURPOSE_FIELD_ERROR_FALLBACKS,
        setError: table.setError,
    });
    const handleCreateLeadPurpose = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        table.setError('');
        table.setIsLoading(true);
        try {
            const response = await leadPurposeService.createLeadPurpose({ purpose: values.title.trim() });
            if (response.status) {
                table.setPageNumber(1);
                table.refresh();
                resetForm();
                return true;
            }
            submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.CREATE_LEAD_PURPOSE);
            return false;
        }
        catch (err) {
            submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.CREATE_LEAD_PURPOSE);
            return false;
        }
        finally {
            table.setIsLoading(false);
            setSubmitting(false);
        }
    }, [table, submitError]);
    const handleUpdateLeadPurpose = useCallback(async (id, values, { setSubmitting, setFieldError }) => {
        table.setError('');
        table.setIsLoading(true);
        try {
            const response = await leadPurposeService.updateLeadPurpose(id, { purpose: values.title.trim() });
            if (response.status) {
                table.refresh();
                return true;
            }
            submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_PURPOSE);
            return false;
        }
        catch (err) {
            submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_PURPOSE);
            return false;
        }
        finally {
            table.setIsLoading(false);
            setSubmitting(false);
        }
    }, [table, submitError]);
    const handleDeleteLeadPurpose = useCallback(async (id) => {
        table.setError('');
        try {
            const response = await leadPurposeService.deleteLeadPurpose(id);
            if (response.status) {
                table.refresh();
                return true;
            }
            table.setError(response.message || ERROR_MESSAGES.DELETE_LEAD_PURPOSE);
            return false;
        }
        catch (err) {
            table.setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_PURPOSE));
            return false;
        }
    }, [table]);
    return { handleCreateLeadPurpose, handleUpdateLeadPurpose, handleDeleteLeadPurpose };
}
//# sourceMappingURL=useLeadPurposeCrud.js.map