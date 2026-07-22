import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { LeadAdditionalItem } from '../types/interface';
import type { UseLeadAdditionalDeleteConfirmParams } from '../types/use-lead-additional-delete-confirm.types';

/**
 * Delete-confirmation modal state for the lead-additional page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useLeadAdditionalDeleteConfirm({ handleDeleteAdditionalField }: UseLeadAdditionalDeleteConfirmParams) {
  const deleteAdditionalField = useCallback((item: LeadAdditionalItem) => handleDeleteAdditionalField(item.id), [handleDeleteAdditionalField]);

  return useDeleteConfirmation<LeadAdditionalItem>(deleteAdditionalField);
}
