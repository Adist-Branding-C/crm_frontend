import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { emailTemplateService } from '../services/emailTemplate.service';
import { addEmailTemplateValidationSchema, editEmailTemplateValidationSchema } from '../validations/emailTemplate.validation';
import { ADD_EMAIL_TEMPLATE_INITIAL_VALUES } from '../constants/emailTemplate.constants';
import type { EmailTemplateItem, EmailTemplateFormData } from '../types/emailTemplate.types';

export function useEmailTemplate() {
  const fetchFn = useCallback(async (params: { pageNumber: number; limit: number; search?: string }) => {
    const response = await emailTemplateService.getAllEmailTemplates(params);
    if (response.status) {
      const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
        ? (response.data as { items: EmailTemplateItem[]; pagination?: { total: number } }).items
        : Array.isArray(response.data)
          ? response.data
          : [];
      const items = Array.isArray(rawData) ? rawData : [];
      const total = response.data && typeof response.data === 'object' && 'pagination' in (response.data as object)
        ? ((response.data as { pagination?: { total: number } }).pagination?.total ?? items.length)
        : items.length;
      return { items, total };
    }
    throw new Error(response.message || 'Failed to fetch email templates');
  }, []);

  const pagination = useTableData<EmailTemplateItem>({ fetchFn });

  const handleAddEmailTemplate = useCallback(async (
    values: EmailTemplateFormData,
    { setSubmitting, resetForm }: FormikHelpers<EmailTemplateFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { templateName, subject, content, isDefault, status } = values;
      const requestData = { templateName, subject, content, isDefault: Boolean(isDefault), status };
      const response = await emailTemplateService.createEmailTemplate(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to add email template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to add email template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleUpdateEmailTemplate = useCallback(async (
    id: number,
    values: EmailTemplateFormData,
    { setSubmitting }: FormikHelpers<EmailTemplateFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { templateName, subject, content, isDefault, status } = values;
      const requestData = { templateName, subject, content, isDefault: Boolean(isDefault), status };
      const response = await emailTemplateService.updateEmailTemplate(id, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to update email template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to update email template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteEmailTemplate = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await emailTemplateService.deleteEmailTemplate(id);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete email template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete email template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    emailTemplateList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchEmailTemplates: pagination.refresh,
    handleAddEmailTemplate,
    handleUpdateEmailTemplate,
    handleDeleteEmailTemplate,
    validationSchema: addEmailTemplateValidationSchema,
    editValidationSchema: editEmailTemplateValidationSchema,
    initialValues: ADD_EMAIL_TEMPLATE_INITIAL_VALUES,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
  };
}
