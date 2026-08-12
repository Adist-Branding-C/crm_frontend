import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { facebookApi } from '../services/facebook.service';
import { useMappingRows, emptyMappingRow, type MappingRow } from './useMappingRows';
import { useToast } from '../../../shared/hooks/useToast';
import type { FacebookFormSummary, FieldMapping, MappingOptions, Workflow } from '../types';

const buildMappingRowsFromWorkflow = (mappings: FieldMapping[]): MappingRow[] => {
  return mappings
    .filter((mapping) => mapping.crmFieldCategory === 'core' || mapping.crmFieldCategory === 'additional')
    .map((mapping) => ({
      ...emptyMappingRow(),
      crmFieldCategory: mapping.crmFieldCategory as 'core' | 'additional',
      crmFieldKey: mapping.crmFieldKey,
      valueTemplate: mapping.valueTemplate ?? '',
      isRequired: mapping.isRequired,
    }));
};

export const useEditWorkflowPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const mapping = useMappingRows();

  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [mappingOptions, setMappingOptions] = useState<MappingOptions | null>(null);
  const [forms, setForms] = useState<FacebookFormSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [name, setName] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [sourceName, setSourceName] = useState('');
  const [statusName, setStatusName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const [workflowRes, mappingOptionsRes] = await Promise.all([facebookApi.getWorkflow(id), facebookApi.getMappingOptions()]);
        const loaded = workflowRes.data;
        if (!loaded) {
          setNotFound(true);
          return;
        }
        setWorkflow(loaded);
        setMappingOptions(mappingOptionsRes.data ?? null);
        setName(loaded.name);
        setStatus(loaded.status);
        const initialRows = buildMappingRowsFromWorkflow(loaded.fieldMappings);
        mapping.setRows(initialRows.length ? initialRows : [emptyMappingRow()]);
        setSourceName(loaded.fieldMappings.find((m) => m.crmFieldCategory === 'source')?.crmFieldKey ?? '');
        setStatusName(loaded.fieldMappings.find((m) => m.crmFieldCategory === 'status')?.crmFieldKey ?? '');

        if (loaded.facebookPageId && loaded.connectionId) {
          const formsRes = await facebookApi.listForms(loaded.facebookPageId, loaded.connectionId);
          setForms(formsRes.data ?? []);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const selectedForm = forms.find((form) => form.id === workflow?.facebookFormId) ?? null;

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
    if (sourceName) mappings.push({ facebookField: null, crmFieldCategory: 'source', crmFieldKey: sourceName, isRequired: false });
    if (statusName) mappings.push({ facebookField: null, crmFieldCategory: 'status', crmFieldKey: statusName, isRequired: false });
    return mappings;
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Workflow name is required';
    if (!sourceName) nextErrors.sourceName = 'A default Source is required';
    const hasNameMapping = mapping.rows.some((row) => row.crmFieldCategory === 'core' && row.crmFieldKey === 'name' && row.valueTemplate.trim());
    const hasPhoneMapping = mapping.rows.some((row) => row.crmFieldCategory === 'core' && row.crmFieldKey === 'phone' && row.valueTemplate.trim());
    if (!hasNameMapping) nextErrors.mappings = 'Add a mapping for the "Name" field';
    else if (!hasPhoneMapping) nextErrors.mappings = 'Add a mapping for the "Phone" field';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!id || !validate()) return;
    setSubmitting(true);
    try {
      const response = await facebookApi.updateWorkflow(id, { name: name.trim(), status, fieldMappings: buildFieldMappings() });
      if (response.data?.subscriptionWarning) {
        toast.showToastMessage(response.data.subscriptionWarning, 'error');
      } else {
        toast.showToastMessage('Workflow updated', 'success');
      }
      navigate('/facebook/workflows');
    } catch (error: any) {
      toast.showToastMessage(error?.response?.data?.message || 'Failed to update this Workflow', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await facebookApi.deleteWorkflow(id);
      toast.showToastMessage('Workflow deleted', 'success');
      navigate('/facebook/workflows');
    } catch {
      toast.showToastMessage('Failed to delete this Workflow', 'error');
    }
  };

  return {
    workflow,
    mappingOptions,
    selectedForm,
    loading,
    notFound,
    name,
    setName,
    status,
    setStatus,
    sourceName,
    setSourceName,
    statusName,
    setStatusName,
    mapping,
    errors,
    submitting,
    handleSubmit,
    handleDelete,
    toast,
  };
};
