import { useCallback } from 'react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { workModeService } from '../services/workMode.service';
import { addWorkModeValidationSchema, editWorkModeValidationSchema } from '../validations/workMode.validation';
import { ADD_WORK_MODE_INITIAL_VALUES } from '../constants/workMode.constants';
export function useWorkMode() {
    const pagination = useTableData({
        fetchFn: async (params) => {
            const response = await workModeService.getAllWorkModes(params);
            if (response.status) {
                const data = response.data;
                const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
                return { items: Array.isArray(items) ? items : [], total: data?.pagination?.total ?? (Array.isArray(items) ? items.length : 0) };
            }
            throw new Error(response.message || 'Failed to fetch work modes');
        },
    });
    const handleAddWorkMode = useCallback(async (values, { setSubmitting, resetForm }) => {
        pagination.setError('');
        pagination.setIsLoading(true);
        try {
            const { workModeName, description, status } = values;
            const requestData = { workModeName, description, status };
            const response = await workModeService.createWorkMode(requestData);
            if (response.status) {
                pagination.setPageNumber(1);
                pagination.setSearchQuery('');
                pagination.refresh();
                resetForm();
                return true;
            }
            else {
                pagination.setError(response.message || 'Failed to add work mode');
                return false;
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                pagination.setError(axiosErr.response?.data?.message || 'Failed to add work mode');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                pagination.setError(err.message);
            }
            else {
                pagination.setError('Network error. Please try again.');
            }
            return false;
        }
        finally {
            pagination.setIsLoading(false);
            setSubmitting(false);
        }
    }, []);
    const handleUpdateWorkMode = useCallback(async (id, values, { setSubmitting }) => {
        pagination.setError('');
        pagination.setIsLoading(true);
        try {
            const { workModeName, description, status } = values;
            const requestData = { workModeName, description, status };
            const response = await workModeService.updateWorkMode(id, requestData);
            if (response.status) {
                pagination.refresh();
                return true;
            }
            else {
                pagination.setError(response.message || 'Failed to update work mode');
                return false;
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                pagination.setError(axiosErr.response?.data?.message || 'Failed to update work mode');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                pagination.setError(err.message);
            }
            else {
                pagination.setError('Network error. Please try again.');
            }
            return false;
        }
        finally {
            pagination.setIsLoading(false);
            setSubmitting(false);
        }
    }, []);
    const handleDeleteWorkMode = useCallback(async (id) => {
        pagination.setError('');
        try {
            const response = await workModeService.deleteWorkMode(id);
            if (response.status) {
                pagination.refresh();
                return true;
            }
            else {
                pagination.setError(response.message || 'Failed to delete work mode');
                return false;
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                pagination.setError(axiosErr.response?.data?.message || 'Failed to delete work mode');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                pagination.setError(err.message);
            }
            else {
                pagination.setError('Network error. Please try again.');
            }
            return false;
        }
    }, []);
    return {
        workModeList: pagination.list,
        isLoading: pagination.isLoading,
        error: pagination.error,
        fetchWorkModes: pagination.refresh,
        handleAddWorkMode,
        handleUpdateWorkMode,
        handleDeleteWorkMode,
        validationSchema: addWorkModeValidationSchema,
        editValidationSchema: editWorkModeValidationSchema,
        initialValues: ADD_WORK_MODE_INITIAL_VALUES,
        pageNumber: pagination.pageNumber,
        setPageNumber: pagination.setPageNumber,
        limit: pagination.limit,
        totalCount: pagination.totalCount,
        searchQuery: pagination.searchQuery,
        handleSearchChange: pagination.handleSearchChange,
        handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    };
}
//# sourceMappingURL=useWorkMode.js.map