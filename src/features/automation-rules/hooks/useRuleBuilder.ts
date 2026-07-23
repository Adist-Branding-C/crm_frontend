import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAutomationData } from '../context/AutomationDataContext';
import { useToast } from '../../../shared/hooks/useToast';
import type { AutomationRule, RuleAction, TriggerConfig, TriggerType } from '../types';

export interface RuleBuilderFormValues {
  name: string;
  description: string;
  isActive: boolean;
  triggerType: TriggerType | '';
  triggerConfig: TriggerConfig;
  actions: RuleAction[];
}

const EMPTY_INITIAL_VALUES: RuleBuilderFormValues = {
  name: '',
  description: '',
  isActive: true,
  triggerType: '',
  triggerConfig: {},
  actions: [],
};

function toFormValues(rule: AutomationRule): RuleBuilderFormValues {
  return {
    name: rule.name,
    description: rule.description ?? '',
    isActive: rule.isActive,
    triggerType: rule.triggerType,
    triggerConfig: rule.triggerConfig,
    actions: rule.actions,
  };
}

function extractErrorMessage(error: unknown): string {
  const response = (error as { response?: { data?: { message?: string } } })?.response;
  return response?.data?.message ?? 'Something went wrong while saving the rule';
}

export function useRuleBuilder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchRuleById, createRule, updateRule } = useAutomationData();
  const toast = useToast();

  const isEditing = Boolean(id);
  const [existingRule, setExistingRule] = useState<AutomationRule | undefined>(undefined);
  const [isLoadingRule, setIsLoadingRule] = useState(isEditing);
  const [ruleNotFound, setRuleNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setIsLoadingRule(true);
    fetchRuleById(id)
      .then((rule) => {
        if (cancelled) return;
        if (!rule) {
          setRuleNotFound(true);
        } else {
          setExistingRule(rule);
        }
      })
      .catch(() => {
        if (!cancelled) setRuleNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingRule(false);
      });
    return () => { cancelled = true; };
  }, [id, fetchRuleById]);

  const initialValues = useMemo(
    () => (existingRule ? toFormValues(existingRule) : EMPTY_INITIAL_VALUES),
    [existingRule],
  );

  const handleSubmit = async (values: RuleBuilderFormValues) => {
    const triggerType = values.triggerType as TriggerType;
    const actions = triggerType === 'REASSIGN' || triggerType === 'NOTIFICATION' ? [] : values.actions;

    const trimmedDescription = values.description.trim();
    const draft = {
      name: values.name.trim(),
      isActive: values.isActive,
      triggerType,
      triggerConfig: values.triggerConfig,
      actions,
      ...(trimmedDescription ? { description: trimmedDescription } : {}),
    };

    try {
      if (isEditing && id) {
        await updateRule(id, draft);
      } else {
        await createRule(draft);
      }
      toast.showToastMessage('Rule saved', 'success');
      setTimeout(() => navigate('/automation-rules'), 300);
    } catch (error) {
      toast.showToastMessage(extractErrorMessage(error), 'error');
    }
  };

  const handleCancel = () => navigate('/automation-rules');

  return {
    isEditing,
    isLoading: isLoadingRule,
    ruleNotFound,
    initialValues,
    handleSubmit,
    handleCancel,
    toast,
  };
}
