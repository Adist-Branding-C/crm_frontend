import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { LeadSourceItem } from '../types/interface';
import type { UseLeadSourceDeleteConfirmParams } from '../types/use-lead-source-delete-confirm.types';

/**
 * Delete-confirmation modal state for the lead-source page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadSourceDeleteConfirm({ handleDeleteLeadSource }: UseLeadSourceDeleteConfirmParams) {
  const deleteLeadSource = useCallback((item: LeadSourceItem) => handleDeleteLeadSource(item.id), [handleDeleteLeadSource]);

  return useDeleteConfirmation<LeadSourceItem>(deleteLeadSource);
}
