import { useCallback } from 'react';
import { leadsService } from '../services/LeadsService';

export interface UseEnquiriesActionsResult {
  handleDeleteLead: (id: string) => Promise<void>;
  handleEditLead: (id: string) => void;
}

export function useEnquiriesActions(refetch: () => void): UseEnquiriesActionsResult {
  const handleDeleteLead = useCallback(async (id: string) => {
    try {
      const response = await leadsService.deleteLead(id);
      if (response.status) {
        refetch();
      } else {
        console.error('Failed to delete lead:', response.message);
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  }, [refetch]);

  const handleEditLead = useCallback((_id: string) => {
    // Placeholder for edit functionality
  }, []);

  return { handleDeleteLead, handleEditLead };
}
