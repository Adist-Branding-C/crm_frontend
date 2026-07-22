import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import type { Lead } from '../../enquiries/types';

export function useLeadRestoreConfirm(restoreLead: (leadId: string) => Promise<boolean>) {
  const handleRestore = useCallback((lead: Lead) => restoreLead(lead.leadId), [restoreLead]);
  return useDeleteConfirmation<Lead>(handleRestore);
}
