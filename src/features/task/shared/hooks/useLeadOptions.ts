import { useState, useCallback, useRef } from 'react';
import { taskService } from '../services/taskService';
import type { LeadOption } from '../types/genericTaskForm.types';

export function useLeadOptions() {
  const [leadOptions, setLeadOptions] = useState<LeadOption[]>([]);
  const [leadLoading, setLeadLoading] = useState(false);
  const leadLoaded = useRef(false);

  const loadLeads = useCallback(async () => {
    if (leadLoaded.current) return;
    leadLoaded.current = true;
    setLeadLoading(true);
    try {
      const leadRes = await taskService.getLeads();
      if (leadRes.status && leadRes.data?.items) {
        setLeadOptions(
          leadRes.data.items.map((l: { id: number; name: string }) => ({ value: l.id, label: l.name }))
        );
      }
    } catch {
      leadLoaded.current = false;
    } finally {
      setLeadLoading(false);
    }
  }, []);

  return { leadOptions, leadLoading, loadLeads };
}