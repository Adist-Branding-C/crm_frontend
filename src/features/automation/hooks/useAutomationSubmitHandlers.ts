import { useCallback } from 'react';
import { useAutomationApi } from './useAutomationApi';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import type { AutomationRule, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';

// Add/edit now happen on the standalone builder page (useAutomationBuilderSubmit)
// - this hook only covers what the list page (AutomationPage) itself still
// does inline: delete-with-confirm and the row status toggle.
export function useAutomationSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const api = useAutomationApi();

  const handleConfirmDelete = useCallback(async () => {
    if (!config.deletingItem) return;

    fetch.setError('');

    try {
      const response = await api.remove(config.deletingItem.id);

      if (response?.status) {
        fetch.refresh();
        toast.showToastMessage('Automation deleted successfully', 'success');
        config.onDeleteSuccess();
      } else {
        fetch.setError(response?.message || 'Failed to delete automation');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      fetch.setError(parsed.message);
    }
  }, [api, fetch, config, toast]);

  const handleToggleStatus = useCallback(async (automation: AutomationRule) => {
    const response = await api.toggleStatus(automation.id, !automation.isActive);
    if (response?.status) {
      fetch.refresh();
      toast.showToastMessage(
        `Automation ${!automation.isActive ? 'activated' : 'deactivated'}`,
        'success',
      );
    } else {
      fetch.setError(response?.message || 'Failed to update automation status');
    }
  }, [api, fetch, toast]);

  return { handleConfirmDelete, handleToggleStatus };
}
