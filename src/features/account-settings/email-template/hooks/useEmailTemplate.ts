import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { emailTemplateService } from '../services/emailTemplate.service';
import { addEmailTemplateValidationSchema, editEmailTemplateValidationSchema } from '../validations/emailTemplate.validation';
import { ADD_EMAIL_TEMPLATE_INITIAL_VALUES } from '../constants/emailTemplate.constants';
import type { EmailTemplateItem, EmailTemplateFormData } from '../types/emailTemplate.types';

export function useEmailTemplate() {
  const [emailTemplateList, setEmailTemplateList] = useState<EmailTemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmailTemplates = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await emailTemplateService.getAllEmailTemplates(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: EmailTemplateItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setEmailTemplateList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch email templates');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch email templates');
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
    fetchEmailTemplates();
  }, [fetchEmailTemplates]);

  const handleAddEmailTemplate = useCallback(async (
    values: EmailTemplateFormData,
    { setSubmitting, resetForm }: FormikHelpers<EmailTemplateFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const { templateName, subject, content, isDefault, status } = values;
      const requestData = { templateName, subject, content, isDefault: Boolean(isDefault), status };

      const response = await emailTemplateService.createEmailTemplate(requestData);

      if (response.status) {
        const createdItem = response.data;
        if (createdItem && typeof createdItem === 'object' && 'id' in createdItem) {
          setEmailTemplateList(prev => [...prev, createdItem as EmailTemplateItem]);
        } else {
          fetchEmailTemplates();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add email template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add email template');
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
  }, [fetchEmailTemplates]);

  const handleUpdateEmailTemplate = useCallback(async (
    id: number,
    values: EmailTemplateFormData,
    { setSubmitting }: FormikHelpers<EmailTemplateFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const { templateName, subject, content, isDefault, status } = values;
      const requestData = { templateName, subject, content, isDefault: Boolean(isDefault), status };

      const response = await emailTemplateService.updateEmailTemplate(id, requestData);

      if (response.status) {
        setEmailTemplateList(prev => prev.map(item =>
          item.id === id ? { ...item, templateName, subject, content, isDefault: Boolean(isDefault), status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update email template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update email template');
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

  const handleDeleteEmailTemplate = useCallback(async (id: number) => {
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
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete email template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
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
    editValidationSchema: editEmailTemplateValidationSchema,
    initialValues: ADD_EMAIL_TEMPLATE_INITIAL_VALUES,
  };
}
