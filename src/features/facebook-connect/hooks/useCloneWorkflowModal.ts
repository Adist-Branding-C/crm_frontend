import { useState } from 'react';
import { facebookApi } from '../services/facebook.service';
import { useFacebookBrowseOptions } from './useFacebookBrowseOptions';
import { useToast } from '../../../shared/hooks/useToast';
import type { Workflow } from '../types';

// A Facebook Form can only ever back one non-deleted Workflow (unique on
// facebookFormId - see FacebookWorkflow entity), so the clone always needs a
// different Form. Account/Page aren't constrained the same way, so they're
// pre-filled from the source Workflow - the admin only has to pick a Form.
export const useCloneWorkflowModal = (onCloned: () => void) => {
  const toast = useToast();
  const browse = useFacebookBrowseOptions(toast);

  const [source, setSource] = useState<Workflow | null>(null);
  const [name, setName] = useState('');
  const [connectionId, setConnectionId] = useState('');
  const [pageId, setPageId] = useState('');
  const [formId, setFormId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const open = async (workflow: Workflow) => {
    setSource(workflow);
    setName(`${workflow.name} - Copy`);
    setConnectionId(workflow.connectionId ?? '');
    setPageId(workflow.facebookPageId ?? '');
    setFormId('');
    setErrors({});

    if (workflow.connectionId) {
      await browse.loadPages(workflow.connectionId);
      if (workflow.facebookPageId) {
        await browse.loadForms(workflow.facebookPageId, workflow.connectionId);
      }
    }
  };

  const close = () => setSource(null);

  const handleConnectionChange = (value: string) => {
    setConnectionId(value);
    setPageId('');
    setFormId('');
    if (value) browse.loadPages(value);
  };

  const handlePageChange = (value: string) => {
    setPageId(value);
    setFormId('');
    if (value && connectionId) browse.loadForms(value, connectionId);
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!connectionId) nextErrors.connectionId = 'Choose a connected Facebook account';
    if (!pageId) nextErrors.pageId = 'Facebook page is required';
    if (!formId) nextErrors.formId = 'Lead form is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!source || !validate()) return;
    setSubmitting(true);
    try {
      const response = await facebookApi.cloneWorkflow(source.id, {
        name: name.trim() || undefined,
        connectionId,
        facebookPageId: pageId,
        facebookFormId: formId,
      });
      if (response.data?.subscriptionWarning) {
        toast.showToastMessage(response.data.subscriptionWarning, 'error');
      } else {
        toast.showToastMessage('Workflow cloned', 'success');
      }
      close();
      onCloned();
    } catch (error: any) {
      toast.showToastMessage(error?.response?.data?.message || 'Failed to clone this Workflow', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    source,
    open,
    close,
    browse,
    name,
    setName,
    connectionId,
    pageId,
    formId,
    errors,
    submitting,
    handleConnectionChange,
    handlePageChange,
    setFormId,
    handleSubmit,
    toast,
  };
};
