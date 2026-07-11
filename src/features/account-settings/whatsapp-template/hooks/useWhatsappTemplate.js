import { useState, useCallback } from 'react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { whatsappTemplateService } from '../services/whatsappTemplate.service';
import { addWhatsappTemplateValidationSchema, editWhatsappTemplateValidationSchema } from '../validations/whatsapp-template.validation';
import { ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES } from '../constants/whatsappTemplate.constants';
const FIELD_MAP = {
    template_name: 'templateName',
};
export function useWhatsappTemplate() {
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [showToast, setShowToast] = useState(false);
    const showToastMessage = useCallback((message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
    }, []);
    const pagination = useTableData({
        fetchFn: async (params) => {
            const response = await whatsappTemplateService.getAllWhatsappTemplates(params);
            if (response.status) {
                const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
                    ? response.data.items
                    : Array.isArray(response.data)
                        ? response.data
                        : [];
                const items = Array.isArray(rawData) ? rawData : [];
                const total = response.data && typeof response.data === 'object' && 'pagination' in response.data
                    ? (response.data.pagination?.total ?? items.length)
                    : items.length;
                return { items, total };
            }
            throw new Error(response.message || 'Failed to fetch WhatsApp templates');
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
            if (lower.includes('name')) {
                setFieldError('templateName', message);
                return 'templateName';
            }
            if (lower.includes('message')) {
                setFieldError('message', message);
                return 'message';
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
    const handleAddWhatsappTemplate = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        pagination.setError('');
        pagination.setIsLoading(true);
        try {
            const { templateName, message, status } = values;
            const requestData = { templateName: templateName.trim(), message: message.trim(), status };
            const response = await whatsappTemplateService.createWhatsappTemplate(requestData);
            if (response.status) {
                pagination.setPageNumber(1);
                pagination.setSearchQuery('');
                pagination.refresh();
                resetForm();
                showToastMessage('WhatsApp template added successfully', 'success');
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError(errorField);
            }
            else {
                pagination.setError(response.message || 'Failed to add WhatsApp template');
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
                        pagination.setError(serverMessage || 'Failed to add WhatsApp template');
                        scrollToTop();
                    }
                }
                else {
                    pagination.setError(serverMessage || 'Failed to add WhatsApp template');
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
    const handleUpdateWhatsappTemplate = useCallback(async (id, values, { setSubmitting, setFieldError }) => {
        pagination.setError('');
        pagination.setIsLoading(true);
        try {
            const { templateName, message, status } = values;
            const requestData = { templateName: templateName.trim(), message: message.trim(), status };
            const response = await whatsappTemplateService.updateWhatsappTemplate(id, requestData);
            if (response.status) {
                pagination.refresh();
                showToastMessage('WhatsApp template updated successfully', 'success');
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError(errorField);
            }
            else {
                pagination.setError(response.message || 'Failed to update WhatsApp template');
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
                        pagination.setError(serverMessage || 'Failed to update WhatsApp template');
                        scrollToTop();
                    }
                }
                else {
                    pagination.setError(serverMessage || 'Failed to update WhatsApp template');
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
    const handleDeleteWhatsappTemplate = useCallback(async (id) => {
        pagination.setError('');
        try {
            const response = await whatsappTemplateService.deleteWhatsappTemplate(id);
            if (response.status) {
                pagination.refresh();
                showToastMessage('WhatsApp template deleted successfully', 'success');
                return true;
            }
            else {
                pagination.setError(response.message || 'Failed to delete WhatsApp template');
                return false;
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                pagination.setError(axiosErr.response?.data?.message || 'Failed to delete WhatsApp template');
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
        whatsappTemplateList: pagination.list,
        isLoading: pagination.isLoading,
        error: pagination.error,
        fetchWhatsappTemplates: pagination.refresh,
        handleAddWhatsappTemplate,
        handleUpdateWhatsappTemplate,
        handleDeleteWhatsappTemplate,
        validationSchema: addWhatsappTemplateValidationSchema,
        editValidationSchema: editWhatsappTemplateValidationSchema,
        initialValues: ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES,
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
//# sourceMappingURL=useWhatsappTemplate.js.map