import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { whatsappTemplateService } from '../services/whatsappTemplate.service';
import { addWhatsappTemplateValidationSchema, editWhatsappTemplateValidationSchema } from '../validations/whatsapp-template.validation';
import { ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES } from '../constants/whatsappTemplate.constants';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from '../types/whatsapp-template.types';

export function useWhatsappTemplate() {
  const [whatsappTemplateList, setWhatsappTemplateList] = useState<WhatsappTemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWhatsappTemplates = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await whatsappTemplateService.getAllWhatsappTemplates(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: WhatsappTemplateItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setWhatsappTemplateList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch WhatsApp templates');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch WhatsApp templates');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWhatsappTemplates();
  }, [fetchWhatsappTemplates]);

  const handleAddWhatsappTemplate = useCallback(async (
    values: WhatsappTemplateFormData,
    { setSubmitting, resetForm }: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const requestData: WhatsappTemplateFormData = { templateName, message, status };
      const response = await whatsappTemplateService.createWhatsappTemplate(requestData);

      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setWhatsappTemplateList(prev => [...prev, { id: data.id, templateName, message, status } as WhatsappTemplateItem]);
        } else {
          fetchWhatsappTemplates();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add WhatsApp template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add WhatsApp template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [fetchWhatsappTemplates]);

  const handleUpdateWhatsappTemplate = useCallback(async (
    id: number,
    values: WhatsappTemplateFormData,
    { setSubmitting }: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const requestData: WhatsappTemplateFormData = { templateName, message, status };
      const response = await whatsappTemplateService.updateWhatsappTemplate(id, requestData);

      if (response.status) {
        setWhatsappTemplateList(prev => prev.map(item =>
          item.id === id ? { ...item, templateName, message, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update WhatsApp template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update WhatsApp template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteWhatsappTemplate = useCallback(async (id: number) => {
    setError('');

    try {
      const response = await whatsappTemplateService.deleteWhatsappTemplate(id);

      if (response.status) {
        setWhatsappTemplateList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete WhatsApp template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete WhatsApp template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    whatsappTemplateList,
    isLoading,
    error,
    fetchWhatsappTemplates,
    handleAddWhatsappTemplate,
    handleUpdateWhatsappTemplate,
    handleDeleteWhatsappTemplate,
    validationSchema: addWhatsappTemplateValidationSchema,
    editValidationSchema: editWhatsappTemplateValidationSchema,
    initialValues: ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES,
  };
}
