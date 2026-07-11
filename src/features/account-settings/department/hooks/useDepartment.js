import { useState, useCallback } from 'react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { departmentService } from '../services/department.service';
import { addDepartmentValidationSchema, editDepartmentValidationSchema } from '../validations/department.validation';
import { ADD_DEPARTMENT_INITIAL_VALUES } from '../constants/department.constants';
const FIELD_MAP = {
    department_name: 'departmentName',
};
export function useDepartment() {
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [showToast, setShowToast] = useState(false);
    const [dependencyError, setDependencyError] = useState(false);
    const showToastMessage = useCallback((message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
    }, []);
    const pagination = useTableData({
        fetchFn: async (params) => {
            const response = await departmentService.getAllDepartments(params);
            if (response.status) {
                const items = Array.isArray(response.data?.items) ? response.data.items : [];
                return { items, total: response.data?.pagination?.total ?? items.length };
            }
            throw new Error(response.message || 'Failed to fetch departments');
        },
    });
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
            if (lower.includes('department')) {
                setFieldError('departmentName', message);
                return 'departmentName';
            }
        }
        return null;
    }, []);
    const scrollAndFocusError = useCallback((fieldName) => {
        setTimeout(() => {
            const drawerBody = document.querySelector('.drawer-body');
            if (!drawerBody)
                return;
            const errorEl = drawerBody.querySelector('.input-error');
            if (errorEl) {
                errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                errorEl.focus();
            }
        }, 0);
    }, []);
    const scrollToTop = useCallback(() => {
        setTimeout(() => {
            const drawerBody = document.querySelector('.drawer-body');
            if (drawerBody) {
                drawerBody.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 0);
    }, []);
    const handleAddDepartment = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        pagination.setError('');
        pagination.setIsLoading(true);
        try {
            const requestData = { ...values, description: values.description.trim() };
            const response = await departmentService.createDepartment(requestData);
            if (response.status) {
                pagination.setPageNumber(1);
                pagination.setSearchQuery('');
                pagination.refresh();
                resetForm();
                showToastMessage('Department added successfully', 'success');
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError(errorField);
            }
            else {
                pagination.setError(response.message || 'Failed to add department');
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
                        scrollAndFocusError(errorField);
                    else {
                        pagination.setError(serverMessage || 'Failed to add department');
                        scrollToTop();
                    }
                }
                else {
                    pagination.setError(serverMessage || 'Failed to add department');
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
    }, []);
    const handleUpdateDepartment = useCallback(async (id, values, { setSubmitting, setFieldError }) => {
        pagination.setError('');
        pagination.setIsLoading(true);
        try {
            const requestData = { ...values, description: values.description.trim() };
            const response = await departmentService.updateDepartment(id, requestData);
            if (response.status) {
                pagination.refresh();
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError(errorField);
            }
            else {
                pagination.setError(response.message || 'Failed to update department');
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
                        scrollAndFocusError(errorField);
                    else {
                        pagination.setError(serverMessage || 'Failed to update department');
                        scrollToTop();
                    }
                }
                else {
                    pagination.setError(serverMessage || 'Failed to update department');
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
    }, []);
    const handleDeleteDepartment = useCallback(async (id) => {
        pagination.setError('');
        try {
            const response = await departmentService.deleteDepartment(id);
            if (response.status) {
                pagination.refresh();
                return true;
            }
            else {
                pagination.setError(response.message || 'Failed to delete department');
                return false;
            }
        }
        catch (err) {
            if (err && typeof err === 'object') {
                const axiosErr = err;
                if (axiosErr.response?.status === 409) {
                    setDependencyError(true);
                    return false;
                }
                pagination.setError(axiosErr.response?.data?.message || 'Failed to delete department');
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
        departmentList: pagination.list,
        isLoading: pagination.isLoading,
        error: pagination.error,
        fetchDepartments: pagination.refresh,
        handleAddDepartment,
        handleUpdateDepartment,
        handleDeleteDepartment,
        dependencyError,
        clearDependencyError: () => setDependencyError(false),
        validationSchema: addDepartmentValidationSchema,
        editValidationSchema: editDepartmentValidationSchema,
        initialValues: ADD_DEPARTMENT_INITIAL_VALUES,
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
//# sourceMappingURL=useDepartment.js.map