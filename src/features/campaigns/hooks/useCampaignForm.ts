import { useState, useCallback } from 'react';
import { INITIAL_FORM_DATA } from '../constants/campaign.constants';
import { validateCampaignForm } from '../validations/campaign.validation';
import { buildCampaignPayload } from '../utils/campaign.utils';
import type { CampaignFormData, CreateCampaignPayload } from '../types/campaign.types';

export function useCampaignForm() {
  const [formData, setFormData] = useState<CampaignFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  }, []);

  const populateForm = useCallback((data: CampaignFormData) => {
    setFormData(data);
    setErrors({});
  }, []);

  const handleFieldChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const handleAgentChange = useCallback((selected: string[]) => {
    setFormData(prev => ({ ...prev, poolAgents: selected }));
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    setFormData({ ...INITIAL_FORM_DATA, type });
    setErrors({});
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors = validateCampaignForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const buildPayload = useCallback((): CreateCampaignPayload => {
    return buildCampaignPayload(formData);
  }, [formData]);

  return {
    formData,
    errors,
    resetForm,
    populateForm,
    handleFieldChange,
    handleAgentChange,
    handleTypeChange,
    validate,
    buildPayload,
  };
}
