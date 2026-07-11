import { useCallback } from 'react';
import { leadSourceService } from '../services';
import { getErrorMessage } from '../../../../shared/utils/error';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { ERROR_MESSAGES } from '../../constants/messages';
import { LEAD_SOURCE_FIELD_MAP, LEAD_SOURCE_FIELD_ERROR_FALLBACKS } from '../constants';
/**
 * Lead source create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive (loading, error, refresh, reset-to-page-1)
 *   as a narrow dependency rather than owning or re-exporting the pagination hook itself -
 *   LeadSourcePage.tsx owns useTableData directly and reads its full state from there.
 */
export function useLeadSourceCrud({ table }) {
    const submitError = useSubmitErrorHandler({
        fieldMap: LEAD_SOURCE_FIELD_MAP,
        fieldFallbacks: LEAD_SOURCE_FIELD_ERROR_FALLBACKS,
        setError: table.setError,
    });
    const handleCreateLeadSource = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        table.setError('');
        table.setIsLoading(true);
        try {
            const response = await leadSourceService.createLeadSource({ source: values.source.trim() });
            if (response.status) {
                table.setPageNumber(1);
                table.refresh();
                resetForm();
                return true;
            }
            submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.CREATE_LEAD_SOURCE);
            return false;
        }
        catch (err) {
            submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.CREATE_LEAD_SOURCE);
            return false;
        }
        finally {
            table.setIsLoading(false);
            setSubmitting(false);
        }
    }, [table, submitError]);
    const handleUpdateLeadSource = useCallback(async (id, values, { setSubmitting, setFieldError }) => {
        table.setError('');
        table.setIsLoading(true);
        try {
            const response = await leadSourceService.updateLeadSource(id, { source: values.source.trim() });
            if (response.status) {
                table.refresh();
                return true;
            }
            submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_SOURCE);
            return false;
        }
        catch (err) {
            submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_SOURCE);
            return false;
        }
        finally {
            table.setIsLoading(false);
            setSubmitting(false);
        }
    }, [table, submitError]);
    const handleDeleteLeadSource = useCallback(async (id) => {
        table.setError('');
        try {
            const response = await leadSourceService.deleteLeadSource(id);
            if (response.status) {
                table.refresh();
                return true;
            }
            table.setError(response.message || ERROR_MESSAGES.DELETE_LEAD_SOURCE);
            return false;
        }
        catch (err) {
            table.setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_SOURCE));
            return false;
        }
    }, [table]);
    return { handleCreateLeadSource, handleUpdateLeadSource, handleDeleteLeadSource };
}
//# sourceMappingURL=useLeadSourceCrud.js.map