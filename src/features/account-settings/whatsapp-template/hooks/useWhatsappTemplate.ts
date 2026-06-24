import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { whatsappTemplateService } from '../services/whatsappTemplate.service';
import { addWhatsappTemplateValidationSchema, editWhatsappTemplateValidationSchema } from '../validations/whatsapp-template.validation';
import { ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES } from '../constants/whatsappTemplate.constants';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from '../types/whatsapp-template.types';

export function useWhatsappTemplate() {
  const pagination = useTableData<WhatsappTemplateItem>({
    fetchFn: async (params) => {
      const response = await whatsappTemplateService.getAllWhatsappTemplates(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: WhatsappTemplateItem[]; pagination?: { total: number } }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        const items = Array.isArray(rawData) ? rawData : [];
        const total = response.data && typeof response.data === 'object' && 'pagination' in (response.data as object)
          ? ((response.data as { pagination?: { total: number } }).pagination?.total ?? items.length)
          : items.length;
        return { items, total };
      }
      throw new Error(response.message || 'Failed to fetch WhatsApp templates');
    },
  });

  const handleAddWhatsappTemplate = useCallback(async (
    values: WhatsappTemplateFormData,
    { setSubmitting, resetForm }: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const requestData: WhatsappTemplateFormData = { templateName, message, status };
      const response = await whatsappTemplateService.createWhatsappTemplate(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to add WhatsApp template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to add WhatsApp template');
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

  const handleUpdateWhatsappTemplate = useCallback(async (
    id: number,
    values: WhatsappTemplateFormData,
    { setSubmitting }: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const requestData: WhatsappTemplateFormData = { templateName, message, status };
      const response = await whatsappTemplateService.updateWhatsappTemplate(id, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to update WhatsApp template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to update WhatsApp template');
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

  const handleDeleteWhatsappTemplate = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await whatsappTemplateService.deleteWhatsappTemplate(id);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete WhatsApp template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete WhatsApp template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
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
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
  };
}
