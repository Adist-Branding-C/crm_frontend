import { useState, useCallback, useEffect } from 'react';
import { emailTemplateService } from '../services/emailTemplate.service';
import { addEmailTemplateValidationSchema } from '../validations/emailTemplate.validation';

const addEmailTemplateInitialValues = {
  templateName: '',
  subject: '',
  content: '',
  status: '',
};

export function useEmailTemplate() {
  const [emailTemplateList, setEmailTemplateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmailTemplates = useCallback(async (params = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await emailTemplateService.getAllEmailTemplates(params);

      if (response.status) {
        setEmailTemplateList(Array.isArray(response.data?.items) ? response.data.items : []);
      } else {
        setError(response.message || 'Failed to fetch email templates');
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to fetch email templates');
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
    fetchEmailTemplates();
  }, [fetchEmailTemplates]);

  const handleAddEmailTemplate = useCallback(async (values, { setSubmitting, resetForm }) => {
    setError('');
    setIsLoading(true);

    try {
      const { templateName, subject, content, status } = values;
      const requestData = { templateName, subject, content, status };

      const response = await emailTemplateService.createEmailTemplate(requestData);

      if (response.status) {
        setEmailTemplateList(prev => [...prev, { id: Date.now(), templateName, subject, content, status }]);
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add email template');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to add email template');
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

  const handleUpdateEmailTemplate = useCallback(async (id, values, { setSubmitting }) => {
    setError('');
    setIsLoading(true);

    try {
      const { templateName, subject, content, status } = values;
      const requestData = { templateName, subject, content, status };

      const response = await emailTemplateService.updateEmailTemplate(id, requestData);

      if (response.status) {
        setEmailTemplateList(prev => prev.map(item =>
          item.id === id ? { ...item, templateName, subject, content, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update email template');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to update email template');
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

  const handleDeleteEmailTemplate = useCallback(async (id) => {
    setError('');

    try {
      const response = await emailTemplateService.deleteEmailTemplate(id);

      if (response.status) {
        setEmailTemplateList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete email template');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to delete email template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    emailTemplateList,
    isLoading,
    error,
    fetchEmailTemplates,
    handleAddEmailTemplate,
    handleUpdateEmailTemplate,
    handleDeleteEmailTemplate,
    validationSchema: addEmailTemplateValidationSchema,
    initialValues: addEmailTemplateInitialValues,
  };
}
