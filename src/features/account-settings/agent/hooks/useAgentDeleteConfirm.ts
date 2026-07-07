import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { AgentItem } from '../types/agent.types';
import type { UseAgentDeleteConfirmParams } from '../types/use-agent-delete-confirm.types';

/**
 * Delete-confirmation modal state for the account-settings/agent ("Staff") tab.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by staff_id.
 */
export function useAgentDeleteConfirm({ handleDeleteAgent }: UseAgentDeleteConfirmParams) {
  const deleteAgent = useCallback((item: AgentItem) => {
    if (!item.staff_id) return Promise.resolve(false);
    return handleDeleteAgent(item.staff_id);
  }, [handleDeleteAgent]);

  return useDeleteConfirmation<AgentItem>(deleteAgent);
}
