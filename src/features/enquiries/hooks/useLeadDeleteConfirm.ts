import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import type { Lead } from '../types';

export function useLeadDeleteConfirm(deleteLead: (leadId: string) => Promise<boolean>) {
  const handleDelete = useCallback((lead: Lead) => deleteLead(lead.leadId), [deleteLead]);
  return useDeleteConfirmation<Lead>(handleDelete);
}
