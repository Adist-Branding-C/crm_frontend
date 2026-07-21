import { useCallback, useState } from 'react';
import { useAutomationData } from '../context/AutomationDataContext';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import { useToast } from '../../../shared/hooks/useToast';
import type { AutomationRule } from '../types';

export function useRuleActions() {
  const { toggleRuleActive, softDeleteRule } = useAutomationData();
  const toast = useToast();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = useCallback((rule: AutomationRule) => {
    setTogglingId(rule.id);
    toggleRuleActive(rule.id)
      .catch(() => toast.showToastMessage('Failed to update rule status', 'error'))
      .finally(() => setTogglingId(null));
  }, [toggleRuleActive, toast]);

  const deleteConfirm = useDeleteConfirmation<AutomationRule>(useCallback(async (rule: AutomationRule) => {
    try {
      await softDeleteRule(rule.id);
      toast.showToastMessage('Rule deleted', 'success');
      return true;
    } catch {
      toast.showToastMessage('Failed to delete rule', 'error');
      return false;
    }
  }, [softDeleteRule, toast]));

  return { togglingId, handleToggle, deleteConfirm, toast };
}
