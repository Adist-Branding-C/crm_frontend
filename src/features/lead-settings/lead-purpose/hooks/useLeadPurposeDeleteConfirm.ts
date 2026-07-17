import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { LeadPurposeItem } from '../types/interface';
import type { UseLeadPurposeDeleteConfirmParams } from '../types/use-lead-purpose-delete-confirm.types';

/**
 * Delete-confirmation modal state for the lead-purpose page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadPurposeDeleteConfirm({ handleDeleteLeadPurpose }: UseLeadPurposeDeleteConfirmParams) {
  const deleteLeadPurpose = useCallback((item: LeadPurposeItem) => handleDeleteLeadPurpose(item.id), [handleDeleteLeadPurpose]);

  return useDeleteConfirmation<LeadPurposeItem>(deleteLeadPurpose);
}
