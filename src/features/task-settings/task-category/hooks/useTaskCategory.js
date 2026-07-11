import { useCallback } from 'react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDrawerScroll } from '../../hooks/useDrawerScroll';
import { useToast } from '../../hooks/useToast';
import { taskCategoryApiService } from '../services';
const FIELD_MAP = {};
export function useTaskCategory() {
    const { showToastMessage, toastMessage, toastType, showToast, setShowToast } = useToast();
    const pagination = useTableData({
        fetchFn: async (params) => {
            const response = await taskCategoryApiService.fetchAll(params);
            if (response.status) {
                const data = response.data;
                const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
                return {
                    items: Array.isArray(items) ? items.map((item) => ({
                        id: item.id,
                        category: (item.category || item.taskCategory || ''),
                        action: (item.action || ''),
                    })) : [],
                    total: data?.pagination?.total ?? (Array.isArray(items) ? items.length : 0),
                };
            }
            throw new Error(response.message || 'Failed to fetch task categories');
        },
    });
    const { scrollAndFocusError, scrollToTop } = useDrawerScroll();
    const applyFieldErrors = useCallback((errors, message, field, setFieldError) => {
        if (field && message) {
            const mapped = FIELD_MAP[field] || field;
            setFieldError(mapped, message);
            return mapped;
        }
        if (errors && typeof errors === 'object') {
            let firstField = null;
            Object.entries(errors).forEach(([f, msgs]) => {
                const mapped = FIELD_MAP[f] || f;
                if (msgs?.length && !firstField)
                    firstField = mapped;
                if (msgs?.length)
                    setFieldError(mapped, msgs[0]);
            });
            return firstField;
        }
        if (message) {
            const lower = message.toLowerCase();
            if (lower.includes('category')) {
                setFieldError('category', message);
                return 'category';
            }
            if (lower.includes('action')) {
                setFieldError('action', message);
                return 'action';
            }
        }
        return null;
    }, []);
    const handleAdd = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        pagination.setError('');
        pagination.setIsLoading(true);
        try {
            const { category, action } = values;
            const response = await taskCategoryApiService.create({ category: category.trim(), action: action.trim() });
            if (response.status) {
                pagination.setPageNumber(1);
                pagination.setSearchQuery('');
                pagination.refresh();
                resetForm();
                showToastMessage('Task category added successfully', 'success');
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError();
            }
            else {
                pagination.setError(response.message || 'Failed to add task category');
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
                        pagination.setError(serverMessage || 'Failed to add task category');
                        scrollToTop();
                    }
                }
                else {
                    pagination.setError(serverMessage || 'Failed to add task category');
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
            const { category, action } = values;
            const response = await taskCategoryApiService.update(id, { category: category.trim(), action: action.trim() });
            if (response.status) {
                pagination.refresh();
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError();
            }
            else {
                pagination.setError(response.message || 'Failed to update task category');
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
                        pagination.setError(serverMessage || 'Failed to update task category');
                        scrollToTop();
                    }
                }
                else {
                    pagination.setError(serverMessage || 'Failed to update task category');
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
            const response = await taskCategoryApiService.delete(id);
            if (response.status) {
                pagination.refresh();
                return true;
            }
            else {
                pagination.setError(response.message || 'Failed to delete task category');
                return false;
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                pagination.setError(axiosErr.response?.data?.message || 'Failed to delete task category');
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
        taskCategoryList: pagination.list,
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
//# sourceMappingURL=useTaskCategory.js.map