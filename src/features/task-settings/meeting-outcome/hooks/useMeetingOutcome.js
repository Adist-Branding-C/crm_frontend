import { useCallback } from 'react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDrawerScroll } from '../../hooks/useDrawerScroll';
import { useToast } from '../../hooks/useToast';
import { applyFieldErrors } from '../../call-reason/utils/applyFieldErrors';
import { meetingOutcomeApiService } from '../services';
export function useMeetingOutcome() {
    const { showToastMessage, toastMessage, toastType, showToast, setShowToast } = useToast();
    const pagination = useTableData({
        fetchFn: async (params) => {
            const response = await meetingOutcomeApiService.fetchAll(params);
            if (response.status) {
                const data = response.data;
                const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
                return { items: Array.isArray(items) ? items : [], total: data?.pagination?.total ?? (Array.isArray(items) ? items.length : 0) };
            }
            throw new Error(response.message || 'Failed to fetch meeting outcomes');
        },
    });
    const { scrollAndFocusError, scrollToTop } = useDrawerScroll();
    const handleAdd = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        pagination.setError('');
        pagination.setIsLoading(true);
        try {
            const { name, status } = values;
            const response = await meetingOutcomeApiService.create({ name: name.trim(), status });
            if (response.status) {
                pagination.setPageNumber(1);
                pagination.setSearchQuery('');
                pagination.refresh();
                resetForm();
                showToastMessage('Meeting outcome added successfully', 'success');
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError();
            }
            else {
                pagination.setError(response.message || 'Failed to add meeting outcome');
                scrollToTop();
            }
            return false;
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                const serverErrors = axiosErr.response?.data?.errors;
                const serverField = axiosErr.response?.data?.field;
                const serverMessage = axiosErr.response?.data?.message;
                if (serverErrors || (serverField && serverMessage)) {
                    const errorField = applyFieldErrors(serverErrors, serverMessage, serverField, setFieldError);
                    if (errorField)
                        scrollAndFocusError();
                    else {
                        pagination.setError(serverMessage || 'Failed to add meeting outcome');
                        scrollToTop();
                    }
                }
                else {
                    pagination.setError(serverMessage || 'Failed to add meeting outcome');
                    scrollToTop();
                }
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                pagination.setError(err.message);
                scrollToTop();
            }
            else {
                pagination.setError('Network error. Please try again.');
                scrollToTop();
            }
            return false;
        }
        finally {
            pagination.setIsLoading(false);
            setSubmitting(false);
        }
    }, [applyFieldErrors, scrollAndFocusError, scrollToTop, showToastMessage, pagination]);
    const handleUpdate = useCallback(async (id, values, { setSubmitting, setFieldError }) => {
        pagination.setError('');
        pagination.setIsLoading(true);
        try {
            const { name, status } = values;
            const response = await meetingOutcomeApiService.update(id, { name: name.trim(), status });
            if (response.status) {
                pagination.refresh();
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError();
            }
            else {
                pagination.setError(response.message || 'Failed to update meeting outcome');
                scrollToTop();
            }
            return false;
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                const serverErrors = axiosErr.response?.data?.errors;
                const serverField = axiosErr.response?.data?.field;
                const serverMessage = axiosErr.response?.data?.message;
                if (serverErrors || (serverField && serverMessage)) {
                    const errorField = applyFieldErrors(serverErrors, serverMessage, serverField, setFieldError);
                    if (errorField)
                        scrollAndFocusError();
                    else {
                        pagination.setError(serverMessage || 'Failed to update meeting outcome');
                        scrollToTop();
                    }
                }
                else {
                    pagination.setError(serverMessage || 'Failed to update meeting outcome');
                    scrollToTop();
                }
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                pagination.setError(err.message);
                scrollToTop();
            }
            else {
                pagination.setError('Network error. Please try again.');
                scrollToTop();
            }
            return false;
        }
        finally {
            pagination.setIsLoading(false);
            setSubmitting(false);
        }
    }, [applyFieldErrors, scrollAndFocusError, scrollToTop, pagination]);
    const handleDelete = useCallback(async (id) => {
        pagination.setError('');
        try {
            const response = await meetingOutcomeApiService.delete(id);
            if (response.status) {
                pagination.refresh();
                return true;
            }
            else {
                pagination.setError(response.message || 'Failed to delete meeting outcome');
                return false;
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                pagination.setError(axiosErr.response?.data?.message || 'Failed to delete meeting outcome');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                pagination.setError(err.message);
            }
            else {
                pagination.setError('Network error. Please try again.');
            }
            return false;
        }
    }, [pagination]);
    return {
        meetingOutcomeList: pagination.list,
        isLoading: pagination.isLoading,
        error: pagination.error,
        handleAdd,
        handleUpdate,
        handleDelete,
        toastMessage,
        toastType,
        showToast,
        setShowToast,
        pageNumber: pagination.pageNumber,
        setPageNumber: pagination.setPageNumber,
        limit: pagination.limit,
        totalCount: pagination.totalCount,
        searchQuery: pagination.searchQuery,
        handleSearchChange: pagination.handleSearchChange,
        handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    };
}
//# sourceMappingURL=useMeetingOutcome.js.map