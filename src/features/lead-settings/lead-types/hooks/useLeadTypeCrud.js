import { useCallback } from 'react';
import { leadTypeService } from '../services';
import { getErrorMessage } from '../../../../shared/utils/error';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { ERROR_MESSAGES } from '../../constants/messages';
import { LEAD_TYPE_FIELD_MAP, LEAD_TYPE_FIELD_ERROR_FALLBACKS } from '../constants';
/**
 * Lead type create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive (loading, error, refresh, reset-to-page-1)
 *   as a narrow dependency rather than owning or re-exporting the pagination hook itself -
 *   LeadTypesPage.tsx owns useTableData directly and reads its full state from there.
 */
export function useLeadTypeCrud({ table }) {
    const submitError = useSubmitErrorHandler({
        fieldMap: LEAD_TYPE_FIELD_MAP,
        fieldFallbacks: LEAD_TYPE_FIELD_ERROR_FALLBACKS,
        setError: table.setError,
    });
    const handleCreateLeadType = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        table.setError('');
        table.setIsLoading(true);
        try {
            const response = await leadTypeService.createLeadType({ type: values.type.trim() });
            if (response.status) {
                table.setPageNumber(1);
                table.refresh();
                resetForm();
                return true;
            }
            submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.CREATE_LEAD_TYPE);
            return false;
        }
        catch (err) {
            submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.CREATE_LEAD_TYPE);
            return false;
        }
        finally {
            table.setIsLoading(false);
            setSubmitting(false);
        }
    }, [table, submitError]);
    const handleUpdateLeadType = useCallback(async (id, values, { setSubmitting, setFieldError }) => {
        table.setError('');
        table.setIsLoading(true);
        try {
            const response = await leadTypeService.updateLeadType(id, { type: values.type.trim() });
            if (response.status) {
                table.refresh();
                return true;
            }
            submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_TYPE);
            return false;
        }
        catch (err) {
            submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_TYPE);
            return false;
        }
        finally {
            table.setIsLoading(false);
            setSubmitting(false);
        }
    }, [table, submitError]);
    const handleDeleteLeadType = useCallback(async (id) => {
        table.setError('');
        try {
            const response = await leadTypeService.deleteLeadType(id);
            if (response.status) {
                table.refresh();
                return true;
            }
            table.setError(response.message || ERROR_MESSAGES.DELETE_LEAD_TYPE);
            return false;
        }
        catch (err) {
            table.setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_TYPE));
            return false;
        }
    }, [table]);
    return { handleCreateLeadType, handleUpdateLeadType, handleDeleteLeadType };
}
//# sourceMappingURL=useLeadTypeCrud.js.map