import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { LeadTypeItem } from '../types/interface';
import type { UseLeadTypeDeleteConfirmParams } from '../types/use-lead-type-delete-confirm.types';

/**
 * Delete-confirmation modal state for the lead-types page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadTypeDeleteConfirm({ handleDeleteLeadType }: UseLeadTypeDeleteConfirmParams) {
  const deleteLeadType = useCallback((item: LeadTypeItem) => handleDeleteLeadType(item.id), [handleDeleteLeadType]);

  return useDeleteConfirmation<LeadTypeItem>(deleteLeadType);
}
