import { useState, useEffect, useRef } from 'react';
import { leadService } from '../services/lead.service';
import type { LeadOption } from '../types';

export function useLeadSearch() {
  const [leads, setLeads] = useState<LeadOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await leadService.getLeads(search || undefined);
        const data = response?.data ?? response ?? [];
        const items = Array.isArray(data) ? data : [];
        setLeads(items.map((lead: any) => ({ label: lead.name, value: lead.id })));
      } catch {
        setLeads([]);
      } finally {
        setIsLoading(false);
      }
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [search]);

  return { leads, isLoading, search, setSearch };
}
