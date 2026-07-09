import { useCallback } from 'react';
import { useLookupOptions } from '../../../../shared/hooks/useLookupOptions';
import { taskService } from '../services/taskService';
import type { LeadOption } from '../types/options';

export function useLeadOptions() {
  const fetchLeads = useCallback(async (): Promise<LeadOption[]> => {
    const leadRes = await taskService.getLeads();
    if (leadRes.status && leadRes.data?.items) {
      return leadRes.data.items.map((l: { id: number; name: string }) => ({ value: l.id, label: l.name }));
    }
    return [];
  }, []);

  const { options: leadOptions, isLoading: leadLoading, load: loadLeads } = useLookupOptions(fetchLeads);

  return { leadOptions, leadLoading, loadLeads };
}
