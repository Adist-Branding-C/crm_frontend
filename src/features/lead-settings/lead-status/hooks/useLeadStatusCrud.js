import { useCallback } from 'react';
import { leadStatusService } from '../services';
import { getErrorMessage } from '../../../../shared/utils/error';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { ERROR_MESSAGES } from '../../constants/messages';
import { LEAD_STATUS_FIELD_MAP, LEAD_STATUS_FIELD_ERROR_FALLBACKS } from '../constants';
/**
 * Lead status create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive (loading, error, refresh, reset-to-page-1)
 *   as a narrow dependency rather than owning or re-exporting the pagination hook itself -
 *   LeadStatusPage.tsx owns useTableData directly and reads its full state from there.
 */
export function useLeadStatusCrud({ table }) {
    const submitError = useSubmitErrorHandler({
        fieldMap: LEAD_STATUS_FIELD_MAP,
        fieldFallbacks: LEAD_STATUS_FIELD_ERROR_FALLBACKS,
        setError: table.setError,
    });
    const handleCreateLeadStatus = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        table.setError('');
        table.setIsLoading(true);
        try {
            const response = await leadStatusService.createLeadStatus({
                status: values.status.trim(),
                color: values.color,
                conversion: values.useForConversion,
            });
            if (response.status) {
                table.setPageNumber(1);
                table.refresh();
                resetForm();
                return true;
            }
            submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.CREATE_LEAD_STATUS);
            return false;
        }
        catch (err) {
            submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.CREATE_LEAD_STATUS);
            return false;
        }
        finally {
            table.setIsLoading(false);
            setSubmitting(false);
        }
    }, [table, submitError]);
    const handleUpdateLeadStatus = useCallback(async (id, values, { setSubmitting, setFieldError }) => {
        table.setError('');
        table.setIsLoading(true);
        try {
            const response = await leadStatusService.updateLeadStatus(id, {
                status: values.status.trim(),
                color: values.color,
                conversion: values.useForConversion,
            });
            if (response.status) {
                table.refresh();
                return true;
            }
            submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_STATUS);
            return false;
        }
        catch (err) {
            submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_STATUS);
            return false;
        }
        finally {
            table.setIsLoading(false);
            setSubmitting(false);
        }
    }, [table, submitError]);
    const handleDeleteLeadStatus = useCallback(async (id) => {
        table.setError('');
        try {
            const response = await leadStatusService.deleteLeadStatus(id);
            if (response.status) {
                table.refresh();
                return true;
            }
            table.setError(response.message || ERROR_MESSAGES.DELETE_LEAD_STATUS);
            return false;
        }
        catch (err) {
            table.setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_STATUS));
            return false;
        }
    }, [table]);
    return { handleCreateLeadStatus, handleUpdateLeadStatus, handleDeleteLeadStatus };
}
//# sourceMappingURL=useLeadStatusCrud.js.map