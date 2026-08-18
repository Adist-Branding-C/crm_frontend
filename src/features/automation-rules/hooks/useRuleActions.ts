import { useCallback, useState } from 'react';
import { useAutomationData } from '../context/AutomationDataContext';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import { useToast } from '../../../shared/hooks/useToast';
import type { AutomationRule } from '../types';

export function useRuleActions(onRefresh?: () => void) {
  const { toggleRuleActive, softDeleteRule } = useAutomationData();
  const toast = useToast();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = useCallback((rule: AutomationRule) => {
    setTogglingId(rule.id);
    toggleRuleActive(rule.id)
      .then(() => {
        if (onRefresh) onRefresh();
      })
      .catch(() => toast.showToastMessage('Failed to update rule status', 'error'))
      .finally(() => setTogglingId(null));
  }, [toggleRuleActive, toast, onRefresh]);

  const deleteConfirm = useDeleteConfirmation<AutomationRule>(useCallback(async (rule: AutomationRule) => {
    try {
      await softDeleteRule(rule.id);
      toast.showToastMessage('Rule deleted', 'success');
      if (onRefresh) onRefresh();
      return true;
    } catch {
      toast.showToastMessage('Failed to delete rule', 'error');
      return false;
    }
  }, [softDeleteRule, toast, onRefresh]));

  return { togglingId, handleToggle, deleteConfirm, toast };
}
