import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { facebookApi } from '../services/facebook.service';
import { useFacebookBrowseOptions } from './useFacebookBrowseOptions';
import { emptyMappingRow, useMappingRows } from './useMappingRows';
import { useToast } from '../../../shared/hooks/useToast';
import type { FieldMapping } from '../types';

export const useCreateWorkflowPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const browse = useFacebookBrowseOptions();
  const mapping = useMappingRows();

  const [name, setName] = useState('');
  const [connectionId, setConnectionId] = useState('');
  const [pageId, setPageId] = useState('');
  const [formId, setFormId] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [statusName, setStatusName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedForm = browse.forms.find((form) => form.id === formId) ?? null;

  const handleConnectionChange = (value: string) => {
    setConnectionId(value);
    setPageId('');
    setFormId('');
    mapping.setRows([emptyMappingRow()]);
    if (value) browse.loadPages(value);
  };

  const handlePageChange = (value: string) => {
    setPageId(value);
    setFormId('');
    mapping.setRows([emptyMappingRow()]);
    if (value && connectionId) browse.loadForms(value, connectionId);
  };

  const handleFormChange = (value: string) => {
    setFormId(value);
    mapping.setRows([emptyMappingRow()]);
  };

  const buildFieldMappings = (): FieldMapping[] => {
    const mappings: FieldMapping[] = [];

    for (const row of mapping.rows) {
      if (!row.crmFieldKey || !row.valueTemplate.trim()) continue;
      mappings.push({
        facebookField: null,
        crmFieldCategory: row.crmFieldCategory,
        crmFieldKey: row.crmFieldKey,
        valueTemplate: row.valueTemplate.trim(),
        isRequired: row.isRequired,
      });
    }

    if (sourceName) {
      mappings.push({ facebookField: null, crmFieldCategory: 'source', crmFieldKey: sourceName, isRequired: false });
    }
    if (statusName) {
      mappings.push({ facebookField: null, crmFieldCategory: 'status', crmFieldKey: statusName, isRequired: false });
    }

    return mappings;
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Workflow name is required';
    if (!connectionId) nextErrors.connectionId = 'Choose a connected Facebook account';
    if (!pageId) nextErrors.pageId = 'Facebook page is required';
    if (!formId) nextErrors.formId = 'Lead form is required';
    if (!sourceName) nextErrors.sourceName = 'A default Source is required';
    const hasNameMapping = mapping.rows.some((row) => row.crmFieldCategory === 'core' && row.crmFieldKey === 'name' && row.valueTemplate.trim());
    const hasPhoneMapping = mapping.rows.some((row) => row.crmFieldCategory === 'core' && row.crmFieldKey === 'phone' && row.valueTemplate.trim());
    if (!hasNameMapping) nextErrors.mappings = 'Add a mapping for the "Name" field';
    else if (!hasPhoneMapping) nextErrors.mappings = 'Add a mapping for the "Phone" field';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const response = await facebookApi.createWorkflow({
        name: name.trim(),
        connectionId,
        facebookPageId: pageId,
        facebookFormId: formId,
        status: 'active',
        fieldMappings: buildFieldMappings(),
      });
      if (response.data?.subscriptionWarning) {
        toast.showToastMessage(response.data.subscriptionWarning, 'error');
      } else {
        toast.showToastMessage('Workflow created', 'success');
      }
      navigate('/facebook/workflows');
    } catch (error: any) {
      toast.showToastMessage(error?.response?.data?.message || 'Failed to create Workflow', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    browse,
    name,
    setName,
    connectionId,
    pageId,
    formId,
    selectedForm,
    sourceName,
    setSourceName,
    statusName,
    setStatusName,
    mapping,
    errors,
    submitting,
    handleConnectionChange,
    handlePageChange,
    handleFormChange,
    handleSubmit,
    toast,
  };
};
