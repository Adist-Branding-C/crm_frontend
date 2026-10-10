import { useEffect, useMemo, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useAutomationData } from '../context/AutomationDataContext';
import { useToast } from '../../../shared/hooks/useToast';
import { isWebhookOnlyTrigger } from '../constants';
import { sanitizeWebhookOnlyActions } from '../utils/webhookOnlyActions';
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

function extractApiError(error: unknown): { message: string; field?: string } {
  const data = (error as { response?: { data?: { message?: string; field?: string } } })?.response?.data;
  return {
    message: data?.message ?? 'Something went wrong while saving the rule',
    ...(data?.field ? { field: data.field } : {}),
  };
}

// The backend reports action-config errors without an action index (e.g. "actionConfig.title").
// Attach them to this rule's notification action so the message lands on the matching input.
function resolveApiErrorFieldPath(field: string, values: RuleBuilderFormValues): string | undefined {
  const index = values.actions.findIndex((action) => action.actionType === 'NOTIFICATION');
  if (index === -1) return undefined;
  if (field.startsWith('actionConfig.')) {
    return `actions.${index}.actionConfig.${field.slice('actionConfig.'.length)}`;
  }
  if (field === 'actions.actionType' || field === 'actions') {
    return `actions.${index}.actionType`;
  }
  return undefined;
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

  const handleSubmit = async (values: RuleBuilderFormValues, helpers: FormikHelpers<RuleBuilderFormValues>) => {
    const triggerType = values.triggerType as TriggerType;
    const webhookOnlyRule = isWebhookOnlyTrigger(triggerType);
    const actions = triggerType === 'REASSIGN' || triggerType === 'NOTIFICATION'
      ? []
      : webhookOnlyRule
        ? sanitizeWebhookOnlyActions(values.actions)
        : values.actions;

    const trimmedDescription = values.description.trim();
    const draft = {
      name: values.name.trim(),
      isActive: values.isActive,
      triggerType,
      triggerConfig: webhookOnlyRule ? {} : values.triggerConfig,
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
      const { message, field } = extractApiError(error);
      if (field) {
        const path = resolveApiErrorFieldPath(field, values);
        if (path) helpers.setFieldError(path, message);
      }
      toast.showToastMessage(message, 'error');
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
