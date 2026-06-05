import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { emailTemplateService } from '../services/emailTemplate.service';
import { addEmailTemplateValidationSchema } from '../validations/emailTemplate.validation';
import type { EmailTemplateItem, EmailTemplateFormData } from '../types/emailTemplate.types';

const addEmailTemplateInitialValues: EmailTemplateFormData = {
  templateName: '',
  subject: '',
  content: '',
  isDefault: false,
  status: '',
};

export function useEmailTemplate() {
  const [emailTemplateList, setEmailTemplateList] = useState<EmailTemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmailTemplates = useCallback(async (params: Record<string, string | number | boolean | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await emailTemplateService.getAllEmailTemplates(params);

      if (response.status) {
        setEmailTemplateList(Array.isArray(response.data?.items) ? response.data.items : []);
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
  ): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const { createdBy: _createdBy, ...rest } = values as EmailTemplateFormData & { createdBy?: string };
      const { templateName, subject, content, isDefault, status } = rest;
      const requestData = { templateName, subject, content, isDefault: Boolean(isDefault), status };

      const response = await emailTemplateService.createEmailTemplate(requestData);

      if (response.status) {
        const createdItem = response.data;
        if (createdItem && 'id' in createdItem) {
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
  ): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const { createdBy: _createdBy, ...rest } = values as EmailTemplateFormData & { createdBy?: string };
      const { templateName, subject, content, isDefault, status } = rest;
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

  const handleDeleteEmailTemplate = useCallback(async (id: number): Promise<boolean> => {
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
    initialValues: addEmailTemplateInitialValues,
  };
}
