import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { LeadStatusItem } from '../types/interface';
import type { UseLeadStatusDeleteConfirmParams } from '../types/use-lead-status-delete-confirm.types';

/**
 * Delete-confirmation modal state for the lead-status page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadStatusDeleteConfirm({ handleDeleteLeadStatus }: UseLeadStatusDeleteConfirmParams) {
  const deleteLeadStatus = useCallback((item: LeadStatusItem) => handleDeleteLeadStatus(item.id), [handleDeleteLeadStatus]);

  return useDeleteConfirmation<LeadStatusItem>(deleteLeadStatus);
}
