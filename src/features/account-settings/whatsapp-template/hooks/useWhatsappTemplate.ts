import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { whatsappTemplateService } from '../services/whatsappTemplate.service';
import { addWhatsappTemplateValidationSchema } from '../validations/whatsappTemplate.validation';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from '../types/whatsappTemplate.types';

const addWhatsappTemplateInitialValues: WhatsappTemplateFormData = {
  templateName: '',
  message: '',
  status: '',
};

export function useWhatsappTemplate() {
  const [whatsappTemplateList, setWhatsappTemplateList] = useState<WhatsappTemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const setErrorFromUnknown = useCallback((err: unknown, fallback: string) => {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || fallback);
    } else if (err && typeof err === 'object' && 'message' in err) {
      setError((err as { message: string }).message);
    } else {
      setError('Network error. Please try again.');
    }
  }, []);

  const fetchWhatsappTemplates = useCallback(async (params: Record<string, string | number | boolean> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await whatsappTemplateService.getAllWhatsappTemplates(params);

      if (response.status) {
        setWhatsappTemplateList(Array.isArray(response.data?.items) ? response.data.items : []);
      } else {
        setError(response.message || 'Failed to fetch WhatsApp templates');
      }
    } catch (err: unknown) {
      setErrorFromUnknown(err, 'Failed to fetch WhatsApp templates');
    } finally {
      setIsLoading(false);
    }
  }, [setErrorFromUnknown]);

  useEffect(() => {
    fetchWhatsappTemplates();
  }, [fetchWhatsappTemplates]);

  const handleAddWhatsappTemplate = useCallback(async (
    values: WhatsappTemplateFormData,
    { setSubmitting, resetForm }: FormikHelpers<WhatsappTemplateFormData>,
  ): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const requestData: WhatsappTemplateFormData = { templateName, message, status };

      const response = await whatsappTemplateService.createWhatsappTemplate(requestData);

      if (response.status) {
        setWhatsappTemplateList(prev => [...prev, { id: Date.now(), templateName, message, status }]);
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add WhatsApp template');
        return false;
      }
    } catch (err: unknown) {
      setErrorFromUnknown(err, 'Failed to add WhatsApp template');
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [setErrorFromUnknown]);

  const handleUpdateWhatsappTemplate = useCallback(async (
    id: number,
    values: WhatsappTemplateFormData,
    { setSubmitting }: FormikHelpers<WhatsappTemplateFormData>,
  ): Promise<boolean> => {
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
      setErrorFromUnknown(err, 'Failed to update WhatsApp template');
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [setErrorFromUnknown]);

  const handleDeleteWhatsappTemplate = useCallback(async (id: number): Promise<boolean> => {
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
      setErrorFromUnknown(err, 'Failed to delete WhatsApp template');
      return false;
    }
  }, [setErrorFromUnknown]);

  return {
    whatsappTemplateList,
    isLoading,
    error,
    fetchWhatsappTemplates,
    handleAddWhatsappTemplate,
    handleUpdateWhatsappTemplate,
    handleDeleteWhatsappTemplate,
    validationSchema: addWhatsappTemplateValidationSchema as any,
    initialValues: addWhatsappTemplateInitialValues,
  };
}
