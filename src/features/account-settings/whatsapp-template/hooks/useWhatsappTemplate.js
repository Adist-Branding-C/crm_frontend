import { useState, useCallback, useEffect } from 'react';
import { whatsappTemplateService } from '../services/whatsappTemplate.service';
import { addWhatsappTemplateValidationSchema } from '../validations/whatsappTemplate.validation';

const addWhatsappTemplateInitialValues = {
  templateName: '',
  message: '',
  status: '',
};

export function useWhatsappTemplate() {
  const [whatsappTemplateList, setWhatsappTemplateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWhatsappTemplates = useCallback(async (params = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await whatsappTemplateService.getAllWhatsappTemplates(params);

      if (response.status) {
        setWhatsappTemplateList(Array.isArray(response.data?.items) ? response.data.items : []);
      } else {
        setError(response.message || 'Failed to fetch WhatsApp templates');
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to fetch WhatsApp templates');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
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

  const handleAddWhatsappTemplate = useCallback(async (values, { setSubmitting, resetForm }) => {
    setError('');
    setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const requestData = { templateName, message, status };

      const response = await whatsappTemplateService.createWhatsappTemplate(requestData);

      if (response.status) {
        setWhatsappTemplateList(prev => [...prev, { id: Date.now(), templateName, message, status }]);
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add WhatsApp template');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to add WhatsApp template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleUpdateWhatsappTemplate = useCallback(async (id, values, { setSubmitting }) => {
    setError('');
    setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const requestData = { templateName, message, status };

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
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to update WhatsApp template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteWhatsappTemplate = useCallback(async (id) => {
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
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to delete WhatsApp template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
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
    initialValues: addWhatsappTemplateInitialValues,
  };
}
